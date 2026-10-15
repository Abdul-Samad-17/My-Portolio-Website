# Portfolio Placeholder Inventory

This document tracks all placeholder assets, data files, configuration values, and content fields in the portfolio. When replacing placeholders with verified production content, update each item according to the instructions below.

---

## 1. Global Site Configuration
- **File**: `src/lib/site-config.ts`
  - `SITE_URL`: Update `NEXT_PUBLIC_SITE_URL` default to your custom domain (e.g., `https://abdulsamad.dev`).
  - `RESUME_PATH`: Keep `/resume.pdf` or point to a hosted URL if preferred.

---

## 2. Profile & Experience Data
- **File**: `src/data/portfolio.ts`
  - `personalInfo`:
    - `location`: Currently placeholder `"Islamabad, Pakistan"`.
    - `tagline` & `focus`: AI student / engineer profile focus.
    - Social links and contact details.
  - `stats`: Key hero stats (deployments count, requests served, pipelines evaluated).
  - `about`: Summary paragraph and detailed highlights.
  - `experiences`:
    - Work experiences currently use placeholder `"Example Organization"` and generic metrics.
    - Education fact: `"BS Artificial Intelligence student at FAST NUCES Islamabad (Batch 2024)"`.
  - `projects`: Featured and non-featured project entries, slugs, summaries, tech stacks, and repo/live links.
  - `skillCategories`: Categorized technical competencies and tooling.

---

## 3. Engineering Case Studies
- **File**: `src/data/case-studies.ts`
  - Slugs, titles, employers, one-liners, and architectural summaries.
  - Technical constraints and tradeoffs.
  - `decisions`: Architectural decisions, rationales, and "considered and rejected" alternatives.
  - `ownership`: Explicit responsibility and boundaries for each system.
  - `results`: Empirical, verified metrics and outcomes.

---

## 4. AI Twin Configuration & Tools
- **File**: `src/lib/ai-config.ts`
  - System prompt guardrails, voice, and subject domain expertise.
  - Default suggestion chips for initial chat affordances.
- **File**: `src/lib/ai-tools.ts`
  - Metric lookup entries and context sources in `METRIC_CONTEXTS`.
  - Project navigation destinations.

---

## 5. Visual Assets & Media
- **Resume**:
  - `public/resume.pdf`: Replace 1-page placeholder PDF with your real resume.
- **Project Screenshots**:
  - `public/images/projects/codeforge/`: Application screenshots (light & dark).
  - `public/images/projects/omni-gateway/`: Dashboard, API docs, providers views.
  - `public/images/projects/serenify/`: App workflows, wellness dashboard, chat.
  - `public/images/projects/resume-optimizer/`: Interface, analysis outputs.
  - `public/images/projects/neural-canvas/`: Workspace and gallery captures.
  - `public/images/projects/llama-mcp-streamlit/`: Streamlit dashboard views.
- **Branding & Social Previews**:
  - `src/assets/logo.png`: Primary personal monogram or mark.
  - `src/assets/card.png`: Hero portrait or abstract visual card.
  - `public/favicon.ico`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`: Favicons.
  - `public/og-image.png`: 1200x630 social card banner.

---

## 6. Environment Variables
- **File**: `.env` (derived from `.env.example`)
  - `LLM_API_KEY`: Groq API key for llama-3.3-70b-versatile.
  - `LLM_BASE_URL`: `https://api.groq.com/openai/v1/chat/completions`.
  - `RESEND_API_KEY`: API key from resend.com.
  - `CONTACT_EMAIL_FROM`: `onboarding@resend.dev` (or verified custom domain).
  - `CONTACT_EMAIL_TO`: `abdulsammadsardar17@gmail.com`.
