# Portfolio Placeholder Inventory

This document tracks all placeholder assets, data files, configuration values, and content fields in the portfolio. When replacing placeholders with verified production content, update each item according to the instructions below.

---

## 1. Project Screenshots (Pending Abdul's real screenshots)
The following projects currently use neutral placeholder images located in `public/images/projects/`:
- **Daftar**:
  - `public/images/projects/daftar/placeholder.png` (Multi-agent workplace simulation interface / browser testing)
- **Capital Play**:
  - `public/images/projects/capital-play/placeholder.png` (Sports ground booking dashboards, slot engine, real-time messaging)
- **RideFlow**:
  - `public/images/projects/rideflow/placeholder.png` (Ride-hailing platform, Google Maps routing, wallet transactions)

*Note: Abdul will provide real application screenshots for Daftar, Capital Play, and RideFlow in a subsequent phase.*

---

## 2. Global Site Configuration
- **File**: `src/lib/site-config.ts`
  - `SITE_URL`: Update `NEXT_PUBLIC_SITE_URL` default to your custom domain (e.g., `https://abdulsamad.dev`).
  - `RESUME_PATH`: Keep `/resume.pdf` or point to a hosted URL if preferred.

---

## 3. Resume PDF
- **File**: `public/resume.pdf`
  - Ensure the uploaded PDF contains public-safe contact information (phone number omitted per privacy rules).

---

## 4. Branding & Visual Assets
- `src/assets/logo.png`: Personal monogram or logo mark.
- `src/assets/card.png`: Hero 3D visual card asset.
- `public/favicon.ico`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`: Site favicons.
- `public/og-image.png`: 1200x630 social card banner.

---

## 5. Environment Variables
- **File**: `.env` (derived from `.env.example`)
  - `LLM_API_KEY`: Groq API key for llama-3.3-70b-versatile / qwen/qwen3.8-27b.
  - `LLM_BASE_URL`: `https://api.groq.com/openai/v1/chat/completions`.
  - `RESEND_API_KEY`: API key from resend.com.
  - `CONTACT_EMAIL_FROM`: `onboarding@resend.dev` (or verified custom domain).
  - `CONTACT_EMAIL_TO`: `abdulsammadsardar17@gmail.com`.
