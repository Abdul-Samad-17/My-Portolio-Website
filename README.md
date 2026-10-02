# My-Portolio-Website

Personal portfolio for Abdul Samad — AI/ML student & Applied AI engineer. Built with Next.js 15 (Pages Router), Tailwind CSS, Framer Motion, and an interactive AI Twin grounded in real project/experience data.

## Getting Started

1. **Clone repository and install dependencies:**
   ```bash
   git clone https://github.com/Abdul-Samad-17/My-Portolio-Website.git
   cd My-Portolio-Website
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Fill in `.env.local` using the guide below.

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Description | Where to Obtain |
|---|---|---|
| `NODEMAILER_USER` | Gmail address for receiving contact messages | Your Gmail account address |
| `NODEMAILER_PASS` | Gmail App Password (requires 2FA enabled) | [Google Account App Passwords](https://myaccount.google.com/apppasswords) |
| `LLM_API_KEY` | Groq API Key for AI Twin responses | [Groq Console](https://console.groq.com/keys) |
| `LLM_BASE_URL` | Groq OpenAI-compatible base URL | Defaults to `https://api.groq.com/openai/v1` |
| `ANALYZE` | Enable Next.js bundle analyzer | Optional (`false`) |
| `BUILD_STANDALONE` | Enable Next.js standalone build output | Optional (`false`) |

---

## Attribution

Core architecture, logic, and component mechanics adapted from [Nikunj2003/My-Next-Js-Portfolio](https://github.com/Nikunj2003/My-Next-Js-Portfolio) under the MIT License. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for full license and attribution details.
