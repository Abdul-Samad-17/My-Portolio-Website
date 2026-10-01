# Abdul Samad — Portfolio Site: Project Blueprint
## Part B — Design System

> Every value below is either **[CLONE]** — read directly from the reference repo's real `tailwind.config.js` / `globals.css` / component files — or **[BUILD]** — a new token needed for sections that don't exist in the reference repo (the pinned-scroll layouts, timeline, shutter cards, ⌘K palette, cube hero background). [BUILD] tokens are designed to sit naturally alongside the [CLONE] ones — same hue family, same naming convention, same HSL/CSS-variable mechanism.
>
> **Every component in Parts C–F must reference these tokens by name (Tailwind class or CSS variable) — never a raw hex/px value.**

---

## 1. Color Tokens

### 1.1 Mechanism [CLONE]
HSL triplets stored as CSS custom properties (no `hsl()` wrapper in the variable itself, so Tailwind can apply opacity modifiers like `bg-accent/20`), consumed via `tailwind.config.js`'s `colors` block as `hsl(var(--token))`. Defined once at `:root` (light) and once under `.dark` (dark). This is the exact reference-repo mechanism — do not switch to a different theming approach (e.g. Tailwind v4 `@theme`).

```css
/* src/styles/globals.css — [CLONE] base, extended */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --border: 240 5.9% 90%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;

  --accent-light: 183 65% 45%;
  --accent: 183 65% 35%;
  --accent-dark: 183 65% 25%;
  --accent-foreground: 240 5.9% 10%;

  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;

  /* [BUILD] additions — new tokens for sections not in the reference repo */
  --surface-card: 0 0% 100%;         /* base white card fill, light mode */
  --surface-card-muted: 240 4.8% 97%; /* slightly recessed card, e.g. shutter-card backing panel */
  --cursor-trail-secondary: 265 60% 65%; /* the second (purple/lavender) cursor-trail hue, light mode */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;

  --accent-light: 183 63% 50%;
  --accent: 183 63% 40%;
  --accent-dark: 183 63% 30%;
  --accent-foreground: 0 0% 98%;

  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;

  /* [BUILD] additions */
  --surface-card: 240 8% 7%;          /* dark glass card fill */
  --surface-card-muted: 240 8% 5%;    /* recessed backing panel, dark */
  --cursor-trail-secondary: 265 70% 70%; /* second cursor-trail hue, dark mode — indigo/violet */
}
```

### 1.2 Resolved Hex Reference (for design tools / non-Tailwind contexts only — never hardcode these in components)

| Token | Light (hex) | Dark (hex) |
|---|---|---|
| `--background` | `#FFFFFF` | `#09090B` |
| `--foreground` | `#09090B` | `#FAFAFA` |
| `--border` | `#E4E4E7` | `#27272A` |
| `--accent-light` | `#28B6BD` | `#2FC8D0` |
| `--accent` (primary brand teal) | `#1F8D93` | `#26A0A6` |
| `--accent-dark` | `#166569` | `#1C787D` |
| `--accent-foreground` | `#18181B` | `#FAFAFA` |
| `--muted` | `#F4F4F5` | `#27272A` |
| `--muted-foreground` | `#71717A` | `#A1A1AA` |
| `--destructive` | `#EF4444` | `#7F1D1D` |
| `--surface-card` [BUILD] | `#FFFFFF` | `#0F0F12` (≈`240 8% 7%`) |
| `--surface-card-muted` [BUILD] | `#F7F7F8` | `#0C0C0E` |
| `--cursor-trail-secondary` [BUILD] | `#8A63D2`-ish (`265 60% 65%`) | `#9B72E8`-ish (`265 70% 70%`) |

**Brand hue is 183° (teal/cyan)** across every accent shade in both themes — this is the single color identity of the whole site. The `--cursor-trail-secondary` hue (265°, violet) is the *only* second hue anywhere in the palette, reserved exclusively for the cursor-trail effect, matching what Abdul's reference videos show (two-color cursor smoke). Never introduce a third arbitrary hue anywhere else in the UI.

### 1.3 Tailwind Consumption [CLONE base + BUILD extension]

```js
// tailwind.config.js — theme.extend.colors
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  border: "hsl(var(--border))",
  accent: {
    light: "hsl(var(--accent-light))",
    DEFAULT: "hsl(var(--accent))",
    dark: "hsl(var(--accent-dark))",
    foreground: "hsl(var(--accent-foreground))",
  },
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },
  // [BUILD] additions
  surface: {
    card: "hsl(var(--surface-card))",
    "card-muted": "hsl(var(--surface-card-muted))",
  },
  "cursor-trail": {
    secondary: "hsl(var(--cursor-trail-secondary))",
  },
},
```

Usage in components: `bg-accent`, `text-accent`, `border-accent/20`, `bg-accent/10`, `bg-surface-card`, `bg-surface-card-muted`, etc. — opacity modifiers work automatically because of the raw-HSL-triplet storage mechanism.

### 1.4 Color Usage Rules

| Context | Token |
|---|---|
| Page background | `bg-background` |
| Body text | `text-foreground` |
| Secondary/muted text (descriptions, labels) | `text-muted-foreground` |
| Card fill | `bg-surface-card` (glass, see §4) |
| Recessed backing panel (Built & Shipped shutter stack) | `bg-surface-card-muted` |
| Borders/dividers | `border-border` |
| Primary buttons, links, active nav pill, headings' second word, stat numbers | `bg-accent` / `text-accent` |
| Button hover state | `accent-light` |
| Button active/focus state | `accent-dark` |
| Small tag/pill backgrounds | `bg-accent/10` with `text-accent` and `border-accent/20` — this exact triplet is the reference repo's real pill pattern (`project-card.tsx`, confirmed) |
| Destructive/error state | `text-destructive` / `bg-destructive` |
| Cursor trail, color 1 | `accent` (teal) |
| Cursor trail, color 2 | `cursor-trail-secondary` (violet) — **[BUILD], used nowhere else in the UI** |

---

## 2. Typography

### 2.1 Font Family — Confirmed Decision (overrides reference repo)
The reference repo uses **no custom font** — plain Tailwind `font-sans` (system font stack). Per Abdul's explicit decision, we diverge here: **Inter** (body) + **Sora** (headings), both self-hosted via `next/font/google` to avoid layout shift and external requests. This is the one intentional [BUILD] departure from the clone in this entire document.

```ts
// src/pages/_app.tsx — [BUILD] addition to the cloned _app.tsx
import { Inter, Sora } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
```

```js
// tailwind.config.js — theme.extend.fontFamily [BUILD]
fontFamily: {
  sans: ["var(--font-body)", "ui-sans-serif", "system-ui"],
  heading: ["var(--font-heading)", "ui-sans-serif", "system-ui"],
},
```
Apply `font-heading` explicitly on every `h1`–`h4` and section-title component; body text uses the default `font-sans` (Inter) with no extra class needed.

### 2.2 Type Scale

Base sizing follows Tailwind's default scale (no custom `fontSize` overrides needed — the reference repo doesn't customize this either, confirmed). Sizes below are the *actual responsive classes* extracted from real reference components (e.g. the About hero H1: `text-4xl sm:text-5xl md:text-5xl lg:text-4xl xl:text-6xl font-bold`) plus [BUILD] additions for sections the reference repo doesn't have.

| Token / role | Mobile | Tablet (`sm:`/`md:`) | Desktop (`lg:`/`xl:`) | Weight | Font |
|---|---|---|---|---|---|
| Hero name (H1, e.g. "Abdul Samad") | `text-4xl` (36px) | `text-5xl` (48px) | `xl:text-7xl` (72px) [BUILD, larger than reference — matches video's much bigger hero name] | `font-bold` (700) | `font-heading` |
| Section H2 ("About **Abdul**", "Selected **Work**") | `text-3xl` (30px) | `text-4xl` (36px) | `text-5xl` (48px) | `font-bold` (700) | `font-heading` |
| Card/subsection H3 | `text-xl` (20px) | `text-2xl` (24px) | `text-2xl` (24px) | `font-semibold` (600) | `font-heading` |
| Body paragraph | `text-base` (16px) | `text-lg` (18px) | `text-lg` (18px) | `font-medium` (500) | `font-sans` |
| Small/secondary text (card meta, dates) | `text-sm` (14px) | `text-sm` (14px) | `text-base` (16px) | `font-medium` (500) | `font-sans` |
| Mono-caps label (`ROLE`, `IMPACT`, category tags) [BUILD] | `text-[11px]` | `text-xs` (12px) | `text-xs` (12px) | `font-semibold` (600), `tracking-widest`, `uppercase` | `font-sans` |
| Stat counter number (Hero, About) [BUILD] | `text-3xl` (30px) | `text-4xl` (36px) | `text-4xl` (36px) | `font-bold` (700) | `font-heading` |
| Button label | `text-sm` (14px) | `text-base` (16px) | `text-base` (16px) | `font-semibold` (600) | `font-sans` |
| Pill/tag text | `text-xs` (12px) | `text-xs` (12px) | `text-xs` (12px) | `font-medium` (500) | `font-sans` |

**Line height & letter spacing [CLONE]** — set globally on `body` in the reference repo, keep exactly:
```css
body {
  font-feature-settings: "liga" 1, "calt" 1;
  letter-spacing: 0.01em;
  line-height: 1.6;
}
```
Headings override to a tighter `leading-tight` (1.15–1.25) per Tailwind's default heading behavior — apply `leading-tight` explicitly on all `font-heading` elements since the global 1.6 is body-tuned.

### 2.3 Gradient Text — [CLONE]
The reference repo's real hero heading pattern (confirmed in `about-hero.tsx`) — reuse for every heading's colored second word:
```html
<h1 className="bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
```
Apply this exact gradient-text pattern (not a flat `text-accent`) anywhere the design shows a heading's second word in teal — e.g. "Applied AI **Engineer**", "About **Abdul**", "Selected **Work**", "Professional **Experience**", "Get in **Touch**", "Technical **Stack**".

---

## 3. Spacing & Layout

### 3.1 Container [CLONE]
Real pattern from `about-hero.tsx`, used as the standard page-section container everywhere:
```html
<div className="mx-auto max-w-7xl px-6 py-20 sm:px-14 md:px-20">
```
- Max width: `max-w-7xl` (80rem / 1280px)
- Horizontal padding: `px-6` mobile → `sm:px-14` tablet → `md:px-20` desktop
- Vertical section padding: `py-20` (5rem) as the default between-section rhythm; individual sections may use `py-16`/`py-24` where content density calls for it (specified per-section in Part D)

### 3.2 Spacing Scale
Standard Tailwind scale (4px base unit) — no custom overrides in the reference repo, none needed. Use semantically:

| Use | Class |
|---|---|
| Tight internal gaps (icon-to-label) | `gap-2` (8px) |
| Standard element gaps (stat blocks, pill rows) | `gap-3` (12px) |
| Card internal padding, mobile | `p-6` (24px) |
| Card internal padding, tablet | `sm:p-8` (32px) |
| Card internal padding, desktop | `md:p-12` (48px) — **[CLONE]**, real value from `about-hero.tsx` |
| Section-to-section vertical rhythm | `py-20` (80px), see §3.1 |
| Grid gaps (stat cards, project cards) | `gap-4` mobile → `gap-6` desktop |

### 3.3 Breakpoints [CLONE + one BUILD addition]
```js
// tailwind.config.js — theme.extend.screens
screens: {
  xs: "360px",   // [CLONE] — real custom breakpoint, used for the smallest phones
  // sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px — Tailwind defaults, unchanged
},
```
Full responsive behavior tables (what collapses/stacks at which breakpoint, per component) are specified per-section in Part D — this doc only fixes the breakpoint values themselves.

---

## 4. Cards, Borders, Radii, Shadows, Blur

### 4.1 Standard Glass Card — [CLONE], the single most-reused primitive
Real pattern, confirmed in `about-hero.tsx` and `project-card.tsx`:
```html
<div className="relative overflow-hidden rounded-2xl border border-border bg-muted/20 shadow-lg ring-1 ring-zinc-200/50 backdrop-blur-lg dark:ring-accent/20">
```
This exact class combination — `rounded-2xl` (16px radius) + `border-border` + `bg-muted/20` + `shadow-lg` + `ring-1 ring-zinc-200/50 dark:ring-accent/20` + `backdrop-blur-lg` — **is the Card primitive** built in Part C (`components/ui/Card.tsx` or equivalent), and every section card (About, Experience, Selected Work, AI Twin, Contact) extends it rather than re-declaring its own card styling.

**[BUILD] variant — smaller/tighter card** (project cards, tag rows), also confirmed real:
```html
<div className="overflow-hidden rounded-lg border border-accent/20 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20">
```
Use `rounded-lg` (8px) + `border-accent/20` + `shadow-md` for smaller/denser cards (project grid cards, "Also built" repo cards, case-study cards), reserving the larger `rounded-2xl` glass treatment for primary section cards (About left card, Experience cards, AI Twin card, Contact cards).

**[BUILD] — recessed backing panel** (Built & Shipped shutter-stack background, visible in the light-mode screenshot as a gray panel behind the sliding card):
```html
<div className="rounded-2xl bg-surface-card-muted">
```

### 4.2 Radii Scale

| Use | Class | px |
|---|---|---|
| Small pill/tag | `rounded-full` | — |
| Small card, project grid card | `rounded-lg` | 8px |
| Standard input/button | `rounded-lg` | 8px |
| Primary section card | `rounded-2xl` | 16px |
| Large hero image / business card widget | `rounded-xl` | 12px |

### 4.3 Shadows & Glow

| Use | Class |
|---|---|
| Standard card elevation | `shadow-lg` |
| Small card elevation | `shadow-md` |
| Hover lift (project cards) | `hover:shadow-lg hover:shadow-accent/20` — **[CLONE]**, real hover pattern |
| Accent glow (dark mode focal elements, e.g. business card, chat bubble) | `drop-shadow-accent` → resolves to `filter: drop-shadow(0 0 1em hsl(var(--accent)))` — **[CLONE]**, defined in `tailwind.config.js`'s `dropShadow.accent` |
| Ring/outline on cards | `ring-1 ring-zinc-200/50 dark:ring-accent/20` — **[CLONE]** |

### 4.4 Blur / Glass Effect
`backdrop-blur-lg` on every glass card (both themes) — **[CLONE]**. Background accent blobs (decorative glow shapes behind hero/about cards) use `blur-3xl`, confirmed real pattern:
```html
<div className="bg-accent/15 pointer-events-none absolute -right-10 -top-10 h-56 w-56 sm:h-72 sm:w-72 rounded-full blur-3xl" />
```
Use this exact decorative-blob pattern behind any large card that needs ambient color (About left card, AI Twin card, Contact cards) — position/size varies per section but the `blur-3xl` + `bg-accent/15` (or `/10`) + `rounded-full` + `pointer-events-none` + `absolute` combination is fixed.

---

## 5. Buttons

### 5.1 Primary Button [CLONE pattern, extended]
```html
<button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-light active:bg-accent-dark sm:text-base">
```
- Fill: `bg-accent`, text: `text-accent-foreground` (near-black in light mode for AA contrast against the mid-tone teal, near-white in dark mode — confirmed by the token table in §1.2: light `--accent-foreground` is `#18181B`, dark is `#FAFAFA`)
- Hover: `hover:bg-accent-light`
- Active/focus: `active:bg-accent-dark`
- **[BUILD] shape note:** the reference videos show hero/nav CTAs as full pills (`rounded-full`), not `rounded-lg` — for Hero/Contact primary CTAs use `rounded-full` instead of `rounded-lg`, keeping every other property identical. Standard in-content buttons (Read case study, Send Message) use `rounded-lg`.

### 5.2 Secondary/Outline Button [BUILD, matching video]
```html
<button className="rounded-full border border-accent/40 bg-transparent px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/10 sm:text-base">
```

### 5.3 Ghost/Text Button (e.g. "Talk to AI Twin" in hero)
```html
<button className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent sm:text-base">
```
Matches the real `project-card.tsx` "Source code" link pattern (`text-foreground` → `hover:text-accent`).

### 5.4 Disabled State (e.g. Resume button before a real PDF exists)
Append `disabled:cursor-not-allowed disabled:opacity-50` to any button variant above.

### 5.5 Focus State (accessibility — required on every interactive element)
`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background` — [BUILD], not explicitly in the reference repo's snippets read so far, but required to meet the WCAG AA commitment in Part A §0.3; apply globally via the Button primitive in Part C so no component has to restate it.

---

## 6. Tags, Pills, Badges

### 6.1 Skill/Tech Tag — [CLONE], exact real pattern
```html
<span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
```

### 6.2 Status Badge ("Available for New Opportunities") — [BUILD, matching video]
```html
<span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
  Available for new opportunities
</span>
```
The pulsing dot (`animate-pulse`) must respect `prefers-reduced-motion` — see §8.

### 6.3 Category Tag (mono-caps, e.g. "MCP", "RAG" in the ⌘K palette / case study cards) — [BUILD]
```html
<span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
```
No background/border — plain mono-caps label, right-aligned in list rows, matching the ⌘K screenshots.

### 6.4 "LIVE" Badge — [BUILD]
```html
<span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent">
  <ExternalLinkIcon className="h-3 w-3" /> LIVE
</span>
```

---

## 7. Logo / Wordmark

Until the final "AS" logo file is supplied (per Part A §0.5), the fallback wordmark:
```html
<span className="font-heading text-xl font-bold">
  <span className="text-foreground">A</span><span className="text-accent">S</span>
</span>
```
Matches the reference repo's real header pattern of styling initials/name in the header nav — first letter neutral, second letter accent (same "second word/element in teal" rule as headings, §2.3). Once the real logo file exists, it replaces this span 1:1 in the Header/Footer components (Part C) — no structural change needed elsewhere.

---

## 8. Motion & Animation Tokens

### 8.1 Reduced Motion — [CLONE], global, non-negotiable
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```
This is real, already-working code in `globals.css` — every [BUILD] animation (cursor trail, word-cycling, shutter-card scroll, cube background, stat count-up) must be additionally gated in JS via Framer Motion's `useReducedMotion()` hook where CSS alone can't stop a canvas/JS-driven effect (cursor trail, cube background, count-up) — documented per-component in Part C/D.

### 8.2 Easing & Duration [BUILD — reference repo uses simple Framer Motion defaults; we standardize for consistency]

| Token | Value | Use |
|---|---|---|
| `ease-standard` | `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) | Section reveals, card entrances |
| `ease-snappy` | `cubic-bezier(0.4, 0, 0.2, 1)` | Hover states, button transitions |
| `duration-micro` | `200ms` | Hover/focus color transitions |
| `duration-base` | `400ms` | Card/element entrance |
| `duration-section` | `600–800ms` | Full section reveal-on-scroll |
| `duration-counter` | `1200ms` | Stat count-up animation |
| `interval-cycle` | `2000ms` | Word-cycling text (Experience "and a new [word] ahead", Technical Stack taglines) — confirmed from Abdul's video description |

### 8.3 Chat Loading Animation — [CLONE]
Real keyframe, reused for the AI Twin's typing/loading indicator:
```css
@keyframes loading {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0%); }
  100% { transform: translateX(100%); }
}
```

---

## 9. Cursor System

### 9.1 Custom Pointer Images — [CLONE], theme-aware
Real files, reused as-is (asset paths only, already in `/public`):
- Default: `icons8-select-cursor-18-{light,dark}.png`
- Hover (links/buttons): `icons8-hand-cursor-18-{light,dark}.png`
- Text inputs: `icons8-text-cursor-19-{light,dark}.png`

Applied via the theme class exactly as cloned:
```css
body { cursor: url("/icons8-select-cursor-18-light.png"), auto; }
.dark body { cursor: url("/icons8-select-cursor-18-dark.png"), auto; }
a:hover, button:hover { cursor: url("/icons8-hand-cursor-18-light.png"), pointer; }
.dark a:hover, .dark button:hover { cursor: url("/icons8-hand-cursor-18-dark.png"), pointer; }
input, textarea { cursor: url("/icons8-text-cursor-19-light.png"), text; }
.dark input, .dark textarea { cursor: url("/icons8-text-cursor-19-dark.png"), text; }
```

### 9.2 Fluid Trail Colors — [CLONE mechanism + BUILD color values]
The trail canvas (`fluid-cursor.tsx`/`cursor-trail-canvas.tsx`) is cloned mechanically; its color inputs are the two design tokens defined in §1:
- Primary trail color: `accent` (teal, hue 183°)
- Secondary trail color: `cursor-trail-secondary` (violet, hue 265°) — **[BUILD]**, since the reference repo's real cursor trail is single-hue (teal only, confirmed by not finding a second color reference in the cursor files read); Abdul's videos clearly show two colors, so this second token is a deliberate, scoped addition used **only** by the cursor trail, nowhere else in the UI (per §1.4).

---

## Part B — End

**Covers:** Full color token system (real HSL values from the reference repo + hex reference table + [BUILD] additions), typography (confirmed Inter/Sora decision, real responsive type scale extracted from live components, gradient-text heading pattern), spacing/container/breakpoints, card/border/radius/shadow/blur system (the real glass-card pattern that becomes the Card primitive), button variants, tags/pills/badges, logo/wordmark fallback, motion tokens (reduced-motion — real and non-negotiable — plus new easing/duration/cycle-interval tokens), and the cursor system (real theme-aware pointer images + the two-color trail spec).

**Every token here is named** — Parts C–F reference `bg-accent`, `text-muted-foreground`, `rounded-2xl border-border bg-muted/20 shadow-lg ring-1 ring-zinc-200/50 backdrop-blur-lg dark:ring-accent/20` (the Card primitive), `duration-section`, `interval-cycle`, etc. — never a raw value.

**Not yet covered:** global component specs — Header, Footer, ⌘K palette, Card/Button/Badge primitives as actual reusable components, cursor trail component, chat bubble/panel (Part C); per-section UI/UX/accessibility/responsive detail (Part D); AI Twin full prompt + new tools + backend detail (Part E); numbered implementation task plan (Part F).

Reply **"next"** for Part C (Global Components), or flag corrections to Part B first.
