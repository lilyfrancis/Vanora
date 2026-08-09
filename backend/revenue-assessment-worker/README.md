# Revenue Leakage Assessment — intake worker

> **Superseded as the primary target:** the site owner's chosen backend is
> now `backend/revenue-assessment-hostinger/` (plain PHP for Hostinger
> shared hosting). This Worker still works and stays here as a documented
> alternative if hosting plans change, but don't deploy both — see the
> "Why PHP + Hostinger" note in the Hostinger backend's README.

Standalone Cloudflare Worker that receives the Section 13 form submission
(`vanora-partners-website-brief.md`) as JSON and emails it via
[Resend](https://resend.com). It's deployed independently of the static
site, so it works no matter where `index.html` itself is hosted (GitHub
Pages today).

This repo does not include any real API key, sender domain, or deployed
URL — those require an account only the site owner can create. What's
here is real, working code ready to deploy once those exist.

## One-time setup

1. **Create a Resend account** (or swap in whatever transactional email
   provider you prefer — the `sendEmail` function in `src/index.js` is the
   only place that's Resend-specific).
2. **Verify a sending domain** in Resend (e.g. `vanorapartners.com`) and
   note the address you want submissions to come *from*
   (`FROM_EMAIL`, e.g. `assessment@vanorapartners.com`).
3. **Decide the inbox that receives leads** (`NOTIFY_EMAIL`, e.g.
   `hello@vanorapartners.com`) — confirm this against whatever contact
   address the footer already uses; don't invent a new one.
4. Edit `wrangler.toml`'s `[vars]` block with the real `NOTIFY_EMAIL`,
   `FROM_EMAIL`, and `ALLOWED_ORIGIN` (the exact origin the form will be
   served from — GitHub Pages preview URL and/or the production domain).

## Deploy

```bash
cd backend/revenue-assessment-worker
npm install -g wrangler   # if not already installed
wrangler login
wrangler secret put RESEND_API_KEY   # paste the Resend API key when prompted
wrangler deploy
```

`wrangler deploy` prints the live worker URL
(`https://vanora-revenue-assessment.<your-subdomain>.workers.dev`).

## Wire up the frontend

In `main.js`, set the assessment form's endpoint constant to that URL
(search for `REVENUE_ASSESSMENT_ENDPOINT` once Section 13 is built — it's
a single `const` at the top of the file, not scattered through the code).
The form POSTs the fields listed in the brief as JSON; no other frontend
changes are needed to switch providers later, since this worker is the
only thing that knows about Resend.

## Spam protection

`src/index.js` rejects any submission where the hidden `website` field is
filled in (a honeypot — real visitors never see or fill it; bots that
fill every field will). Add Cloudflare Turnstile in front of the form
later if spam becomes a real problem; it isn't wired in yet since it
needs its own site key from a Cloudflare account.

## Local testing

```bash
wrangler dev
```

Then `POST` a JSON body matching the required fields (see
`REQUIRED_FIELDS` in `src/index.js`) to the printed local URL.
