# Abdul Samad — Portfolio Site: Build Guide for Antigravity

You are building a personal portfolio website. This file is your entry point — read it first, then follow the numbered documents in `/docs` in order. You have no context beyond what's in this repo; nothing outside these files should be assumed.

## Read order

1. **`docs/01-overview-and-architecture.md`** — what this project is, who it's for, the full tech stack (with exact pinned versions), system architecture, folder structure, environment variables. Start here always.
2. **`docs/02-design-system.md`** — every color, gradient, font, spacing value, radius, shadow, and motion token. Nothing in later docs restates a raw value — they reference these tokens by name.
3. **`docs/03-global-components.md`** — Header, Footer, the ⌘K command palette, cursor effect, theme toggle, AI Twin chat shell, and the shared UI primitives (Card, Button, Badge, StatCounter, CyclingText) every section is built from.
4. **`docs/04-pages-and-sections.md`** — every page and every section of the home page: layout, content, responsive behavior, states, accessibility.
5. **`docs/05-ai-twin-and-backend.md`** — the AI Twin's full system prompt structure, the tool-calling pipeline, both API routes' exact contracts, rate limiting, and the content-file schemas.
6. **`docs/06-implementation-plan.md`** — **your actual task list.** Numbered hierarchically (`1` → `1.1` → `1.1.1`), organized into 13 phases. This is what you execute, in order, against everything the five docs above specified.

## The one rule that overrides your defaults

Read `docs/06-implementation-plan.md` §0 (the Workflow Gate) before writing any code. In short: implement one parent task (e.g. `4.3`), test it at mobile/tablet/desktop, summarize what you did, **stop and wait for Abdul's approval**, and only commit/push after that approval. Never batch multiple parent tasks into one commit. Never push without approval. This applies to every parent task in every phase, no exceptions.

## How this project was put together — read this before you second-guess a decision

This is not a from-scratch design. It's built in two layers, and every task in `06-implementation-plan.md` is tagged accordingly:

- **[CLONE]** — structure and logic adapted from a real, public, MIT-licensed reference repository: `github.com/Nikunj2003/My-Next-Js-Portfolio`. Abdul has the author's direct permission in addition to the MIT license. Where a doc says `[CLONE]`, real source code was read to produce that spec — it is not a guess at what the pattern probably looks like. Content, copy, and branding are always Abdul's own; only structure/logic/mechanism is reused.
- **[BUILD]** — new work, for sections that exist on the reference site's live deployment but not in its public repo (the repo and the live site have diverged — this is explained in `01-overview-and-architecture.md`'s provenance note). These were built from the screenshots and screen recordings in `reference/screenshots/` (see below), following the same conventions as the [CLONE] parts so the whole codebase reads as one consistent system.

Keep `THIRD_PARTY_NOTICES.md` (created in task `1.3`) accurate and up to date — it's the MIT attribution for everything tagged [CLONE].

## Visual reference material

`reference/screenshots/` contains real screenshots of the live reference site (`nikunj.codenex.dev`), used to spec every `[BUILD]` section in `04-pages-and-sections.md`. Look at these *alongside* that document, not instead of it — the doc is the authoritative spec (exact tokens, exact responsive rules); the images are there so you can see what the doc is describing.

| File | What it shows |
|---|---|
| `reference-site-full-page-dark.png` | The reference site, dark theme, full scroll — overall layout rhythm and card styling |
| `reference-site-full-page-light.png` | The reference site, light theme, full scroll — use this one for the light-mode token values in `02-design-system.md` |
| `command-palette-case-studies.png` | ⌘K palette, Case Studies result group |
| `command-palette-nav-and-links.png` | ⌘K palette, Go To / Links groups |
| `command-palette-projects.png` | ⌘K palette, Projects group with LIVE badges |
| `command-palette-keyboard-select.png` | ⌘K palette, keyboard-selected row state |

**Logo:** not included here — Abdul is adding the final logo file separately, directly into `public/logo/`. Until it's in place, use the text-wordmark fallback specified in `02-design-system.md` §7 everywhere a logo mark is needed (Header, Footer, favicon). Once the real file appears in `public/logo/`, swap it in per `06-implementation-plan.md` task `10.2` — no other structural change needed.

**Not included, deliberately:** the original screen-recording videos (`.mp4`) these screenshots were extracted from. You can't parse video, and at 30–55MB each they'd only bloat the project for no benefit — everything useful from them is already distilled into `04-pages-and-sections.md`'s written spec and the stills above. If you ever need a detail these screenshots don't cover, ask Abdul rather than guessing.

## Folder structure for this reference material

```
docs/
  01-overview-and-architecture.md
  02-design-system.md
  03-global-components.md
  04-pages-and-sections.md
  05-ai-twin-and-backend.md
  06-implementation-plan.md
reference/
  screenshots/
    reference-site-full-page-dark.png
    reference-site-full-page-light.png
    command-palette-case-studies.png
    command-palette-nav-and-links.png
    command-palette-projects.png
    command-palette-keyboard-select.png
  README.md   <- this file
```

Place this `reference/` folder and the `docs/` folder at the project root, alongside `package.json`, before starting Phase 1.
