# Abdul Samad — Portfolio Site: Project Blueprint
## Part C — Global Components

> Components here are used across every page (Header, Footer, cursor, transitions) or are shared primitives every section composes (Card, Button, Badge, StatCounter, CyclingText). Section-specific layout (Hero, About, Experience, etc.) is Part D — this doc stops at the reusable layer. All class names reference Part B's tokens; do not introduce new raw values here.
>
> **One correction applied throughout this doc:** the reference repo hardcodes the accent color as a raw hex (`bg-[#56A5A9]`) in two real files (`navbar.tsx`'s active-link pill, `contact-button.tsx`). Per our Design System rule (Part B — "every component references tokens by name, never a raw hex"), every clone in this document replaces `bg-[#56A5A9]` with `bg-accent`. This is a deliberate, documented fix, not a silent deviation — note it in the task summary when implementing 3.1 and 3.9.

---

## 1. Header / Navbar

**Mode:** [CLONE], adapted — base structure and classes from `src/layout/navbar.tsx`, extended with the ⌘K trigger and AI Twin nav item (new, since the reference repo has neither).

### 1.1 Structure
```
<header> sticky top-0 z-50
  └── Container (px-6 py-4 sm:px-14 sm:py-5 md:px-20)
        └── Flex row (max-w-7xl mx-auto, justify-between)
              ├── Mobile: MenuLogo (hamburger, md:hidden) — left
              ├── Desktop: floating pill <nav> (hidden md:flex, flex-grow)
              │     ├── Logo/wordmark (NEW — see §1.3, not in reference repo's navbar at all)
              │     ├── Nav links: About · Experience · Work · Skills · AI Twin · Contact
              │     ├── ⌘K search trigger chip (NEW — [BUILD])
              │     ├── ThemeSwitch
              │     └── "Resume" button (replaces reference's "Contact Me" button — Contact is now a full page section, not a modal-only action)
              └── Desktop: MenuLogo again (hidden md:block) — [CLONE] quirk, kept for parity
```

### 1.2 Real Classes — Cloned
```html
<!-- Sticky header -->
<header class="sticky top-0 z-50 mt-0 px-6 py-4 sm:mt-2 sm:px-14 sm:py-5 md:px-20">

<!-- Floating glass pill nav -->
<nav class="hidden flex-grow items-center justify-between gap-2 rounded-full px-2 py-2 shadow-lg ring-1 ring-zinc-200/80 backdrop-blur-xl dark:ring-accent/30 md:flex"
     style="background: rgba(255,255,255,0.3)"> <!-- dark: rgba(0,0,0,0.3), set via resolvedTheme check -->

<!-- Nav link — inactive -->
<a class="relative mx-3 rounded-full px-4 py-3 text-accent hover:text-accent-light">

<!-- Nav link — active (CORRECTED: bg-accent instead of reference's bg-[#56A5A9]) -->
<a class="relative mx-3 rounded-full bg-accent px-4 py-3 font-semibold text-accent-foreground shadow-lg shadow-accent/30">
```

### 1.3 Logo/Wordmark Placement — [BUILD]
The reference repo's navbar has **no logo at all** — just the hamburger icon and nav pill. Abdul's reference videos clearly show a logo+name at the header's far left (persisting through both the mobile hamburger slot and desktop). Add it as a new leading element inside the flex row, before the mobile hamburger / nav pill:
```html
<Link href="/" class="flex items-center gap-2 font-heading text-lg font-bold">
  <LogoMark class="h-8 w-8" /> <!-- Part B §7 fallback, or real logo once supplied -->
  <span>Abdul Samad</span>
</Link>
```
On mobile, this sits to the left of the hamburger; on desktop, it's the first child inside the glass nav pill, before the link list.

### 1.4 ⌘K Trigger Chip — [BUILD], new
Placed inside the nav pill, between the link list and ThemeSwitch:
```html
<button aria-label="Open search" onClick={openPalette}
  class="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground hover:text-accent">
  <SearchIcon class="h-3.5 w-3.5" />
  <kbd class="font-mono">⌘K</kbd>
</button>
```
Also bound globally to `Cmd+K` / `Ctrl+K` keydown (see §4.4).

### 1.5 Active-State Logic — [CLONE]
Since this is a single scrolling `/` page (not the reference repo's multi-page `/about`, `/projects`), "active" is determined by scroll-spy (which section is in viewport), not `pathname === href`. Implemented via `IntersectionObserver` per section (reusing the same observer pattern already proven in `contact-button.tsx`'s floating-button visibility logic) rather than Next.js router pathname matching.

### 1.6 Resume Button
```html
<a href="/resume.pdf" download
   class="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-light">
  Resume
</a>
```
Disabled state (per Part A §0.5, until real PDF exists): add `aria-disabled="true" class="... opacity-50 cursor-not-allowed pointer-events-none"` and a `title="Resume coming soon"` tooltip.

### 1.7 Mobile Menu — [CLONE]
`MobileMenu` component (`src/components/utility/mobile-menu.tsx`) opens on hamburger tap, cloned as-is, extended with the same nav items (About, Experience, Work, Skills, AI Twin, Contact) plus Resume/⌘K entries at the bottom.

---

## 2. Footer

**Mode:** [BUILD] — the reference repo's real footer (`src/layout/footer.tsx`) is a 3-column layout (Brand+socials / Quick Links / Contact Info) that does **not** match Abdul's video, which shows a simpler single-bar footer (logo+name, inline nav links, "Open to [roles]" line, Download Resume button, copyright + "Built with Next.js & Tailwind" line, social icons on the far right). We build the video's layout, but reuse the reference repo's real styling conventions (icon-button treatment, link hover colors, card framing) so it still feels like the same system.

### 2.1 Structure
```
<footer>
  └── rounded-t-2xl border-t border-border bg-muted/20 shadow-md ring-1 ring-zinc-200 backdrop-blur-lg dark:ring-accent/50   [CLONE styling]
        └── Container (max-w-7xl mx-auto px-6 py-10 sm:px-14 md:px-20)
              ├── Top row (flex, justify-between, wraps on mobile)
              │     ├── Logo + name (left)
              │     └── Nav links: About · Experience · Work · Skills · Contact (inline, right, wraps to new line on mobile)
              ├── "Open to Applied AI, AI Product, Agentic AI, ... roles." line + Download Resume button
              └── Bottom bar (border-t border-border pt-6, flex justify-between, stacks on mobile)
                    ├── © {year} Abdul Samad. Built with Next.js & Tailwind.
                    └── Social icons: Email · LinkedIn · GitHub
```

### 2.2 Real Classes — Cloned (icon buttons, card frame, link hovers)
```html
<!-- Footer card frame -->
<div class="rounded-t-2xl border-t border-border bg-muted/20 shadow-md ring-1 ring-zinc-200 backdrop-blur-lg dark:ring-accent/50">

<!-- Social icon button -->
<a class="group flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-accent-foreground hover:shadow-lg">

<!-- Footer nav link -->
<a class="inline-flex items-center text-muted-foreground transition-colors duration-200 hover:text-accent">
```

### 2.3 Content Source
All text (`author`, `roles` list, `email`, `github`, `linkedin`) pulled from `src/data/siteMetaData.mjs` — [CLONE] convention, exactly how the reference footer already sources its content (`siteMetadata.author`, `siteMetadata.description`, etc.).

---

## 3. Theme Toggle

**Mode:** [CLONE], exact. Reuse `src/components/utility/theme-switch.tsx` verbatim — sun/moon SVG icon swap based on `resolvedTheme`, `next-themes`' `setTheme`, `mounted` guard to avoid hydration mismatch. Sizing note from the real file: `h-10 w-10` on mobile (inside the mobile menu), `md:h-6 md:w-6` inline in the desktop nav pill. No changes needed — drop it into the Header (§1) and MobileMenu as-is.

---

## 4. Command Palette (⌘K)

**Mode:** [BUILD] — entirely new, confirmed absent from the reference repo. Built on `cmdk` (Part A §1), styled to match the glass-card system from Part B §4, content structure taken directly from Abdul's ⌘K screenshots.

### 4.1 Trigger
- Header chip (§1.4), click.
- Global keydown: `metaKey/ctrlKey + "k"` → `preventDefault()` + open. Must not fire while focus is inside an `<input>`/`<textarea>` that itself uses `Cmd+K` for something else (not applicable here, but guard anyway for robustness).
- Footer or mobile menu may optionally also expose a "Search" entry that opens the same palette.

### 4.2 Structure (from Abdul's screenshots)
```
<Dialog> (cmdk.Dialog, backdrop blur over page)
  └── Panel: rounded-2xl border-border bg-surface-card shadow-lg backdrop-blur-lg, max-w-2xl, centered
        ├── Input row: search icon + "Search, or ask a question..." placeholder + ESC pill (top-right)
        ├── Results list (cmdk.List), grouped by cmdk.Group, each with a mono-caps label:
        │     ├── "CASE STUDIES" — doc icon, title, category tag right-aligned (mono-caps, text-muted-foreground)
        │     ├── "PROJECTS" — layer icon, title, "LIVE ↗" badge (Part B §6.4) OR category tag
        │     ├── "GO TO" — arrow icon, page-anchor links (About, Experience, Work, Skills, AI Twin, Contact)
        │     └── "LINKS" — icon per item: Download resume, Email, GitHub, LinkedIn
        └── Footer bar: "↑↓ navigate" · "↵ select" (left) — "✨ type to ask the twin" (right)
```

### 4.3 Keyboard Nav & Styling
`cmdk` handles arrow-key highlighting natively (`cmdk-item[aria-selected="true"]`) — style the selected row as:
```html
class="bg-accent/10 text-foreground font-semibold rounded-lg"
```
unselected rows: `text-muted-foreground hover:bg-muted/40 rounded-lg`.

### 4.4 "Type to ask the twin" Fallback — ties to Part E
When the typed query doesn't match any static item (`cmdk`'s built-in empty-state), render a single result row: *"Ask the AI Twin: '{query}'"* — selecting it closes the palette and opens the Chat Panel (§8) pre-seeded with that query, submitted immediately. This is the same `useAiTwin` hook and `/api/chat` endpoint used everywhere else (Part A §2.3) — no separate logic.

### 4.5 Data Source
Static nav/links items come from `src/data/navigationRoutes.ts` (cloned file, extended). Case studies and projects lists come from `src/data/caseStudies.ts` and `src/data/projects.ts` respectively — the palette is a thin presentational layer over the same content files every section already reads from, never a separate hardcoded list.

---

## 5. Scroll Progress Bar

**Mode:** [BUILD] — not in reference repo, confirmed by Abdul's description ("a thin teal scroll-progress line runs across the top").
```html
<div class="fixed left-0 top-0 z-[60] h-0.5 w-full bg-transparent">
  <div class="h-full bg-accent transition-[width] duration-150 ease-out" style="width: {scrollPercent}%" />
</div>
```
Driven by `window.scrollY / (document.body.scrollHeight - window.innerHeight)`, throttled via `requestAnimationFrame` (not raw scroll-event handlers, to avoid jank). Sits above the Header (`z-[60]` vs header's `z-50`) so it's always visible even when the header itself has its own backdrop.

---

## 6. Cursor System (Fluid Trail + Custom Pointers)

**Mode:** [CLONE] mechanism, [BUILD] second color (per Part B §9).

### 6.1 Files Cloned Verbatim
`src/components/fluid-cursor.tsx`, `src/components/cursor-trail-canvas.tsx`, `src/hooks/useFluidCursor.tsx`, `src/utility/cursor-trail.ts`.

### 6.2 Mount Pattern — [CLONE]
Dynamically imported with SSR disabled in `_app.tsx`, exactly as the reference repo does (canvas-based effects break under SSR):
```ts
const FluidCursor = dynamic(() => import("@/components/fluid-cursor"), { ssr: false });
```

### 6.3 Color Wiring — [BUILD]
The canvas effect's color inputs are read from the two CSS variables defined in Part B (`--accent` and `--cursor-trail-secondary`), resolved to RGB at runtime via `getComputedStyle` (since canvas gradients need actual RGB/RGBA, not CSS variable strings) — add a small `resolveHslVar(varName)` utility in `src/utility/cursor-trail.ts` if the cloned file doesn't already support two colors (it currently supports one, per Part B §9.2's finding). This is the one functional change to the cloned cursor file, not just a restyle.

### 6.4 Reduced Motion
Gate the entire cursor trail (not just individual animations) behind `useReducedMotion()` — when true, don't mount the canvas at all, fall back to a plain default cursor. The custom pointer *images* (§6.5) are fine to keep regardless (they're static images, not motion).

### 6.5 Custom Pointer Images — [CLONE], exact
Covered fully in Part B §9.1 — no changes, just wire the existing asset paths into `globals.css` as-is.

---

## 7. Page Transition & Welcome Overlay

### 7.1 Page Transition Animation — [CLONE]
`src/components/page-transition-animation.tsx` — a radial `clipPath` reveal on route change, gated by `AnimationGateProvider` (`src/contexts/animation-gate.tsx`, cloned as-is) so that `whileInView` animations on the new page don't fire before the transition finishes. Scope note (Part A §2.7): since Home is a single `/` page, this transition now only fires on `/` ↔ `/work` ↔ `/work/[slug]` navigation, not between every section.

### 7.2 Welcome Overlay — [CLONE], copy adapted
`src/components/welcome-screen.tsx` — first-visit full-screen overlay with `@tsparticles` floating particles/gradient orbs, dismissed on scroll/touch/click, shows rotating taglines. Clone the mechanism and particle config exactly; replace the taglines with Abdul's own (content lives in `src/data/siteMetaData.mjs` or a small dedicated array in the component, matching wherever the reference repo sources its own — confirm exact source location during implementation and follow the same pattern). Persist "seen" state via `localStorage` (same as reference) so it only shows once per visitor.

---

## 8. AI Twin — Chat Bubble & Panel

**Mode:** [CLONE], adapted content. This is the floating, always-available entry point — the dedicated AI Twin *section* (Part D) and the ⌘K fallback (§4.4) both open the same panel/hook, they don't duplicate it.

### 8.1 Files Cloned
`src/components/chat/chat-window.tsx`, `floating-chat-button.tsx`, `confirmation-dialog.tsx`, `navigation-indicator.tsx`, `types.ts`, `components/action-indicator.tsx`, `components/tool-execution-result.tsx`, `hooks/use-normalize-action-type.ts`.

### 8.2 Floating Trigger
A persistent circular button, bottom-right, `z-50`, `bg-accent` fill, chat-bubble icon, `drop-shadow-accent` glow (Part B §4.3) in dark mode. Opens the same `chat-window.tsx` panel used by the dedicated AI Twin section.

### 8.3 Markdown Rendering — [CLONE]
`react-markdown` + `remark-gfm`, styled via the real `.chat-markdown` CSS block (Part B's globals.css extension — already fully specified there, headings/lists/code/blockquote/links all covered). Do not restyle markdown output per-instance; always apply the shared `.chat-markdown` class.

### 8.4 Loading State — [CLONE pattern]
The `@keyframes loading` translateX sweep (Part B §8.3) drives a thin animated bar/shimmer while awaiting a response — reuse exactly, don't invent a new spinner.

### 8.5 Tool Execution Feedback — [CLONE]
When the AI Twin calls a tool (navigate, open modal, toggle theme, fetch case study, etc.), `tool-execution-result.tsx` and `action-indicator.tsx` render an inline confirmation chip in the chat stream (e.g. "→ Navigated to Selected Work") before the natural-language follow-up response streams in. Clone this UX exactly — it's core to what makes the AI Twin feel like an agent rather than a chatbot, and it's real, working code.

### 8.6 Confirmation Dialog — [CLONE]
Destructive or consequential tool actions (if any are added later — e.g. "open the contact form and pre-fill a message") route through `confirmation-dialog.tsx`'s existing confirm/cancel pattern rather than firing silently. Full tool list and which ones need confirmation is specified in Part E.

---

## 9. "Ask About This" Control

**Mode:** [BUILD] — new small component, not literally present in the reference repo, but built directly on top of its real primitives: the same `useAiTwin`-style hook that powers Chat Panel, and the same global custom-event pattern already proven in `contact-button.tsx` (`window.addEventListener("open-contact-modal", ...)`).

### 9.1 Component
```html
<button onClick={() => askAboutThis(factText)}
  class="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-accent">
  <SparkleIcon class="h-3 w-3" /> Ask about this
</button>
```
Appears inline after bullets/facts in About, Experience, Built & Shipped, and Technical Stack cards (per Abdul's section descriptions).

### 9.2 Behavior
Clicking dispatches a global custom event (cloned pattern, new event name):
```ts
window.dispatchEvent(new CustomEvent("open-ai-twin", { detail: { seedQuestion: factText } }));
```
The Chat Panel (§8) listens for this event exactly the way `contact-button.tsx` listens for `open-contact-modal`, opens itself, and pre-fills + auto-submits the seed question through the normal `/api/chat` flow (Part A §2.3) — no special-cased backend logic, the fact text just becomes the user's first message.

---

## 10. Shared UI Primitives

These wrap the raw Tailwind patterns from Part B into actual reusable components so sections (Part D) compose them instead of restating class strings.

### 10.1 `<Card>` — [CLONE pattern → component]
```tsx
// components/ui/Card.tsx
export function Card({ variant = "default", className, children }: CardProps) {
  const base = "relative overflow-hidden border border-border backdrop-blur-lg";
  const variants = {
    default: "rounded-2xl bg-surface-card shadow-lg ring-1 ring-zinc-200/50 dark:ring-accent/20 p-6 sm:p-8 md:p-12",
    compact: "rounded-lg border-accent/20 shadow-md hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 p-4 sm:p-6",
    recessed: "rounded-2xl bg-surface-card-muted",
  };
  return <div className={cn(base, variants[variant], className)}>{children}</div>;
}
```

### 10.2 `<Button>` — Part B §5, componentized
Props: `variant: "primary" | "secondary" | "ghost"`, `shape: "pill" | "rounded"`, `disabled`. Encapsulates the focus-visible ring (Part B §5.5) once, globally, so no section has to restate it.

### 10.3 `<Badge>` / `<Pill>` — Part B §6, componentized
`<Pill>` for tech tags (§6.1), `<Badge variant="status">` for "Available for..." (§6.2), `<Badge variant="category">` for mono-caps tags (§6.3), `<Badge variant="live">` for the LIVE indicator (§6.4).

### 10.4 `<StatCounter>` — [BUILD]
Props: `value: number`, `suffix?: string` (e.g. `"+"`), `label: string`. Animates from 0 to `value` over `duration-counter` (1200ms, Part B §8.2) using Framer Motion's `useMotionValue` + `animate()`, triggered on scroll into view (`whileInView`, `viewport={{ once: true }}`). Respects `useReducedMotion()` — when true, renders the final value immediately, no count-up.

### 10.5 `<CyclingText>` — [BUILD]
Props: `words: string[]`, `interval?: number` (default `interval-cycle`, 2000ms, Part B §8.2). Cross-fades/slides between words on a timer. Used for: Experience's "And a new **[journey/adventure/chapter]** ahead", Technical Stack's rotating tagline. Built on Framer Motion's `AnimatePresence` + `mode="wait"`. Respects reduced motion by switching words with an instant cut (no transition) rather than disabling the cycle entirely (the *content* still needs to change for information parity — only the *motion* is removed).

---

## Part C — End

**Covers:** Header/Navbar (cloned + new logo/⌘K/AI-Twin-nav additions), Footer (built to match video, styled with cloned conventions), Theme Toggle (cloned exact), Command Palette (new, full spec), Scroll Progress Bar (new), Cursor System (cloned mechanism + new second color), Page Transition & Welcome Overlay (cloned), AI Twin Chat Bubble/Panel (cloned, with tool-execution-feedback UX preserved), "Ask About This" (new, built on a cloned event pattern), and the five shared UI primitives (Card, Button, Badge/Pill, StatCounter, CyclingText) that every section in Part D composes.

**Flagged correction:** `bg-[#56A5A9]` hardcoded hex in the reference repo's navbar/contact-button → replaced with `bg-accent` token everywhere, per our own consistency rule.

**Not yet covered:** per-section UI/UX/accessibility/responsive detail — Hero, About, Experience, Selected Work, Built & Shipped, Technical Stack, AI Twin section, Contact section (Part D); AI Twin full prompt + new tools + backend detail (Part E); numbered implementation task plan (Part F).

Reply **"next"** for Part D (Pages & Sections), or flag corrections to Part C first.
