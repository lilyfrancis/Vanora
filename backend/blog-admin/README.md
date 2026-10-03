# Vanora Insights — blog admin

A small, password-protected PHP admin so a non-technical content person
can write and publish blog posts to the Insights page, without touching
code or Git. No database, no Node, no build step — matches the rest of
this site's "upload static files" deployment.

## How it works

- The **admin** (`backend/blog-admin/`) is the only dynamic part. It
  stores posts in a flat JSON file (`data/posts.json`, protected from web
  access) — no MySQL setup needed.
- When a post is **published**, the admin generates a real static HTML
  page at `/blog/<slug>.html` and regenerates `/insights.html` with the
  current list of published posts. Both use the exact same nav/footer and
  design tokens as the rest of the site.
- The **public site stays 100% static.** Visitors reading Insights or a
  blog post never touch PHP — they just load a plain HTML file, same as
  every other page on vanorapartners.com.
- This means the content person interacts with the admin over the web;
  the generated files exist only on the live server, not in this Git
  repo (see "A note on Git" below).

## One-time setup on Hostinger

1. Confirm the PHP version for the domain is 8.1+ (hPanel → PHP
   Configuration).
2. Upload this entire `backend/blog-admin/` folder into the site's
   document root as `admin/` — e.g. `public_html/admin/`. Keep the
   `lib/`, `templates/`, `data/`, and `assets/` subfolders exactly as
   they are; `edit.php` etc. expect them at those relative paths. You can
   rename the `admin` folder to something less guessable if you like —
   the real security is the password, not the folder name.
3. Also make sure `public_html/blog/` and `public_html/assets/blog/`
   exist and are writable by PHP (the admin creates them automatically
   on first publish/upload if they don't exist, but the account's file
   permissions need to allow PHP to create directories — if that fails,
   create both folders manually via File Manager first).
4. Generate your real password hash — from a terminal with PHP
   installed (your own computer, or Hostinger's SSH access if your plan
   includes it):
   ```bash
   php backend/blog-admin/generate-password-hash.php "a real strong password"
   ```
   This prints a bcrypt hash. Don't type a real password directly into
   any web form on this step — this is a local/offline command.
5. Copy `config.sample.php` to `config.php` in the uploaded `admin/`
   folder and fill in:
   - `ADMIN_USERNAME` — whatever you want to sign in with.
   - `ADMIN_PASSWORD_HASH` — the hash from step 4 (not the plain
     password).
   - `SITE_NAME` / `DEFAULT_AUTHOR` — cosmetic, shown in the admin UI
     and used as the default byline.
6. Delete `generate-password-hash.php` from the live server once you've
   generated your hash — it doesn't need to stay there.
7. Visit `https://vanorapartners.com/admin/login.php` and sign in.

## Using it

- **New post**: Posts → "+ New post". Title, a short excerpt (shows on
  the Insights card and as the page's meta description — keep it to one
  or two sentences), the article body in Markdown, and a featured image.
- **Markdown supported**: `#`/`##`/`###` headings, `**bold**`,
  `*italic*`, `[links](https://…)`, `- bullet lists`, `> quotes`,
  paragraphs separated by a blank line. Click "Preview" to see the
  rendered result before publishing.
- **Featured image**: required before a post can be published (not
  required for a draft). JPG, PNG or WebP, 5MB max. Always add alt text
  — it's required for the same reason.
- **Draft vs Published**: drafts are saved but never appear on the
  public site. Switching a post to "Published" and saving writes its
  page live and updates the Insights listing immediately. Switching it
  back to "Draft" removes its live page and takes it off the listing
  (the post itself isn't deleted — you can republish it later).
- **Delete**: removes the post entirely and takes down its live page if
  it was published. This can't be undone.
- **Zero published posts**: the Insights page shows the original "coming
  soon" copy automatically — nothing to configure.

## A note on Git

Published posts and uploaded images live only on the live server —
`/blog/*.html`, `/assets/blog/*`, and `admin/data/posts.json` are all
gitignored. This is deliberate: the content person shouldn't need Git to
publish, and the admin shouldn't need repo write access. The tradeoff is
that `insights.html` in this repo (the placeholder "coming soon" version)
will no longer match the live server once real posts exist — that's
expected, not a bug. If you ever redeploy this repo over the live site by
re-uploading everything, **don't overwrite** `/blog/`, `/assets/blog/`,
`admin/data/`, or `admin/config.php`, or you'll lose published content
and have to sign back in with a fresh password.

## Security notes

- Single admin account, bcrypt password hash, PHP sessions (httpOnly,
  SameSite=Lax, Secure when served over HTTPS).
- CSRF tokens on every state-changing form (save, delete, image upload).
- Basic login throttle: 5 failed attempts triggers a 30-second
  cool-down.
- `lib/`, `templates/`, and `data/` are blocked from direct web access
  via `.htaccess` (`Require all denied`) — only the top-level `.php`
  files in `admin/` are reachable over HTTP.
- Markdown input is HTML-escaped before any formatting is applied, so
  pasted content can't inject raw HTML or scripts into a post.
- Uploaded images are validated by real MIME type (not just file
  extension) and capped at 5MB.

## What's intentionally not built

- No multi-user roles, comments, categories, tags, or scheduled
  publishing — nothing here suggested the content person needs them. Ask
  if you want any of these added.
- No WYSIWYG rich-text editor — Markdown + live preview, to avoid a
  heavier JS dependency on a static-file deploy. If that's a real
  friction point for the content person in practice, say so and it can
  be swapped.
