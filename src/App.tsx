import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen, Brain, CheckCircle2, ChevronLeft, ChevronRight, ClipboardList,
  GraduationCap, LayoutDashboard, Menu, X,
} from 'lucide-react';
import {
  TOPICS, QUIZZES,
  type SubjectKey, type TopicStatus, type Tab, type Topic, type Quiz, type Progress, type Attempt,
} from './data/lessons';

const STORAGE = 'mitra-shah-dashboard-v2';

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE) || 'null');
  } catch {
    return null;
  }
}

export default function App() {
  const saved = load();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState<Progress[]>(saved?.progress || []);
  const [attempts, setAttempts] = useState<Attempt[]>(saved?.attempts || []);
  const [day] = useState(1);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState<'All' | SubjectKey>('All');
  const [learnTopicId, setLearnTopicId] = useState<string>(TOPICS[0].id);
  const [lessonStep, setLessonStep] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify({ progress, attempts }));
  }, [progress, attempts]);

  const progressMap = useMemo(() => new Map(progress.map((p) => [p.topicId, p])), [progress]);
  const learnTopic = TOPICS.find((t) => t.id === learnTopicId) || TOPICS[0];
  const totalLessonSteps = learnTopic.lessons.length + 1;

  const sectionStats = useMemo(() => {
    const subjects: SubjectKey[] = [
      'Quantitative Techniques', 'Logical Reasoning', 'Language Comprehension',
      'General Awareness', 'Innovation & Entrepreneurship',
    ];
    return subjects.map((subject) => {
      const topics = TOPICS.filter((t) => t.subject === subject);
      const mastered = topics.filter((t) => {
        const st = progressMap.get(t.id)?.status;
        return st === 'mastered' || st === 'quiz_passed' || st === 'viewed';
      }).length;
      const total = topics.length || 1;
      return { subject, mastered, total, pct: Math.round((mastered / total) * 100) };
    });
  }, [progressMap]);

  function markViewed(topic: Topic) {
    setProgress((prev) => {
      const i = prev.findIndex((p) => p.topicId === topic.id);
      if (i >= 0) {
        const next = [...prev];
        if (next[i].status === 'not_started') next[i] = { ...next[i], status: 'viewed' };
        return next;
      }
      return [...prev, { topicId: topic.id, subject: topic.subject, status: 'viewed', bestScore: 0, totalQuestions: 0, attemptsCount: 0 }];
    });
  }

  function openLearn(topicId: string) {
    setLearnTopicId(topicId);
    setLessonStep(0);
    setTab('learn');
    const topic = TOPICS.find((t) => t.id === topicId);
    if (topic) markViewed(topic);
  }

  function startQuiz(q: Quiz) {
    setActiveQuiz(q);
    setAnswers({});
    setSubmitted(false);
    setTab('practice');
  }

  function submitQuiz() {
    if (!activeQuiz) return;
    let score = 0;
    for (const q of activeQuiz.questions) {
      if (answers[q.id] === q.correctOptionIndex) score += 1;
    }
    const total = activeQuiz.questions.length;
    const accuracy = Math.round((score / total) * 100);
    const passed = accuracy >= activeQuiz.passingPercent;
    setAttempts((a) => [{
      id: `a_${Date.now()}`, quizId: activeQuiz.id, title: activeQuiz.title, subject: activeQuiz.subject,
      score, total, accuracyPercent: accuracy, passed, createdAt: new Date().toISOString(),
    }, ...a]);
    setProgress((prev) => {
      const i = prev.findIndex((p) => p.topicId === activeQuiz.topicId);
      const status: TopicStatus = passed ? 'quiz_passed' : 'quiz_attempted';
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], status: next[i].status === 'mastered' ? 'mastered' : status,
          bestScore: Math.max(next[i].bestScore, score), totalQuestions: total, attemptsCount: next[i].attemptsCount + 1 };
        return next;
      }
      return [...prev, { topicId: activeQuiz.topicId, subject: activeQuiz.subject, status, bestScore: score, totalQuestions: total, attemptsCount: 1 }];
    });
    setSubmitted(true);
  }

  const nav = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'learn' as Tab, label: 'Teach Me', icon: GraduationCap },
    { id: 'plan' as Tab, label: 'Study Plan', icon: BookOpen },
    { id: 'practice' as Tab, label: 'Practice', icon: ClipboardList },
  ];

  const filtered = TOPICS.filter((t) => filter === 'All' || t.subject === filter);
  function statusLabel(s?: TopicStatus) {
    if (s === 'mastered') return 'Mastered';
    if (s === 'quiz_passed') return 'Quiz Passed';
    if (s === 'quiz_attempted') return 'Quiz Attempted';
    if (s === 'viewed') return 'Learned';
    return 'Not Started';
  }
  const topicIndex = TOPICS.findIndex((t) => t.id === learnTopicId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white"><Brain className="h-5 w-5" /></div>
            <div>
              <div className="text-sm font-bold tracking-tight">Mitra AI Tutor</div>
              <div className="text-[11px] text-slate-500">CMAT 2026 · Day {day}</div>
            </div>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <button key={n.id} type="button" onClick={() => setTab(n.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${
                  tab === n.id ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                <n.icon className="h-4 w-4" />{n.label}
              </button>
            ))}
          </nav>
          <button type="button" className="md:hidden rounded-lg p-2" onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t px-4 py-2 md:hidden">
            {nav.map((n) => (
              <button key={n.id} type="button" onClick={() => { setTab(n.id); setMobileOpen(false); }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  tab === n.id ? 'bg-sky-50 text-sky-700' : 'text-slate-700'}`}>
                <n.icon className="h-4 w-4" />{n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {tab === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="mt-1 text-sm text-slate-600">Learn every topic · practice · track progress</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Topics learned', value: String(progress.filter((p) => p.status !== 'not_started').length), hint: `of ${TOPICS.length}` },
                { label: 'Quizzes taken', value: String(attempts.length), hint: `${attempts.filter((a) => a.passed).length} passed` },
                { label: 'Best accuracy', value: attempts.length ? `${Math.max(...attempts.map((a) => a.accuracyPercent))}%` : '—', hint: 'across attempts' },
                { label: 'Modules', value: String(TOPICS.length), hint: 'ready to learn' },
              ].map((k) => (
                <div key={k.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{k.label}</div>
                  <div className="mt-1 text-2xl font-bold tabular-nums">{k.value}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{k.hint}</div>
                </div>
              ))}
            </div>
            <section className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-sky-700">
                    <GraduationCap className="h-3.5 w-3.5" /> Teach Me
                  </div>
                  <h2 className="mt-1 text-lg font-semibold">Start learning: {TOPICS[0].title}</h2>
                  <p className="mt-1 text-sm text-slate-600">Step-by-step lessons with examples for every topic.</p>
                </div>
                <button type="button" onClick={() => openLearn(TOPICS[0].id)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
                  Start teaching <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold">Section mastery</h2>
              <div className="mt-4 space-y-4">
                {sectionStats.map((s) => (
                  <div key={s.subject}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="font-medium">{s.subject}</span>
                      <span className="text-slate-500">{s.mastered}/{s.total} · {s.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-sky-500" style={{ width: `${s.pct}%` }} /></div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {tab === 'learn' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Teach Me</h1>
                <p className="mt-1 text-sm text-slate-600">Build from the foundation, practise the method, then apply it at exam level.</p>
              </div>
              <div className="text-xs font-medium text-slate-500">Topic {topicIndex + 1} of {TOPICS.length}</div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {TOPICS.map((t, i) => (
                <button key={t.id} type="button" onClick={() => openLearn(t.id)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                    t.id === learnTopicId ? 'bg-sky-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}>
                  {i + 1}. {t.title}
                </button>
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="rounded-md bg-sky-50 px-2 py-0.5 font-semibold text-sky-700">{learnTopic.subject}</span>
                  <span>Day {learnTopic.dayNumber}</span><span>·</span><span>{learnTopic.estimatedMinutes} min</span>
                </div>
                <h2 className="mt-2 text-xl font-bold">{learnTopic.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{learnTopic.summary}</p>
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: totalLessonSteps }).map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= lessonStep ? 'bg-sky-500' : 'bg-slate-100'}`} />
                  ))}
                </div>
                <div className="mt-6">
                  {lessonStep < learnTopic.lessons.length ? (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-sky-600">Lesson {lessonStep + 1} of {learnTopic.lessons.length}</div>
                      <h3 className="mt-2 text-lg font-semibold">{learnTopic.lessons[lessonStep].heading}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{learnTopic.lessons[lessonStep].body}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Worked example · Exam mastery</div>
                      <h3 className="mt-2 text-lg font-semibold">{learnTopic.example.question}</h3>
                      <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] text-slate-700">
                        {learnTopic.example.steps.map((s, i) => (<li key={i}>{s}</li>))}
                      </ol>
                      <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                        Answer: {learnTopic.example.answer}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                  <button type="button" disabled={lessonStep === 0} onClick={() => setLessonStep((s) => Math.max(0, s - 1))}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40">
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>
                  {lessonStep < totalLessonSteps - 1 ? (
                    <button type="button" onClick={() => setLessonStep((s) => s + 1)}
                      className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
                      Next <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {topicIndex < TOPICS.length - 1 && (
                        <button type="button" onClick={() => openLearn(TOPICS[topicIndex + 1].id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                          Next topic <ChevronRight className="h-4 w-4" />
                        </button>
                      )}
                      {QUIZZES.find((q) => q.topicId === learnTopic.id) && (
                        <button type="button" onClick={() => { const q = QUIZZES.find((x) => x.topicId === learnTopic.id); if (q) startQuiz(q); }}
                          className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white">
                          Practice this topic
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </section>
              <aside className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Topic checklist · 0 to exam mastery</div>
                  <ul className="mt-2 space-y-1.5">
                    {learnTopic.keyConcepts.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-3.5 w-3.5 text-sky-500" />{c}</li>
                    ))}
                  </ul>
                  <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-[11px] leading-relaxed text-slate-500">
                    Complete each lesson in order: Level 0 foundation → Level 1 method → Level 2 exam application → Level 3 common traps → worked example.
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">All topics</div>
                  <ul className="mt-2 max-h-64 space-y-1 overflow-y-auto">
                    {TOPICS.map((t) => (
                      <li key={t.id}>
                        <button type="button" onClick={() => openLearn(t.id)}
                          className={`w-full rounded-lg px-2 py-1.5 text-left text-sm ${
                            t.id === learnTopicId ? 'bg-sky-50 font-medium text-sky-800' : 'text-slate-600 hover:bg-slate-50'}`}>
                          {t.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        )}

        {tab === 'plan' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Study Plan</h1>
              <p className="mt-1 text-sm text-slate-600">A {TOPICS.length}-module course across all five CMAT sections. Each module builds from foundations to exam-level application.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['All', 'Quantitative Techniques', 'Logical Reasoning', 'Language Comprehension', 'General Awareness', 'Innovation & Entrepreneurship'] as const).map((f) => (
                <button key={f} type="button" onClick={() => setFilter(f)}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    filter === f ? 'bg-sky-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200'}`}>
                  {f === 'All' ? 'All subjects' : f}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {filtered.map((topic) => {
                const prog = progressMap.get(topic.id);
                const quiz = QUIZZES.find((q) => q.topicId === topic.id);
                return (
                  <article key={topic.id} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                          <span className="font-mono">Day {topic.dayNumber}</span><span>·</span><span>{topic.subject}</span>
                        </div>
                        <h3 className="mt-1 text-base font-semibold">{topic.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{topic.summary}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{statusLabel(prog?.status)}</span>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => openLearn(topic.id)}
                            className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700">
                            Learn
                          </button>
                          {quiz && (
                            <button type="button" onClick={() => startQuiz(quiz)}
                              className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">
                              Practice
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'practice' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Practice</h1>
              <p className="mt-1 text-sm text-slate-600">Topic drills and sectionals</p>
            </div>

            {activeQuiz && !submitted ? (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-semibold">{activeQuiz.title}</h2>
                    <p className="text-sm text-slate-500">{activeQuiz.subtitle} · {activeQuiz.questions.length} questions · pass {activeQuiz.passingPercent}%</p>
                  </div>
                  <button type="button" onClick={() => setActiveQuiz(null)} className="text-sm text-slate-500 hover:text-slate-800">Close</button>
                </div>
                <div className="mt-6 space-y-6">
                  {activeQuiz.questions.map((q, qi) => (
                    <div key={q.id} className="rounded-xl border border-slate-100 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Q{qi + 1}</div>
                      <p className="mt-1 font-medium text-slate-800">{q.questionText}</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {q.options.map((opt, oi) => (
                          <button key={oi} type="button" onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                            className={`rounded-lg border px-3 py-2.5 text-left text-sm ${
                              answers[q.id] === oi ? 'border-sky-500 bg-sky-50 text-sky-900' : 'border-slate-200 hover:bg-slate-50'}`}>
                            <span className="mr-2 font-mono text-xs text-slate-400">{String.fromCharCode(65 + oi)}</span>{opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button type="button" onClick={submitQuiz}
                    disabled={Object.keys(answers).length < activeQuiz.questions.length}
                    className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-40">
                    Submit quiz
                  </button>
                </div>
              </section>
            ) : activeQuiz && submitted ? (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                {(() => {
                  const score = activeQuiz.questions.filter((q) => answers[q.id] === q.correctOptionIndex).length;
                  const total = activeQuiz.questions.length;
                  const pct = Math.round((score / total) * 100);
                  const passed = pct >= activeQuiz.passingPercent;
                  return (
                    <>
                      <div className={`rounded-xl px-4 py-3 ${passed ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
                        <div className="text-lg font-bold">{passed ? 'Passed!' : 'Keep practicing'}</div>
                        <div className="text-sm">Score {score}/{total} ({pct}%) · Pass mark {activeQuiz.passingPercent}%</div>
                      </div>
                      <div className="mt-6 space-y-4">
                        {activeQuiz.questions.map((q, qi) => {
                          const chosen = answers[q.id];
                          const ok = chosen === q.correctOptionIndex;
                          return (
                            <div key={q.id} className="rounded-xl border border-slate-100 p-4">
                              <div className="flex items-start gap-2">
                                <span className={`mt-0.5 text-sm ${ok ? 'text-emerald-600' : 'text-rose-600'}`}>{ok ? '✓' : '✗'}</span>
                                <div>
                                  <p className="font-medium">Q{qi + 1}. {q.questionText}</p>
                                  <p className="mt-1 text-sm text-slate-600">Your answer: {q.options[chosen] ?? '—'}</p>
                                  {!ok && <p className="text-sm text-emerald-700">Correct: {q.options[q.correctOptionIndex]}</p>}
                                  <p className="mt-1 text-xs text-slate-500">{q.explanation}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        <button type="button" onClick={() => { setActiveQuiz(null); setSubmitted(false); }}
                          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Back to list</button>
                        <button type="button" onClick={() => { setAnswers({}); setSubmitted(false); }}
                          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white">Retry</button>
                      </div>
                    </>
                  );
                })()}
              </section>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {QUIZZES.map((quiz) => {
                  const past = attempts.filter((a) => a.quizId === quiz.id);
                  const best = past.length ? Math.max(...past.map((a) => a.accuracyPercent)) : null;
                  return (
                    <button key={quiz.id} type="button" onClick={() => startQuiz(quiz)}
                      className="rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-sky-300 hover:shadow-sm">
                      <div className="text-xs font-semibold uppercase tracking-wide text-sky-600">{quiz.subject}</div>
                      <h3 className="mt-1 font-semibold">{quiz.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">{quiz.subtitle}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5">{quiz.questions.length} Qs</span>
                        {past.length > 0 && <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-700">Best {best}%</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">Mitra AI Tutor · CMAT 2026</footer>
    </div>
  );
}
