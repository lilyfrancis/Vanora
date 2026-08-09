# Vanora Partners — Website Build Brief (v2: AI-Powered Revenue Growth Repositioning)

**For: Claude Code**
**Goal:** Reposition vanorapartners.com as a premium, high-converting AI-powered revenue growth and business transformation site — **same brand, same visual identity, new positioning.** This document is the single source of truth for copy, sections, and layout. Follow it section by section. All copy below is final unless marked `[CHOOSE]` or `[PLACEHOLDER]`. Guardrails (tokens, non-negotiables) live in `CLAUDE.md` — this file is the content and layout spec that implements them.

This supersedes the v1 "strategy and execution consulting firm" brief. Section 1–11 of the old build (nav, hero, tension, services, process, results, why-Vanora, about, testimonials, final CTA, footer) are being replaced by the 17-section structure below. Reuse working code (nav scroll-state logic, IntersectionObserver reveal system, count-up utility, glassmorphism CSS, diamond-motif SVG) — don't rebuild plumbing that already works.

---

## 0. How to read this brief

- Every section has: **PURPOSE**, **LAYOUT**, **COPY** (use verbatim), **IMAGE**, **MOTION**.
- Copy inside `""` is final website copy — paste it as-is.
- `[IMAGE PLACEHOLDER: …]` means insert a placeholder div/image now; the owner will supply the real asset. Build it so swapping in a real image is a one-line change.
- `[PLACEHOLDER]` means no fabricated content goes here — leave a clearly labelled gap.
- Do not invent extra sections, fake stats, fake client names, or fake testimonials. If something is missing, leave a clearly labelled placeholder.
- Design tokens, type, motion discipline, and the non-negotiable rules are defined once in `CLAUDE.md` — don't redefine them differently here. In particular: navy/gold/ivory/cobalt palette (not the cobalt-heavy palette a draft of this brief once suggested), Fraunces/Inter Tight/IBM Plex Mono type (not Manrope/Sora), no violet.

---

## 1. Positioning & voice

**What Vanora Partners is now:** an international AI-powered revenue growth and business transformation company. Vanora combines strategy, AI, revenue systems, automation, talent and hands-on execution to help ambitious companies sell more, collect faster, operate better and scale intelligently.

**The one job of this page:** make a serious buyer think *"these people actually implement"* and book a strategy session — in under five seconds of landing, communicate: *Vanora Partners builds and installs the systems that help companies grow.*

**Primary tagline (use this):** `Strategy. Installed.` — now the hero eyebrow, carried through as the differentiator.
**Secondary/support line (from the logo, use in About + footer only):** `Strategy Beyond Expectations`

**Voice:** confident, precise, understated luxury. Short declarative sentences. No hype words ("revolutionary," "cutting-edge," "unlock," "leverage," "seamless"). Say what happens in plain terms. The prestige comes from restraint, not adjectives. Buttons use sentence case (not full caps) per the existing button system in `CLAUDE.md` §2.5 — the brief text below renders CTAs in caps for emphasis only; implement them sentence-case.

**Audience:** founders, CEOs, and commercial/operations leaders at ambitious companies — property, hospitality, education, distribution/FMCG, professional services, technology, and growth-stage businesses — who want systems installed, not decks delivered.

---

## 2. Design system

Derive every color and font from `CLAUDE.md`'s tokens — do not introduce new ones here. Summary:
- Navy (`--ink`/`--midnight`/`--navy-deep`), gold (`--gold`/`--gold-soft`), ivory/champagne/white backgrounds, slate body text, hairline `--line` dividers — all already defined.
- `--cobalt` is new and restrained: small digital-interaction accents only (active nav underline, focus rings, a link hover, a data-viz line) — never a section background or large fill, never overtaking gold as the primary accent.
- No violet.
- Type: Fraunces (headlines/pull-quotes), Inter Tight (body/buttons/nav), IBM Plex Mono uppercase letter-spaced (eyebrows/labels/stats).
- The gold ◆ diamond remains the signature motif: eyebrow bullet, section divider, process/pipeline progress fill, and now also the center of the rotating brand seal (Section 2 of the homepage, below).

**Glassmorphism — used selectively, not everywhere:**
- Sticky header (solid state can stay opaque per the nav-visibility rule; the transparent hero state may use a light glass treatment if it doesn't compromise contrast)
- Hero micro-metric cards (Revenue Systems / AI Automation / Business Transformation)
- Flagship AI solution cards
- Revenue Leakage Assessment card
- Selected floating elements (e.g. rotating brand seal backing)

Treatment: `backdrop-filter: blur(16px)`, thin low-opacity border (`--line` at reduced opacity or a light navy/gold hairline), soft realistic shadow, text contrast verified AA. Never apply glassmorphism to a full section background.

---

## 3. Header, navigation & the rotating brand seal

**Nav rule (unchanged, still the #1 thing not to get wrong):** two-state sticky nav. Transparent/dark state over the hero uses `logo-full-white.png`, ivory links, gold-soft hover, gold CTA. Solid state (~80px scroll) uses `logo-full-navy.png` on an ivory bar with a hairline + soft shadow, ink links, gold hover, solid-ink CTA. Verify contrast in both states, every viewport.

**Nav items:** `Home` · `Solutions` · `Industries` · `Vanora AI` · `How We Work` · `Insights` · `About` · `Contact`
**Header CTA:** "Book a strategy session" (sentence case button, solid treatment per state).

Not every nav item needs a dedicated page yet. Where there's no separate page, point the link at the matching homepage section anchor (e.g. `Vanora AI` → `#ai-solutions`, `How We Work` → `#how-it-works`). Do not break the existing anchor IDs from the old build without updating every link that pointed at them. `Insights` has no content yet — `[PLACEHOLDER]`: link it to a clearly labelled "coming soon" state or the About section until real content exists; do not fabricate blog posts.

Mobile: hamburger in `--ink` (solid state) / `--ivory` (over hero), opening a full-screen `--ink` overlay with ivory links, gold hovers, `logo-icon-vp` at top — same pattern as the current build.

---

## 4. Homepage sections

### SECTION 1 — Hero
**PURPOSE:** Land the new positioning immediately, stay credible, drive the strategy-session CTA.

**LAYOUT:** Full-width, ~760–900px min-height on desktop. Text left (Fraunces headline + Inter Tight body), executive meeting photo right with natural facial framing — no dark overlay, no text embedded in the image. Bright ivory-to-transparent gradient behind the text block for contrast. Below the fold of the two-column layout, three small glass micro-cards. Separate, simpler stacked composition on mobile (image first or text first — text first, so the message lands before the scroll).

**COPY:**
- Eyebrow (mono, gold): `◆ STRATEGY. INSTALLED.`
- H1 (Fraunces): `"We build the systems behind predictable growth."`
- Subhead (Inter Tight, slate/ivory-85% depending on background): `"Vanora combines strategy, AI, revenue systems, automation, talent and hands-on execution to help ambitious companies sell more, collect faster, operate better and scale intelligently."`
- Primary CTA: `Book a strategy session`
- Secondary CTA (text link, gold arrow): `Explore our solutions →`
- Trust line (mono, muted): `Built for ambitious companies, founders and executive teams.`

**Micro-cards (glass, icon not invented numbers):**
1. **Revenue Systems** — `Build predictable pipelines`
2. **AI Automation** — `Remove repetitive work`
3. **Business Transformation** — `Scale with stronger operations`

**IMAGE:** `assets/vanora-homepage-hero.png` (supplied — bright ivory boardroom, executive team around a table, presenter at a data screen). Set explicit width/height, `loading="eager"`/`fetchpriority="high"` since it's above the fold, descriptive alt text (e.g. "Vanora Partners executive team reviewing a revenue dashboard in a boardroom"). Protect the group's faces when cropping for mobile.

**MOTION:** Same staggered entrance system as the current hero (eyebrow → H1 → subhead → CTAs, ~120ms stagger, cubic-bezier(0.22,1,0.36,1)). Micro-cards stagger in after CTAs. Image scale-in 1.04→1.0 over 900ms. Respect `prefers-reduced-motion`.

---

### SECTION 2 — Rotating Vanora brand seal
**PURPOSE:** A premium circular brand mark reinforcing the tagline without gimmick.

**LAYOUT:** Positioned in the hero as a small supporting element — do not let it cover the headline, CTAs, or the photo's faces. On desktop it can sit near the image's edge or between the text block and the photo; on small mobile, simplify or omit rather than crowd the layout.

**COPY (circular rotating text, mono, letter-spaced):**
`STRATEGY INSTALLED • REVENUE ENGINEERED • GROWTH DELIVERED •` (repeats around the circle)
**Center mark:** the existing `logo-icon-vp` monogram (do not fabricate a new mark).

**MOTION:** Slow continuous rotation (SVG `<textPath>` or CSS animation, ~30–40s per revolution). Pauses or slows on hover/focus. Respects `prefers-reduced-motion` (static, no spin). Simplify sizing at small breakpoints so it never overlaps text.

---

### SECTION 3 — Industry / trust strip
**PURPOSE:** Immediate credibility band under the hero.

**LAYOUT:** Slim `--ivory` band. Left: mono eyebrow. Right: row of industry labels/icons.

**COPY:**
- Eyebrow: `◆ BUILT FOR AMBITIOUS ORGANISATIONS`
- Industry labels (consistent icon set, e.g. Lucide): `Property and Real Estate` · `Hospitality` · `Education` · `Distribution and FMCG` · `Professional Services` · `Technology` · `Growth-Stage Businesses`

No invented client logos here — text/icon labels only.

**MOTION:** Fade + rise on scroll, staggered ~80ms per item.

---

### SECTION 4 — Business problems ("Where growth breaks down")
**PURPOSE:** Name the pain, set up the promise.

**LAYOUT:** `--ivory`. Eyebrow + H2 centered/left per existing tension-section pattern, then a 6-card grid (stack on mobile), consistent line icons.

**COPY:**
- Eyebrow: `◆ WHERE GROWTH BREAKS DOWN`
- H2 (Fraunces): `"Growth should not feel this difficult."`
- Body: `"Your business may have a strong product, an experienced team and ambitious targets — but without a connected revenue system, valuable opportunities continue to slip away."`
- Six problem cards (icon + short line each):
  1. `Leads are not followed up`
  2. `Proposals take too long`
  3. `Executives are overwhelmed`
  4. `Invoices remain unpaid`
  5. `Customers quietly disappear`
  6. `Sales performance is difficult to measure`

**MOTION:** Cards stagger-reveal on scroll, restrained (fade + rise, no bounce).

---

### SECTION 5 — Vanora promise ("What Vanora installs")
**PURPOSE:** State the offer as installed systems, not advice.

**LAYOUT:** Split layout, `--ivory` or `--champagne` background. Image left or right (alternate rhythm from Section 4), copy + outcome list opposite.

**COPY:**
- Eyebrow: `◆ WHAT VANORA INSTALLS`
- H2 (Fraunces): `"We turn business chaos into connected growth systems."`
- Body: `"Vanora designs and implements practical systems that connect your people, processes, data and technology. We do not leave recommendations inside presentations. We build, deploy and optimise solutions your team can actually use."`
- Outcome points (gold ◆ ticks): `Generate qualified opportunities` · `Convert more prospects` · `Automate repetitive work` · `Improve executive decision-making` · `Recover outstanding revenue` · `Retain valuable customers` · `Enter new markets` · `Build scalable operations`
- CTA: `Discover the Vanora difference`

**IMAGE:** `assets/vanora-strategy-installed.png` (supplied — city-view boardroom, presenter at a funnel/bar-chart dashboard). Lazy-load, explicit dimensions, descriptive alt text.

**MOTION:** Standard reveal; image parallax-shifts slightly slower than text on scroll (subtle, existing pattern from the old About section).

---

### SECTION 6 — Challenge-based solution selector
**PURPOSE:** Let the visitor self-select their problem and see the matching solution — this is interactive, so build it as real tabs/cards, not hover-only.

**LAYOUT:** `--ivory` or `--white`. Headline, then a row/grid of selectable challenge cards or tabs. Selecting one reveals a panel below with the recommended solution, a short explanation, benefits, and a CTA. Must work via click, keyboard (arrow keys / Enter / Space, proper `role="tablist"`/`role="tab"`/`role="tabpanel"` or an accessible disclosure pattern), and touch. No information available only on `:hover`.

**COPY:**
- H2: `"What would you like to improve?"`
- Challenge options: `Generate qualified leads` · `Automate sales and customer service` · `Recover outstanding revenue` · `Improve executive productivity` · `Recruit a high-performing team` · `Enter a new market` · `Launch or scale a company` · `Transform business operations`
- Each panel: recommended Vanora solution name + one short explanation paragraph + 2–3 benefit bullets + CTA button (`Book a strategy session` or a solution-specific CTA where it maps directly to a Section 7 AI product).

Map each challenge to the closest real solution described elsewhere on the page (Section 5 outcomes, Section 7 AI products, Section 8 revenue engine) rather than inventing new named products here.

**MOTION:** Smooth panel/tab transition (~200–250ms crossfade or height animation), no layout jump. Provide a static fallback (first panel visible by default) so content works without JS reveal.

---

### SECTION 7 — Flagship AI solutions ("Vanora AI")
**PURPOSE:** Show AI producing business results, not just talking.

**LAYOUT:** Alternate background (`--ivory` or dark `--ink`/`--midnight` for contrast with Section 6). Eyebrow + H2, then a 6-card glassmorphism grid (2–3 columns desktop, stack mobile).

**COPY:**
- Eyebrow: `◆ VANORA AI`
- H2 (Fraunces): `"AI that does more than talk. It produces business results."`
- Cards (icon + name + body + directional arrow + CTA, no fake stats or screenshots):
  1. **ExecutiveOS AI** — `"An AI-powered executive command centre that turns meetings, emails, commitments and business information into decision-ready intelligence."`
  2. **CashFlow Recovery AI** — `"Identifies overdue accounts, prioritises collection activity and automates personalised payment follow-up."`
  3. **TenderPilot AI** — `"Helps businesses discover relevant tenders, assess requirements and prepare stronger first-draft bid responses."`
  4. **ProposalForge AI** — `"Turns a short sales brief into professional proposals, quotations, scopes of work and follow-up communication."`
  5. **RenewalGuard AI** — `"Tracks renewal dates, identifies at-risk accounts and triggers timely retention actions."`
  6. **AI Voice and WhatsApp Automation** — `"Automates customer conversations, qualification, booking, follow-up and support across high-volume channels."`

**MOTION:** Stagger-reveal; on hover/focus, subtle gradient-glow + 4px lift + gold rule sweep (existing card-hover pattern), directional arrow nudges right.

---

### SECTION 8 — Vanora Revenue Engine
**PURPOSE:** Show the connected system, not a pile of services.

**LAYOUT:** Strong split layout, bright background, branded pipeline visual (not a stock image — build it in CSS/SVG using the design tokens).

**COPY:**
- Eyebrow: `◆ VANORA REVENUE ENGINE`
- H2 (Fraunces): `"Stop chasing revenue. Build a system that produces it."`
- Body: `"We connect market intelligence, lead generation, sales automation, CRM implementation, conversion strategy, customer retention and performance reporting into one measurable revenue system."`
- Pipeline stages: `Market Intelligence → Qualified Leads → Meetings → Proposals → Customers → Renewals`
- CTA: `Build my revenue engine`

**MOTION:** Scroll-linked progress fill along the pipeline (reuse the existing "installation progress" gold-line pattern from the old Process section). Fully filled/static state when `prefers-reduced-motion` is set.

---

### SECTION 9 — Sector solutions
**PURPOSE:** Show relevance across industries without a generic template feel.

**LAYOUT:** Six flagship sector cards, fixed order below, each a hybrid card: sector photograph (3:2, top or side), one consistent Lucide line icon (same icon style/weight across all six — don't mix filled and line icons), sector name, one short business-challenge line, a line of relevant Vanora solutions, and an "Explore solutions" CTA (sentence case per the button system, brief text below shows emphasis caps). All copy below is final — use verbatim, including alt text. **Every card's information is visible by default** — challenge/solutions text is not hover-only; hover/focus only adds a subtle lift/border-glow, never reveals hidden content. Grid: 3-up desktop, 2-up tablet, 1-up mobile.

**COPY:**
- H2: `"Every industry loses revenue differently."`

1. **Financial Services** — icon: `Landmark`
   Challenge: `"Improve acquisition, collections, service delivery and customer retention."`
   Solutions: `"AI customer service, collections automation, executive intelligence and revenue operations."`
   Image: `assets/financial-services.webp` — alt: `"African financial professionals analysing business and customer performance data"`
2. **Telecommunications** — icon: `RadioTower`
   Challenge: `"Manage high-volume customer interactions, renewals and service workflows."`
   Solutions: `"Customer automation, lead qualification, retention systems and performance reporting."`
   Image: `assets/telecommunications.webp` — alt: `"African telecommunications professionals monitoring network and business operations"`
3. **Property and Real Estate** — icon: `Building2`
   Challenge: `"Convert more enquiries, improve agent follow-up and accelerate property payments."`
   Solutions: `"Lead management, sales automation, proposal generation and payment follow-up."`
   Image: `assets/property-and-real-estate.webp` — alt: `"African real estate professionals reviewing plans for a property development"`
4. **Distribution and FMCG** — icon: `Warehouse`
   Challenge: `"Improve order capture, distributor visibility, collections and territory performance."`
   Solutions: `"Sales automation, distributor management, inventory intelligence and revenue reporting."`
   Image: `assets/distribution-and-fmcg.webp` — alt: `"African supply-chain professional managing consumer-goods inventory in a warehouse"`
5. **Professional Services** — icon: `BriefcaseBusiness`
   Challenge: `"Turn expertise into a stronger and more predictable commercial pipeline."`
   Solutions: `"Lead generation, proposals, tender support, client management and renewal automation."`
   Image: `assets/professional-services.webp` — alt: `"African professional-services team discussing client and business strategy"`
6. **Technology and Digital Businesses** — icon: `Cpu`
   Challenge: `"Build repeatable acquisition, onboarding, retention and market-entry systems."`
   Solutions: `"Go-to-market strategy, pipeline automation, customer success and AI implementation."`
   Image: `assets/technology-and-digital-businesses.webp` — alt: `"African technology professionals collaborating in a modern digital workspace"`

Each card CTA: `Explore solutions` — link to the closest matching content (Section 6 challenge selector, Section 7 AI products, or Section 8 revenue engine) rather than a page that doesn't exist yet. The grid is built to cleanly accept a 7th+ card later if another sector is added — don't hardcode assumptions around exactly six.

**IMAGE TREATMENT (applies to this section and every image in the site):**
- All 6 sector photos are supplied at 1536×1024 (3:2) — keep every sector card at that ratio; don't crop to square or a different aspect.
- Preserve the original files; produce optimized derivatives only when it doesn't visibly reduce quality — this is vanilla HTML/CSS/JS, no framework image component exists, so implement manually with `<picture>` (WebP/AVIF sources, original as fallback), explicit `width`/`height` to prevent layout shift, `loading="lazy"` (except the hero image), `decoding="async"`.
- `object-fit: cover`; set `object-position` per image where a face/subject needs to stay centred at narrow crops (verify at each breakpoint below — don't let a face get cut at the jaw).
- No text baked into image files. No darkening overlays beyond what's needed for the two-state nav over the hero. No large text over faces anywhere on the page.
- Card corner radius matches the site's existing card radius (4px per `CLAUDE.md` §2.4 shape rules).
- Any colour correction is a subtle, consistent CSS filter applied site-wide (if used at all) — not per-image tweaks that make cards feel inconsistent.
- Don't create duplicate image files for the same use — one asset per role.

**RESPONSIVE CHECK (this section, and re-verify site-wide):** 1440 / 1280 / 1024 / 768 / 430 / 390 / 360px. At each: faces framed correctly, sector image heights consistent within the grid, no horizontal overflow, challenge/solutions text readable and not hover-gated, no layout shift on image load, cards easy to scan and tap on mobile (44px+ CTA targets).

**MOTION:** Cards stagger-reveal on scroll (existing pattern); hover/focus = subtle lift + border glow only, no content reveal.

---

### SECTION 10 — Why Vanora
**PURPOSE:** Drive the differentiator home.

**LAYOUT:** `--champagne` background. Five reason blocks, then a two-column comparison (existing "Typical firms vs. Vanora" visual pattern from the old build, relabelled).

**COPY:**
- H2: `"Why ambitious companies choose Vanora"`
- Reasons:
  1. **Built Around Revenue** — `"Every solution is connected to a measurable business outcome."`
  2. **AI With a Business Purpose** — `"We use AI to improve speed, productivity, customer experience and profitability."`
  3. **Strategy Plus Execution** — `"We help design, build, deploy and manage the solution."`
  4. **Solutions That Scale** — `"Our systems grow with your customers, team and objectives."`
  5. **One Connected Growth Partner** — `"Strategy, technology, talent, automation and execution under one partnership."`
- Comparison — **Traditional Consulting:** `Recommendations` · `Presentations` · `Handover` · `Limited implementation`
- Comparison — **Vanora Partners** (gold ◆ ticks): `Diagnosis` · `System design` · `Implementation` · `Team enablement` · `Continuous optimisation`

**MOTION:** Right-column ticks draw in one by one on scroll (existing pattern).

---

### SECTION 11 — How Vanora works
**PURPOSE:** Make the process concrete.

**LAYOUT:** `--ivory`. Scroll-linked progress line through 5 steps (reuse existing process-line component, extended from 4 to 5 steps).

**COPY:**
- H2: `"From business problem to working growth system"`
- `01 — DIAGNOSE` — `"Identify revenue leaks, operational bottlenecks and growth opportunities."`
- `02 — DESIGN` — `"Create the right combination of strategy, technology, automation and expertise."`
- `03 — DEPLOY` — `"Build and integrate the solution into existing operations."`
- `04 — ENABLE` — `"Train the team and establish ownership, workflows and performance standards."`
- `05 — OPTIMISE` — `"Monitor results, improve performance and scale what works."`

**MOTION:** Gold connector line fills tied to scroll position; each step's ◆ node lights gold as the line reaches it. Fully filled/static under reduced motion.

---

### SECTION 12 — Measurable outcomes
**PURPOSE:** Signal accountability without fabricating numbers.

**LAYOUT:** Dark section (`--midnight` or `--ink`) for contrast with Section 11. Card/list grid of outcome *categories* — no numbers unless the owner confirms them.

**COPY:**
- Eyebrow: `◆ RESULTS YOU CAN SEE`
- H2: `"Every engagement starts with a measurable business outcome."`
- Outcome categories (labels only, `[PLACEHOLDER]` for any number): `Qualified opportunities generated` · `Meetings booked` · `Proposal turnaround time` · `Sales conversion rate` · `Outstanding revenue recovered` · `Customer renewal rate` · `Administrative hours saved` · `Cost per acquisition` · `Revenue generated`
- Supporting line: `"No vague promises. No activity without accountability. Every engagement begins with clear objectives and measurable success indicators."`

**MOTION:** Reveal on scroll only — no count-up here since there are no real numbers yet. Add count-up once the owner supplies confirmed figures.

---

### SECTION 13 — Revenue Leakage Assessment
**PURPOSE:** Primary lead-generation moment.

**LAYOUT:** Visually distinct card, glassmorphism treatment, `--champagne` or `--ivory` background.

**COPY:**
- H2: `"How much revenue is your business losing?"`
- Body: `"Take the Vanora Revenue Leakage Assessment to identify breakdowns in lead management, sales follow-up, proposals, collections, renewals and operational workflows."`
- Benefits: `Identify major revenue-leakage points` · `Discover automation opportunities` · `Receive immediate growth recommendations` · `Get a customised revenue-system roadmap`
- CTA: `Start my revenue assessment`

**Form (frontend only — build the multi-step UI now, do not invent a submission endpoint):**
Fields: Name · Work email · Phone number · Company · Role · Company size · Primary business challenge · Current sales process · Main source of leads · Follow-up process · Outstanding invoice challenge · Desired outcome.

`[PLACEHOLDER]`: no backend/API exists yet. Wire the form to validate and show a "thanks, we'll be in touch" state on the client, clearly commented in the code (`// TODO: connect to real form handler — see CLAUDE.md Assets`) so it's obvious nothing is silently failing or fake-succeeding against a real endpoint. Do not point it at a fabricated URL.

**MOTION:** Standard reveal; multi-step transitions ~200ms, focus moves to the next step's first field for accessibility.

---

### SECTION 14 — About and leadership preview
**PURPOSE:** Establish the firm's weight, connected to execution.

**LAYOUT:** `--ivory`. Two columns: text left, image right (or alternate from Section 5's image side for rhythm).

**COPY:**
- H2: `"A growth partner built for execution."`
- Body: `"Vanora brings together commercial strategy, AI, automation, talent and practical implementation to help organisations turn ambitious objectives into working systems and measurable progress."`
- Secondary line (logo tagline, lives here per CLAUDE.md rule): `"Strategy Beyond Expectations."`
- CTA: `Meet Vanora Partners`

**IMAGE:** `assets/vanora-executive-advisory.png` (supplied — close conversation shot, bright window backdrop, dashboard screen).

No invented leadership names, titles, or bios — `[PLACEHOLDER]` if/when the owner supplies them.

**MOTION:** Standard reveal; image parallax-shifts slightly slower than text (existing pattern).

---

### SECTION 15 — Corporate training
**PURPOSE:** Show the talent-enablement side of the offer.

**LAYOUT:** Split layout, alternate background from Section 14.

**COPY:**
- H2: `"Build teams that can work, sell and lead in the AI era."`
- Body: `"Vanora equips executives, commercial teams and operational leaders with practical AI, revenue and digital capabilities they can apply immediately."`
- CTA: `Explore corporate programmes`

**IMAGE:** `assets/vanora-revenue-growth-training.png` (supplied — presenter with funnel/pie-chart dashboard, small group).

**MOTION:** Standard scroll reveal.

---

### SECTION 16 — Final CTA
**PURPOSE:** Convert. The strongest close on the page.

**LAYOUT:** Full-width `--navy-deep` band, faint gold ◆ watermark. Asymmetric split, not purely centered: text + CTAs on the left ~60%, `assets/strategic-partnership.webp` on the right ~40% at natural brightness with a thin gold 1px frame (existing hero-visual framing pattern) — this is where the supplied handshake photo lives; it's a partnership visual, not a sector photo, so it doesn't belong in Section 9's grid. Keep the photo unobstructed — no headline text crosses over it, and no glass panel darkens it beyond the frame. On mobile, stack: text first, image below at full width.

**COPY:**
- Eyebrow: `◆ YOUR NEXT GROWTH MILESTONE`
- H2 (Fraunces, large): `"Your next level of growth will require a better system."`
- Body: `"Vanora brings strategy, AI, automation, talent and execution together to help your business sell more, collect faster and scale intelligently."`
- Buttons: `Book a strategy session` (primary, gold) · `Speak with a growth partner` (secondary, gold outline)

**IMAGE:** `assets/strategic-partnership.webp` — alt: `"Business leaders establishing a strategic growth partnership"`. Same treatment rules as Section 9 (explicit width/height, lazy-load, `object-fit: cover`, no darkening beyond the frame, no text over the handshake).

**MOTION:** ◆ watermark drifts slowly; CTA has a soft gold glow on hover/focus; image has the same subtle scale-in as the hero visual (1.04→1.0) on first reveal. Static under reduced motion.

---

### SECTION 17 — Footer
**LAYOUT:** `--navy-deep`. Columns: logo + description | solution links | industry links | company links | contact.

**COPY:**
- `logo-full-white.png` + under it: `Strategy Beyond Expectations`
- Description: `"Vanora Partners is an AI-powered revenue growth and business transformation company helping organisations generate opportunities, automate operations, improve decision-making and build predictable growth systems."`
- Solution links: anchor to Section 7 AI products.
- Industry links: anchor to Section 9 sectors.
- Company links: `About` · `How We Work` · `Insights` · `Contact` · `Book a strategy session`
- Contact: reuse whatever contact info/social links exist in the current footer build — do not invent a phone number, address, or social handle that isn't already verified in the repo.
- Legal: `Privacy Policy` · `Terms` (link to existing pages if present, else `[PLACEHOLDER]`)
- Bottom bar (mono, ivory 50%): `© {current year} Vanora Partners. All rights reserved.` — compute the year dynamically, don't hardcode it.

**MOTION:** None beyond standard link hovers — footers don't need scroll reveal drama.

---

## 5. Global motion & interaction spec
Same discipline as `CLAUDE.md`: fade + 16px rise, ~600ms, cubic-bezier(0.22,1,0.36,1), IntersectionObserver (not scroll listeners), triggered once at ~15% in view, staggered 80–120ms within groups. New additions for this repositioning:
- Rotating brand seal (Section 2): continuous slow rotation, pauses on hover/focus, static under reduced motion.
- Pipeline scroll-fill (Section 8) and process-line scroll-fill (Section 11): tied to scroll position, fully filled as a static state under reduced motion.
- Challenge-selector tab/panel transitions (Section 6): ~200–250ms, no layout jump.
- Count-up stats: reserved for Section 12 once real numbers exist — do not count up placeholder/zero values.
`prefers-reduced-motion: reduce` disables all transforms/animations and shows final states — required, not optional, across every new section.

## 6. Technical build instructions
- **Stack:** vanilla HTML/CSS/JS, same as the current build (`index.html` + `styles.css` + `main.js`) — no framework migration as part of this repositioning.
- **Fonts:** unchanged — Google Fonts `<link>` with `display=swap`, preconnect.
- **Structure:** semantic HTML5, one section per block above, `id`s matching nav anchors. Update anchor IDs to match the new section list; grep for old anchors (`#approach #services #results`) before removing them so nothing silently 404s.
- **Images:** the 4 supplied images live in `assets/` (`vanora-homepage-hero.png`, `vanora-strategy-installed.png`, `vanora-executive-advisory.png`, `vanora-revenue-growth-training.png`) plus existing logo files. Every other image reference is a labelled placeholder (aspect-ratio box, mono label, thin gold border) until supplied — most notably the 6 sector-solution photos (Section 9). `loading="lazy"` + explicit width/height on everything below the fold; hero image prioritized.
- **Icons:** one consistent library, Lucide preferred if straightforward to add without a heavy dependency (inline SVG is fine too) — don't mix icon styles.
- **Accessibility:** unchanged quality floor from `CLAUDE.md` — gold focus ring, AA contrast, alt text, aria-labels on icon buttons, reduced-motion respected, plus: the solution selector (Section 6) and sector cards (Section 9) must be fully keyboard- and touch-operable with no hover-only information, 44px minimum touch targets, logical tab order.
- **Responsive:** verify at 1440 / 1280 / 1024 / 768 / 430 / 390 / 360px. Nav collapses to hamburger < 900px (unchanged).
- **Performance:** no layout shift, defer JS, lazy-load below-fold media, avoid large background images where CSS/SVG can do the job (the revenue-engine pipeline and brand seal should be CSS/SVG, not exported images).
- **SEO meta:**
  - `<title>Vanora Partners | AI-Powered Revenue Growth & Business Transformation</title>`
  - meta description: `"Vanora Partners builds AI-powered revenue, automation and business transformation systems that help ambitious companies sell more, collect faster and scale intelligently."`
  - Open Graph + Twitter/X metadata, canonical URL, Organization structured data (name, logo, same-as social links already verified in the footer — nothing fabricated), Service structured data for the Section 7 AI products described in plain terms (no unverifiable claims).

## 7. Deliverables checklist
- [ ] `CLAUDE.md` updated for repositioning — **done**.
- [ ] This brief rewritten for the 17-section structure — **done**.
- [ ] Design tokens updated (sampled navy, cobalt accent, no violet) in `styles.css`.
- [ ] Nav items + header CTA updated; two-state contrast re-verified.
- [ ] Rotating brand seal built and wired into the hero.
- [ ] All 17 sections built with the verbatim copy above, one at a time, checked in with the owner at the hero before continuing.
- [ ] Challenge-based solution selector fully accessible (keyboard, touch, no hover-only content).
- [ ] Revenue Leakage Assessment form built frontend-only, clearly marked as unconnected to a real endpoint.
- [ ] All 6 sector cards + the strategic-partnership CTA image built per Section 9/16 image-treatment spec (ratio, lazy-load, no layout shift, accessible without hover).
- [ ] Responsive at 1440/1280/1024/768/430/390/360.
- [ ] Accessibility pass (focus, contrast, alt, aria, keyboard, touch targets).
- [ ] SEO meta + structured data updated for the new positioning.
- [ ] No TechBots references, no fabricated stats/testimonials/leadership bios, no invented endpoints.

---

## 8. Assets status

**Supplied (in `/assets`):** `logo-full-navy.png`, `logo-full-white.png`, `logo-icon-vp-navy.png`, `logo-icon-vp-white.png`, `vanora-homepage-hero.png`, `vanora-strategy-installed.png`, `vanora-executive-advisory.png`, `vanora-revenue-growth-training.png`, `financial-services.webp`, `telecommunications.webp`, `property-and-real-estate.webp`, `distribution-and-fmcg.webp`, `professional-services.webp`, `technology-and-digital-businesses.webp`, `strategic-partnership.webp`. Sector photography (Section 9) and the partnership photo (Section 16) are fully supplied — no image placeholders remain.

**Still needed from the owner:**
1. Confirmed stat numbers for Measurable Outcomes (Section 12) — currently category labels only, no numbers.
2. A real backend/API endpoint for the Revenue Leakage Assessment form (Section 13) — frontend will be built and clearly marked as unconnected until this exists.
3. Leadership names/titles/bios, if a leadership preview grid (beyond the current About copy) is wanted in Section 14.
4. Confirmation of existing footer contact info and social links to carry forward unchanged (no new ones invented).
