# Mitra AI Tutor — CMAT 2026

Full-stack AI tutor for CMAT preparation (React + Vite + Express + Gemini).

## Quick start

```bash
cp .env.example .env
# Edit .env → set GEMINI_API_KEY

npm install
npm run dev
```

Open http://localhost:3000

## Deploy on Vercel (new project)

1. Create a **new** GitHub repository
2. Upload / push this ZIP contents
3. In Vercel: **Add New Project** → Import that repo
4. Set env var `GEMINI_API_KEY`
5. Deploy

## What's included

- CMAT 8-day syllabus + seed data (`src/data/cmatCurriculum.ts`)
- Question bank with sectionals + full mock (`src/data/questionBank.ts`)
- Working UI shell that shows the syllabus
- Minimal API (`/api/health`, `/api/status`)
- Vercel-ready config

## Restore full original UI

Copy from your original source ZIP into:

- `src/components/*`
- `src/lib/apiClient.ts`, `firestoreSync.ts`, `progressCalculator.ts`
- full `server.ts` + `server/*`

Then replace `src/App.tsx` with the original full App.
