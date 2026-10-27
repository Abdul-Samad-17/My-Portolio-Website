# Portfolio Placeholder Inventory

This document tracks all placeholder assets, data files, configuration values, and content fields in the portfolio. When replacing placeholders with verified production content, update each item according to the instructions below.

---

## 1. Project Screenshots & Assets

The following projects currently use neutral placeholder images located in `public/images/projects/`. Real screenshots should be added under these exact filenames:

### Daftar
- Currently using: `public/images/projects/daftar/placeholder.png`
- **Expected screenshot filenames**:
  - `public/images/projects/daftar/daftar-workplace-simulation.png` — Multi-agent workplace simulation interface (first shift with AI personas: CEO, Manager, Senior, Peer, Client).
  - `public/images/projects/daftar/daftar-browser-tests.png` — Hidden browser testing interface and automated QA bug bot injection.
  - `public/images/projects/daftar/daftar-skills-evaluation.png` — Objective evaluation report grading six workplace skills quoting user transcripts.

### Capital Play
- Currently using: `public/images/projects/capital-play/placeholder.png`
- **Expected screenshot filenames**:
  - `public/images/projects/capital-play/capital-play-player-dashboard.png` — Player venue browsing, slot selection calendar, and booking flow.
  - `public/images/projects/capital-play/capital-play-owner-dashboard.png` — Venue owner management dashboard, ground utilization stats, and pricing tiers.
  - `public/images/projects/capital-play/capital-play-ghost-engine.png` — Automated slot lifecycle scheduler (Ghost Engine) and real-time Socket.io locking.

### RideFlow
- Currently using: `public/images/projects/rideflow/placeholder.png`
- **Expected screenshot filenames**:
  - `public/images/projects/rideflow/rideflow-booking.png` — Driver/rider matching with Google Maps routing.
  - `public/images/projects/rideflow/rideflow-wallet.png` — Atomic ACID wallet transactions and stored procedure audit log.

---

## 2. Live Demo Links & Database Migrations

- **Capital Play**: The Live demo button (`https://capital--play.vercel.app`) has been temporarily removed because the backend database is currently down. Source code and screenshots remain active. The live demo link will return after the database migration is complete.
- **RideFlow**: The Live demo button (`https://ride--flow.vercel.app`) has been temporarily removed while the backend database is offline. RideFlow has moved to the "Also built" section with Source code only. The live demo link will return after database migration.

---

## 3. Global Site Configuration

- **File**: `src/lib/site-config.ts`
  - `SITE_URL`: Update `NEXT_PUBLIC_SITE_URL` (or `SITE_URL`) in your Vercel project settings to your custom production domain (e.g. `https://abdulsamad.dev`).
  - `RESUME_PATH`: Points to `/resume.pdf` (serves `Abdul_Samad_Resume.pdf`).

---

## 4. Resume PDF

- **File**: `public/resume.pdf`
  - Verified and active: contains Abdul Samad's official CV from FAST NUCES Islamabad with privacy-safe contact links (phone number excluded).

---

## 5. Branding & Visual Assets

- `src/assets/logo.png`: Transparent 1024×1024 logo mark without bounding box.
- `src/assets/logo-512.png`: 512×512 optimized UI copy.
- `src/assets/card.png`: Hero 3D visual card asset.
- `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/favicon-48x48.png`: Multi-resolution site favicons.
- `public/apple-touch-icon.png`: 180×180 iOS touch icon with theme dark background.
- `public/icon-192.png`, `public/icon-512.png`: PWA manifest icons.
- `public/og-image.png`: 1200×630 OpenGraph / Twitter social card banner.

---

## 6. Environment Variables

- **File**: `.env` (derived from `.env.example` / configured in Vercel)
  - `LLM_API_KEY`: Groq API key for AI Twin responses.
  - `LLM_BASE_URL`: Base URL (default: `https://api.groq.com/openai/v1/chat/completions`).
  - `AI_MODEL`: Active model name (default: `qwen/qwen3.8-27b`, overridable in Vercel settings).
  - `RESEND_API_KEY`: API key from resend.com for contact messages.
  - `CONTACT_EMAIL_FROM`: Sender email (`Abdul Samad Portfolio <onboarding@resend.dev>` or custom verified domain).
  - `CONTACT_EMAIL_TO`: Notification recipient (`abdulsammadsardar17@gmail.com`).
  - `NEXT_PUBLIC_SITE_URL`: Production canonical domain.
