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
**Complete — all 11 sections built:** nav, hero, trust bar, tension, services,
process, results, why-Vanora, about, testimonials, final CTA, footer.

Verified end-to-end: HTML is well-formed (no mismatched tags), all asset
references resolve to real files, no console/page errors on load, and all 45
`.reveal` elements correctly animate in under real scroll input (checked via
simulated wheel-scroll through the full page — an earlier check using
`scroll-behavior: smooth`-affected programmatic jumps gave a false alarm,
resolved by testing with real wheel events instead).

## Assets

| Asset | Used in | Status |
|---|---|---|
| Reversed white logo lockup | Nav (over dark hero) | **Real asset**: `assets/logo-full-white.png` (cropped + background removed from `assets/vanora_logo.png`, the owner-supplied source file, tagline excluded per the nav spec) |
| Navy logo lockup | Nav (solid/scrolled state) | **Real asset**: `assets/logo-full-navy.png` (cropped + background removed from `assets/vanora logo b.png`, same treatment as the white version) |
| VP monogram icon | Mobile nav overlay (dark bg) | **Real asset**: `assets/logo-icon-vp-white.png` |
| VP monogram icon | Favicon (light tab bg) | **Real asset**: `assets/logo-icon-vp-navy.png` |
| Hero visual (4:5) | Hero, right column | Placeholder: inline `.hero__visual` div in `index.html` |
| OG image (1200×630) | `<meta property="og:image">` | Placeholder: `assets/og-image-placeholder.svg` |
| Case images ×3 (3:2) | Results section case cards | Placeholder: inline `.case-card__image` divs in `index.html` |
| About visual (4:5) | About section, right column | Placeholder: inline `.placeholder` div in `index.html` (`#aboutVisual`) |
| Testimonial avatar (64px circle) | Testimonials section | Placeholder: `.placeholder--avatar` div in `index.html` |
| Testimonial quote attribution (name/title/company) | Testimonials section | Bracketed placeholder text — the quote itself is real dummy copy from the brief, only the attribution is unknown |
| Case study 2 & 3 copy | Results section | Placeholder text in `index.html`, bracketed — case 1 uses the brief's real copy, cases 2/3 are explicitly marked in the brief as owner-supplied |
| Full lockups with tagline | Unused directly — About/footer use the tagline as text plus the cropped/transparent logo, not the flattened source image | Source available as-is: `assets/vanora_logo.png` (white/navy bg), `assets/vanora logo b.png` (navy/gold on white bg) — could swap in as the OG image |

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
   numbers~~ — **resolved**: added `--gold-deep` (not in CLAUDE.md's token
   set) for gold text/icons on light backgrounds — `.stat__number`, the
   Why-Vanora column label and tick marks. Retuned once (now `#795E2A`) so
   it clears AA on both `--ivory` (5.74:1) and `--champagne` (4.95:1), the
   two light backgrounds it's used against so far.
3. Trust-bar stat numbers (`4`, `90 days`, `15+ yrs`) are marked as
   placeholders in the brief itself ("confirm real numbers") — not swapped
   for real figures yet.
4. Testimonials built as a single pull-quote, not the brief's `[CHOOSE]`
   carousel alternative — the brief only supplies one dummy quote, so a
   carousel would have nothing real to slide between. If 2-3 real
   testimonials come in, this section should be rebuilt as the carousel
   variant instead.
5. The Final CTA's primary button ("Book a strategy call") has no supplied
   booking link (no Calendly/Cal.com URL in the brief). Rather than leave it
   dead or invent a fake scheduling URL, it points to
   `mailto:hello@vanorapartners.com` as an interim, functional fallback —
   swap `.final-cta__cta`'s `href` in `index.html` for the real booking link
   once you have one.
