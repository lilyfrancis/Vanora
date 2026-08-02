# Vanora Partners — Website Build Brief

**For: Claude Code**
**Goal:** Rebuild vanorapartners.com into a premium, high-converting strategy-and-execution consulting site. This document is the single source of truth. Follow it section by section. All copy below is final unless marked `[CHOOSE]`.

---

## 0. How to read this brief

- Every section has: **PURPOSE**, **LAYOUT**, **COPY** (use verbatim), **IMAGE**, **MOTION**.
- Copy inside `""` is final website copy — paste it as-is.
- `[IMAGE PLACEHOLDER: …]` means insert a placeholder div/image now; I (the owner) will supply the real asset. Build it so swapping in a real image is a one-line change.
- `[CHOOSE]` means two options are offered — implement the first one; leave the second as a commented-out alternative.
- Do not invent extra sections or filler copy. If something is missing, leave a clearly labelled placeholder.

---

## 1. Positioning & voice

**What Vanora Partners is:** a strategy *and execution* firm. Vanora doesn't sell decks; it builds the growth systems, revenue engines, and operating infrastructure and stays until they run.

**The one job of this page:** make a serious growth-stage or enterprise buyer think *"these people actually implement — they're different"* and book a strategy call.

**Primary tagline (use this):** `Strategy. Installed.`
**Secondary/support line (from logo, use in footer + about):** `Strategy Beyond Expectations`

**Voice:** confident, precise, understated luxury. Short declarative sentences. No hype words ("revolutionary," "cutting-edge," "unlock," "leverage synergies"). Say what happens in plain terms. The prestige comes from restraint, not adjectives.

**Audience:** founders, CEOs, and growth/revenue leaders at funded startups, scale-ups, SaaS/FinTech, and established firms who are tired of consultants who disappear after the presentation.

---

## 2. Design system (derive EVERY color and font from this)

### 2.1 Color tokens
Define these as CSS variables in `:root`.

```css
:root{
  --ink:        #0E1A33; /* primary navy — text on light, dark section bg */
  --midnight:   #16264A; /* slightly lifted navy for layered dark sections */
  --navy-deep:  #0A1424; /* near-black navy for footer / max contrast */
  --gold:       #C6A15A; /* brand gold — accents, rules, key words, hovers */
  --gold-soft:  #D9C08A; /* lighter gold for hover states on dark bg */
  --champagne:  #EFE7D6; /* pale gold tint — subtle section backgrounds */
  --ivory:      #FAF8F3; /* warm off-white — default page background */
  --slate:      #5B6473; /* muted body text on light backgrounds */
  --line:       #E4DECE; /* hairline dividers on light bg */
  --white:      #FFFFFF;
}
```

Rules:
- Default page background is `--ivory`, NOT pure white (warmer = more premium).
- Body text on light = `--ink` for headings, `--slate` for paragraphs.
- Gold is an *accent only* — never large gold fills. Use it for: the word that carries meaning in a headline, thin rules, the diamond divider, hover states, and small labels.
- Alternate section backgrounds: `--ivory` → dark (`--ink` / `--midnight`) → `--ivory` → `--champagne`, so the page has rhythm rather than one flat wash.

### 2.2 Typography
Load from Google Fonts.

- **Display serif — `Fraunces`** (weights 400, 500, 600; opsz enabled). Used for: hero headline, all section titles, big pull-quotes. High-contrast, elegant, matches the logo's classical serif.
- **Body sans — `Inter Tight`** (400, 500, 600). Used for: paragraphs, buttons, nav, most UI.
- **Mono utility — `IBM Plex Mono`** (400, 500, uppercase, letter-spaced). Used for: eyebrow labels, section numbers, stat labels, the "STRATEGY. INSTALLED." kicker. **This is intentional** — the mono/"engineering" type against the serif/"prestige" type visually encodes the brand duality (strategy + execution). Do not swap it for another sans.

Type scale (desktop; scale down ~30% on mobile):
- Hero H1: Fraunces, clamp(3rem, 6vw, 5.75rem), weight 500, line-height 1.02, letter-spacing -0.01em.
- Section title H2: Fraunces, clamp(2rem, 3.5vw, 3.25rem), weight 500.
- H3 / card title: Fraunces 1.5rem weight 500, OR Inter Tight 600 for smaller UI titles.
- Body: Inter Tight 1.0625rem, line-height 1.65, color `--slate`.
- Eyebrow/label: IBM Plex Mono 0.75rem, uppercase, letter-spacing 0.18em, color `--gold`.

### 2.3 The signature element
The logo has a small **gold diamond** divider (◆). Make it the brand's recurring signal:
- Use it as the bullet before every eyebrow label: `◆ STRATEGY. INSTALLED.`
- Use it as the section divider between major blocks (a thin `--line` rule with a centered gold ◆).
- On scroll into a section, animate the diamond drawing/rotating in (see Motion).

### 2.4 Spacing & shape
- Generous whitespace. Section vertical padding: clamp(5rem, 10vw, 9rem).
- Max content width: 1200px, centered, with 24px side gutters (mobile) / larger on desktop.
- Border radius: small and restrained — 4px on cards/buttons max. Luxury reads sharper, not bubbly.
- Dividers are hairlines (1px `--line`), never heavy.

### 2.5 Buttons
- **Primary CTA:** solid `--ink` background, `--ivory` text, on hover fill shifts to `--midnight` and a thin gold underline sweeps in. Label: sentence case.
- **Secondary CTA:** transparent with 1px `--ink` border, text `--ink`, hover border → gold.
- **On dark sections:** primary becomes `--gold` bg with `--ink` text; secondary becomes gold outline.
- All buttons: Inter Tight 500, 0.95rem, padding 14px 28px, 4px radius, transition 200ms.

---

## 3. Logo usage & the nav-visibility fix

**Assets needed (I will provide; build placeholders now):**
- `[IMAGE PLACEHOLDER: logo-full-navy.svg]` — full horizontal lockup (VP monogram + "VANORA PARTNERS" + tagline), navy/gold on transparent. For light backgrounds.
- `[IMAGE PLACEHOLDER: logo-full-white.svg]` — SAME lockup but wordmark reversed to ivory/white with gold monogram, for dark backgrounds and the transparent hero nav. **Flag this as a required reversed asset.**
- `[IMAGE PLACEHOLDER: logo-icon-vp.svg]` — just the VP monogram, for the mobile nav, favicon, and small placements.

**THE MENU FIX (this is the reported problem — solve it explicitly):**
The nav is currently invisible because dark text sits on a dark hero area. Fix with a **two-state sticky nav**:

1. **Over the hero (top of page, transparent state):** nav background transparent. Use `logo-full-white.svg`. Nav links in `--ivory` (white). Link hover → `--gold-soft`. CTA button = gold.
2. **On scroll (past ~80px, solid state):** nav background `--ivory` with a subtle bottom hairline (`--line`) and a soft shadow. Switch to `logo-full-navy.svg`. Nav links in `--ink`. Link hover → `--gold`. CTA button = solid `--ink`.
3. Transition between states smoothly (background + color, 250ms). Never let navy text sit on navy background.
4. **Mobile:** hamburger icon in `--ink` (solid state) / `--ivory` (over hero). Opens a full-screen `--ink` overlay menu with ivory links, gold hovers, and the `logo-icon-vp` at top.

Nav items: `Approach` · `Services` · `Results` · `About` · **CTA button: "Book a strategy call"**

---

## 4. Section-by-section build

### SECTION 1 — Hero
**PURPOSE:** In 3 seconds, land the differentiator (strategy that gets *executed*) and drive the call. This is the "wow" moment.

**LAYOUT:** Full-viewport (min-height 92vh), dark. Background `--ink` with a very subtle radial gradient toward `--midnight` behind the headline, plus a faint large ◆ or architectural line motif in the corner at ~4% opacity. Left-aligned copy on desktop (asymmetric, more editorial than centered); centered on mobile. Copy occupies left 60%; right 40% reserved for the hero visual.

**COPY:**
- Eyebrow (mono, gold): `◆ STRATEGY. INSTALLED.`
- H1 (Fraunces): `Most firms hand you a strategy.`
  then on a new line, larger emphasis with "install" in gold: `We install it.`
  `[CHOOSE alt H1]` → `Strategy that doesn't stay on the slide.`
- Subhead (Inter Tight, 1.25rem, ivory at 85%): `"Vanora Partners builds your growth strategy and stays to execute it — the systems, the revenue engine, the operating cadence. No orphaned decks. No theory. Just infrastructure that runs long after the engagement ends."`
- Primary CTA: `Book a strategy call`
- Secondary CTA (text link with gold arrow): `See how we work →`
- Below CTAs, a thin mono credibility line (ivory 60%): `Strategy and execution for firms that need results, not slideware`

**IMAGE:** `[IMAGE PLACEHOLDER: hero-visual — 4:5 portrait, right side]` — intended: a poised, premium image (boardroom / architectural detail / abstract navy-gold texture / founder in conversation). Build it as a rounded-4px framed block with a thin gold 1px inner border and the placeholder label centered. On desktop it should overlap the section edge slightly for an editorial feel.

**MOTION:**
- On load: eyebrow fades up first (0ms), H1 lines stagger up (120ms apart), subhead fades (300ms), CTAs fade (450ms). Ease: cubic-bezier(0.22,1,0.36,1).
- The word "install" gets a gold underline that draws left-to-right after the H1 settles.
- Hero visual: subtle scale-in from 1.04 → 1.0 over 900ms.
- Optional ambient: a faint ◆ slowly drifting/rotating in the background corner (respect `prefers-reduced-motion`).

---

### SECTION 2 — Trust / proof bar
**PURPOSE:** Immediate credibility right under the fold.

**LAYOUT:** Slim band, `--ivory` bg. Left: mono label `◆ TRUSTED TO DELIVER`. Right: a row of 4–6 client logo slots OR, if logos aren't ready, a row of 3 headline stats.

**COPY (stat version — use if logos not ready):**
- `4` — `business units transformed in a single engagement`
- `90 days` — `to a live revenue roadmap, not a report`
- `15+ yrs` — `operating experience behind every play`
(Numbers in Fraunces gold-adjacent large; labels in mono slate. These are placeholders — confirm real numbers.)

**IMAGE:** `[IMAGE PLACEHOLDER: client-logo-1 … client-logo-6]` — greyscale monochrome logo slots, evenly spaced, ~120px wide each.

**MOTION:** Logos/stats fade+rise on scroll into view, staggered 80ms.

---

### SECTION 3 — The tension (positioning statement)
**PURPOSE:** Name the pain that makes buyers nod. Sets up why "installed" matters.

**LAYOUT:** `--ivory`, generous margins, single centered column max-width 820px. Large editorial statement.

**COPY:**
- Eyebrow: `◆ THE PROBLEM WITH MOST CONSULTING`
- H2 (Fraunces): `"You've paid for strategy before. Then watched it sit in a folder."`
- Body: `"Beautiful decks. Smart frameworks. And six months later, nothing has actually changed — because advice and execution are two different jobs, and most firms only do the first. Vanora does both. We stay in the room until the strategy is running in your business."`

**MOTION:** Text reveal on scroll (fade+rise). The word "nothing" or the sentence's key phrase can get a subtle gold highlight-sweep.

---

### SECTION 4 — What we do (Services)
**PURPOSE:** Show the offer clearly, framed around *installation*, not advice.

**LAYOUT:** Dark section (`--ink`). Eyebrow + H2, then a 3-card grid (stack on mobile). Each card: mono index (01/02/03 — justified here, it's a real set), Fraunces title, short body, and a thin gold rule that extends on hover. Cards have `--midnight` bg, 1px subtle border, 4px radius.

**COPY:**
- Eyebrow: `◆ WHAT WE INSTALL`
- H2: `"Strategy is the start. Execution is the point."`
- Card 01 — **Growth & Revenue Strategy**
  `"We map where the revenue actually is — segments, offers, pricing, and the path to it — and turn it into a plan your team can run, not just read."`
- Card 02 — **Revenue Engine Build**
  `"We install the machine: outbound systems, CRM and automation, funnels, and the operating cadence that turns the plan into pipeline and closed deals."`
- Card 03 — **Execution & Enablement**
  `"We stay in the build. Systems configured, teams trained, dashboards live — handed over only when it runs without us."`
- Under the grid, a text link: `Explore the full engagement →`

**IMAGE:** none required; keep it typographic. Optionally `[IMAGE PLACEHOLDER: service-detail — 16:9]` if a supporting visual is wanted later.

**MOTION:** Cards stagger-reveal on scroll. On hover: card lifts 4px, gold rule under the title animates from 0 → full width, index number brightens to gold.

---

### SECTION 5 — How we work (Process)
**PURPOSE:** Make the "installed" promise concrete and reduce risk. This IS a real sequence, so numbered steps are correct here.

**LAYOUT:** `--ivory`. Vertical timeline OR 4-across step row (stack on mobile). A gold connector line runs through the steps and "fills" as you scroll (progress motif = "installing").

**COPY:**
- Eyebrow: `◆ HOW AN ENGAGEMENT RUNS`
- H2: `"A clear path from decision to done."`
- Step 01 — **Diagnose** — `"We audit where growth is leaking and where it's hiding. You get a picture of reality, fast."`
- Step 02 — **Design** — `"We build the strategy and the roadmap — sequenced, costed, and owned by named people."`
- Step 03 — **Install** — `"We stand up the systems and engines. Configured, integrated, tested, live."`
- Step 04 — **Handover** — `"Your team runs it. We document, train, and step back — leaving a machine, not a dependency."`

**MOTION:** The gold connector line fills top-to-bottom (or left-to-right) tied to scroll position — a literal "installation progress bar." Each step's ◆ node lights gold as the line reaches it. Respect reduced-motion (show fully filled).

---

### SECTION 6 — Proof / Results (case studies)
**PURPOSE:** Evidence. This is where trust is won.

**LAYOUT:** Dark (`--midnight`). Eyebrow + H2, then 2–3 case cards. Each: image, mono client/sector label, a one-line result headline (Fraunces), 2-sentence body, and a gold stat.

**COPY:**
- Eyebrow: `◆ IN PRACTICE`
- H2: `"Engagements that left something running."`
- Case 1 label: `MULTI-UNIT GROUP · TRANSFORMATION`
  Headline: `"Four business units, one revenue system."`
  Body: `"A 90-day roadmap plus live digital and revenue infrastructure across every unit — delivered, not just recommended."`
  Stat: `90-DAY roadmap, live`
- Case 2 & 3: `[PLACEHOLDER — supply real client results; keep same structure]`

**IMAGE:** `[IMAGE PLACEHOLDER: case-1-image, case-2-image, case-3-image — 3:2 each]` — framed with thin gold border, subtle zoom on hover.

**MOTION:** Cards reveal on scroll; stat numbers count up when in view.

---

### SECTION 7 — Why Vanora ("Strategy. Installed." explainer)
**PURPOSE:** Drive the differentiator home with a simple visual contrast.

**LAYOUT:** `--champagne` (pale gold) bg. Two-column contrast: left "Typical firms" (muted slate, plain), right "Vanora" (navy, confident, gold ◆ ticks). A vertical gold rule between them.

**COPY:**
- Eyebrow: `◆ THE DIFFERENCE`
- H2: `"Advice ends at the recommendation. We don't."`
- Left column "MOST FIRMS": `Deliver a deck` · `Bill by the hour` · `Hand off and leave` · `Success = report submitted`
- Right column "VANORA PARTNERS" (gold ◆ ticks): `Deliver a working system` · `Commit to outcomes` · `Stay until it runs` · `Success = it works without us`

**MOTION:** Right column ticks draw in one by one on scroll.

---

### SECTION 8 — About
**PURPOSE:** Establish the firm's weight and lineage.

**LAYOUT:** `--ivory`. Two columns: left text, right image placeholder (or founder/team).

**COPY:**
- Eyebrow: `◆ ABOUT`
- H2: `"Strategy Beyond Expectations."` (this is where the logo tagline lives)
- Body: `"Vanora Partners is a strategy and execution firm working with founders and growth leaders across Nigeria, the US, the UK, and Canada. We bring 15+ years of building revenue systems, automation, and go-to-market infrastructure to firms that need results, not slideware. Where others theorize, we build."`
- Small link: `See our approach →` (anchors to the Process section)

**IMAGE:** `[IMAGE PLACEHOLDER: about-visual — 4:5]` — team, founder, or a refined architectural/office image.

**MOTION:** Standard reveal; image parallax-shifts slightly slower than text on scroll (subtle).

---

### SECTION 9 — Testimonials
**PURPOSE:** Human proof.

**LAYOUT:** Dark (`--ink`). A single large pull-quote (Fraunces, gold quotation ◆), or a 3-slide carousel. Attribution in mono.

**COPY:** `[IMAGE/TEXT PLACEHOLDER: supply 1–3 real client quotes]`. Build with one dummy structured quote:
- Quote: `"They didn't just tell us what to do. They built it with us and it's still running."`
- Attribution: `— [NAME], [TITLE], [COMPANY]`
- `[IMAGE PLACEHOLDER: testimonial-avatar — 64px circle]`

**MOTION:** Quote fades/crossfades if carousel; gold ◆ marks active slide.

---

### SECTION 10 — Final CTA
**PURPOSE:** Convert. The strongest close on the page.

**LAYOUT:** Full-width dark band (`--navy-deep`) with a faint gold ◆ watermark. Centered.

**COPY:**
- Eyebrow: `◆ START HERE`
- H2 (Fraunces, large): `"Ready to install a strategy that actually runs?"`
- Sub: `"Book a 30-minute strategy call. We'll map your fastest path to results — no pitch, just a plan."`
- Primary CTA (gold): `Book a strategy call`
- Under it, mono: `Or email hello@vanorapartners.com`

**MOTION:** ◆ watermark drifts slowly; CTA has a soft gold glow on hover.

---

### SECTION 11 — Footer
**LAYOUT:** `--navy-deep`. Columns: logo + tagline | quick links | contact.

**COPY:**
- `logo-full-white.svg` + under it: `Strategy Beyond Expectations`
- Links: `Approach · Services · Results · About · Book a call`
- Contact: `hello@vanorapartners.com` + `[social placeholders: LinkedIn, X]`
- Bottom bar (mono, ivory 50%): `© 2026 Vanora Partners. All rights reserved.`

---

## 5. Global motion & interaction spec
- **Scroll reveals:** default is fade + 16px rise, 600ms, cubic-bezier(0.22,1,0.36,1), triggered at ~15% in view, once. Use IntersectionObserver, not scroll listeners.
- **Stagger** grouped items 80–120ms.
- **The ◆ diamond** is the connective motion motif — it draws/rotates in on section entry and marks progress in the process section.
- **Hovers:** gold underline sweeps, 4px lifts, gold border transitions — all 200ms.
- **Count-up** stats when in view.
- **`prefers-reduced-motion: reduce`** → disable all transforms/animations; show final states. This is required, not optional.
- Keep it disciplined: motion should feel *installed and deliberate*, never busy. When in doubt, remove one animation (Chanel rule).

## 6. Technical build instructions
- **Stack:** [CHOOSE] Astro (preferred — fast, static, SEO-clean) OR a single well-structured `index.html` + `styles.css` + `main.js` if keeping it simple to deploy on the current host. Do not pull in a heavy framework unless there's a reason.
- **Fonts:** Google Fonts via `<link>` with `display=swap`; preconnect.
- **Structure:** semantic HTML5 (`<nav> <header> <section> <footer>`), one section per block above, each with an `id` matching nav anchors (`#approach #services #results #about`).
- **Images:** every placeholder is a component/partial with a labelled `<div class="placeholder">` (aspect-ratio boxes, mono label centered, thin gold border). Wire real `<img>` with `loading="lazy"`, width/height, and `alt`. Swapping placeholder → real image must be trivial.
- **Accessibility (quality floor, non-negotiable):** visible keyboard focus states (gold ring), color contrast AA on all text (this is what fixes the nav problem — verify nav link contrast in BOTH states), alt text on all images, aria-labels on icon buttons, reduced-motion respected.
- **Responsive:** mobile-first; verify 360px, 768px, 1280px. Nav collapses to hamburger < 900px.
- **Performance:** no layout shift; defer JS; lazy-load below-fold images.
- **SEO meta:**
  - `<title>Vanora Partners — Strategy. Installed.</title>`
  - meta description: `Vanora Partners is the strategy and execution firm that builds your growth systems and stays until they run.`
  - Open Graph title/description/image (`[IMAGE PLACEHOLDER: og-image 1200x630]`), favicon = `logo-icon-vp`.

## 7. Deliverables checklist for Claude Code
- [ ] Two-state sticky nav with the visibility fix, tested in both states + mobile.
- [ ] All 11 sections built with the verbatim copy above.
- [ ] Design tokens (color/type/spacing) centralized in CSS variables.
- [ ] All image placeholders in place and labelled, easy to swap.
- [ ] Motion system implemented with reduced-motion fallback.
- [ ] Responsive at 360 / 768 / 1280.
- [ ] Accessibility pass (focus, contrast, alt, aria).
- [ ] SEO meta + favicon + OG.
- [ ] README noting which real assets the owner must supply (reversed white logo, hero image, case images, client logos, testimonials, real stats).

---

## 8. Assets I (owner) will provide — flagged for me
1. `logo-full-white.svg` (reversed logo for dark backgrounds) — **required for nav fix.**
2. Hero visual (4:5).
3. 3 case-study images (3:2) + real results copy.
4. Client logos (or confirm the stat-bar version).
5. 1–3 testimonials with names/titles.
6. About/team image (4:5).
7. Confirm the 3 hero stat numbers are accurate.
