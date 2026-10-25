import express from 'express';
import type { Express } from 'express';

export function createMitraApiApp(): Express {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'mitra-ai-tutor' });
  });

  app.get('/api/status', (_req, res) => {
    res.json({
      liveAvailable: Boolean(process.env.GEMINI_API_KEY),
      provider: 'Google Gemini',
      message: 'Minimal API — expand with full routes when ready.',
    });
  });

  return app;
}

const PORT = Number(process.env.PORT) || 3000;
if (!process.env.VERCEL) {
  const app = createMitraApiApp();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mitra AI Tutor listening on http://0.0.0.0:${PORT}`);
  });
}
