# Abdul Samad — Portfolio Site: Project Blueprint
## Part D — Pages & Sections (UI, UX, States, Accessibility, Responsive)

> Every section below composes the primitives from Part C (`Card`, `Button`, `Badge`/`Pill`, `StatCounter`, `CyclingText`) and the tokens from Part B. [CLONE] marks structure/behavior read directly from real reference-repo components; [BUILD] marks the richer video-only layout layered on top. Responsive behavior is specified **inline, per section** (not a separate doc) so Part A §0.9's Workflow Gate requirement — "responsive checks happen within the same task" — has a concrete spec to check against.
>
> **One more real correction found while reading source for this part:** `src/animation/flip-words.tsx` hardcodes `style={{ color: "#208D93" }}` instead of using the `accent` token. Clone the component's animation logic exactly, but change that line to use `className="text-accent"` instead of the inline hex style — same fix pattern as Part C's navbar/contact-button correction.

---

## 1. Home Page (`/`) — Composition

`src/pages/index.tsx` **[BUILD]** — the reference repo's real `index.tsx` is a short composition of ~5 simple blocks; ours is longer (9 sections) and is written fresh, but every section it renders is itself built from cloned sub-components wherever one exists. Sections render in this fixed order, each as `<section id="...">` for scroll-spy (Part C §1.5) and anchor-link targets (⌘K "GO TO", footer links, nav):

```
<MainLayout>
  <WelcomeScreen />          [CLONE] — first-visit only
  <Hero />                   id="home"
  <About />                  id="about"
  <Experience />             id="experience"
  <SelectedWork />           id="work"
  <BuiltAndShipped />        id="built-and-shipped"
  <TechnicalStack />         id="skills"
  <AiTwinSection />          id="ai-twin"
  <Contact />                id="contact"
</MainLayout>
```

`MainLayout` ([CLONE] `src/layout/main-layout.tsx`) wraps Header, the page content, Footer, the Scroll Progress Bar, and the Cursor system — exactly the reference repo's composition root pattern.

---

## 2. Hero Section

### 2.1 Purpose
First impression — name, role, one-line pitch, proof-of-scale stats, primary CTAs, and a tactile "business card" widget. Sets the tone (dark, teal, glassy) immediately.

### 2.2 Layout — Desktop (≥1025px)
Two-column: left ~55% (name, role, pitch, stats, buttons), right ~45% (tilting business-card widget). `min-h-screen` or close to it, centered vertically.

### 2.3 Content Blocks
| Block | Spec |
|---|---|
| Status badge | Part B §6.2 pattern — "Available for new opportunities," pulsing dot |
| Name (H1) | Part B §2.2 hero scale, `font-heading font-bold` |
| Role line | "Applied AI **Engineer**" — second word via Part B §2.3 gradient-text |
| Pitch | One sentence, `text-lg text-muted-foreground`, `max-w-2xl` |
| Stat row | 4× `<StatCounter>` (Part C §10.4) — labels from `siteMetaData`/`projects.ts` aggregate counts (e.g. "Business functions served," "Production MCP servers," "KG entities," "AI surfaces evaluated" equivalents reworded for Abdul's real metrics; `TODO` placeholders per Part A §0.5 until real numbers exist) |
| Buttons | Primary pill "Read the case studies" (→ `/work`) · Secondary outline "Resume" (download) · Ghost "Talk to AI Twin" (→ opens Chat Panel via the same `open-ai-twin` event from Part C §9.2, no seed question) |
| Business card widget | `rounded-xl` card, `drop-shadow-accent` glow (dark mode), tilts on mouse-move (`rotateX`/`rotateY` via Framer Motion, small range ±6deg) — logo mark, name, email/LinkedIn/GitHub rows with icons |

### 2.4 Hero Background — Deferred [BUILD], per Part A §0.5
`hero-cube-background.tsx` is built as its own later task (Part F), not in the initial Hero task. Until then, the Hero background is the plain `bg-background` with the two decorative accent-blur blobs pattern from Part B §4.4 (`blur-3xl`, `bg-accent/15`, `rounded-full`, positioned top-right/bottom-left) — same ambient-glow technique the reference repo already uses behind `about-hero.tsx`'s card, reused here directly on the section background rather than inside a card.

### 2.5 Responsive Behavior
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1025px) | Two-column as above; stat row as 4 inline columns; buttons in a row |
| Tablet (641–1024px) | Stacks to one column, business card moves below the text block, centered, max-width ~480px; stat row stays 4 columns but tighter gap |
| Mobile (≤640px) | Single column; stat row becomes 2×2 grid; buttons stack full-width vertically; business card width 100% minus container padding; name size drops to Part B's mobile hero scale (`text-4xl`) |

### 2.6 States & Accessibility
- Stat counters: `aria-live="off"` (decorative animation, real value present in DOM text immediately for screen readers — i.e. don't animate the actual text content screen readers see; animate a visual overlay or ensure the final text is what's always in the accessibility tree).
- Business card tilt: disabled entirely under `prefers-reduced-motion`; card renders flat/static.
- All CTA buttons meet the focus-visible ring spec (Part B §5.5).
- `<h1>` is the single H1 of the page (SEO/accessibility — no other section may use `<h1>`).

---

## 3. About Section

### 3.1 Layout Pattern — [BUILD], new split layout (reference repo's real `about-hero.tsx` is a single non-split card — see Part A's provenance note)
**Desktop:** pinned-left / scroll-right split, using `position: sticky; top: <header-height + spacing>` on the left column inside a taller right column so the left card stays in view while the right column's content scrolls past it (standard sticky-sidebar CSS pattern, not a JS scroll-hijack — respects native scrolling, works with reduced motion).

| Column | Width | Content |
|---|---|---|
| Left (sticky) | ~35% | `Profile` badge (Part B §6.3-style tag), Name, role/blurb, Role field, Based/location field, "Open to new roles" line, Resume button |
| Right (scrolls) | ~65% | Wide intro paragraph card → Recognition/award card → 2-col grid of stat cards (number, label, description, "Ask about this") |

Card styling for both columns: `Card` primitive, `variant="default"` (Part C §10.1) — same glass treatment as the reference repo's real `about-hero.tsx` card (`rounded-2xl border-border bg-muted/20 shadow-lg ring-1 ring-zinc-200/50 backdrop-blur-lg dark:ring-accent/20`), just split into two instead of one.

### 3.2 Right-Column Stat Cards
Each: `Card variant="compact"`, big number (`StatCounter`-style but not necessarily animated — reuse the same component, shorter/no count-up if redundant with Hero's), label, 1–2 sentence description, `AskAboutThis` control (Part C §9) anchored to that specific fact.

### 3.3 Responsive Behavior
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1025px) | Sticky-left/scroll-right as above |
| Tablet (641–1024px) | Left column stops being sticky (becomes a normal static card at the top), right column's 2-col stat grid becomes 1-col |
| Mobile (≤640px) | Single column throughout: left-card content first, then intro, then recognition, then stat cards stacked 1-col |

### 3.4 Accessibility
Sticky positioning must not trap keyboard focus — tab order follows DOM order (left card fully, then right column), not visual position. `AskAboutThis` buttons have descriptive `aria-label` including the fact text (e.g. `aria-label="Ask the AI Twin about: 9 AI surfaces evaluated"`).

---

## 4. Experience Section

### 4.1 Core Mechanism — [CLONE], real and exact
The reference repo's `experience-showcase-list.tsx` + `experience-showcase-list-item.tsx` already implement almost this entire section for real:
- A vertical track (`motion.div` with `scaleY: scrollYProgress`, `bg-accent`, `origin-top`) that fills top-to-bottom as the user scrolls through the list — this **is** the "victory line" Abdul described.
- Per-item: an SVG double-circle node (`ShowCaseLiIcon`) — outer accent-stroked circle (r=20) + an animated circle whose `pathLength` is driven by that item's own `useScroll` progress (fills as the item scrolls into/through view) + a small solid inner accent dot (r=10). This **is** the "double circle that fills" Abdul described — real, working, exact match.
- The closing line "And a new **{FlipWords: adventure/chapter/journey}** ahead" is **already implemented exactly as Abdul described it** via the cloned `FlipWords` component (Part D header note — fix the hardcoded hex, keep everything else).

### 4.2 Layout Restructure — [BUILD]
The reference repo centers this whole thing as one column (title → timeline+cards → flip-words line, all centered, `max-w-7xl`). Abdul's video shows a **pinned-left/scroll-right split** instead (same pattern as About, §3.1): left sticky card holds the title, intro paragraph, and the "And a new [word] ahead" line; right scrolling column holds the timeline + experience item cards (the cloned mechanism from §4.1), each card showing an `EXPERIENCE` category pill + date pill at the top, title, company-in-teal, and bullets each with an `AskAboutThis` control appended (new — the cloned `experience-showcase-list-item.tsx` doesn't have per-bullet AI controls, only a single description paragraph; extend it to accept an array of bullet strings instead of one `description`, each rendering with its own `AskAboutThis`).

### 4.3 Data Shape Change
Cloned `ExperienceShowcaseListItemProps.description: string` → extended to `bullets: string[]` in `src/data/experience.ts`'s shape, since Abdul's video shows multiple bulleted achievements per role, not one paragraph. This is a deliberate, documented schema extension, not a silent change — note it in the task summary when implementing.

### 4.4 Responsive Behavior
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1025px) | Sticky-left/scroll-right; timeline track + nodes visible at full size (per §4.1's real cloned dimensions, `w-[5px]` track, `75×75` node SVG) |
| Tablet (641–1024px) | Left card un-stickies (static, top); timeline+cards column becomes full-width, cards drop from the cloned `w-[60%]` constraint to `w-full` (reference repo's own item width is `mx-auto w-[60%]` — override to `w-full` below `lg`) |
| Mobile (≤640px) | Single column; timeline track remains (it's a thin vertical line, works fine narrow) but shrinks proportionally; node SVG may scale down (`w-12 h-12` vs `75×75`) to avoid overwhelming small bullet cards |

### 4.5 Accessibility
Scroll-driven `pathLength`/`scaleY` animations are purely decorative — ensure the actual experience content (title, company, dates, bullets) is always present and readable in the DOM regardless of scroll position/animation state (it is, in the cloned component — the `motion.div` only animates a visual fill, not opacity/visibility of content). Gate the scroll-linked `motion` values behind reduced-motion by snapping `scaleY`/`pathLength` to their end state (`1`) immediately rather than animating.

---

## 5. Selected Work Section

### 5.1 Core Mechanism — [CLONE], adapted
The reference repo's `project-showcase.tsx` is almost a direct match for this section already: centered heading + "See all" link with a rotating arrow icon, responsive `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, staggered card entrance (`containerVariants`/`cardVariants`, `staggerChildren: 0.06`), hover lift (`whileHover={{ y: -6 }}`), glow blob on hover, light/dark image swap, `#tag` pills.

### 5.2 Adaptation for "Selected Work"
- Heading becomes centered, standalone (not inside a card) per Abdul's spec: "Selected **Work**" (gradient second word, Part B §2.3) + one-line description below, `text-center`, not wrapped in a `Card`.
- Grid capped to **3 cards** (reference repo shows all projects in this grid; ours shows only the 3 featured ones — `src/data/projects.ts` entries flagged `featured: true`).
- Each card adds: 2 inline metrics (e.g. "1.67 eval score," "28/28 tests") as a small stat row above the tag pills — new field on the project data shape.
- "See all" link text changes to **"View all {N} case studies →"**, pointing to `/work` instead of `/projects`, where `{N}` is `caseStudies.length` computed from `src/data/caseStudies.ts` (never hardcoded).

### 5.3 Responsive Behavior
Directly inherits the cloned grid's real responsive classes: `grid-cols-1` (mobile) → `sm:grid-cols-2` (tablet) → `lg:grid-cols-3` (desktop). "View all" link: inline next to heading on `sm:` and up (cloned `hidden ... sm:flex` pattern), moves below the grid, centered, on mobile (cloned pattern already handles this exact behavior — same `FadeUp` wrapped duplicate link at the bottom, `sm:hidden`).

### 5.4 Accessibility
Each card is a single `<Link>` wrapping the whole card (cloned pattern) — ensure the accessible name isn't just "View project" but includes the project title (`aria-label={`View case study: ${proj.title}`}` if the visual text alone is ambiguous to screen readers scanning link lists).

---

## 6. Built & Shipped Section

### 6.1 Purpose & Mechanism — [BUILD], confirmed absent from reference repo
Full-bleed "shutter" stack: one large project card fills the viewport width, and as the user scrolls, the next project's card slides up and over the previous one, which stays pinned beneath it (visible as the gray `surface-card-muted` backing panel from Part B §4.1, confirmed in the light-mode screenshot).

### 6.2 Implementation Approach
CSS `position: sticky` per card (each card is its own `sticky top-[header-height]` block inside a taller wrapper equal to `card-height × number-of-cards`), stacked in DOM order with increasing `z-index` so later cards visually cover earlier ones as they each reach the sticky offset and the page keeps scrolling underneath. This is a well-known "scroll-stacking cards" CSS pattern — no custom scroll-hijacking JS required, which keeps it smooth and accessible (native scroll behavior preserved).

### 6.3 Card Content (two-column split, per Abdul's spec)
| Side | Content |
|---|---|
| Left | Category pill (e.g. "FULL-STACK AI SAAS") + `Badge variant="live"` if deployed · Title (H3) · `AskAboutThis` · Description paragraph · `ROLE` row (mono-caps label + value) · `IMPACT` row · Stack chips (`Pill`, Part B §6.1) · Buttons: "Live Demo" (primary, if applicable) + "Source" (secondary/ghost, external GitHub link) |
| Right | Screenshot viewer: image, prev/next arrow buttons, counter ("1/8"), "Full screen" button (opens a lightbox — reuse `Corosel` utility component, [CLONE] from `src/components/utility/corosel.tsx`, extended with a fullscreen/lightbox mode if it doesn't already have one) |

### 6.4 "Also Built" Sub-section — [BUILD], simpler
Below the shutter stack (normal scroll, not sticky): centered "ALSO BUILT" mono-caps label + divider line, then a `grid-cols-1 sm:grid-cols-3` row of small `Card variant="compact"` entries (title, `AskAboutThis`, description, Source link only — no live demo, no screenshots), then a centered large pill button "Explore more repositories" linking to Abdul's GitHub profile.

### 6.5 Responsive Behavior
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1025px) | Full shutter-stack effect as described; two-column card split; screenshot viewer at full size |
| Tablet (641–1024px) | Shutter-stack effect **disabled** (sticky-stacking full-bleed cards are visually cramped and the screenshot gallery needs more width than a tablet column affords) — cards render as a normal vertical stack instead (no sticky/z-index trick), each card's two-column split collapses to stacked (text block, then screenshot viewer below it) |
| Mobile (≤640px) | Same as tablet: normal vertical card stack, single column throughout, screenshot viewer full-width |

**Note:** disabling the shutter effect below `lg` is a deliberate scope decision, not an oversight — the effect only reads well at desktop widths. Document this explicitly in the task so Antigravity doesn't try to force the sticky-stack behavior into a cramped mobile viewport.

### 6.6 Accessibility
Screenshot viewer: arrow buttons have `aria-label="Previous screenshot"`/`"Next screenshot"`, the counter text ("1/8") is in an `aria-live="polite"` region so screen readers announce the change, the lightbox/fullscreen mode traps focus and closes on `Escape`.

---

## 7. Technical Stack Section

### 7.1 Core Mechanism — [CLONE], adapted
Reference repo's `skills-showcase.tsx` is a real, working base: a single glass card, section title, grouped skill lists (`sectionName` + `SkillPill[]`), staggered `FadeRight` entrance per pill. We restructure this into the pinned-left/scroll-right pattern (same as About, §3.1) rather than one single card.

### 7.2 Layout Restructure — [BUILD]
| Column | Content |
|---|---|
| Left (sticky) | `Expertise` tag, "Technical **Stack**" title, description paragraph, `CyclingText` (cloned `FlipWords`, Part D header note) cycling through short taglines — Abdul's video shows these changing every 2s; reference repo's own `FlipWords` default duration is 3000ms, **override to 2000ms** (`duration-counter`'s sibling token `interval-cycle` from Part B §8.2) to match the video exactly |
| Right (scrolls) | One `Card variant="compact"` per skill category (reference repo's `sectionName` groups become individual cards instead of sub-sections of one big card) — icon, category title, tech count ("22 technologies"), `AskAboutThis`, description, then the `SkillPill` row (cloned component, unchanged) |

### 7.3 Responsive Behavior
Same pattern as §3.3 (About): sticky-left/scroll-right on desktop, left un-stickies on tablet, full single-column stack on mobile. `SkillPill` wrapping (`flex flex-wrap gap-4`, cloned) already handles pill reflow at any width natively — no extra work needed there.

### 7.4 Accessibility
Cycling tagline text changes must still be announced reasonably to assistive tech without being noisy — use `aria-live="off"` on the cycling element itself (purely decorative copy) while the surrounding static description paragraph carries the real informational content, so screen reader users aren't interrupted every 2 seconds by a decorative phrase change.

---

## 8. AI Twin Section

### 8.1 Layout — [BUILD], from light-mode screenshot
Single wide `Card variant="default"`, two-column internal split:
| Side | Content |
|---|---|
| Left | "Live Assistant" status pill (small, green/accent dot), "Talk to my **AI Twin**" H2 (gradient second word), description paragraph (sets expectations: *"Not a chat widget — a tool-calling agent over my actual work..."* — adapted from the real screenshot's copy to Abdul's voice), "Open AI Chat" primary button |
| Right | "SUGGESTED PROMPTS" mono-caps label, list of ~5 clickable suggestion chips (each opens Chat Panel pre-seeded with that question, same `open-ai-twin` event mechanism as `AskAboutThis`, Part C §9.2) |

### 8.2 Suggested Prompts — Content Source
Hardcoded reasonable defaults shaped around Abdul's content areas (e.g. *"What's he built end-to-end?"*, *"How does his PUBG analytics tooling work?"*, *"What's the strongest proof of his AI pipeline work?"*) stored in `src/data/caseStudies.ts` or a small dedicated `suggestedPrompts` array in `src/config/ai.ts` — not invented fresh by the LLM at render time (keeps them instant/free, no API call just to populate the list).

### 8.3 "Open AI Chat" Button Behavior
Same Chat Panel as the floating bubble (Part C §8) and the ⌘K fallback (Part C §4.4) — one shared component, opened via the same event/hook, never a separate chat implementation.

### 8.4 Responsive Behavior
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1025px) | Two-column split as above |
| Tablet (641–1024px) | Stacks: left block first, suggested prompts below as a 2-column grid of chips instead of a vertical list |
| Mobile (≤640px) | Single column; suggested prompts as a vertical list (1-col), full-width chips |

### 8.5 Accessibility
Suggested prompt chips are real `<button>` elements (not `<div onClick>`), each with the full question as its accessible name. "Open AI Chat" button's `aria-expanded` reflects Chat Panel open state.

---

## 9. Contact Section

### 9.1 Layout — [BUILD], from light-mode screenshot (reference repo's real contact is a floating-button modal, not a section — see Part A provenance note)
Centered "Get in **Touch**" heading (gradient) + subtitle, then two equal-width `Card variant="default"` side by side:

| Card | Content |
|---|---|
| "Let's Build Something" | Description paragraph, Email/LinkedIn/GitHub rows (icon + value, cloned icon-button styling from Part C §2.2 footer pattern reused here at a larger inline scale), "Download Resume" button, "Available for new opportunities" status badge (Part B §6.2, reused) |
| "Send a Message" | Form: Name, Email, Reason (dropdown — reuse the cloned `Formik`+`Yup` validation pattern from the reference repo's real contact form, `src/components/contact-form/contact-form.tsx`), Message (textarea, cloned `custom-textarea.tsx` with its real auto-resize behavior via `useAutoSizeTextarea`), "Send Message" button, small note: "Messages are sent securely to [email] with your email set as the reply-to." |

### 9.2 Backend Wiring — [CLONE], per Part A §2.4
Submits to `/api/sendmail` — the real, cloned Nodemailer pipeline. Client-side validation mirrors the server-side Yup schema (cloned) so errors surface inline before submission, not just after a failed request.

### 9.3 States
| State | Behavior |
|---|---|
| Idle | Form as described |
| Submitting | Button shows loading state (cloned `@keyframes loading` shimmer, Part B §8.3), inputs disabled |
| Success | Cloned `contact-mail-toast.tsx` success toast; form resets |
| Error (rate-limited or send failure) | Cloned error toast pattern; additionally show a `mailto:{email}` fallback link beneath the form (per Abdul's Part A §0.5 decision: "if the API fails, show mailto as manual fallback") |

### 9.4 Responsive Behavior
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1025px) | Two cards side by side, equal width |
| Tablet (641–1024px) | Two cards side by side if space allows (≥768px), else stacked — test both; default to stacked below `md` (768px) for safety |
| Mobile (≤640px) | Stacked, full width, form fields full width, Reason dropdown and Message textarea full width |

### 9.5 Accessibility
Every form field has a real `<label>` (not placeholder-only). Reason `<select>` is keyboard-operable natively. Error messages are associated via `aria-describedby`. Success/error toasts are `role="status"`/`role="alert"` respectively so they're announced.

---

## 10. Case Studies Index (`/work`)

### 10.1 Layout — [BUILD]
```
Header (shared, Part C §1)
← Home link (top-left, below header)
"Case Studies" small label + "Engineering Case Studies" H1 + subtitle
Recruiter-prompt matcher: textarea ("Describe the role or what you're hiring for...") +
  submit button + 3–4 suggested-question chips (e.g. "What proves he can debug infrastructure?")
Grouped grid, by category:
  "{CATEGORY} ({count})" mono-caps label + divider line
  grid-cols-1 sm:grid-cols-2 of case-study cards (title, excerpt, category tag, "Read case study →")
Footer (shared, Part C §2)
```

### 10.2 Recruiter-Prompt Matcher — ties to Part E
Submits the free-text role description to `/api/chat` with a specialized system instruction (the new `MatchCaseStudyToRoleTool`, Part A §2.3 / full contract in Part E) that returns a ranked subset of case studies with a one-line "why this matches" note per result — rendered as a highlighted filtered view of the grid below (not a separate results page), with a "Clear filter" control to return to the full grouped grid.

### 10.3 Responsive Behavior
Grid: `grid-cols-1` mobile → `sm:grid-cols-2` tablet/desktop (case study cards are text-dense, 2 columns is the practical max even at wide desktop — don't go to 3 columns here, unlike Selected Work's project cards). Matcher textarea: full width at all breakpoints, suggested-question chips wrap (`flex flex-wrap`).

### 10.4 Accessibility
Matcher results update announced via `aria-live="polite"` region. Category group headings are real `<h2>`s (one `<h1>` for the page title only).

---

## 11. Case Study Detail (`/work/[slug]`)

### 11.1 Layout — [BUILD]
← Back to Case Studies link, title, category tag, a structured body (problem → approach → outcome, or whatever shape `src/data/caseStudies.ts` defines per entry — specified fully in Part E's data contract), relevant metrics as `StatCounter`-style blocks, related project link (if the case study maps to a Built & Shipped entry), `AskAboutThis` controls throughout.

### 11.2 Static Generation
`getStaticPaths` enumerates all slugs from `src/data/caseStudies.ts`; `getStaticProps` passes the matched entry as props. 404s (via `notFound: true`) for unknown slugs, rendering the shared 404 page (§12).

### 11.3 Responsive Behavior
Single-column article layout at all breakpoints — `max-w-3xl` reading width on desktop (narrower than the site's usual `max-w-7xl`, since this is dense reading content), full-width minus container padding on mobile/tablet.

---

## 12. 404 Page

**Mode:** [CLONE], restyled. The reference repo's real `src/pages/404.tsx` exists and works — reuse its structure (centered message, link back home), restyle to match the current design system (Card/Button primitives, gradient heading) rather than rebuilding from scratch.

---

## Part D — End

**Covers:** Full UI/UX, layout, content blocks, responsive behavior (desktop/tablet/mobile, explicit per section), states, and accessibility notes for all 9 Home sections, the Case Studies index + detail pages, and 404 — each tagged [CLONE]/[BUILD] with exact source files named where real code is reused (Experience's scroll-driven timeline nodes and About/Skills' card patterns are the biggest real wins — confirmed working mechanisms, not guesses).

**Flagged correction:** `flip-words.tsx`'s hardcoded `color: "#208D93"` inline style → `className="text-accent"`.

**Flagged schema extension:** `ExperienceShowcaseListItemProps.description: string` → `bullets: string[]`, to support per-bullet "Ask about this" controls as shown in Abdul's video.

**Not yet covered:** AI Twin full system prompt content + new tools (`GetCaseStudiesTool`, `MatchCaseStudyToRoleTool`) + complete `/api/chat` and `/api/sendmail` contracts + `src/data/*` full field-level schemas (Part E); numbered implementation task plan with Definition of Done + pre-deploy checklist (Part F).

Reply **"next"** for Part E (AI Twin & Backend), or flag corrections to Part D first.
