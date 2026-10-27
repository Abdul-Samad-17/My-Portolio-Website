# Deployment Guide — Abdul Samad Portfolio

This document contains step-by-step instructions for deploying Abdul Samad's AI/ML Engineering Portfolio to Vercel, configuring required environment variables, and completing post-deployment validation.

---

## 1. Vercel Import Steps

1. **Push Changes to GitHub**: Ensure all commits are pushed to the GitHub repository (`https://github.com/Abdul-Samad-17/My-Portolio-Website` or your fork).
2. **Open Vercel Dashboard**: Navigate to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. **Import Project**:
   - Click **Add New...** > **Project**.
   - Select your portfolio repository from the list and click **Import**.
4. **Project Settings**:
   - **Framework Preset**: `Next.js` (auto-detected).
   - **Root Directory**: `./` (default).
   - **Build Command**: `npm run build` (auto-detected).
   - **Output Directory**: `.next` (auto-detected).
   - **Install Command**: `npm install` (auto-detected).
5. **Configure Environment Variables**: Expand the **Environment Variables** section and enter the values specified in the table below.
6. **Deploy**: Click **Deploy**. Vercel will build and launch your application.

---

## 2. Environment Variables Reference

Configure these in the Vercel project dashboard under **Settings** > **Environment Variables**:

| Variable Name | Required | Default / Fallback | Description & Example |
| :--- | :--- | :--- | :--- |
| `LLM_API_KEY` | **Yes** (for AI Twin) | None | Groq API Key for the AI Twin assistant. Example: `gsk_abc123...` |
| `LLM_BASE_URL` | No | `https://api.groq.com/openai/v1/chat/completions` | Base endpoint URL for the OpenAI-compatible chat completion API. |
| `AI_MODEL` | No | `qwen/qwen3.8-27b` | Active model ID. Can be swapped in Vercel settings without redeploying code if a model is deprecated by Groq. |
| `RESEND_API_KEY` | **Yes** (for Contact Form) | None | API key from [resend.com](https://resend.com) for sending contact messages. Example: `re_xyz789...` |
| `CONTACT_EMAIL_FROM` | No | `onboarding@resend.dev` | Sender address verified in Resend. Example: `Abdul Samad Portfolio <onboarding@resend.dev>` or `contact@abdulsamad.dev`. |
| `CONTACT_EMAIL_TO` | No | `abdulsammadsardar17@gmail.com` | Destination inbox for visitor contact inquiries. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://abdul-samad-portfolio.example.com` | Production canonical site URL (e.g. `https://abdulsamad.dev`). Used for metadataBase, canonical links, OpenGraph cards, sitemap, and robots.txt. |
| `SITE_URL` | No | Inherits `NEXT_PUBLIC_SITE_URL` | Optional server-side alias for the canonical site URL. |

> [!TIP]
> **Changing the AI Model**:
> If Groq deprecates `qwen/qwen3.8-27b` or you wish to switch to another function-calling model (e.g., `llama-3.3-70b-versatile`), simply update `AI_MODEL` in your Vercel Environment Variables. The server reads this variable dynamically per request.

---

## 3. Custom Domain Configuration (Optional)

1. Go to **Settings** > **Domains** in your Vercel project.
2. Enter your custom domain (e.g., `abdulsamad.dev` or `www.abdulsamad.dev`).
3. Follow the DNS instructions to add the required `CNAME` or `A` record with your domain registrar.
4. Update `NEXT_PUBLIC_SITE_URL` in **Settings** > **Environment Variables** to match your custom domain (e.g. `https://abdulsamad.dev`).

---

## 4. Post-Deployment Verification Checklist

After the Vercel build succeeds, verify the live deployment against this checklist:

### A. Core Pages & Layout
- [ ] **Homepage (`/`)**: Loads smoothly without errors; responsive layout functions across mobile (<640px), tablet (768px), and desktop (>=1024px).
- [ ] **Transparent Logo**: Monogram logo renders crisp and transparent without any box or container background.
- [ ] **Hero Stats**: Displays the four key metrics:
  - `15` — **Public repositories** (links to GitHub)
  - `10+` — **AI projects completed** (links to `#work`)
  - `25+` — **Hackathon participants led** (links to `#about`)
  - `0.74` — **Precision@50 (3x baseline)** (links to `/work/content-refresh-pipeline`)
- [ ] **Case Studies Index (`/work`)**: Displays all case studies with tags and summaries.
- [ ] **Individual Case Study Routes**:
  - `/work/content-refresh-pipeline`
  - `/work/assistive-navigation`
  - `/work/daftar`
  - `/work/capital-play`
- [ ] **Project Statuses**:
  - **Daftar**: Shows role "Built by Abdul Samad", Live Demo button, and Source.
  - **Capital Play**: Shows Source button and screenshots (no broken Live demo link).
  - **RideFlow**: Appears in the "Also built" section with Source button only.

### B. Resume & Static Assets
- [ ] **Resume Download (`/resume.pdf`)**: Clicking any Resume or Download button downloads `Abdul_Samad_Resume.pdf` (valid, uncorrupted PDF).
- [ ] **Social Share Card (`/og-image.png`)**: Resolves with HTTP 200 OK (1200×630).
- [ ] **Favicons**: `/favicon.ico`, `/favicon-16x16.png`, `/favicon-32x32.png`, and `/apple-touch-icon.png` load properly in browser tabs.
- [ ] **PWA Manifest (`/manifest.json`)**: Loads with valid JSON and references app icons.
- [ ] **SEO Files**: `/sitemap.xml` and `/robots.txt` resolve with HTTP 200 OK and match canonical URLs.

### C. Interactive Features
- [ ] **AI Twin Chat**:
  - Floating trigger button opens chat window.
  - Suggestion chips provide quick answers.
  - Real-time text streams smoothly with tool traces and citations.
  - Links to case studies and resume work within chat.
- [ ] **Command Palette (`⌘K` / `Ctrl+K`)**:
  - Opens on hotkey or search button click.
  - Searches sections, projects, case studies, and triggers resume download.
- [ ] **Contact Form (`#contact`)**:
  - Valid submission sends email via Resend and displays success feedback.
  - Rate limiting (5 requests per 10 minutes) protects against abuse.
  - Honeypot protection silently stops automated bot submissions.

### D. Security Headers
Run this terminal command against your production URL to verify security headers:
```bash
curl -I https://your-portfolio-domain.vercel.app
```
Expected headers:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
