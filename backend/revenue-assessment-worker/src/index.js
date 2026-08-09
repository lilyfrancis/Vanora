/**
 * Vanora Partners — Revenue Leakage Assessment intake worker.
 *
 * Receives the Section 13 form submission as JSON, validates it,
 * and emails it to the sales inbox via the Resend API. Runs as a
 * standalone Cloudflare Worker so it works regardless of where the
 * static site itself is hosted (GitHub Pages today).
 *
 * Required secrets/vars (see README.md for how to set these):
 *   RESEND_API_KEY   - secret, from resend.com
 *   NOTIFY_EMAIL     - the inbox that receives assessment leads
 *   FROM_EMAIL       - the verified Resend sender address
 *   ALLOWED_ORIGIN   - the site origin allowed to call this worker (CORS)
 */

const REQUIRED_FIELDS = [
  "name",
  "email",
  "phone",
  "company",
  "role",
  "companySize",
  "primaryChallenge",
  "currentSalesProcess",
  "leadSource",
  "followUpProcess",
  "invoiceChallenge",
  "desiredOutcome",
];

const MAX_FIELD_LENGTH = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonResponse(body, status, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(env),
    },
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    return ["Invalid submission."];
  }

  // Honeypot: real users never fill this hidden field.
  if (payload.website) {
    return ["Rejected."];
  }

  for (const field of REQUIRED_FIELDS) {
    const value = payload[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      errors.push(`Missing field: ${field}`);
      continue;
    }
    if (value.length > MAX_FIELD_LENGTH) {
      errors.push(`Field too long: ${field}`);
    }
  }

  if (typeof payload.email === "string" && !EMAIL_RE.test(payload.email.trim())) {
    errors.push("Invalid email address.");
  }

  return errors;
}

function buildEmailHtml(payload) {
  const rows = REQUIRED_FIELDS.map((field) => {
    const label = field.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
    return `<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top;">${escapeHtml(
      label
    )}</td><td style="padding:6px 12px;">${escapeHtml(payload[field])}</td></tr>`;
  }).join("");

  return `
    <div style="font-family:sans-serif;color:#041B44;">
      <h2 style="font-family:serif;">New Revenue Leakage Assessment</h2>
      <table style="border-collapse:collapse;">${rows}</table>
    </div>
  `;
}

async function sendEmail(payload, env) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: env.NOTIFY_EMAIL,
      reply_to: payload.email,
      subject: `Revenue Leakage Assessment — ${payload.company}`,
      html: buildEmailHtml(payload),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend API error (${res.status}): ${detail}`);
  }
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(env) });
    }

    if (request.method !== "POST") {
      return jsonResponse({ ok: false, error: "Method not allowed." }, 405, env);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ ok: false, error: "Invalid JSON body." }, 400, env);
    }

    const errors = validate(payload);
    if (errors.length > 0) {
      return jsonResponse({ ok: false, error: errors[0] }, 422, env);
    }

    if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL || !env.FROM_EMAIL) {
      return jsonResponse(
        { ok: false, error: "Server not configured. See backend/revenue-assessment-worker/README.md." },
        500,
        env
      );
    }

    try {
      await sendEmail(payload, env);
    } catch (err) {
      return jsonResponse({ ok: false, error: "Could not send assessment." }, 502, env);
    }

    return jsonResponse({ ok: true }, 200, env);
  },
};
