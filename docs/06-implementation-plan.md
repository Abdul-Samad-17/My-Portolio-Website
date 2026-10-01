# Abdul Samad — Portfolio Site: Project Blueprint
## Part F — Implementation Plan (Numbered Tasks, Definition of Done, Pre-Deploy Checklist)

> This part sequences everything in Parts A–E into executable work. Numbering is hierarchical: **Phase (1) → Parent task (1.1) → Step (1.1.1)**. Every leaf step (1.1.1, 1.1.2…) is small enough to implement and verify in one sitting. **The Workflow Gate below applies at the Parent task level (1.1, 1.2…), not per-step** — per Abdul's explicit instruction, Antigravity implements all of a parent task's steps, runs the responsive checks, then stops for approval before moving to the next parent task or committing.

---

## 0. The Workflow Gate (restated from Part A §0.9 — binding for every parent task below)

For **every** parent task (1.1, 1.2, 2.1, …):
1. Implement all of its numbered steps.
2. Self-test at mobile (≤640px), tablet (641–1024px), desktop (≥1025px) — responsive checks happen as part of this task, not deferred.
3. Summarize what was built/changed, which files touched, confirm the task's Acceptance Criteria pass, and state its mode: **[CLONE]** (name the source file(s) adapted) or **[BUILD]**.
4. **Stop. Ask Abdul to approve.** Do not continue to the next parent task.
5. Only after approval: commit (conventional-commit message) and push to the connected repo.
6. Never push without approval. Never batch multiple parent tasks into one commit.

Every task below also inherits the full **Definition of Done** template from Part A §0.8 (tokens-only styling, reduced-motion respected, no console errors, clean TypeScript, keyboard/WCAG AA) — restated in full in §13 of this document as the final reference copy.

---

## PHASE 1 — Project Setup & Foundation

### 1.1 Scaffold the Next.js project
- **Goal:** A running Next.js 15.0.5 / React 18.2.0 / TypeScript 5.1.3 project with Pages Router, matching the reference repo's real config.
- **Files:** `package.json`, `next.config.js`, `tsconfig.json`, `.gitignore`, `src/pages/_app.tsx` (bare), `src/pages/index.tsx` (bare)
- **Steps:**
  - 1.1.1 `create-next-app` or manual scaffold with Pages Router, TypeScript, pinned versions from Part A §1.
  - 1.1.2 Clone `next.config.js` from the reference repo (confirm its real content during implementation — `eslint.ignoreDuringBuilds` noted in Part A, keep lint enforced separately in CI per that note).
  - 1.1.3 Set up `tsconfig.json` matching reference repo paths/aliases (`@/*` → `src/*`).
- **Responsive:** N/A (no UI yet).
- **Acceptance Criteria:** `npm run dev` serves a blank page with no errors; TypeScript compiles.
- **Dependencies:** None.
- **Mode:** [CLONE]

### 1.2 Install and pin all dependencies
- **Goal:** Every package from Part A §1's table installed at its pinned version.
- **Files:** `package.json`, `package-lock.json`
- **Steps:** 1.2.1 Install core (Next/React/TS/Tailwind) → 1.2.2 Install styling/animation (Framer Motion, next-themes, lucide-react) → 1.2.3 Install backend (nodemailer, yup, formik, axios, lru-cache, nanoid) → 1.2.4 Install AI/chat (react-markdown, remark-gfm) → 1.2.5 Install misc ( @tsparticles/*, sharp, @headlessui/react, cmdk, next-seo) → 1.2.6 Install dev tooling (ESLint, Prettier, Jest, RTL).
- **Acceptance Criteria:** `npm install` completes clean; no peer-dependency errors; versions match Part A §1 table exactly.
- **Dependencies:** 1.1
- **Mode:** [CLONE]

### 1.3 Add attribution & licensing
- **Goal:** MIT attribution in place per Part A's provenance note.
- **Files:** `THIRD_PARTY_NOTICES.md`, `README.md` (credit line)
- **Steps:** 1.3.1 Write `THIRD_PARTY_NOTICES.md` reproducing the reference repo's MIT license text + a short note crediting `github.com/Nikunj2003/My-Next-Js-Portfolio` as the structural/logic basis.
- **Acceptance Criteria:** File exists, license text is accurate, README links to it.
- **Dependencies:** 1.1
- **Mode:** [BUILD]

### 1.4 Design tokens: Tailwind + globals.css
- **Goal:** Full Part B color/spacing/radius/shadow token system live.
- **Files:** `tailwind.config.js`, `src/styles/globals.css`
- **Steps:** 1.4.1 Write `tailwind.config.js` per Part B §1.3/§2.1/§3.3 (colors, fonts, screens, dropShadow) → 1.4.2 Write `globals.css` `:root`/`.dark` blocks per Part B §1.1 (all real + [BUILD] tokens) → 1.4.3 Add the reduced-motion `@media` block (Part B §8.1) → 1.4.4 Add cursor CSS rules (Part B §9.1, asset paths only — images come in 2.1).
- **Responsive:** N/A (tokens only).
- **Acceptance Criteria:** Toggling a `.dark` class on `<html>` visibly swaps all token-driven colors; no raw hex anywhere in these two files except inside the HSL variable definitions themselves.
- **Dependencies:** 1.1
- **Mode:** [CLONE] base + [BUILD] additions

### 1.5 Fonts
- **Goal:** Inter + Sora loaded via `next/font/google`, zero layout shift.
- **Files:** `src/pages/_app.tsx`
- **Steps:** 1.5.1 Import and configure both fonts (Part B §2.1) → 1.5.2 Apply `--font-body`/`--font-heading` CSS variables → 1.5.3 Extend `tailwind.config.js`'s `fontFamily`.
- **Acceptance Criteria:** Headings render in Sora, body in Inter, confirmed via DevTools computed styles; no FOUT/FOIT flash.
- **Dependencies:** 1.1, 1.4
- **Mode:** [BUILD] (intentional departure from reference's system-font default, per Abdul's decision)

### 1.6 Environment variables
- **Goal:** `.env.example` complete and accurate; local dev can run with placeholder/test values.
- **Files:** `.env.example`, `.env.local` (gitignored, not committed)
- **Steps:** 1.6.1 Write `.env.example` per Part A §4 → 1.6.2 Document in `README.md` how to obtain each key (Groq console, Gmail App Password, etc.).
- **Acceptance Criteria:** A fresh clone + `cp .env.example .env.local` + real values results in a working dev server once later phases wire these in.
- **Dependencies:** 1.1
- **Mode:** [CLONE]

---

## PHASE 2 — Core Layout & Global Components

### 2.1 Cursor system
- **Goal:** Theme-aware custom pointer images + two-color fluid trail, SSR-safe.
- **Files:** `src/components/fluid-cursor.tsx`, `cursor-trail-canvas.tsx`, `src/hooks/useFluidCursor.tsx`, `src/utility/cursor-trail.ts`, cursor PNG assets in `/public`
- **Steps:** 2.1.1 Clone all four files verbatim → 2.1.2 Add cursor PNG assets to `/public` → 2.1.3 Extend `cursor-trail.ts` to resolve **two** CSS-variable colors (`--accent`, `--cursor-trail-secondary`) instead of one (Part C §6.3 — the one real functional change, not just a restyle) → 2.1.4 Mount via `dynamic(..., { ssr: false })` in `_app.tsx` → 2.1.5 Gate entire mount behind `useReducedMotion()`.
- **Responsive:** Trail effect disabled on touch-primary devices (no hover/mouse-move signal) — detect via `window.matchMedia("(hover: hover)")`, don't attempt on mobile/tablet touch.
- **Acceptance Criteria:** Cursor shows two-color trail in both themes on desktop with a mouse; falls back to default cursor under reduced-motion or touch-only; no SSR hydration errors.
- **Dependencies:** 1.4
- **Mode:** [CLONE] mechanism + [BUILD] second color

### 2.2 Page transition & animation gate
- **Goal:** Radial reveal transition between `/`, `/work`, `/work/[slug]`.
- **Files:** `src/components/page-transition-animation.tsx`, `src/contexts/animation-gate.tsx`
- **Steps:** 2.2.1 Clone both files → 2.2.2 Wire `AnimationGateProvider` into `_app.tsx` → 2.2.3 Confirm `whileInView` animations elsewhere wait for the gate.
- **Acceptance Criteria:** Navigating `/` → `/work` shows the clip-path reveal; reduced-motion skips it cleanly (no flash/jump).
- **Dependencies:** 1.1
- **Mode:** [CLONE]

### 2.3 Welcome overlay
- **Goal:** First-visit particle intro, dismissible, shown once.
- **Files:** `src/components/welcome-screen.tsx`
- **Steps:** 2.3.1 Clone component + `@tsparticles` config → 2.3.2 Replace taglines with Abdul's own → 2.3.3 Confirm `localStorage` "seen" persistence.
- **Responsive:** Particle density/count reduced on mobile for performance (test actual frame rate, not just visual).
- **Acceptance Criteria:** Shows once per browser, dismissible by scroll/tap/click, never reappears after dismissal until storage cleared.
- **Dependencies:** 1.4, 1.5
- **Mode:** [CLONE] mechanism + [BUILD] copy

### 2.4 Header / Navbar
- **Goal:** Full Part C §1 spec — logo, nav, ⌘K trigger, theme toggle, resume button, mobile menu.
- **Files:** `src/layout/navbar.tsx`, `src/components/utility/menu-button.tsx`, `mobile-menu.tsx`
- **Steps:** 2.4.1 Clone `navbar.tsx` base structure → 2.4.2 Replace hardcoded `bg-[#56A5A9]` with `bg-accent` (flagged correction, Part C intro) → 2.4.3 Add logo/wordmark (Part C §1.3) → 2.4.4 Add ⌘K trigger chip (Part C §1.4, palette itself built in 2.8) → 2.4.5 Clone `MenuLogo`/`MobileMenu` → 2.4.6 Implement scroll-spy active-state (Part C §1.5) via `IntersectionObserver`.
- **Responsive:** Desktop: full glass pill nav. Tablet/mobile: hamburger + `MobileMenu`, test both open/close states and all nav items reachable.
- **Acceptance Criteria:** All 6 nav items + ⌘K chip + theme toggle + Resume button present and keyboard-navigable; active section highlights correctly while scrolling; mobile menu opens/closes cleanly.
- **Dependencies:** 1.4, 1.5, 2.1
- **Mode:** [CLONE] base + [BUILD] additions

### 2.5 Footer
- **Goal:** Full Part C §2 spec.
- **Files:** `src/layout/footer.tsx`
- **Steps:** 2.5.1 Build single-bar layout (video-matched) using cloned icon-button/link-hover classes → 2.5.2 Wire content from `siteMetaData.mjs`/`navigationRoutes.ts` (stubbed now, real data in Phase 6) → 2.5.3 Add "Open to [roles]" line + Download Resume button.
- **Responsive:** Desktop: single row. Mobile: stacks (logo+name, then links wrap, then roles+button, then bottom bar) — test wrap behavior doesn't break mid-word.
- **Acceptance Criteria:** All footer links functional (even if pointing at placeholder content), social icons present with correct hover states.
- **Dependencies:** 1.4
- **Mode:** [BUILD] layout + [CLONE] styling conventions

### 2.6 Theme toggle
- **Goal:** Working light/dark switch, no hydration mismatch.
- **Files:** `src/components/utility/theme-switch.tsx`
- **Steps:** 2.6.1 Clone verbatim → 2.6.2 Wire `next-themes` `ThemeProvider` in `_app.tsx` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`).
- **Acceptance Criteria:** Toggle flips theme instantly, persists on reload, matches system preference by default, no flash-of-wrong-theme.
- **Dependencies:** 1.4
- **Mode:** [CLONE]

### 2.7 Scroll progress bar
- **Goal:** Thin teal bar tracking scroll position, fixed above header.
- **Files:** `src/components/layout/scroll-progress-bar.tsx` (new)
- **Steps:** 2.7.1 Build `requestAnimationFrame`-throttled scroll listener → 2.7.2 Render fixed bar at `z-[60]`.
- **Responsive:** Same behavior at all breakpoints — purely a function of scroll %, no layout dependency.
- **Acceptance Criteria:** Bar width tracks scroll accurately 0–100%; no jank on scroll (profile in DevTools); respects reduced-motion (instant width updates, no smoothing transition, if that transition itself would count as motion — keep the 150ms width transition, it's a state change not decorative motion, but verify against Part A's DoD reduced-motion checkbox during review).
- **Dependencies:** 2.4
- **Mode:** [BUILD]

### 2.8 Command Palette (⌘K)
- **Goal:** Full Part C §4 spec — search, grouped results, keyboard nav, AI Twin fallback.
- **Files:** `src/components/command-palette/command-palette.tsx`
- **Steps:** 2.8.1 Install/configure `cmdk` dialog shell → 2.8.2 Build CASE STUDIES / PROJECTS / GO TO / LINKS groups (stub data now, real in Phase 6/8) → 2.8.3 Style selected/unselected rows per Part C §4.3 → 2.8.4 Wire global `Cmd/Ctrl+K` keydown → 2.8.5 Build "type to ask the twin" empty-state row (full wiring to `/api/chat` happens in Phase 5, stub the UI now).
- **Responsive:** Palette panel `max-w-2xl` centered on desktop; near-full-width with margin on mobile; footer hint bar may need to wrap/shrink text on narrow screens — verify no overflow.
- **Acceptance Criteria:** Opens via chip click and keyboard shortcut; arrow keys navigate; Enter selects; Escape closes; all four groups render with correct icons/badges.
- **Dependencies:** 2.4, 1.4
- **Mode:** [BUILD]

### 2.9 Compose MainLayout
- **Goal:** Single composition root wiring Header, Footer, cursor, transitions, welcome overlay, scroll bar, palette.
- **Files:** `src/layout/main-layout.tsx`, `src/pages/_app.tsx`, `src/pages/_document.tsx`
- **Steps:** 2.9.1 Clone `_document.tsx` → 2.9.2 Build `main-layout.tsx` wrapping all Phase 2 pieces → 2.9.3 Wire `_app.tsx`: `ThemeProvider` → `AnimationGateProvider` → fonts → `MainLayout` → page content → analytics.
- **Responsive:** Full-page smoke test at all 3 breakpoints — nothing from Phase 2 should overlap/clip at any width.
- **Acceptance Criteria:** A blank page wrapped in `MainLayout` shows header, footer, cursor, and no console errors, in both themes, at all breakpoints.
- **Dependencies:** 2.1–2.8
- **Mode:** [CLONE] composition pattern

---

## PHASE 3 — Shared UI Primitives

### 3.1 Card, Button, Badge/Pill primitives
- **Goal:** Part C §10.1–10.3 componentized.
- **Files:** `src/components/ui/Card.tsx`, `Button.tsx`, `Badge.tsx`, `Pill.tsx`
- **Steps:** 3.1.1 Build `Card` with `default`/`compact`/`recessed` variants → 3.1.2 Build `Button` with `primary`/`secondary`/`ghost` variants + focus-visible ring baked in → 3.1.3 Build `Badge`/`Pill` variants (status, category, live, tech-tag).
- **Responsive:** Variants must not hardcode fixed widths that break on mobile — verify with long content (long project names, long tag text) at 320px width.
- **Acceptance Criteria:** Each variant visually matches its Part B spec in both themes; Storybook-style manual check (or a temporary `/dev/ui-kit` test page) covers every variant combination.
- **Dependencies:** 1.4
- **Mode:** [CLONE pattern → component]

### 3.2 StatCounter, CyclingText
- **Goal:** Part C §10.4–10.5.
- **Files:** `src/components/ui/StatCounter.tsx`, `src/animation/flip-words.tsx` (cloned + fixed)
- **Steps:** 3.2.1 Clone `flip-words.tsx`, fix `color: "#208D93"` → `className="text-accent"` (flagged correction, Part D) → 3.2.2 Build `StatCounter` with `useMotionValue`/`animate()`, `whileInView` trigger, reduced-motion instant-value fallback.
- **Acceptance Criteria:** `StatCounter` counts up once per mount when scrolled into view, doesn't re-trigger on every scroll; `CyclingText`(=`FlipWords`) cycles words with letter-stagger animation, reduced-motion does instant word swap not full disable.
- **Dependencies:** 1.4, 1.5
- **Mode:** [CLONE] (FlipWords) + [BUILD] (StatCounter)

---

## PHASE 4 — AI Twin Backend

### 4.1 Core tool infrastructure
- **Goal:** Tool type system + registry, cloned verbatim.
- **Files:** `src/types/tools.ts`, `src/lib/tools/base-tool.ts`, `tool-registry.ts`, `context-aware-tool-registry.ts`, `tool-execution-middleware.ts`, `tool-context.ts`, `context-utils.ts`, `page-context-detector.ts`, `contextual-tool-suggestions.ts`, `initialize-tools.ts`, `index.ts`
- **Steps:** 4.1.1–4.1.10, one per file above: clone verbatim, update only internal import paths/section-id references to match Abdul's section ids (`home, about, experience, work, built-and-shipped, skills, ai-twin, contact` from Part D).
- **Acceptance Criteria:** `initializeAllTools()` runs with zero registered tools (none ported yet) without throwing.
- **Dependencies:** 1.1, 1.2
- **Mode:** [CLONE]

### 4.2 Port existing tool categories
- **Goal:** Navigation, UI-control, and data-access tools, content adapted to Abdul.
- **Files:** `src/lib/tools/navigation-tools.ts`, `ui-control-tools.ts`, `data-access-tools.ts`, `validate-data-tools.ts`
- **Steps:** 4.2.1 Clone `navigation-tools.ts`, update target section ids → 4.2.2 Clone `ui-control-tools.ts` (`manage_ui_state`), keep canonical actions exactly (`scroll|focus|highlight|show|hide`) → 4.2.3 Clone `data-access-tools.ts`, update `GetProjectsTool`'s category `enum` to Abdul's real categories, repoint imports to `src/data/projects.ts`/`experience.ts`/`skills.ts` (content still placeholder until Phase 6, schema must match) → 4.2.4 Clone `validate-data-tools.ts`.
- **Acceptance Criteria:** All tools register successfully; `get_projects` tool callable in isolation (unit test) returns placeholder data in the expected shape.
- **Dependencies:** 4.1
- **Mode:** [CLONE]

### 4.3 New tools — case studies
- **Goal:** `get_case_studies` and `match_case_study_to_role`, per Part E §4.4–4.5.
- **Files:** `src/lib/tools/data-access-tools.ts` (extended) or a new `case-study-tools.ts`
- **Steps:** 4.3.1 Build `GetCaseStudiesTool` class → 4.3.2 Build `MatchCaseStudyToRoleTool` class → 4.3.3 Register both in `initialize-tools.ts`, scoped to `currentPage === "work"` via the context-aware filtering already present.
- **Acceptance Criteria:** Both tools callable in isolation, return correctly shaped `ToolResult`s against placeholder `caseStudies.ts` data (Phase 6).
- **Dependencies:** 4.1, 4.2
- **Mode:** [BUILD]

### 4.4 Rate limiter
- **Goal:** Working LRU-based rate limiter, identical to reference.
- **Files:** `src/utility/rate-limiter.ts`
- **Steps:** 4.4.1 Clone verbatim.
- **Acceptance Criteria:** Unit test: Nth+1 request within the window returns rate-limited; cookie fallback works when IP/UA are stripped (simulate in test).
- **Dependencies:** 1.2
- **Mode:** [CLONE]

### 4.5 AI config — system prompt, suggestions, fallbacks
- **Goal:** `src/config/ai.ts` fully written for Abdul, per Part E §2.
- **Files:** `src/config/ai.ts`
- **Steps:** 4.5.1 Write `GUARDRAILS & BEHAVIOR` block (clone structure) → 4.5.2 Write `KNOWLEDGE BASE ABOUT ABDUL SAMAD` from `src/data/*` placeholder content (Phase 6 must land first, or stub inline here and sync later — flag if done out of order) → 4.5.3 Write `RESPONSE GUIDELINES` (clone structure, Abdul's redirect line) → 4.5.4 Write `TOOL USAGE RULES` (clone `manage_ui_state` guardrail verbatim + extend for the two new tools) → 4.5.5 Write `SUGGESTION_SYSTEM_PROMPT` with the 7-category list (6 cloned + `esports_analytics`) → 4.5.6 Set `AI_MODEL = "llama-3.3-70b-versatile"`.
- **Acceptance Criteria:** Prompt text reviewed by Abdul for accuracy before wiring into the live route (content correctness matters here more than code — flag for extra scrutiny in the approval step).
- **Dependencies:** Phase 6 (content) ideally, but may stub-and-revisit
- **Mode:** [CLONE] structure + [BUILD] content

### 4.6 `/api/chat` route
- **Goal:** Full Part E §1 contract, pointed at Groq.
- **Files:** `src/pages/api/chat.ts`
- **Steps:** 4.6.1 Clone the full 575-line route verbatim → 4.6.2 Confirm `LLM_BASE_URL`/`LLM_API_KEY` env wiring resolves to Groq with zero other code changes (per Part E §1.4's finding) → 4.6.3 Verify the suggestion-generator's fallback category map includes `esports_analytics`.
- **Acceptance Criteria:** `POST /api/chat` with a simple message returns a `200` with a real Groq-generated response; a tool-triggering message (e.g. "scroll to skills") returns a `toolCalls` array and a natural follow-up response; hitting the 40/min limit returns `429`; killing `LLM_API_KEY` temporarily triggers the keyword-fallback path correctly.
- **Dependencies:** 4.1–4.5
- **Mode:** [CLONE]

### 4.7 Contact form validation + mail utility
- **Goal:** Yup schema + Nodemailer wrapper, cloned.
- **Files:** `src/components/contact-form/contact-form.tsx` (schema only, for now), `src/utility/sendMail.ts`, `src/utility/verifyEmail.ts`
- **Steps:** 4.7.1 Clone `mailValidationSchema` (Yup) → 4.7.2 Clone `sendMail.ts` → 4.7.3 Clone `verifyEmail.ts`.
- **Acceptance Criteria:** `sendMail()` callable in isolation sends a real test email via Abdul's Gmail App Password credentials.
- **Dependencies:** 1.2, 1.6
- **Mode:** [CLONE]

### 4.8 `/api/sendmail` route
- **Goal:** Full Part E §6 contract.
- **Files:** `src/pages/api/sendmail.ts`
- **Steps:** 4.8.1 Clone verbatim.
- **Acceptance Criteria:** Valid payload → `200` + real email received at `NODEMAILER_USER`; invalid payload → `422` with field errors; 6th request in an hour → `429`.
- **Dependencies:** 4.4, 4.7
- **Mode:** [CLONE]

---

## PHASE 5 — AI Twin Frontend

### 5.1 Chat components
- **Goal:** Full chat UI, cloned.
- **Files:** `src/components/chat/*` (all files per Part C §8.1)
- **Steps:** 5.1.1–5.1.7, one per file: clone verbatim, restyle only where it references hardcoded colors instead of tokens (audit during implementation, same correction pattern as Phase 2).
- **Responsive:** Chat panel: full-screen takeover on mobile, floating panel (fixed size, bottom-right anchored) on tablet/desktop — verify the cloned component already handles this or extend it to.
- **Acceptance Criteria:** Floating bubble opens the panel; messages send/receive via `/api/chat`; markdown renders correctly (headings, lists, code, blockquotes); tool-execution chips appear inline when a tool fires; loading shimmer shows while awaiting response.
- **Dependencies:** 4.6, 1.4
- **Mode:** [CLONE]

### 5.2 Ask About This
- **Goal:** Part C §9 spec.
- **Files:** `src/components/ai-twin/ask-about-this.tsx` (new)
- **Steps:** 5.2.1 Build component dispatching `open-ai-twin` CustomEvent → 5.2.2 Wire Chat Panel to listen for it, pre-fill + auto-submit.
- **Acceptance Criteria:** Clicking any "Ask about this" opens the panel with that exact fact as the first message, already sent, response streams in.
- **Dependencies:** 5.1
- **Mode:** [BUILD]

### 5.3 ⌘K → AI Twin wiring
- **Goal:** Complete the stub from 2.8.5.
- **Files:** `src/components/command-palette/command-palette.tsx`
- **Steps:** 5.3.1 Wire the "ask the twin" empty-state row to the same `open-ai-twin` event/hook.
- **Acceptance Criteria:** Typing an unmatched query in ⌘K and selecting "Ask the AI Twin" closes the palette and opens Chat Panel with that query auto-submitted.
- **Dependencies:** 5.1, 5.2, 2.8
- **Mode:** [BUILD]

---

## PHASE 6 — Content Data Files

### 6.1 Site metadata & navigation
- **Files:** `src/data/siteMetaData.mjs`, `src/data/navigationRoutes.ts`
- **Steps:** 6.1.1 Clone shape, fill real values (GitHub known; email/LinkedIn per Part A §0.5's gaps table) → 6.1.2 Build nav routes list matching Part D's section ids.
- **Acceptance Criteria:** Footer/header/⌘K all pull from these files with zero hardcoded duplicate values anywhere else.
- **Dependencies:** 2.4, 2.5
- **Mode:** [CLONE]

### 6.2 Experience, Projects, Skills, Case Studies, Resume
- **Files:** `src/data/experience.ts`, `projects.ts`, `skills.ts`, `caseStudies.ts`, `resume.ts`, `/public/resume.pdf`
- **Steps:** 6.2.1 Write `experience.ts` per Part E §7.1 shape, 1 placeholder entry → 6.2.2 Write `projects.ts` per §7.2, 3–4 placeholder entries (mark `featured`/`hasLiveDemo` appropriately for Selected Work vs Built & Shipped vs Also Built routing) → 6.2.3 Write `caseStudies.ts` per §7.3, 3 placeholder entries → 6.2.4 Write `skills.ts` per §7.4, grouped categories → 6.2.5 Add placeholder `resume.pdf` + disabled-state wiring.
- **Acceptance Criteria:** All placeholder content clearly marked/generic (per Part A §0.5's `TODO` rule — never silently real-looking); every field the later section tasks (Phase 7) need is present and typed correctly.
- **Dependencies:** None (can run parallel to Phase 4/5)
- **Mode:** [BUILD] content, [CLONE]/[BUILD] schema per Part E §7

---

## PHASE 7 — Home Page Sections

Each of the following is its own parent task with the full Workflow Gate (implement → responsive check at all 3 breakpoints → summarize → approve → commit). Full specs in Part D §2–§9; this phase just sequences them.

### 7.1 Hero section
Content blocks, stat counters, business card widget, CTA buttons, placeholder ambient-blob background (cube deferred to Phase 11). **Mode:** [BUILD]. **Dependencies:** 3.1, 3.2, 6.1, 6.2.

### 7.2 About section
Pinned-left/scroll-right split, stat card grid with Ask About This. **Mode:** [BUILD] layout + [CLONE] card styling. **Dependencies:** 3.1, 5.2, 6.2.

### 7.3 Experience section
Clone the real timeline/node mechanism (`experience-showcase-list.tsx`/`-item.tsx`), extend to `bullets[]` + per-bullet Ask About This, restructure into pinned-left/scroll-right. **Mode:** [CLONE] mechanism + [BUILD] layout. **Dependencies:** 3.1, 3.2, 5.2, 6.2.

### 7.4 Selected Work section
Clone `project-showcase.tsx` grid, cap to 3 featured, add metrics row, repoint "See all" to `/work`. **Mode:** [CLONE] + [BUILD] adaptation. **Dependencies:** 3.1, 6.2, 8.1 (needs `/work` to exist for the link — may stub link target until Phase 8 lands).

### 7.5 Built & Shipped section
Sticky-stack shutter cards (desktop only, normal stack on tablet/mobile per Part D §6.5), screenshot viewer/lightbox, Also Built sub-grid. **Mode:** [BUILD]. **Dependencies:** 3.1, 5.2, 6.2.

### 7.6 Technical Stack section
Clone `skills-showcase.tsx` base, restructure into pinned-left/scroll-right, `CyclingText` tagline at 2000ms interval. **Mode:** [CLONE] + [BUILD] layout. **Dependencies:** 3.1, 3.2, 5.2, 6.2.

### 7.7 AI Twin section
Two-column card, suggested prompts wired to `open-ai-twin` event. **Mode:** [BUILD]. **Dependencies:** 3.1, 5.1, 5.2.

### 7.8 Contact section
Two-card layout, cloned form validation/submission, mailto fallback on error. **Mode:** [BUILD] layout + [CLONE] backend wiring. **Dependencies:** 3.1, 4.7, 4.8.

### 7.9 Compose Home page
Wire all 8 sections into `src/pages/index.tsx` in order, confirm scroll-spy nav (2.4.6) correctly tracks all section ids end-to-end.
- **Acceptance Criteria:** Full page scroll from Hero to Contact with no layout gaps/overlaps at any breakpoint; nav highlights update correctly throughout; Lighthouse pass on this page specifically (preliminary check — full audit in Phase 13).
- **Dependencies:** 7.1–7.8
- **Mode:** [BUILD]

---

## PHASE 8 — Case Studies Pages

### 8.1 `/work` index
Header reuse, back-to-home link, recruiter-prompt matcher UI (wired to `match_case_study_to_role` tool via `/api/chat`), grouped category grid. **Mode:** [BUILD]. **Dependencies:** 4.3, 4.6, 6.2.

### 8.2 `/work/[slug]` detail
Static generation from `caseStudies.ts`, problem/approach/outcome body, metrics, related project link, Ask About This throughout. **Mode:** [BUILD]. **Dependencies:** 8.1, 5.2.

---

## PHASE 9 — 404 & SEO

### 9.1 404 page
Clone `src/pages/404.tsx`, restyle with current Card/Button primitives. **Mode:** [CLONE]. **Dependencies:** 3.1.

### 9.2 SEO metadata
Clone `next-seo` `DefaultSeo` setup + `src/lib/seo/schema.ts` (JSON-LD Person/Website), adapt to Abdul's info. **Mode:** [CLONE]. **Dependencies:** 6.1.

### 9.3 Sitemap & robots
Clone `generateSitemap.mjs`, wire into build script, generate `robots.txt`. **Mode:** [CLONE]. **Dependencies:** 7.9, 8.1, 8.2 (needs final route list).

### 9.4 AI discoverability files
Clone the `llms.txt`/`llms-full.txt` pattern, populate with Abdul's real summary once content is final. **Mode:** [CLONE]. **Dependencies:** 6.2.

### 9.5 OG image
Placeholder OG/social preview image generated from the design system (name + role on brand background). **Mode:** [BUILD]. **Dependencies:** 1.4, 1.5.

---

## PHASE 10 — Logo & Branding

### 10.1 Wordmark fallback wiring
Confirm the text "AS" fallback (Part B §7) renders correctly in Header, Footer, favicon slot everywhere a logo is expected. **Mode:** [BUILD]. **Dependencies:** 2.4, 2.5.

### 10.2 Real logo swap (future-triggered)
Not scheduled now — triggered whenever Abdul supplies a final clean logo file. **Steps when triggered:** drop file into `/public/logo/`, swap the wordmark `<span>` for an `<Image>` in Header/Footer/favicon, no other structural change needed. **Mode:** [BUILD], deferred.

---

## PHASE 11 — Hero Cube Background (deferred, per Abdul's sequencing decision)

### 11.1 Build cube animation component
- **Goal:** Recreate the r2.mp4 isometric wireframe-cube animation, recolored to the `accent` teal token, as a lightweight canvas/SVG component.
- **Files:** `src/components/hero-cube-background.tsx`
- **Steps:** 11.1.1 Build the draw/dissolve cube-grid animation (canvas or SVG + Framer Motion `stroke-dashoffset`) → 11.1.2 Recolor from the reference video's green to the site's `accent` token → 11.1.3 Tune density/speed for performance (test actual FPS, not just visual).
- **Responsive:** Reduce cube count/density on mobile for performance; confirm it doesn't obscure hero text at any width (z-index behind content, sufficient contrast maintained).
- **Acceptance Criteria:** Smooth 60fps (or graceful degradation) on a mid-range device; fully behind Hero text/buttons in stacking order; off entirely under reduced-motion (falls back to the static ambient-blob background from 7.1).
- **Dependencies:** 7.1 (Hero must already be built and approved, per Abdul's decision)
- **Mode:** [BUILD]

### 11.2 Integrate into Hero
Swap the placeholder ambient-blob background for the cube component. **Mode:** [BUILD]. **Dependencies:** 11.1.

---

## PHASE 12 — Testing

### 12.1 Test suite
- **Goal:** Jest + RTL coverage matching the reference repo's own testing convention.
- **Files:** `jest.config.js`, `jest.setup.js`, `__tests__/` folders alongside new components (cloned convention)
- **Steps:** 12.1.1 Clone Jest config → 12.1.2 Write tests for new [BUILD] components with real logic (rate limiter already covered in 4.4; command palette keyboard nav; shutter-card stacking math; case-study tools; contact form validation edge cases).
- **Acceptance Criteria:** `npm test` passes; critical new logic (not just presentational components) has at least one real assertion-based test, not just a render-snapshot.
- **Dependencies:** All prior phases' components exist
- **Mode:** [CLONE] config + [BUILD] new tests

---

## PHASE 13 — Pre-Deploy & Launch

### 13.1 Deploy workflow
Clone `.github/workflows/vercel.yml`, connect to Abdul's Vercel account/project. **Mode:** [CLONE]. **Dependencies:** All prior phases substantially complete.

### 13.2 Environment variables in Vercel
Set every Part A §4 variable in Vercel's dashboard (Production scope at minimum). **Mode:** [BUILD] (manual/dashboard step, not code).

### 13.3 Final audit pass
Run the full pre-deploy checklist (§14 below) before declaring launch-ready.

---

## 14. Definition of Done — Full Reference (restated from Part A §0.8)

Every task above is Done only when:
1. Matches its spec exactly ([CLONE] tasks functionally match the source, not just resemble it).
2. Zero raw hex/px — tokens only.
3. Verified at mobile/tablet/desktop.
4. Keyboard-navigable, WCAG AA where interactive.
5. Respects `prefers-reduced-motion`.
6. No console errors/warnings in dev.
7. TypeScript compiles clean, no unjustified `any`.
8. Task's own Acceptance Criteria pass.
9. Summarized and approved by Abdul before commit/push.

---

## 15. Pre-Deploy Checklist (run once, after Phase 13.1–13.2, before calling the project launched)

- [ ] **Lighthouse** (Performance, Accessibility, Best Practices, SEO) all ≥ 90, run on the deployed Vercel preview, not just localhost.
- [ ] **Accessibility manual pass:** full keyboard-only navigation of the entire site (Tab/Shift+Tab/Enter/Escape), screen reader spot-check (VoiceOver or NVDA) on Hero, Contact form, ⌘K palette, Chat Panel.
- [ ] **SEO:** `next-seo` tags present on every page, sitemap.xml accessible at `/sitemap.xml`, robots.txt correct, OG image renders in a social-preview debugger (e.g. a link-unfurl test).
- [ ] **Env vars:** every variable from Part A §4 set correctly in Vercel Production (and Preview if used); no secret ever appears in client-side bundle (check via browser DevTools → Sources on the deployed site).
- [ ] **AI Twin live test:** ask it a real question on the deployed site, confirm a grounded answer; trigger a tool call (e.g. "scroll to skills"); intentionally hit the rate limit and confirm the `429`/friendly-message path; temporarily misconfigure the key in a preview branch to confirm the keyword-fallback path still works.
- [ ] **Contact form live test:** submit a real message on the deployed site, confirm the email arrives at Abdul's real inbox; test the rate limit (6th submission in an hour); test the `mailto:` fallback link appears on a simulated failure.
- [ ] **Both themes:** full visual pass of every section in both light and dark mode on the deployed site.
- [ ] **All three breakpoints:** full visual pass on real devices or accurate emulation (not just browser DevTools resize) — at minimum one real phone, one tablet or emulated tablet, one desktop.
- [ ] **Case studies:** `/work` matcher returns sensible results for at least 2–3 different test role descriptions; every `/work/[slug]` page loads with no 404s for valid slugs, correct 404 for invalid ones.
- [ ] **Resume/logo placeholders:** confirmed either real files are in place, or the disabled/fallback states are clearly intentional and not broken-looking.
- [ ] **`THIRD_PARTY_NOTICES.md`** present and accurate.
- [ ] **No leftover debug console.log statements** in production code (the reference repo has several `console.log` calls in `chat.ts` for its own debugging — decide deliberately whether to keep them for ops visibility or strip them, don't leave them in by accident).
- [ ] **Analytics:** Vercel Analytics + Speed Insights confirmed receiving data after a few real page views.

---

## Part F — End — Blueprint Complete

All six parts (A–F) now form the complete build package:
- **A:** Overview, architecture, stack, folder structure, env vars
- **B:** Design system — every color, font, spacing, radius, shadow, motion token
- **C:** Global components — header, footer, ⌘K, cursor, AI Twin chat shell, shared primitives
- **D:** Every page/section — layout, content, responsive behavior, accessibility
- **E:** AI Twin + backend — full API contracts, system prompt, tools, rate limiting, email
- **F:** This document — numbered task plan, Workflow Gate, Definition of Done, pre-deploy checklist

Antigravity should work through Phases 1–13 in order (Phase 6 content and Phase 4 backend can run in parallel with each other; Phase 11's cube background is intentionally deferred until after Phase 7.1 is approved), pausing for Abdul's approval after every parent task, exactly as §0 specifies.
