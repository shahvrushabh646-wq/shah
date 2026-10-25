export default function App() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60 md:p-12">
          <p className="mb-3 inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
            Mitra AI Tutor
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            CMAT 2026 Personal Tutor
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            A starter project scaffold for the AI tutor experience, ready for the full CMAT syllabus,
            mock exams, and Gemini-powered study assistance.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Syllabus</h2>
              <p className="mt-2 text-slate-700">8-day structured guidance for CMAT preparation.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Practice</h2>
              <p className="mt-2 text-slate-700">Sectional tests and full mock question banks.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">AI</h2>
              <p className="mt-2 text-slate-700">Gemini-powered tutoring flow for live assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
