# Abdul Samad — Portfolio Site: Project Blueprint
## Part A — Overview, Architecture, Stack, Folder Structure, Environment
### (v2 — rebuilt against the real Nikunj2003/My-Next-Js-Portfolio source, MIT licensed)

> **Agent context note:** You (the coding agent) have no context beyond this document set (Parts A–F). Do not assume anything not written here. Where a value is marked `TODO`, implement the surrounding structure fully but leave the value as a clearly marked placeholder. Where a term is capitalized like a **Design Token**, it refers to a named value defined in `02-design-system.md` (Part B).
>
> **Provenance note (read this before touching any code):** This project is built in two layers. **Layer 1 — Cloned & adapted:** structure, logic, and patterns pulled directly from the real, public, MIT-licensed repository `github.com/Nikunj2003/My-Next-Js-Portfolio` (verified by inspecting its actual source, not just its README — package.json, tailwind.config.js, globals.css, src/pages/api/chat.ts, src/utility/rate-limiter.ts, src/config/ai.ts, src/pages/_app.tsx, etc. were all read directly). **Layer 2 — Built fresh:** the richer section layout (pinned-scroll About/Experience, timeline, "Built & Shipped" shutter cards, Technical Stack, dedicated AI Twin section, dedicated Contact section, ⌘K command palette, case-studies pages) does **not** exist in his current `main` branch — it was observed only in Abdul's screen recordings of the *live* deployed site, which has evidently diverged from the public repo. These sections are built from scratch using the videos/screenshots/descriptions Abdul supplied, following the same code conventions (data-driven `src/data/*`, typed tool system, Tailwind + CSS-variable tokens, Framer Motion) as Layer 1, so the whole codebase reads as one consistent system. Every task in Part F is tagged **[CLONE]** or **[BUILD]** so the agent always knows which mode it's in.
>
> **Attribution requirement:** the source repo is MIT licensed. Keep a `THIRD_PARTY_NOTICES.md` at the project root crediting the original repo and reproducing its MIT license text (task 1.1 in Part F). Abdul also has direct email permission from the author — both are documented, MIT alone is sufficient legally.

---

## 0. Overview & Goals

### 0.1 Purpose
A personal portfolio website for **Abdul Samad**, a BS Artificial Intelligence student (FAST NUCES Islamabad) specializing in Generative AI and end-to-end AI pipelines. The site presents his projects, experience, and skills, and lets visitors ask an **AI Twin** questions about his work, answered only from real site content and capable of controlling the UI (scroll/navigate/theme) the same way the reference site's assistant does.

### 0.2 Target Users
1. **Technical recruiters / hiring managers** — fast scan for role fit, skills, proof of work.
2. **Engineers / peers** — evaluating depth, code quality signals, real GitHub/live links.
3. **Abdul himself** — must be easy to update; all content lives in `src/data/*.ts`, never hardcoded in JSX (this is the reference repo's own convention, confirmed in its `CLAUDE.md`: *"Site content is largely data-driven through `src/data/` rather than hard-coded in page JSX"*).

### 0.3 Success Criteria
- Fully responsive, mobile (320px) through large desktop (2560px), no breakage at any width.
- Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, SEO.
- AI Twin answers only from `src/data/*` content, refuses off-topic requests, ignores prompt-injection attempts, degrades gracefully under rate limiting.
- All portfolio content editable by changing files under `src/data/` only.
- Dark and light themes both fully specified via CSS custom properties — no hardcoded colors.

### 0.4 Sitemap

| Route | Page | Mode | Notes |
|---|---|---|---|
| `/` | Home | **[BUILD]**, backend **[CLONE]** | All 9 confirmed sections as one scrollable page (Hero, About, Experience, Selected Work, Built & Shipped, Technical Stack, AI Twin, Contact) — layout is new, but reuses cloned primitives (cursor, transitions, welcome overlay, chat) |
| `/about` | (Optional legacy route) | **[CLONE]**, minimal | Reference repo has this as a separate page; in our version its content is folded into the Home `/` About section instead. Route kept only as a redirect to `/#about` for any external links pointing at it (SEO safety net) |
| `/work` | Case Studies index | **[BUILD]** | Not in reference repo — built new, per Abdul's spec, following the same data-driven pattern |
| `/work/[slug]` | Case Study detail | **[BUILD]** | Dynamic route, Pages Router (`src/pages/work/[slug].tsx`) |
| `/Nikunj_Resume.pdf` → `/resume.pdf` | Static resume file | **[CLONE]** pattern | Served straight from `/public`, linked from nav (renamed to Abdul's own file) |
| `/api/chat` | AI Twin endpoint | **[CLONE]**, adapted | Directly adapted from the reference repo's `src/pages/api/chat.ts` — same tool-calling pipeline, same rate limiter, same fallback pattern, content/prompt swapped to Abdul's |
| `/api/sendmail` | Contact form endpoint | **[CLONE]**, adapted | Directly adapted from `src/pages/api/sendmail.ts` — same Nodemailer + Yup validation + rate limiter pattern |
| `/404` | 404 page | **[CLONE]** | Reference repo already has `src/pages/404.tsx` — reuse pattern, restyle to match new design system |

**Superseded decision:** earlier drafts of this blueprint planned Next.js **App Router**, **Resend** for email, and **Upstash Redis** for rate limiting. All three are replaced below — the reference repo proves a working, simpler alternative for each (Pages Router, Nodemailer, in-memory LRU rate limiting), and per Abdul's instruction we build exactly on what's real and proven rather than a heavier stack of our own guessing.

### 0.5 Assumptions & Data Gaps

| Gap | Default used | Where it lives |
|---|---|---|
| Real project list (Selected Work / Built & Shipped) | Placeholder entries shaped around Abdul's known work (DeskSide, PUBG Mobile esports analytics tooling, FAST NUCES GenAI coursework), `TODO: replace` | `src/data/projects.ts` |
| Real experience entries | One placeholder shaped around Abdul's known internship context, `TODO` | `src/data/experience.ts` |
| Case studies (count + content) | 3 placeholder case studies, `TODO` | `src/data/caseStudies.ts` (new file, not in reference repo) |
| Final "AS" logo | Text wordmark **"AS"** fallback (styled per `02-design-system.md`) until a clean file is supplied | `/public/logo/` (empty, `TODO`) |
| Resume PDF | Placeholder PDF, download button disabled with tooltip until real file exists | `/public/resume.pdf` |
| Contact-received email (Nodemailer) | Real address supplied by Abdul, stored only as `NODEMAILER_USER`/app password — never hardcoded | `.env.local` (gitignored) |
| LinkedIn URL | `TODO` placeholder (`#`) until supplied | `src/data/siteMetaData.ts` |
| GitHub URL | `https://github.com/Abdul-Samad-17` (known) | `src/data/siteMetaData.ts` |
| `LLM_API_KEY` (Groq) | Left blank in `.env.example` | `.env.example` |
| Domain name | Vercel's default `*.vercel.app` subdomain assumed until supplied | `06-implementation-plan.md` (Part F) |
| OG / social preview image | Placeholder generated from design system, `TODO: replace` | `/public/static/home.png` (same path convention as reference repo) |
| AI Twin knowledge source | Static structured content in `src/data/*` + `src/config/ai.ts` system prompt — **directly cloned pattern**, no vector DB, no RAG | `src/config/ai.ts` |
| Cube background animation (r2.mp4 reference) | **Deferred** — built as its own task near the end of Part F, after the Hero section is otherwise approved (per Abdul's explicit sequencing decision) | `src/components/hero-cube-background.tsx` (new, [BUILD]) |
| AI provider | **Groq** (free tier), used via the reference repo's existing generic `LLM_BASE_URL` + `LLM_API_KEY` pattern — zero code changes needed to `chat.ts`'s HTTP call, only env values change | `.env.example` |

### 0.6 Non-Goals (v1)
No CMS, no admin UI, no database, no user accounts/auth, no blog, no server-persisted chat history beyond the current browser tab (matches reference repo's behavior — conversation history is client-side state, not stored server-side).

### 0.7 Naming Conventions & Glossary

| Term | Meaning |
|---|---|
| **Design Token** | A named CSS-variable-backed value (color, spacing, etc.) defined in Part B, never a raw hex/px in components. Reference repo already uses this pattern (`hsl(var(--accent))` etc.) — we extend it, not replace it. |
| **[CLONE]** task | Adapts real code from the reference repo — logic and structure are reused, content/branding is Abdul's. |
| **[BUILD]** task | New code, not present in the reference repo, built from Abdul's video/screenshot spec, following the reference repo's own conventions for consistency. |
| **Tool** | A typed action the AI Twin can invoke (`src/lib/tools/*` in the reference repo — `NavigateToPageTool`, `OpenModalTool`, `GetProjectsTool`, `ToggleThemeTool`, etc.). We extend this registry with new tools for case studies. |
| **ToolContext** | The typed object (`currentPage`, `theme`, `sessionId`, etc.) passed into every tool call — defined in `src/types/tools.ts`, cloned as-is. |
| **Content file** | A `.ts`/`.mjs` file under `src/data/` holding real-world data — never JSX, never styling. Exactly the reference repo's own rule. |
| **`TODO` marker** | A placeholder that must visibly/functionally indicate it isn't final (disabled state, obviously generic copy) — never silently passed off as real. |

File naming matches the reference repo exactly: `kebab-case` for files/routes, `PascalCase` for component default exports, `camelCase` for variables/functions, `SCREAMING_SNAKE_CASE` for env vars.

### 0.8 Definition of Done — Template (every task in Parts D–F)

1. Implements the spec exactly as written (no undocumented deviations); [CLONE] tasks must functionally match the source pattern, not just resemble it.
2. Uses only named **Design Tokens** — zero raw hex/px hardcoded in components.
3. Verified at all three breakpoints (mobile ≤640px, tablet 641–1024px, desktop ≥1025px).
4. Keyboard-navigable, screen-reader sane, WCAG AA where interactive.
5. Respects `prefers-reduced-motion` (the reference repo already does this globally in `globals.css` via a `@media (prefers-reduced-motion: reduce)` block that kills all animation/transition/scroll-behavior — extend this, don't replace it).
6. No console errors/warnings in dev build.
7. TypeScript compiles clean, no unjustified `any`.
8. Task's own Acceptance Criteria (Parts D–F) all pass.
9. Summary presented to Abdul for approval **before** any commit/push.

### 0.9 Workflow Gate (mandatory)

1. **Implement** the parent task and its numbered sub-tasks.
2. **Self-test** at mobile, tablet, desktop.
3. **Summarize** what was built/changed, confirm Acceptance Criteria pass, and note whether the task was [CLONE] or [BUILD] (and for [CLONE], which source file(s) it was adapted from).
4. **Ask Abdul to approve** — do not proceed or commit until approval is given.
5. **Only after approval:** commit with a conventional-commit message (e.g. `feat(chat): clone AI Twin pipeline from reference repo, adapt to Abdul's content`) and push.
6. **Never** push without approval. Never batch multiple parent tasks into one commit.

---

## 1. Tech Stack

**Pinned to the exact versions proven working in the reference repo's own `package.json`** (read directly, not estimated). Do not "helpfully" upgrade major versions (e.g. Tailwind 3→4, React 18→19) — the reference repo's patterns (its Tailwind config shape, its Framer Motion API usage) are version-specific, and mismatched majors would silently break cloned code.

| Layer | Choice | Version (from reference repo) | Why |
|---|---|---|---|
| Framework | Next.js | `15.0.5` | **Pages Router**, not App Router — confirmed by the real `src/pages/` structure, `src/pages/api/*.ts` routes, and `CLAUDE.md`'s own words: *"This is a Next.js 15 Pages Router portfolio site."* |
| UI library | React / React DOM | `18.2.0` | Paired version in reference `package.json` — not React 19. |
| Language | TypeScript | `5.1.3` | Matches reference repo exactly. |
| Styling | Tailwind CSS | `3.3.0` (+ `@tailwindcss/forms ^0.5.6`, `@tailwindcss/typography ^0.5.16`) | Classic `tailwind.config.js` (not v4 CSS-first) — confirmed by reading the actual config file: `darkMode: "class"`, HSL CSS-variable color tokens (`accent`, `accent-light`, `accent-dark`, `background`, `foreground`, `border`, `muted`, `destructive`), custom `xs: 360px` breakpoint, `dropShadow.accent` utility. |
| Animation | Framer Motion | `^10.12.16` | Not the "Motion" rebrand — the reference repo is on the older `framer-motion` package name/API. Used for page transitions, reveals, chat UI, welcome overlay. |
| Theme switching | `next-themes` | `^0.2.1` | `attribute="class"`, `defaultTheme="system"`, `enableSystem` — exact config cloned from `src/pages/_app.tsx`. |
| Icons | `lucide-react` | `^0.366.0` | Confirmed dependency; matches the thin-line icon style throughout. |
| SEO | `next-seo` | `^6.4.0` | `DefaultSeo` in `_app.tsx` + per-page `NextSeo`, cloned pattern. |
| Contact email | `nodemailer` | `^6.9.5` (+ `@types/nodemailer ^6.4.14`) | **Not Resend** — the reference repo's real, working contact pipeline. Gmail SMTP + app password by default. |
| Form validation (contact) | `yup` + `formik` | `^1.3.3` / `^2.4.5` | Reference repo's real validation stack for the contact form — cloned as-is. |
| AI HTTP calls | `axios` | `^1.13.6` | The reference `api/chat.ts` calls the LLM via raw `axios.post` to an OpenAI-compatible `/chat/completions` endpoint — **not** the `openai` SDK, despite it being listed as a dependency (present but unused in the actual request path we read). We clone the axios-based call directly. |
| Rate limiting | `lru-cache` + `nanoid` | `^10.0.1` / `^5.0.7` | **In-memory LRU rate limiter**, cloned verbatim from `src/utility/rate-limiter.ts` — not Upstash Redis. It IP+UA-keys requests with a cookie fallback (`userUuid`). The source file itself documents its own scaling limitation (single-instance memory) — acceptable for a portfolio's traffic, noted as a known tradeoff, not silently hidden. |
| Chat markdown rendering | `react-markdown` + `remark-gfm` | `^10.1.0` / `^4.0.1` | Renders the AI Twin's formatted (headings/bold/lists/code) responses — cloned pattern, styled via the `.chat-markdown` CSS block already defined in `globals.css`. |
| Welcome overlay particles | `@tsparticles/react` + `@tsparticles/slim` + `@tsparticles/engine` | `^3.0.0` / `^3.5.0` / `^3.5.0` | Powers the first-visit welcome screen's floating particles/gradient orbs — cloned from `welcome-screen.tsx`. |
| Image optimization | `sharp` | `^0.32.1` | Next.js build-time image optimization dependency. |
| Modal/menu primitives | `@headlessui/react` | `^1.7.17` | Accessible unstyled primitives used for modals/menus in the reference repo. |
| Command palette (⌘K) | `cmdk` | `^1.0.0` | **New addition — not in reference repo** (confirmed: no `cmdk`, no `metaKey`/command-palette code exists in the cloned source). Built fresh in Part C/D as a [BUILD] component, styled to match the design system extracted from the reference repo's real tokens. |
| Testing | Jest + React Testing Library | `^30.0.5` / `^16.3.0` (`jest-environment-jsdom ^30.0.5`) | Reference repo has a real test suite under `__tests__/` folders — cloned convention, extended to new [BUILD] components. |
| Linting/formatting | ESLint + Prettier | `9.33.0` / `^2.8.8` (+ `prettier-plugin-tailwindcss ^0.3.0`) | Cloned config. Note: reference repo's `next.config.js` sets `eslint.ignoreDuringBuilds: true` — we **keep lint enforced in CI/dev** regardless (see Part F pre-deploy checklist) so this doesn't silently mask errors. |
| Deployment | Vercel | — | Reference repo's own `.github/workflows/vercel.yml` deploys here; same target. |
| Analytics | `@vercel/analytics` | `^1.3.1` | Cloned — already wired into `_app.tsx`. |
| AI provider | **Groq** (OpenAI-compatible endpoint) | API: `openai/v1`-compatible | The reference repo's `chat.ts` already supports *any* OpenAI-compatible provider via `LLM_BASE_URL` (defaults to NVIDIA NIM in their code) — we simply point `LLM_BASE_URL` at `https://api.groq.com/openai/v1` and set `AI_MODEL` to a Groq-hosted model. **Zero code changes to the request logic itself.** |

**Explicitly not used (superseding earlier drafts):** Next.js App Router, React 19, Tailwind v4, Resend, Upstash Redis, `motion` (rebranded Framer Motion package), Zod (reference repo uses Yup instead — we follow it for consistency in the cloned contact flow, but Part E may introduce Zod specifically for the new case-study/AI-Twin request shapes if warranted, noted there).

---

## 2. Architecture

### 2.1 Rendering Strategy (Pages Router)

| Route | Strategy | Reason |
|---|---|---|
| `/` (Home) | Static generation (`getStaticProps` where data is needed, or plain static if none) | Content changes only on rebuild. |
| `/work` | Static generation | Case study list is static content. |
| `/work/[slug]` | Static generation via `getStaticPaths` + `getStaticProps` | One page per case study, pre-rendered. |
| `/api/chat` | Serverless function (Node runtime) | Cloned from reference repo as-is — must run server-side for the `LLM_API_KEY` secret and the LRU rate-limiter's in-memory state. |
| `/api/sendmail` | Serverless function (Node runtime) | Cloned as-is — needs Node runtime for `nodemailer`. |
| `/404` | Static | Cloned pattern. |

### 2.2 High-Level Data Flow

```
┌──────────────────────────┐
│  src/data/*.ts (+ .mjs)   │  experience.ts, projects.ts, skills.ts,
│  SOURCE OF TRUTH          │  caseStudies.ts (new), siteMetaData.ts,
│  [CLONE pattern]          │  navigationRoutes.ts, resume.ts
└─────────────┬─────────────┘
              │ imported at build time
              ▼
┌──────────────────────────┐
│  src/pages/* (Pages Router)│  Statically rendered
│  src/components/*          │
└─────────────┬─────────────┘
              │ served via Vercel CDN
              ▼
         ┌─────────┐
         │ Browser │
         └────┬────┘
              │
              ├── AI Twin chat / "Ask about this" / ⌘K free-text ──▶ POST /api/chat
              │        [CLONE: same pipeline as reference repo]         │
              │                                                          ▼
              │                                     ┌─────────────────────────────────┐
              │                                     │ 1. LRU rate-limit check (cloned)  │
              │                                     │ 2. Build messages[] with          │
              │                                     │    SYSTEM_PROMPT (Abdul's data)   │
              │                                     │ 3. axios POST to Groq's           │
              │                                     │    /chat/completions (LLM_BASE_URL)│
              │                                     │ 4. Execute any tool calls via      │
              │                                     │    contextAwareToolRegistry        │
              │                                     │ 5. Follow-up call for natural      │
              │                                     │    response incorporating results  │
              │                                     │ 6. Keyword-based fallback response │
              │                                     │    if the LLM call throws          │
              │                                     └─────────────────────────────────┘
              │
              └── Contact form submit ─────────────────────▶ POST /api/sendmail
                       [CLONE: same pipeline as reference repo]    │
                                                                     ▼
                                                    ┌─────────────────────────────────┐
                                                    │ 1. LRU rate-limit check (5/hour)  │
                                                    │ 2. Yup validation                  │
                                                    │ 3. nodemailer send via Gmail SMTP  │
                                                    │ 4. Structured status response       │
                                                    └─────────────────────────────────┘
```

### 2.3 AI Twin Architecture — Cloned Pipeline, Adapted Content

This is the single most valuable clone in the whole project — the reference repo's `src/pages/api/chat.ts` is a complete, working, tested pipeline. What gets cloned verbatim vs. adapted:

| Piece | Cloned as-is | Adapted for Abdul |
|---|---|---|
| Rate limiter (`src/utility/rate-limiter.ts`) | ✅ 100% | — |
| Request/response types (`Message`, `ChatRequest`, `ChatResponse`, tool types in `src/types/tools.ts`) | ✅ 100% | — |
| Tool registry system (`src/lib/tools/*`) | ✅ Structure & base classes | New tool implementations for `caseStudies` data access |
| System prompt shape (guardrails, knowledge base, response guidelines, tool-usage rules) | ✅ Structure | ✅ Content — Abdul's real bio/experience/skills/projects replace Nikunj's, from `src/data/*` |
| Follow-up-call-after-tool-execution pattern | ✅ 100% | — |
| Keyword-based fallback responses (used when the LLM call throws) | ✅ Structure | ✅ Content — rewritten for Abdul's info |
| Follow-up suggestion generator (separate model call, category-diversity logic) | ✅ 100% | ✅ Category keyword list adjusted if Abdul's content areas differ (e.g. add "esports analytics" as a category) |
| LLM endpoint | Generic OpenAI-compatible call structure ✅ | `LLM_BASE_URL` → Groq, `AI_MODEL` → a Groq-hosted model (e.g. `llama-3.3-70b-versatile`) — decided in Part E |

**Injection resistance & guardrails:** cloned directly from the reference `SYSTEM_PROMPT`'s own "GUARDRAILS & BEHAVIOR" section (only discuss the portfolio subject's professional profile; redirect off-topic questions; canonical tool-argument normalization to prevent the model inventing invalid tool actions). This is already a solid, tested pattern — Part E documents it in full with Abdul's adapted prompt text.

**New tool for the ⌘K/case-studies feature:** a `GetCaseStudiesTool` (and `MatchCaseStudyToRoleTool` for the recruiter-prompt matcher on `/work`) will be added to the tool registry following the exact shape of the existing `GetProjectsTool`/`GetExperienceTool`/`GetSkillsTool` in `src/lib/tools/data-access-tools.ts` — full contract in Part E.

### 2.4 Contact Form Architecture — Cloned Pipeline

Cloned directly from `src/pages/api/sendmail.ts` + `src/utility/sendMail.ts` + `src/components/contact-form/contact-form.tsx`'s `mailValidationSchema` (Yup). Rate limit: 5 requests/hour per user (IP+UA, cookie fallback), identical to the reference repo's own constants. Abdul's real inbox address goes in `NODEMAILER_USER`/`NODEMAILER_PASS` (Gmail app password), never hardcoded.

### 2.5 Theming Architecture

Cloned exactly: CSS custom properties in HSL format at `:root` (light) and `.dark` (dark), `next-themes` with `attribute="class"`, Tailwind's `darkMode: "class"` config, colors referenced as `hsl(var(--accent))` etc. Abdul's exact token values (extending the reference repo's real `--accent`/`--accent-light`/`--accent-dark` hue-183 teal system, or a close variant) are finalized in Part B.

### 2.6 Cursor Effect Architecture

Cloned from `src/components/fluid-cursor.tsx`, `src/components/cursor-trail-canvas.tsx`, `src/hooks/useFluidCursor.tsx`, `src/utility/cursor-trail.ts` — dynamically imported with `ssr: false` in `_app.tsx` (exactly as the reference repo does, to avoid SSR canvas issues) plus custom per-theme pointer/hand/text cursor images (`icons8-*-cursor-*-{light,dark}.png`) swapped via the `.dark` class in `globals.css`. Full detail in Part C.

### 2.7 Page Transition & Welcome Overlay Architecture

Both cloned: `src/components/page-transition-animation.tsx` (radial clipPath reveal on route change, gated by `AnimationGateProvider` in `src/contexts/animation-gate.tsx`) and `src/components/welcome-screen.tsx` (first-visit particle overlay via `@tsparticles`, scroll/touch to dismiss, rotating taglines). Since our site is a single long `/` page rather than multiple routes, the welcome overlay's role stays the same (first-visit intro) but the page-transition animation's role shrinks to just `/` ↔ `/work` ↔ `/work/[slug]` navigation — documented in Part C.

### 2.8 Security Posture

- Secrets (`LLM_API_KEY`, `NODEMAILER_USER`/`PASS`) stay server-side only, read via `process.env` only inside `src/pages/api/*` — never in client-rendered files.
- Contact form validated server-side with Yup (cloned) before any Nodemailer call.
- Both API routes rate-limited via the cloned LRU limiter.
- No secrets committed to source; `.env.local` gitignored (cloned `.gitignore` already covers this).

---

## 3. Folder / File Structure

Base structure **cloned directly** from the reference repo (confirmed via its real file tree), extended with [BUILD] additions for the richer section layout, case studies, and the command palette.

```
portfolio/
├── .github/
│   └── workflows/
│       └── vercel.yml                  # [CLONE] deploy workflow
├── public/
│   ├── icons/                          # [CLONE] tech-stack SVG icon set (reused/extended)
│   ├── icons8-*-cursor-*-{light,dark}.png  # [CLONE] custom cursor images
│   ├── images/
│   │   └── projects/<project-slug>/    # [CLONE pattern] per-project screenshot folders
│   ├── static/home.png                 # OG/social preview image (TODO: replace)
│   ├── favicon.ico
│   ├── resume.pdf                      # renamed from Nikunj_Resume.pdf (TODO: replace)
│   ├── llms.txt / llms-full.txt        # [CLONE] AI-discoverability files (Part E/F)
│   ├── robots.txt / sitemap.xml        # [CLONE] generated by build script
│   └── logo/                           # [BUILD] empty until final "AS" logo supplied
│
├── src/
│   ├── pages/
│   │   ├── _app.tsx                    # [CLONE] composition root — providers, SEO, cursor, transitions
│   │   ├── _document.tsx               # [CLONE]
│   │   ├── index.tsx                   # [BUILD] — richer Home layout (all 9 sections), not the reference's simple version
│   │   ├── 404.tsx                     # [CLONE] restyled
│   │   ├── work/
│   │   │   ├── index.tsx               # [BUILD] Case studies index + recruiter-prompt matcher
│   │   │   └── [slug].tsx              # [BUILD] Case study detail
│   │   └── api/
│   │       ├── chat.ts                 # [CLONE] adapted — Abdul's system prompt/content, Groq endpoint
│   │       └── sendmail.ts             # [CLONE] adapted — Abdul's inbox
│   │
│   ├── components/
│   │   ├── landing-hero.tsx            # [BUILD] — richer hero (stat counters, business card, cube bg later)
│   │   ├── hero-cube-background.tsx    # [BUILD] — deferred task, cube animation from r2.mp4 reference
│   │   ├── fluid-cursor.tsx            # [CLONE]
│   │   ├── cursor-trail-canvas.tsx     # [CLONE]
│   │   ├── page-transition-animation.tsx # [CLONE]
│   │   ├── welcome-screen.tsx          # [CLONE], copy adapted
│   │   ├── section-divider.tsx         # [CLONE]
│   │   ├── about-hero.tsx              # [BUILD] — pinned-left/scroll-right About (new layout)
│   │   ├── experience/
│   │   │   ├── experience-showcase-list.tsx      # [CLONE] base, extended with timeline+nodes
│   │   │   └── experience-showcase-list-item.tsx # [CLONE] base, extended with "Ask about this"
│   │   ├── projects/
│   │   │   ├── project-showcase.tsx    # [CLONE] base
│   │   │   ├── project-showcase-list.tsx # [CLONE] base
│   │   │   └── project-card.tsx        # [CLONE] base, restyled for Selected Work cards
│   │   ├── built-and-shipped/          # [BUILD] — new: shutter-scroll stacking cards
│   │   │   ├── shutter-card-stack.tsx
│   │   │   └── shutter-card.tsx
│   │   ├── skills/
│   │   │   ├── skills-showcase.tsx     # [CLONE] base, restyled as pinned-left Technical Stack
│   │   │   └── skills-pill.tsx         # [CLONE]
│   │   ├── ai-twin-section/            # [BUILD] — new dedicated section (vs. reference's floating-only chat)
│   │   │   └── ai-twin-section.tsx
│   │   ├── chat/                       # [CLONE] — floating assistant, unchanged structure
│   │   │   ├── chat-window.tsx
│   │   │   ├── floating-chat-button.tsx
│   │   │   ├── confirmation-dialog.tsx
│   │   │   ├── navigation-indicator.tsx
│   │   │   ├── types.ts
│   │   │   ├── components/
│   │   │   │   ├── action-indicator.tsx
│   │   │   │   └── tool-execution-result.tsx
│   │   │   └── hooks/
│   │   │       └── use-normalize-action-type.ts
│   │   ├── contact-form/               # [CLONE] — restyled as full Contact section (vs. reference's modal)
│   │   │   ├── contact-form.tsx
│   │   │   ├── contact-form-modal.tsx  # kept for the floating variant if desired
│   │   │   ├── contact-button.tsx
│   │   │   ├── contact-mail-toast.tsx
│   │   │   └── floating-mail-button.tsx
│   │   ├── command-palette/            # [BUILD] — new, not in reference repo
│   │   │   └── command-palette.tsx     # built on `cmdk`
│   │   ├── icons.tsx                   # [CLONE]
│   │   └── utility/                    # [CLONE]
│   │       ├── corosel.tsx
│   │       ├── custom-input.tsx
│   │       ├── custom-textarea.tsx
│   │       ├── custom-toast.tsx
│   │       ├── menu-button.tsx
│   │       ├── mobile-menu.tsx
│   │       └── theme-switch.tsx
│   │
│   ├── layout/                         # [CLONE]
│   │   ├── main-layout.tsx
│   │   ├── navbar.tsx                  # extended with ⌘K trigger + AI Twin nav item
│   │   └── footer.tsx
│   │
│   ├── data/                           # SOURCE OF TRUTH — [CLONE pattern], Abdul's content
│   │   ├── siteMetaData.mjs            # kept as .mjs — see note below
│   │   ├── navigationRoutes.ts
│   │   ├── experience.ts
│   │   ├── projects.ts                 # Selected Work + Built & Shipped entries
│   │   ├── skills.ts
│   │   ├── resume.ts
│   │   └── caseStudies.ts              # [BUILD] — new, not in reference repo
│   │
│   ├── config/
│   │   └── ai.ts                       # [CLONE] structure, [BUILD] content — Abdul's system prompt
│   │
│   ├── contexts/                       # [CLONE]
│   │   ├── animation-gate.tsx
│   │   ├── chat-context.tsx
│   │   └── tool-context.tsx
│   │
│   ├── lib/
│   │   ├── tools/                      # [CLONE] registry/base, [BUILD] new case-study tools
│   │   │   ├── base-tool.ts
│   │   │   ├── tool-registry.ts
│   │   │   ├── context-aware-tool-registry.ts
│   │   │   ├── tool-execution-middleware.ts
│   │   │   ├── tool-context.ts
│   │   │   ├── context-utils.ts
│   │   │   ├── page-context-detector.ts
│   │   │   ├── contextual-tool-suggestions.ts
│   │   │   ├── data-access-tools.ts    # extended with GetCaseStudiesTool
│   │   │   ├── navigation-tools.ts
│   │   │   ├── ui-control-tools.ts
│   │   │   ├── validate-data-tools.ts
│   │   │   ├── initialize-tools.ts
│   │   │   └── index.ts
│   │   └── seo/
│   │       └── schema.ts               # [CLONE] JSON-LD Person/Website schema
│   │
│   ├── animation/                      # [CLONE]
│   │   ├── fade-right.tsx
│   │   ├── fade-up.tsx
│   │   └── flip-words.tsx              # reused for the Experience "And a new [word] ahead" cycling
│   │
│   ├── hooks/                          # [CLONE]
│   │   ├── useAutoSizeTextarea.ts
│   │   ├── useDebounceValue.ts
│   │   ├── useFluidCursor.tsx
│   │   └── useScreenBreakpoint.ts
│   │
│   ├── utility/                        # [CLONE]
│   │   ├── ai-chat-responses.ts
│   │   ├── classNames.ts
│   │   ├── cursor-trail.ts
│   │   ├── rate-limiter.ts
│   │   ├── sendMail.ts
│   │   └── verifyEmail.ts
│   │
│   ├── types/
│   │   └── tools.ts                    # [CLONE]
│   │
│   ├── styles/
│   │   └── globals.css                 # [CLONE] base, extended with new component classes
│   │
│   └── scripts/
│       └── generateSitemap.mjs         # [CLONE]
│
├── docs/                                # This blueprint
│   ├── 01-overview-and-architecture.md
│   ├── 02-design-system.md
│   ├── 03-global-components.md
│   ├── 04-pages-and-sections.md
│   ├── 05-ai-twin-and-backend.md
│   └── 06-implementation-plan.md
│
├── THIRD_PARTY_NOTICES.md               # [BUILD] — MIT attribution to the reference repo
├── .env.example
├── .env.local                           # gitignored
├── next.config.js                       # [CLONE]
├── tailwind.config.js                   # [CLONE] base, extended with Abdul's tokens
├── tsconfig.json                        # [CLONE]
├── jest.config.js / jest.setup.js       # [CLONE]
├── package.json
└── README.md
```

**Note on `siteMetaData.mjs`:** the reference repo keeps this one file as `.mjs` (not `.ts`) specifically so the plain-Node `generateSitemap.mjs` script can import it directly without a TypeScript build step. We keep that exact convention — do not convert it to `.ts`, or the cloned sitemap script breaks.

**Key structural rule (unchanged):** components never hardcode copy/colors/spacing that belongs in `src/data/*` or the design tokens.

---

## 4. Environment Variables

`.env.example` (cloned structure, values adapted):

```bash
# -----------------------------
# Contact / Nodemailer (Gmail example) — CLONED from reference repo
# If using Gmail with 2FA, use an App Password instead of your real password.
NODEMAILER_USER=your-email@example.com
NODEMAILER_PASS=your-app-password

# -----------------------------
# LLM / AI Provider — CLONED pattern, pointed at Groq (free tier)
LLM_API_KEY=your-groq-api-key
LLM_BASE_URL=https://api.groq.com/openai/v1

# -----------------------------
# Build / Analysis Flags (optional) — CLONED
ANALYZE=false
BUILD_STANDALONE=false

# -----------------------------
# Runtime Environment
NODE_ENV=development
```

| Variable | Purpose | Required in | Source |
|---|---|---|---|
| `NODEMAILER_USER` | Gmail address sending contact form emails | dev, preview, prod | [CLONE] |
| `NODEMAILER_PASS` | Gmail App Password (not real password) | dev, preview, prod | [CLONE] |
| `LLM_API_KEY` | Groq API key for AI Twin | dev, preview, prod | [CLONE pattern], Groq value |
| `LLM_BASE_URL` | `https://api.groq.com/openai/v1` | dev, preview, prod | [CLONE pattern], Groq value |
| `ANALYZE` | Enables bundle analyzer | dev only, optional | [CLONE] |
| `BUILD_STANDALONE` | Next.js standalone output for Docker/minimal deploy | optional | [CLONE] |

**Dev/Preview/Prod:** identical to reference repo's own approach — same env var names across all three, values differ only in `NODEMAILER_USER`/`LLM_API_KEY` if Abdul wants separate test accounts (optional; not required for a portfolio's traffic level).

---

## 5. Integrations Overview

| Integration | Used for | Free tier | Fallback if unavailable |
|---|---|---|---|
| **Groq** | AI Twin chat completions via the cloned axios-based OpenAI-compatible call | Free, generous rate limits | Cloned keyword-based fallback responses (already written into `chat.ts`'s catch block — real, working code, not a new safety net we have to invent) |
| **Gmail SMTP (Nodemailer)** | Contact form delivery | Free (Gmail account + App Password) | Cloned `sendMail.ts` error handling returns a structured error status; frontend can show a `mailto:` fallback link (Part D) |
| **Vercel** | Hosting, CDN, Analytics, deploy workflow | Free Hobby tier | N/A — deployment target, matches reference repo's own `.github/workflows/vercel.yml` |

---

## Part A — End

**Covers:** Overview, goals, sitemap (with [CLONE]/[BUILD] tagging), assumptions, non-goals, glossary, Definition of Done template, Workflow Gate, tech stack pinned to the *real* reference repo's `package.json`, full architecture (rendering strategy, AI Twin pipeline — cloned in detail, contact form pipeline, theming, cursor, transitions, security), full folder structure blending cloned and new code, environment variables, integrations.

**Superseded from v1 draft:** App Router → Pages Router. Resend → Nodemailer. Upstash Redis → in-memory LRU cache. React 19 → 18.2.0. Tailwind v4 → 3.3.0. Motion → Framer Motion `^10.12.16`. Generic AI grounding → the reference repo's real typed tool-calling pipeline.

**Not yet covered:** exact design tokens extending the reference repo's real HSL values (Part B), global component specs including the new ⌘K palette (Part C), per-section UI/UX/accessibility/responsive detail (Part D), full AI Twin prompt content + new case-study tools + backend detail (Part E), numbered implementation task plan with [CLONE]/[BUILD] tags + Definition of Done + pre-deploy checklist (Part F).

Reply **"next"** for Part B (Design System), or flag corrections to Part A first.
