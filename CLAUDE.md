# CLAUDE.md — Vanora Partners website

This file is loaded automatically every session. It holds the rules that must never drift. The full spec is in `vanora-partners-website-brief.md` — that document is the source of truth for copy, sections, and layout. This file is the guardrails.

## What we're building
A premium, high-converting marketing site for **Vanora Partners**, a strategy *and execution* consulting firm. The whole page exists to make a serious buyer think "these people actually implement" and book a strategy call.

## Non-negotiable rules
1. **Vanora Partners is independent.** Never mention TechBots, any parent company, or "a division of" anything. Vanora stands alone.
2. **Tagline is "Strategy. Installed."** — this is the differentiator (we build and run things, we don't just advise). "Strategy Beyond Expectations" appears only in the About section and footer.
3. **The nav must be visible in every state.** The reported bug was navy text on a dark background. Nav is a two-state sticky bar: white logo + ivory links over the dark hero, flipping to navy logo + navy links on an ivory bar after ~80px scroll. Verify contrast in BOTH states. This is the #1 thing not to get wrong.
4. **Follow the brief exactly.** Use the copy verbatim. Don't invent extra sections or filler. Where an asset is missing, leave a clearly labelled placeholder — never fake content or stock-photo URLs.
5. **Ask before improvising.** If something in the brief is ambiguous, ask me — don't guess and build.

## Design tokens (single source — put these in CSS variables, derive everything from them)
```css
--ink:#0E1A33; --midnight:#16264A; --navy-deep:#0A1424;
--gold:#C6A15A; --gold-soft:#D9C08A; --champagne:#EFE7D6;
--ivory:#FAF8F3; --slate:#5B6473; --line:#E4DECE; --white:#FFFFFF;
```
- Default page background is `--ivory`, not white.
- Gold is an accent only — thin rules, key words, hovers, the ◆ diamond. Never large gold fills.
- Alternate section backgrounds (ivory → dark → ivory → champagne) so the page has rhythm.

## Type
- **Fraunces** (serif) — hero + section headlines, pull-quotes.
- **Inter Tight** (sans) — body, buttons, nav.
- **IBM Plex Mono** (uppercase, letter-spaced) — eyebrow labels, section numbers, stat labels. This is intentional; do not swap it. Serif = prestige, mono = execution — the pairing IS the brand.

## Voice
Confident, precise, understated luxury. Short declarative sentences. No hype words (no "revolutionary," "unlock," "leverage," "cutting-edge," "seamless"). Say what happens in plain terms. Prestige comes from restraint.

## Signature motif
The gold ◆ diamond from the logo: bullet before eyebrows, section divider, and the "installation progress" fill in the process section.

## Motion discipline
Fade + 16px rise on scroll (IntersectionObserver, once, ~600ms). Stagger groups 80–120ms. Hovers 200ms. Keep it deliberate, never busy — when in doubt, remove one animation. **`prefers-reduced-motion` must be respected** (show final states, no transforms).

## Quality floor (non-negotiable)
- Responsive, verified at 360 / 768 / 1280px. Nav collapses to hamburger < 900px.
- Keyboard focus visible (gold ring). Color contrast AA on all text.
- Alt text on all images, aria-labels on icon buttons.
- No layout shift; lazy-load below-fold images; defer JS.

## Assets the owner supplies (leave labelled placeholders, easy to swap)
Reversed white logo (required for hero nav), hero image, 3 case-study images + results, client logos, 1–3 testimonials, about image, confirmed stat numbers.

## Working style
Build in stages. Design tokens + nav first, then section by section. Show me the hero before continuing. Don't dump the whole site in one pass — let me course-correct early.
