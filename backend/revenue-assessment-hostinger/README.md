# Revenue Leakage Assessment — Hostinger backend

Plain PHP endpoint for the Section 13 form (`vanora-partners-website-brief.md`),
built for Hostinger shared hosting rather than a serverless platform. It:

- validates the contact fields and all six diagnostic answers,
- computes the same `Strong` / `Needs Attention` / `High-Priority Gap`
  ratings server-side (never trusts a client-sent rating),
- requires consent === true,
- rejects honeypot spam,
- appends every submission to an append-only log,
- emails the sales inbox, and optionally the respondent themselves.

Nothing here is deployed. There's no real domain, mailbox, or file path
filled in — those need the site owner's actual Hostinger account. What
exists is real, working code ready to upload.

## Deploy to Hostinger

1. In hPanel, confirm the PHP version (8.1+) for the domain.
2. Upload this entire `revenue-assessment-hostinger/` directory via the
   File Manager or FTP/SFTP. A reasonable path is
   `public_html/api/assessment/` — but keep the `public/`, `lib/`,
   `data/`, and `config.php` relative layout intact; don't flatten it,
   `submit.php` expects `../lib/rating.php` and `../config.php`.
3. Copy `config.sample.php` to `config.php` (same directory as the
   sample) and fill in the real `NOTIFY_EMAIL`, `FROM_EMAIL`, and
   `ALLOWED_ORIGIN`. `config.php` is gitignored — it never gets committed.
4. Create the `FROM_EMAIL` mailbox in hPanel (Emails → Email Accounts) so
   outgoing mail has a legitimate sender on your domain and isn't flagged
   as spam.
5. If your Hostinger plan/account can put `data/` **outside**
   `public_html`, do that and set `STORAGE_PATH` in `config.php` to the
   absolute path — keeps the submissions log unreachable over HTTP even
   if the `.htaccess` in `data/` were ever misconfigured. If it must stay
   inside `public_html`, the included `.htaccess` (`Require all denied`)
   blocks direct web access to it.
6. Test: `POST` a JSON body with the required fields (see
   `REQUIRED_CONTACT_FIELDS` and `DIAGNOSTIC_QUESTIONS` in the PHP files)
   to `https://yourdomain.com/api/assessment/submit.php` and confirm you
   get `{"ok":true,...}` and an email.

## Wire up the frontend

In `main.js`, set `REVENUE_ASSESSMENT_ENDPOINT` to the real deployed URL
from step 6. Nothing else in the frontend needs to change — the results
screen already computes ratings client-side for instant feedback; this
endpoint is what makes the submission durable and notifies the sales
inbox.

## Why PHP + Hostinger instead of the Cloudflare Worker

An earlier pass built `backend/revenue-assessment-worker/` (a Cloudflare
Worker + Resend). That code still works as a documented alternative, but
Hostinger is the primary target going forward per the site owner's
instruction — most Hostinger plans don't run Node/Workers, and PHP +
`mail()` is the path of least resistance on standard shared hosting. Pick
one before going live; running both would just mean two places for leads
to end up.

## Optional hardening (not built — no reason to add complexity that isn't needed yet)

- Swap `mail()` for SMTP (e.g. via PHPMailer) if deliverability becomes an
  issue — most Hostinger plans support this without extra cost.
- Add Cloudflare Turnstile or hCaptcha in front of the form if spam gets
  past the honeypot.
- Move `data/submissions.log` into a real MySQL table if the volume of
  leads outgrows a flat file — Hostinger includes MySQL databases on
  every plan, so this is a straightforward upgrade when it's actually
  needed.
