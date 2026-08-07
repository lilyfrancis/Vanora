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
**Stage 4 of N — foundation, nav, hero, trust bar, tension, services.** Remaining
sections (process, results, why-Vanora, about, testimonials, final CTA, footer)
are not built yet; see `index.html` for the stage marker comment.

## Assets

| Asset | Used in | Status |
|---|---|---|
| Reversed white logo lockup | Nav (over dark hero) | **Real asset**: `assets/logo-full-white.png` (cropped + background removed from `assets/vanora_logo.png`, the owner-supplied source file, tagline excluded per the nav spec) |
| Navy logo lockup | Nav (solid/scrolled state) | **Real asset**: `assets/logo-full-navy.png` (cropped + background removed from `assets/vanora logo b.png`, same treatment as the white version) |
| VP monogram icon | Mobile nav overlay (dark bg) | **Real asset**: `assets/logo-icon-vp-white.png` |
| VP monogram icon | Favicon (light tab bg) | **Real asset**: `assets/logo-icon-vp-navy.png` |
| Hero visual (4:5) | Hero, right column | Placeholder: inline `.hero__visual` div in `index.html` |
| OG image (1200×630) | `<meta property="og:image">` | Placeholder: `assets/og-image-placeholder.svg` |
| Full lockups with tagline | Reserved for About/footer (not built yet) | Source available as-is: `assets/vanora_logo.png` (white/navy bg), `assets/vanora logo b.png` (navy/gold on white bg) |

To swap a placeholder, replace the file at the same path (keep the filename,
or update the one `src`/`href` reference in `index.html`). The hero visual
placeholder is a styled `<div>`; swap it for an `<img>` with the same
`.hero__visual` wrapper.

## Known open questions
1. `vanora-partners-website-brief.md` specifies the solid-state nav link hover
   color as `--gold` (`#C6A15A`) on `--ivory` (`#FAF8F3`) background. Measured
   contrast is **2.29:1**, which fails WCAG AA for text (needs 4.5:1). Owner
   confirmed acceptable as-is for Stage 1.
2. ~~Same `--gold` on `--ivory` pairing is used for the trust-bar stat
   numbers~~ — **resolved**: added `--gold-deep` (`#86682E`, not in
   CLAUDE.md's token set) for gold text on light backgrounds, used for
   `.stat__number`. Contrast is now 4.91:1 (passes AA at any text size).
3. Trust-bar stat numbers (`4`, `90 days`, `15+ yrs`) are marked as
   placeholders in the brief itself ("confirm real numbers") — not swapped
   for real figures yet.
