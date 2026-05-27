# Cars24 Onsite Assistant

A chat-led AI prototype for walk-in customers at Cars24 hubs. Built with Next.js 14, TypeScript, and Claude Sonnet 4.6.

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Set up env
cp .env.local.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

# 3. Run dev server
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Vercel → New Project → import repo
3. Add env var: `ANTHROPIC_API_KEY`
4. Deploy

## Features

- Orbit-style streaming AI with thinking pill + sparkle mark
- 4 demo scenarios (see [demo.md](./demo.md))
- Car cards, metric cards, locate map, scan OCR mock, PIN card, booking card
- iPhone bezel on desktop · fullscreen on mobile
- API key stays server-side (never exposed to client)

## Structure

```
app/api/chat/route.ts   ← Anthropic streaming proxy
components/             ← All UI components
data/                   ← 20 cars, hub metrics, mock booking
lib/                    ← types, systemPrompt, parseResponse
```
