import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen, Brain, CheckCircle2, ChevronRight, ClipboardList,
  LayoutDashboard, Menu, Target, X, Zap,
} from 'lucide-react';

type SubjectKey =
  | 'Quantitative Techniques'
  | 'Logical Reasoning'
  | 'Language Comprehension'
  | 'General Knowledge'
  | 'Innovation & Entrepreneurship';

type TopicStatus = 'not_started' | 'viewed' | 'quiz_attempted' | 'quiz_passed' | 'mastered';

interface Topic {
  id: string;
  dayNumber: number;
  subject: SubjectKey;
  title: string;
  summary: string;
  keyConcepts: string[];
  estimatedMinutes: number;
}

interface QuizQ {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  subtitle: string;
  subject: SubjectKey;
  topicId: string;
  examFormat: string;
  timeLimitMinutes: number;
  passingPercent: number;
  questions: QuizQ[];
}

interface Progress {
  topicId: string;
  subject: SubjectKey;
  status: TopicStatus;
  bestScore: number;
  totalQuestions: number;
  attemptsCount: number;
}

interface Attempt {
  id: string;
  quizId: string;
  title: string;
  subject: SubjectKey;
  score: number;
  total: number;
  accuracyPercent: number;
  passed: boolean;
  createdAt: string;
}

const TOPICS: Topic[] = [
  { id: 'qt-1', dayNumber: 1, subject: 'Quantitative Techniques', title: 'Percentages & Profit-Loss', summary: 'Core arithmetic for CMAT Quant.', keyConcepts: ['% change', 'SP/CP', 'successive %'], estimatedMinutes: 40 },
  { id: 'lr-1', dayNumber: 1, subject: 'Logical Reasoning', title: 'Blood Relations & Directions', summary: 'Puzzle basics for LR section.', keyConcepts: ['family tree', 'facing', 'turns'], estimatedMinutes: 35 },
  { id: 'lc-1', dayNumber: 2, subject: 'Language Comprehension', title: 'Reading Comprehension Basics', summary: 'How to approach RC passages.', keyConcepts: ['main idea', 'tone', 'inference'], estimatedMinutes: 40 },
  { id: 'gk-1', dayNumber: 2, subject: 'General Knowledge', title: 'Indian Economy Snapshot', summary: 'High-yield economy GK.', keyConcepts: ['GDP', 'RBI', 'budget'], estimatedMinutes: 30 },
  { id: 'ie-1', dayNumber: 3, subject: 'Innovation & Entrepreneurship', title: 'Startup Ecosystem India', summary: 'Schemes and terminology.', keyConcepts: ['DPIIT', 'unicorn', 'bootstrapping'], estimatedMinutes: 30 },
  { id: 'qt-2', dayNumber: 3, subject: 'Quantitative Techniques', title: 'Averages & Mixtures', summary: 'Weighted averages and alligation.', keyConcepts: ['weighted avg', 'alligation'], estimatedMinutes: 40 },
  { id: 'lr-2', dayNumber: 4, subject: 'Logical Reasoning', title: 'Syllogisms & Venn', summary: 'Standard syllogism patterns.', keyConcepts: ['all/some/none', 'Venn'], estimatedMinutes: 35 },
  { id: 'lc-2', dayNumber: 4, subject: 'Language Comprehension', title: 'Vocabulary in Context', summary: 'Synonyms, antonyms, usage.', keyConcepts: ['context clues', 'roots'], estimatedMinutes: 30 },
];

const QUIZZES: Quiz[] = [
  {
    id: 'quiz-qt-1', title: 'Percentages Drill', subtitle: 'Topic quiz · Quant', subject: 'Quantitative Techniques', topicId: 'qt-1',
    examFormat: 'topic_quiz', timeLimitMinutes: 12, passingPercent: 50,
    questions: [
      { id: 'q1', questionText: 'What is 20% of 150?', options: ['20', '30', '25', '35'], correctOptionIndex: 1, explanation: '20% of 150 = 0.2 × 150 = 30.' },
      { id: 'q2', questionText: 'A price rises 10% then falls 10%. Net change?', options: ['0%', '−1%', '+1%', '−10%'], correctOptionIndex: 1, explanation: '1.1 × 0.9 = 0.99 → −1% net.' },
      { id: 'q3', questionText: 'SP is ₹120 after 20% profit. CP is?', options: ['₹100', '₹96', '₹144', '₹110'], correctOptionIndex: 0, explanation: 'CP = SP / 1.2 = 120 / 1.2 = 100.' },
    ],
  },
  {
    id: 'quiz-lr-1', title: 'Blood Relations Drill', subtitle: 'Topic quiz · LR', subject: 'Logical Reasoning', topicId: 'lr-1',
    examFormat: 'topic_quiz', timeLimitMinutes: 10, passingPercent: 50,
    questions: [
      { id: 'q1', questionText: 'A is B’s brother. C is A’s mother. How is C related to B?', options: ['Sister', 'Mother', 'Aunt', 'Grandmother'], correctOptionIndex: 1, explanation: 'C is mother of A and A is brother of B → C is mother of B.' },
      { id: 'q2', questionText: 'Pointing to a man, a woman says “His mother is the only daughter of my mother.” The man is her?', options: ['Brother', 'Son', 'Uncle', 'Father'], correctOptionIndex: 1, explanation: 'Only daughter of her mother is herself → his mother is she → man is her son.' },
    ],
  },
  {
    id: 'quiz-sectional-qt', title: 'Quant Sectional', subtitle: '20-min sectional style', subject: 'Quantitative Techniques', topicId: 'qt-1',
    examFormat: 'sectional', timeLimitMinutes: 20, passingPercent: 50,
    questions: [
      { id: 'q1', questionText: 'Average of 5 numbers is 20. If one number 30 is removed, new average?', options: ['17.5', '18', '16', '19'], correctOptionIndex: 0, explanation: 'Sum=100; remove 30 → 70/4 = 17.5.' },
      { id: 'q2', questionText: 'Simple interest on ₹1000 at 10% for 2 years?', options: ['₹200', '₹100', '₹220', '₹180'], correctOptionIndex: 0, explanation: 'SI = P×R×T/100 = 1000×10×2/100 = 200.' },
      { id: 'q3', questionText: 'Ratio 2:3. If 4 is added to each, ratio becomes 3:4. Original numbers?', options: ['8 and 12', '6 and 9', '4 and 6', '10 and 15'], correctOptionIndex: 0, explanation: '(2x+4)/(3x+4)=3/4 → 8x+16=9x+12 → x=4 → 8,12.' },
    ],
  },
];

const STORAGE = 'mitra-shah-dashboard-v1';
type Tab = 'dashboard' | 'plan' | 'practice';

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

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify({ progress, attempts }));
  }, [progress, attempts]);

  const progressMap = useMemo(() => new Map(progress.map((p) => [p.topicId, p])), [progress]);

  const sectionStats = useMemo(() => {
    const subjects: SubjectKey[] = [
      'Quantitative Techniques', 'Logical Reasoning', 'Language Comprehension',
      'General Knowledge', 'Innovation & Entrepreneurship',
    ];
    return subjects.map((subject) => {
      const topics = TOPICS.filter((t) => t.subject === subject);
      const mastered = topics.filter((t) => {
        const st = progressMap.get(t.id)?.status;
        return st === 'mastered' || st === 'quiz_passed';
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
    setAttempts((a) => [
      {
        id: `a_${Date.now()}`,
        quizId: activeQuiz.id,
        title: activeQuiz.title,
        subject: activeQuiz.subject,
        score,
        total,
        accuracyPercent: accuracy,
        passed,
        createdAt: new Date().toISOString(),
      },
      ...a,
    ]);
    setProgress((prev) => {
      const i = prev.findIndex((p) => p.topicId === activeQuiz.topicId);
      const status: TopicStatus = passed ? 'quiz_passed' : 'quiz_attempted';
      if (i >= 0) {
        const next = [...prev];
        next[i] = {
          ...next[i],
          status: next[i].status === 'mastered' ? 'mastered' : status,
          bestScore: Math.max(next[i].bestScore, score),
          totalQuestions: total,
          attemptsCount: next[i].attemptsCount + 1,
        };
        return next;
      }
      return [...prev, {
        topicId: activeQuiz.topicId,
        subject: activeQuiz.subject,
        status,
        bestScore: score,
        totalQuestions: total,
        attemptsCount: 1,
      }];
    });
    setSubmitted(true);
  }

  const nav = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'plan' as Tab, label: 'Study Plan', icon: BookOpen },
    { id: 'practice' as Tab, label: 'Practice', icon: ClipboardList },
  ];

  const filtered = TOPICS.filter((t) => filter === 'All' || t.subject === filter);

  function statusLabel(s?: TopicStatus) {
    if (s === 'mastered') return 'Mastered';
    if (s === 'quiz_passed') return 'Quiz Passed';
    if (s === 'quiz_attempted') return 'Quiz Attempted';
    if (s === 'viewed') return 'Viewed';
    return 'Not Started';
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight">Mitra AI Tutor</div>
              <div className="text-[11px] text-slate-500">CMAT 2026 · Day {day}</div>
            </div>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <button key={n.id} type="button" onClick={() => setTab(n.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  tab === n.id ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-100'
                }`}>
                <n.icon className="h-4 w-4" />{n.label}
              </button>
            ))}
          </nav>
          <button type="button" className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100" onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-slate-100 px-4 py-2 md:hidden">
            {nav.map((n) => (
              <button key={n.id} type="button" onClick={() => { setTab(n.id); setMobileOpen(false); }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  tab === n.id ? 'bg-sky-50 text-sky-700' : 'text-slate-700'
                }`}>
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
              <p className="mt-1 text-sm text-slate-600">Your CMAT sprint progress · Day {day} of 8</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Topics tracked', value: String(progress.length), hint: `${progress.filter((p) => p.status === 'quiz_passed' || p.status === 'mastered').length} passed` },
                { label: 'Quizzes taken', value: String(attempts.length), hint: `${attempts.filter((a) => a.passed).length} passed` },
                { label: 'Best accuracy', value: attempts.length ? `${Math.max(...attempts.map((a) => a.accuracyPercent))}%` : '—', hint: 'across attempts' },
                { label: 'Modules', value: String(TOPICS.length), hint: 'in study plan' },
              ].map((k) => (
                <div key={k.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{k.label}</div>
                  <div className="mt-1 text-2xl font-bold tabular-nums tracking-tight">{k.value}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{k.hint}</div>
                </div>
              ))}
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Today · Day {day}</h2>
                  <p className="mt-1 text-sm text-slate-600">Focus Quant + LR · ~75 min target</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                  <Zap className="h-3.5 w-3.5" /> Active sprint
                </span>
              </div>
              <div className="mt-5 flex flex-col gap-3 rounded-xl border border-sky-200 bg-sky-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-sky-700">Next recommended</div>
                  <div className="mt-0.5 font-medium">Start Percentages Drill</div>
                  <div className="mt-0.5 text-sm text-slate-600">Build Quant foundation with a short topic quiz</div>
                </div>
                <button type="button" onClick={() => startQuiz(QUIZZES[0])}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700">
                  Continue <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold">Section mastery</h2>
              <div className="mt-4 space-y-4">
                {sectionStats.map((s) => (
                  <div key={s.subject}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-800">{s.subject}</span>
                      <span className="tabular-nums text-slate-500">{s.mastered}/{s.total} · {s.pct}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent quiz attempts</h2>
                <button type="button" onClick={() => setTab('practice')} className="text-sm font-medium text-sky-600 hover:text-sky-700">Practice →</button>
              </div>
              {attempts.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500">No attempts yet. Start a topic quiz.</p>
              ) : (
                <ul className="mt-3 divide-y divide-slate-100">
                  {attempts.slice(0, 5).map((a) => (
                    <li key={a.id} className="flex items-center justify-between py-3 text-sm">
                      <div>
                        <div className="font-medium">{a.title}</div>
                        <div className="text-xs text-slate-500">{a.subject}</div>
                      </div>
                      <div className={`font-semibold tabular-nums ${a.passed ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {a.score}/{a.total} ({a.accuracyPercent}%)
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}

        {tab === 'plan' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Study Plan</h1>
              <p className="mt-1 text-sm text-slate-600">Structured modules for CMAT 2026</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['All', 'Quantitative Techniques', 'Logical Reasoning', 'Language Comprehension', 'General Knowledge', 'Innovation & Entrepreneurship'] as const).map((f) => (
                <button key={f} type="button" onClick={() => setFilter(f)}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    filter === f ? 'bg-sky-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                  }`}>{f === 'All' ? 'All subjects' : f}</button>
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
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="font-mono">Day {topic.dayNumber}</span><span>·</span>
                          <span>{topic.subject}</span><span>·</span>
                          <span>{topic.estimatedMinutes} min</span>
                        </div>
                        <h3 className="mt-1 text-base font-semibold">{topic.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{topic.summary}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {topic.keyConcepts.map((c) => (
                            <span key={c} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">{c}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
                          {statusLabel(prog?.status)}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {(!prog || prog.status === 'not_started') && (
                            <button type="button" onClick={() => markViewed(topic)}
                              className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800">Mark viewed</button>
                          )}
                          {quiz && (
                            <button type="button" onClick={() => startQuiz(quiz)}
                              className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700">Take quiz</button>
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
            {activeQuiz ? (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{activeQuiz.title}</h2>
                    <p className="text-sm text-slate-500">{activeQuiz.subtitle} · {activeQuiz.questions.length} questions · {activeQuiz.timeLimitMinutes} min</p>
                  </div>
                  <button type="button" onClick={() => { setActiveQuiz(null); setSubmitted(false); setAnswers({}); }}
                    className="text-sm font-medium text-slate-500 hover:text-slate-800">← Back to list</button>
                </div>
                <div className="mt-6 space-y-6">
                  {activeQuiz.questions.map((q, qi) => (
                    <div key={q.id} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Q{qi + 1}</div>
                      <p className="mt-1 font-medium">{q.questionText}</p>
                      <div className="mt-3 space-y-2">
                        {q.options.map((opt, oi) => {
                          const selected = answers[q.id] === oi;
                          const correct = submitted && q.correctOptionIndex === oi;
                          const wrong = submitted && selected && !correct;
                          return (
                            <button key={oi} type="button" disabled={submitted}
                              onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                              className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                                correct ? 'border-emerald-300 bg-emerald-50'
                                  : wrong ? 'border-rose-300 bg-rose-50'
                                  : selected ? 'border-sky-400 bg-sky-50'
                                  : 'border-slate-200 bg-white hover:border-slate-300'
                              }`}>
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-bold opacity-70">
                                {String.fromCharCode(65 + oi)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                      {submitted && (
                        <div className="mt-3 rounded-lg bg-white p-3 text-sm text-slate-600 ring-1 ring-slate-100">
                          <span className="font-medium text-slate-800">Explanation: </span>{q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {!submitted ? (
                  <button type="button" onClick={submitQuiz}
                    className="mt-6 w-full rounded-xl bg-sky-600 py-3 text-sm font-semibold text-white hover:bg-sky-700 sm:w-auto sm:px-8">
                    Submit answers
                  </button>
                ) : (
                  <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    <div>
                      <div className="font-semibold">Quiz submitted</div>
                      <div className="text-sm text-slate-600">Score saved to your dashboard. Review explanations above.</div>
                    </div>
                  </div>
                )}
              </section>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {QUIZZES.map((quiz) => {
                  const past = attempts.filter((a) => a.quizId === quiz.id);
                  const best = past.reduce((m, a) => Math.max(m, a.accuracyPercent), 0);
                  return (
                    <button key={quiz.id} type="button" onClick={() => startQuiz(quiz)}
                      className="rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-sky-300 hover:shadow-sm">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wide text-sky-600">{quiz.examFormat.replace('_', ' ')}</div>
                          <h3 className="mt-1 font-semibold">{quiz.title}</h3>
                          <p className="mt-1 text-sm text-slate-500">{quiz.subtitle}</p>
                        </div>
                        <Target className="h-5 w-5 shrink-0 text-slate-300" />
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5">{quiz.questions.length} Qs</span>
                        <span className="rounded-md bg-slate-100 px-2 py-0.5">{quiz.timeLimitMinutes} min</span>
                        <span className="rounded-md bg-slate-100 px-2 py-0.5">{quiz.subject}</span>
                        {past.length > 0 && (
                          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-700">Best {best}%</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        Mitra AI Tutor · CMAT 2026 · Progress saved in this browser
      </footer>
    </div>
  );
}
