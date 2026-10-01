# Abdul Samad — Portfolio Site: Project Blueprint
## Part E — AI Twin & Backend (Full API Contracts, System Prompt, Tools, Rate Limiting, Email)

> Every contract below was read directly from the reference repo's real `src/pages/api/chat.ts` (575 lines), `src/config/ai.ts`, `src/utility/rate-limiter.ts`, `src/pages/api/sendmail.ts`, and `src/types/tools.ts` — not estimated. **This is the most copy-exact part of the whole blueprint**: the chat pipeline's control flow, rate limiting math, and fallback mechanism are all real, tested code. The only genuinely new work in this part is (1) swapping Nikunj's knowledge base for Abdul's, (2) pointing the endpoint at Groq, and (3) two new tools for the case-studies feature.

---

## 1. `/api/chat` — Full Request/Response Contract

### 1.1 Request Shape — [CLONE], exact
```ts
interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface ChatRequest {
  message: string;                      // required
  conversationHistory?: Message[];      // client keeps full history, server only uses last 10
  currentPage?: string;                 // default "home"
  currentTheme?: "light" | "dark";      // default "light"
  userAgent?: string;                   // optional, falls back to request header
}
```

### 1.2 Response Shape — [CLONE], exact
```ts
interface ChatResponse {
  response: string;          // the natural-language reply (markdown)
  actions?: unknown[];       // reserved, not populated in current flow
  toolCalls?: ToolCall[];    // present only if the model invoked tools this turn
  suggestions?: string[];    // 3–6 follow-up question strings, may be absent
}
```

### 1.3 Control Flow — [CLONE], exact, step by step
1. Reject non-POST with `405`.
2. **Rate limit check** (§3) — `40 requests/minute` per user. On failure: `429` with `{ error: "Too many requests. Please wait a minute before trying again." }`.
3. Lazily initialize the tool registry once per server instance (`ensureToolsInitialized`) — throws a specific "Tool initialization failed" error if it fails, caught later for a dedicated `500` response.
4. Validate `message` is a non-empty string → `400` if not.
5. Validate `process.env.LLM_API_KEY` is set → throws if missing (caught by the outer try/catch, falls through to the keyword-fallback path, §5).
6. Build `ToolContext` (`currentPage`, `theme`, `userAgent`, a freshly generated `sessionId`), then **enhance it** by running `contextAwareToolRegistry.detectPageContext()` against the message text and the `Referer` header — if it detects a more specific page/section than what the client sent, it overrides `currentPage`/`currentSection`. This lets the AI Twin reason about "where the user actually is" even if the client's own page-tracking is stale.
7. Trim `conversationHistory` to the last 10 messages (cost/context control).
8. Assemble `messages[]`: `system` (the full `SYSTEM_PROMPT`) → mapped history (`user`/`assistant` roles) → the new `user` message.
9. Fetch contextual tool/function definitions for this `ToolContext` via `contextAwareToolRegistry.getContextualFunctionDefinitions(toolContext)` — **not all tools are always offered**; the registry filters which tools make sense for the current page/section (e.g. don't offer a "navigate to Experience" tool if the user is already there). Full tool list in §4.
10. **First LLM call**: `axios.post(`${LLM_BASE_URL}/chat/completions`, { model, messages, tools, tool_choice: "auto", top_p: 0.7, temperature: 0.8 })`.
11. If the response includes `tool_calls`: execute each via `contextAwareToolRegistry.executeTool(name, args, context)` (parallel-safe, each wrapped in its own try/catch so one failing tool doesn't kill the others), collect `ToolResult`s, format them back into text, and make a **second LLM call** (same messages + the assistant's tool-call turn + a `tool` role message per result) to get a natural-language response that incorporates what the tools returned.
12. If `aiResponse` is still empty after all that, fall back to a hardcoded apology string (not the keyword-fallback system — that's only for hard errors, §5).
13. **Separate, additional LLM call** to generate 3–6 follow-up suggestion strings (§2.2) — wrapped in its own try/catch; failure here never breaks the main response, it just omits `suggestions`.
14. Return `200` with the full `ChatResponse`.

### 1.4 LLM Endpoint Construction — [CLONE mechanism], Groq values
```ts
const invokeUrl = process.env.LLM_BASE_URL
  ? `${process.env.LLM_BASE_URL}/chat/completions`
  : "https://integrate.api.nvidia.com/v1/chat/completions"; // reference repo's own default — we always set LLM_BASE_URL so this never triggers
```
With `LLM_BASE_URL=https://api.groq.com/openai/v1` (Part A §4), this resolves to `https://api.groq.com/openai/v1/chat/completions` — Groq's real OpenAI-compatible endpoint. **Zero code changes required** — confirmed by reading the actual request-building code above.

---

## 2. System Prompt — Full Spec

### 2.1 Structure — [CLONE] shape, [BUILD] content
The real `SYSTEM_PROMPT` (126 lines in `src/config/ai.ts`) has five parts. Each is cloned structurally; content is replaced with Abdul's:

```
## GUARDRAILS & BEHAVIOR
  [CLONE verbatim pattern] — only discuss the subject's professional profile,
  stay professional/enthusiastic, redirect off-topic questions, use
  markdown+emoji for readability, end with a follow-up question.

## KNOWLEDGE BASE ABOUT {ABDUL SAMAD}
  [BUILD content, CLONE structure] — Personal Information, Current/Previous
  Experience (from src/data/experience.ts), Technical Skills (from
  src/data/skills.ts), Key Projects (from src/data/projects.ts), Education,
  Key Achievements. This entire knowledge base is embedded as literal text
  in the system prompt string — NOT fetched via tool calls at request time.
  This is the real mechanism: grounding = static context in the prompt,
  not RAG. Confirmed by reading the actual 126-line file — there is no
  retrieval step before this text is sent.

## RESPONSE GUIDELINES
  [CLONE verbatim] — markdown formatting rules, blockquotes for notes,
  code-ticks for technical terms, always end with a follow-up question,
  canonical off-topic redirect line (reworded for Abdul: "I'm here to help
  you learn about Abdul Samad's professional background and technical
  expertise. What would you like to know about his experience, skills, or
  projects?").

## TOOL USAGE RULES (CRITICAL)
  [CLONE verbatim + BUILD extension] — the exact canonical-action-name
  enforcement for manage_ui_state (scroll/focus/highlight/show/hide),
  extended with equivalent canonical-argument guardrails for the two new
  tools (§4.4, §4.5) so the model can't invent malformed arguments for
  those either.
```

### 2.2 Why the Knowledge Base Lives in the Prompt, Not a Tool
This is an important real finding, worth stating explicitly for whoever implements it: **the reference repo does not do retrieval-augmented generation.** The entire bio/experience/skills/projects text is pasted directly into `SYSTEM_PROMPT` as markdown, sent on every single request. This works because a personal portfolio's content is small enough to fit comfortably in a model's context window — it's a deliberate simplicity choice, not a limitation we're working around. **Keep this approach** — do not build a vector DB or RAG pipeline for this (Part A §0.6 already rules this out; this section is where the actual code confirms why that's fine). If Abdul's content ever grows large enough that the prompt becomes unwieldy (many dozens of case studies, for instance), *that* is the trigger to revisit — not before.

### 2.3 Suggestion Generator — [CLONE], exact, separate prompt
A second, smaller system prompt (`SUGGESTION_SYSTEM_PROMPT`) drives the follow-up-questions feature as its own LLM call (§1.3 step 13):
- Output must be **only** a raw JSON array of 3–6 strings, each under 50 characters, no commentary.
- Six canonical categories: `experience, skills, projects, achievements, contact, career_goals` — **extend to seven for Abdul**, adding `esports_analytics` (or similar) as its own category given his PUBG Mobile analyst work, so the diversity logic (§2.4) treats it as a distinct topic rather than folding it into "projects."
- Max 2 suggestions from the same category per response (enforced twice — once in the prompt instructions, once again in code, §2.4).

### 2.4 Suggestion Post-Processing — [CLONE], exact, all real code
This is real, already-working logic — clone verbatim:
1. Regex-based keyword categorization of the conversation so far (`categoryKeywords: Record<string, RegExp>`), to detect which categories have already been discussed.
2. Request the LLM to prefer *unused* categories.
3. Parse the response defensively — strip markdown code fences, try `JSON.parse`, fall back to regex-extracting a `[...]` substring if the model wrapped it in prose anyway.
4. Filter: must be a string, trimmed, non-empty, ≤120 chars (note: the prompt asks for ≤50 but validation allows ≤120 — keep this exact real tolerance), not a duplicate of something the user already asked, deduplicated case-insensitively.
5. **Diversity enforcement in code** (not just prompt instruction): iterate the cleaned suggestions, categorize each via the same regex map, allow max 1 per category (stricter than the prompt's "max 2"), stop at 6.
6. If fewer than 3 survive, backfill from a hardcoded `fallbackByCategory` map (one safe canned question per category) for any category not yet represented — extend this fallback map with Abdul's real categories (including the new `esports_analytics` one from §2.3).

### 2.5 Model & Request Parameters — [CLONE values, except model]
```ts
{
  model: AI_MODEL,        // was "mistralai/mistral-small-3.1-24b-instruct-2503" → Groq model, see §2.6
  messages,
  tools: /* contextual function defs, §4 */,
  tool_choice: "auto",
  top_p: 0.7,
  temperature: 0.8,
}
```
Suggestion-generation call uses `temperature: 0.7, top_p: 0.9` (no `tools`, since it's a pure text-completion task) — clone exactly.

### 2.6 Model Choice for Groq
`AI_MODEL` changes from the reference repo's NVIDIA NIM-hosted Mistral model to a Groq-hosted model. Recommended: **`llama-3.3-70b-versatile`** — Groq's strongest general-purpose free-tier model with reliable function-calling support (required, since the whole tool system depends on it). Set via `src/config/ai.ts`'s `AI_MODEL` export — one line change, same as the reference repo's own structure.

---

## 3. Rate Limiting — [CLONE], exact, both routes

### 3.1 Mechanism
`src/utility/rate-limiter.ts` — an `LRUCache`-backed sliding-window-ish counter (really a fixed-window counter per cache-entry TTL), keyed per user. **Clone this file verbatim, no changes.**

### 3.2 User Identification — [CLONE], exact
```
1. If request has both an IP (x-forwarded-for / socket.remoteAddress) AND a
   User-Agent header → key = `${ip}-${userAgent}`. No cookie needed.
2. Else, if a `userUuid` cookie (+ matching `userUuid_expires` cookie) exists
   and hasn't expired → use that cookie's value as the key.
3. Else → generate a new nanoid(20), set it as a `userUuid` cookie
   (Max-Age 24h, SameSite=Strict) plus a matching expiry cookie, use it.
```

### 3.3 Limits Per Route
| Route | Limit | Window | Cache capacity |
|---|---|---|---|
| `/api/chat` | 40 requests | 60,000 ms (1 min) | 1,000 unique users |
| `/api/sendmail` | 5 requests | 3,600,000 ms (1 hour) | 100 unique users |

Both cloned exactly from the real constants (`chatRateLimiter` in `chat.ts`; `REQUEST_PER_HOUR = 5`, `RATELIMIT_DURATION = 3600000`, `MAX_USER_PER_SECOND = 100` in `sendmail.ts`).

### 3.4 Response Headers — [CLONE]
Every checked request gets `X-RateLimit-Limit` and `X-RateLimit-Remaining` headers set, win or lose — useful for any future frontend "X requests remaining" UI, though none is built in v1.

### 3.5 Known Limitation — Documented, Not Silently Inherited
The rate limiter's own source comment states it plainly: it's bound to a single server instance's memory, so it doesn't scale across multiple serverless instances. For a portfolio's realistic traffic (not high-concurrency), this is an acceptable, deliberate tradeoff — Vercel's Hobby tier serverless functions are not guaranteed to be the same warm instance between requests anyway, so in practice the limiter resets somewhat unpredictably rather than failing open or closed consistently. **This is fine for v1.** If Abdul later wants a hard guarantee (e.g. after the site gets real traffic spikes), swapping in Upstash Redis behind the exact same `rateLimiterApi()` function signature is a contained, future change — not a reason to over-engineer now.

---

## 4. Tool Registry

### 4.1 Architecture — [CLONE]
`BaseTool` abstract class (`name`, `description`, JSON-Schema `parameters`, an `execute()` wrapped by `executeInternal()` for error handling) → concrete tool classes extend it → `contextAwareToolRegistry` holds all registered tools, filters which are offered per `ToolContext` (`getContextualFunctionDefinitions`), executes by name (`executeTool`), and does page-context detection (`detectPageContext`) from free text + referer URL.

### 4.2 Real Existing Tool Categories — [CLONE]
| File | Tool examples (real, confirmed) |
|---|---|
| `navigation-tools.ts` | Navigate to a page/section |
| `ui-control-tools.ts` | `manage_ui_state` — canonical actions `scroll \| focus \| highlight \| show \| hide`, targeting a section id |
| `data-access-tools.ts` | `get_projects` (confirmed real, full schema read: filters by `category` enum, `technology`, `search`, `limit`, `includeDetails`/`includeShowcase`/`includeBlogs` booleans) — plus equivalent `get_experience`, `get_skills` style tools per `CLAUDE.md`'s own description and the file's imports (`EXPERIENCE`, `SKILLS_DATA`) |
| `validate-data-tools.ts` | Internal data-integrity checks, not user-facing |

Adapt each data-access tool's category `enum` values, technology lists, etc. to Abdul's real `src/data/*` content — the schema shape stays the same, only the enum/example values inside it change.

### 4.3 `manage_ui_state` — [CLONE], exact, do not deviate
This is the tool the real `SYSTEM_PROMPT` spends the most guardrail text on, because it's the easiest for a model to get subtly wrong:
```
Canonical actions ONLY: scroll | focus | highlight | show | hide
NEVER: scroll_to, scrollTo, scroll-section, focus_section, or any other variant
Call shape: { action: "scroll", target: "skills" }
If scroll+highlight both wanted: two separate calls, scroll first, only if truly necessary
Otherwise: pick the primary intent
Do not narrate the tool call in text before it executes
If unsure: ask a clarifying question instead of guessing
```
Clone this guardrail text verbatim into Abdul's system prompt (just update section id examples to match his actual section ids from Part D: `home, about, experience, work, built-and-shipped, skills, ai-twin, contact`).

### 4.4 New Tool — `get_case_studies` [BUILD]
Follows the exact `BaseTool`/`GetProjectsTool` shape (§4.2's real pattern):
```ts
class GetCaseStudiesTool extends BaseTool {
  name = "get_case_studies";
  description = "Retrieve case study data with filtering by category and keyword search";
  parameters = {
    type: "object",
    properties: {
      category: { type: "string", description: "Filter by case study category" },
      search: { type: "string", description: "Keyword search in title or excerpt" },
      slug: { type: "string", description: "Fetch a single case study by its exact slug" },
      limit: { type: "number", minimum: 1, maximum: 20, default: 5 },
    },
    additionalProperties: false,
  };
  // executeInternal reads from src/data/caseStudies.ts, same pattern as GetProjectsTool
}
```

### 4.5 New Tool — `match_case_study_to_role` [BUILD]
Powers the `/work` recruiter-prompt matcher (Part D §10.2):
```ts
class MatchCaseStudyToRoleTool extends BaseTool {
  name = "match_case_study_to_role";
  description = "Given a free-text job/role description, return the case studies that best demonstrate fit, each with a one-line justification";
  parameters = {
    type: "object",
    properties: {
      roleDescription: { type: "string", description: "The recruiter's free-text description of the role or what they're hiring for" },
      maxResults: { type: "number", minimum: 1, maximum: 10, default: 5 },
    },
    required: ["roleDescription"],
    additionalProperties: false,
  };
  // executeInternal: reads all case studies from src/data/caseStudies.ts, and
  // either (a) does simple keyword/tag overlap scoring against the role
  // description server-side (cheap, deterministic, no extra LLM call), or
  // (b) returns the full case-study list as structured data and lets the
  // calling LLM turn do the matching/ranking itself in its natural-language
  // response (consistent with how every other data-access tool works —
  // fetch structured data, let the model reason over it). Prefer (b) for
  // consistency with the rest of the architecture — don't add a second,
  // separate ranking algorithm when the LLM call that's already happening
  // can do it from the tool's returned data.
}
```
Both new tools get registered in `src/lib/tools/initialize-tools.ts` (cloned file, extended) alongside the existing ones, and are automatically included in `getContextualFunctionDefinitions` output whenever `currentPage === "work"` (page-context filtering, same mechanism as every other tool).

### 4.6 Tool Execution Feedback in Chat UI
Covered in Part C §8.5 — `tool-execution-result.tsx`/`action-indicator.tsx` render these new tools' results exactly the same way as existing ones; no special-casing needed in the UI layer, only in the tool registry.

---

## 5. Error Handling & Fallback — [CLONE], exact

### 5.1 Fallback Trigger
Any unhandled error in the main try block (LLM call fails, times out, API key missing, etc.) falls through to the `catch` block — **not a generic error page**, a real set of hand-written, keyword-matched markdown responses.

### 5.2 Fallback Logic — [CLONE structure], [BUILD content]
```
1. If error.message includes "Tool initialization failed" →
   500, with a response string apologizing for "enhanced features"
   being temporarily unavailable, but still offering to answer
   basic questions.
2. Else, lowercase the user's message and keyword-match:
   - "contact" | "email"              → hardcoded contact-info markdown block
   - "experience" | "work" | "job"    → hardcoded experience summary markdown
   - "skill" | "technology" | "tech"  → hardcoded skills summary markdown
   - "project" | "portfolio"          → hardcoded projects summary markdown
   - (no match)                       → hardcoded general welcome/overview markdown
3. All fallback branches return 200 (not an error status) — the user
   never sees a raw error, just a slightly less dynamic but still
   genuinely useful, on-brand markdown response.
```
Every one of these five fallback strings must be hand-written for Abdul (mirroring the real file's tone: markdown headings, emoji, bold stats, a closing "> Would you like to know more about X?" prompt) and stored as constants near `SYSTEM_PROMPT` in `src/config/ai.ts` — **not generated dynamically**, since the entire point is that they work even when the LLM is unreachable.

### 5.3 Why This Matters
This is the real mechanism behind Part A §2.3's "graceful degradation" promise — it's not a vague aspiration, it's five concrete hardcoded markdown blocks already proven to work in production on the reference site. Implementing Abdul's version is a direct content-swap of this exact pattern, not new design work.

---

## 6. `/api/sendmail` — Full Contract

### 6.1 Request Shape — [CLONE], exact
```ts
type MailRequestBody = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
```

### 6.2 Control Flow — [CLONE], exact
1. Reject non-POST → `405`.
2. Rate limit check (§3.3's 5/hour limit) — if limited, the `check()` call itself already wrote the `429` response and the handler returns early (note the real code's subtlety: `if (isRateLimited.status !== 200) return;` — the rate limiter's `check` function sets the response status/body itself before the outer handler checks it).
3. Validate body against `mailValidationSchema` (Yup, cloned from `src/components/contact-form/contact-form.tsx` — the same schema used for client-side validation, imported and reused server-side so the rules never drift between client and server).
4. On validation failure: `422` with `{ status: 422, message: validationError.errors }` (an array of Yup error strings).
5. On success: call `sendMail(name, email, subject, message)` (§6.3), relay its `status`/body straight through.
6. Top-level catch normalizes any thrown error shape into a consistent `{ status, message }` JSON response, with special handling to preserve a `429` if that's what was thrown.

### 6.3 `sendMail` Utility — [CLONE]
`src/utility/sendMail.ts` wraps `nodemailer`'s Gmail SMTP transport using `NODEMAILER_USER`/`NODEMAILER_PASS` (Part A §4). Abdul's real inbox goes here. No code changes needed beyond env values — clone verbatim.

### 6.4 Frontend Fallback (Part D §9.3)
If the `POST /api/sendmail` call itself fails to even reach the server (network error, not a validation/rate-limit response), the Contact section's error state shows a `mailto:{email}` link as manual fallback — this is new frontend logic (Part D), not part of the cloned backend contract, since the reference repo's own contact form doesn't need this (it's a modal, always reachable) but a dedicated page section benefits from the extra safety net.

---

## 7. `src/data/*` — Content File Contracts

Field-level shapes each content file must satisfy, so Antigravity can generate the placeholder content from Part A §0.5 with the correct structure from the start.

### 7.1 `experience.ts`
```ts
interface ExperienceEntry {
  title: string;
  organisation?: { name: string; href: string };
  date: string;                 // e.g. "Jan 2025 — Present"
  bullets: string[];            // CHANGED from reference's single `description: string` — see Part D §4.3
  categoryTag: string;          // e.g. "EXPERIENCE" (shown in the date-pill row, Part D §4.2)
}
export const EXPERIENCE: ExperienceEntry[] = [ /* TODO: real entries */ ];
```

### 7.2 `projects.ts`
```ts
interface ProjectEntry {
  slug: string;
  title: string;
  description: string;
  category: string;             // enum-like, feeds GetProjectsTool's category filter
  technologies: string[];
  featured: boolean;            // true = appears in Selected Work (Part D §5.2)
  metrics?: { label: string; value: string }[]; // Selected Work's inline metric row
  role?: string;                // Built & Shipped's ROLE field
  impact?: string;              // Built & Shipped's IMPACT field
  liveUrl?: string;
  sourceUrl: string;
  images: string[];             // screenshot gallery paths, Built & Shipped
  hasLiveDemo: boolean;         // false → routes to "Also Built", not the shutter stack
}
export const PROJECTS: ProjectEntry[] = [ /* TODO: real entries */ ];
```

### 7.3 `caseStudies.ts` — [BUILD], new file
```ts
interface CaseStudyEntry {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  relatedProjectSlug?: string;  // links back to projects.ts
  body: {                       // Part D §11.1's problem/approach/outcome shape
    problem: string;
    approach: string;
    outcome: string;
  };
  metrics?: { label: string; value: string }[];
}
export const CASE_STUDIES: CaseStudyEntry[] = [ /* TODO: 3 placeholder entries */ ];
```

### 7.4 `skills.ts`
```ts
interface SkillCategory {
  sectionName: string;          // e.g. "Applied AI, Agents & Evaluation"
  description: string;          // new field — Part D §7.2's card description, not in reference's flatter shape
  skills: { name: string }[];   // SkillPillProps, cloned shape
}
export const SKILLS_DATA: SkillCategory[] = [ /* TODO: real entries */ ];
```

### 7.5 `siteMetaData.mjs`
Cloned fields (`author`, `description`, `email`, `github`, `linkedin`, `siteUrl`) + Abdul's real GitHub (`https://github.com/Abdul-Samad-17`), `TODO` LinkedIn, real email from Part A §0.5.

---

## Part E — End

**Covers:** Full `/api/chat` request/response contract and exact control flow (real, 14-step), system prompt structure (why grounding lives in-prompt not via RAG — a real architectural finding), the suggestion-generator's full diversity algorithm, rate limiting math and known limitations for both API routes, the tool registry architecture plus two new tools (`get_case_studies`, `match_case_study_to_role`) built to match the real existing tools' exact shape, the full keyword-based fallback system (graceful degradation, concretely), `/api/sendmail`'s complete contract, and field-level schemas for every `src/data/*` file.

**Not yet covered:** the numbered implementation task plan tying all five parts together, with [CLONE]/[BUILD] tags, Definition of Done per task, and the final pre-deploy checklist (Part F).

Reply **"next"** for Part F (Implementation Plan), or flag corrections to Part E first.
