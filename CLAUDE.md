# CLAUDE.md — Vanora Partners website

This file is loaded automatically every session. It holds the rules that must never drift. The full spec is in `vanora-partners-website-brief.md` — that document is the source of truth for copy, sections, and layout. This file is the guardrails.

## What we're building
A premium, high-converting marketing site for **Vanora Partners**, an international **AI-powered revenue growth and business transformation company**. Vanora combines strategy, AI, revenue systems, automation, talent and hands-on execution to help ambitious companies sell more, collect faster, operate better and scale intelligently. This is a **repositioning of the same brand** — not a new company, not a separate site. The whole page exists to make a serious buyer think "these people actually implement" and book a strategy session.

## Non-negotiable rules
1. **Vanora Partners is independent.** Never mention TechBots, any parent company, or "a division of" anything. Vanora stands alone.
2. **Tagline is "Strategy. Installed."** — this is the differentiator (we build and run things, we don't just advise). "Strategy Beyond Expectations" appears only in the About section and footer.
3. **The nav must be visible in every state.** The reported bug was navy text on a dark background. Nav is a two-state sticky bar: white logo + ivory links over the dark hero, flipping to navy logo + navy links on an ivory bar after ~80px scroll. Verify contrast in BOTH states. This is the #1 thing not to get wrong.
4. **Follow the brief exactly.** Use the copy verbatim. Don't invent extra sections or filler. Where an asset is missing, leave a clearly labelled placeholder — never fake content or stock-photo URLs.
5. **Ask before improvising.** If something in the brief is ambiguous, ask me — don't guess and build.
6. **No fabricated proof.** No invented client names, testimonials, awards, partnerships, or statistics. Case studies and stats sections stay as clearly labelled placeholders until real numbers are supplied.
7. **Logo stays untouched.** Use the supplied logo files as-is — never redrawn, distorted, cropped, or recoloured.

## Design tokens (single source — put these in CSS variables, derive everything from them)
```css
--ink:#041B44; --midnight:#0B2657; --navy-deep:#020D26;
--gold:#C6A15A; --gold-soft:#D9C08A; --champagne:#EFE7D6;
--ivory:#FAF8F3; --slate:#5B6473; --line:#E4DECE; --white:#FFFFFF;
--cobalt:#2957D9; /* restrained digital accent only — see rule below */
```
- `--ink` was re-sampled directly from the logo files (pixel-sampled ≈`#021340`, rounded for legibility). This is a deliberate shift from the previous `#0E1A33` — it's the firm's actual navy, not an approximation.
- Default page background is `--ivory`, not white.
- Gold is an accent only — thin rules, key words, hovers, the ◆ diamond. Never large gold fills.
- **Gold is not literally present in the logo file** (pixel-sampled: the logo is navy + white/ivory only, no gold). It remains the established metallic accent from the brand system already in use — flag this if a separate full-colour brand guide with a true gold mark ever surfaces, so it can be re-sampled.
- `--cobalt` is new and **restrained**: allowed only for small digital-interaction moments (an active nav underline, a focus/hover accent, a link state) where it visibly harmonises with the navy. Never a section background, never a large fill, never competing with gold as the primary accent.
- **No violet, ever.** Earlier drafts of this brief suggested a violet accent — it's explicitly excluded from the palette.
- Alternate section backgrounds (ivory → dark → ivory → champagne) so the page has rhythm.

## Type
- **Fraunces** (serif) — hero + section headlines, pull-quotes.
- **Inter Tight** (sans) — body, buttons, nav.
- **IBM Plex Mono** (uppercase, letter-spaced) — eyebrow labels, section numbers, stat labels. This is intentional; do not swap it. Serif = prestige, mono = execution — the pairing IS the brand.
- **This type system is retained through the repositioning.** The new positioning brief suggested a different pairing (Manrope/Sora + Inter/DM Sans) — that's not used here. The Fraunces/Inter Tight/Plex Mono pairing is part of the established visual identity being preserved, same as the colour system.

## Voice
Confident, precise, understated luxury. Short declarative sentences. No hype words (no "revolutionary," "unlock," "leverage," "cutting-edge," "seamless"). Say what happens in plain terms. Prestige comes from restraint.

## Signature motif
The ◆ diamond (its shape comes from the logo's divider mark; its gold fill is the applied brand accent, not a literal logo colour): bullet before eyebrows, section divider, and the "installation progress" fill in the process section.

## Site structure (post-repositioning)
Homepage section order — build in this sequence, one section at a time, per the working style below:
1. Header / nav — **Home · Solutions · Industries · Vanora AI · How We Work · Insights · About · Contact**, CTA button "Book a strategy session"
2. Hero
3. Industry / trust strip
4. Business problems ("Where growth breaks down")
5. Vanora promise ("What Vanora installs")
6. Challenge-based solution selector (interactive, keyboard + touch accessible)
7. Flagship AI solutions (ExecutiveOS AI, CashFlow Recovery AI, TenderPilot AI, ProposalForge AI, RenewalGuard AI, AI Voice & WhatsApp Automation)
8. Vanora Revenue Engine (animated pipeline)
9. Sector solutions
10. Why Vanora (traditional consulting vs. Vanora comparison)
11. How Vanora works (Diagnose → Design → Deploy → Enable → Optimise)
12. Measurable outcomes (no fabricated numbers)
13. Revenue Leakage Assessment (lead-gen form)
14. About and leadership preview
15. Corporate training
16. Final CTA
17. Footer

Full verbatim copy for every section lives in `vanora-partners-website-brief.md` — that file is being rewritten to match. Some nav destinations (Solutions, Industries, Vanora AI, etc.) may start as anchors into homepage sections rather than separate pages; only split into true multi-page routes when explicitly asked.

## Motion discipline
Fade + 16px rise on scroll (IntersectionObserver, once, ~600ms). Stagger groups 80–120ms. Hovers 200ms. Keep it deliberate, never busy — when in doubt, remove one animation. **`prefers-reduced-motion` must be respected** (show final states, no transforms).

## Quality floor (non-negotiable)
- Responsive, verified at 360 / 768 / 1280px. Nav collapses to hamburger < 900px.
- Keyboard focus visible (gold ring). Color contrast AA on all text.
- Alt text on all images, aria-labels on icon buttons.
- No layout shift; lazy-load below-fold images; defer JS.

## Assets
Logo files are already in `/assets` (navy + white lockups, navy + white icon marks) — do not touch them.
Still needed from the owner (leave clearly labelled placeholders until supplied):
- `vanora-homepage-hero.png` — hero, executive meeting image
- `vanora-strategy-installed.png` — Vanora Promise section
- `vanora-executive-advisory.png` — About section
- `vanora-revenue-growth-training.png` — Corporate Training section
- Sector solution photography (one distinct image per sector — no repeats)
- Confirmed stat numbers for Measurable Outcomes
- Real backend/API endpoint for the Revenue Leakage Assessment form (build the form frontend now; do not invent an endpoint)

## Working style
Build in stages. Guardrails and brief first (done), then design tokens + nav, then section by section. Show me the hero before continuing. Don't dump the whole site in one pass — let me course-correct early.
