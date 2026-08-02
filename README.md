# Vanora Partners — website

Plain HTML/CSS/JS build (no framework, no build step) so it deploys directly on
static hosting. See `CLAUDE.md` for guardrails and `vanora-partners-website-brief.md`
for the full section-by-section spec.

## Local dev
Any static file server works, e.g.:
```
python3 -m http.server 8080
```
Then open `http://localhost:8080/`.

## Build status
**Stage 1 of N — foundation, nav, hero.** Remaining sections (trust bar, tension,
services, process, results, why-Vanora, about, testimonials, final CTA, footer)
are not built yet; see `index.html` for the stage marker comment.

## Assets the owner still needs to supply
Each is wired as a clearly labelled, easy-to-swap placeholder:

| Asset | Used in | File to replace |
|---|---|---|
| Reversed white logo lockup | Nav (over dark hero) | `assets/logo-full-white-placeholder.svg` |
| Navy logo lockup | Nav (solid/scrolled state) | `assets/logo-full-navy-placeholder.svg` |
| VP monogram icon | Mobile nav + favicon | `assets/logo-icon-vp-placeholder.svg` |
| Hero visual (4:5) | Hero, right column | inline placeholder in `index.html` (`.hero__visual`) |
| OG image (1200×630) | `<meta property="og:image">` | `assets/og-image-placeholder.svg` |

To swap a logo/OG placeholder, replace the file at the same path (keep the
filename or update the one `src`/`href` reference in `index.html`). The hero
visual placeholder is a styled `<div>`; swap it for an `<img>` with the same
`.hero__visual` wrapper.

## Known open question
`vanora-partners-website-brief.md` specifies the solid-state nav link hover
color as `--gold` (`#C6A15A`) on `--ivory` (`#FAF8F3`) background. Measured
contrast is **2.29:1**, which fails WCAG AA for text (needs 4.5:1). Flagged
for the owner — see Stage 1 handoff notes.
