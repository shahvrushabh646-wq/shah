export type SubjectKey =
  | 'Quantitative Techniques'
  | 'Logical Reasoning'
  | 'Language Comprehension'
  | 'General Knowledge'
  | 'Innovation & Entrepreneurship';

export type TopicStatus = 'not_started' | 'viewed' | 'quiz_attempted' | 'quiz_passed' | 'mastered';
export type Tab = 'dashboard' | 'learn' | 'plan' | 'practice';

export interface Topic {
  id: string;
  dayNumber: number;
  subject: SubjectKey;
  title: string;
  summary: string;
  keyConcepts: string[];
  estimatedMinutes: number;
  lessons: { heading: string; body: string }[];
  example: { question: string; steps: string[]; answer: string };
}

export interface QuizQ {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
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

export interface Progress {
  topicId: string;
  subject: SubjectKey;
  status: TopicStatus;
  bestScore: number;
  totalQuestions: number;
  attemptsCount: number;
}

export interface Attempt {
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

export const TOPICS: Topic[] = [
  {
    id: 'qt-1', dayNumber: 1, subject: 'Quantitative Techniques', title: 'Percentages & Profit-Loss',
    summary: 'Core arithmetic for CMAT Quant — % change, successive %, SP/CP.',
    keyConcepts: ['% change', 'SP/CP', 'successive %'], estimatedMinutes: 40,
    lessons: [
      { heading: 'What is a percentage?', body: 'Percent means per hundred. x% of N = (x/100) × N. Example: 20% of 150 = 30.' },
      { heading: 'Percentage change', body: 'Change % = (New − Old) / Old × 100. If price goes 100 → 120, increase = 20%.' },
      { heading: 'Successive percentages', body: 'Two successive changes multiply. A 10% rise then 10% fall is −1% net (1.1 × 0.9 = 0.99).' },
      { heading: 'Profit & Loss', body: 'Profit % = (SP − CP) / CP × 100. If SP is given with profit %, CP = SP / (1 + profit%/100).' },
    ],
    example: {
      question: 'An article is sold at ₹120 after 20% profit. Find CP.',
      steps: ['Profit 20% means SP = CP × 1.20', 'CP = SP / 1.20 = 120 / 1.2', 'CP = ₹100'],
      answer: '₹100',
    },
  },
  {
    id: 'lr-1', dayNumber: 1, subject: 'Logical Reasoning', title: 'Blood Relations & Directions',
    summary: 'Puzzle basics — family trees, facing, left-right turns.',
    keyConcepts: ['family tree', 'facing', 'turns'], estimatedMinutes: 35,
    lessons: [
      { heading: 'Blood relations approach', body: 'Draw a family tree. Generations go top to bottom. Use + male, − female, = marriage.' },
      { heading: 'Classic pattern', body: 'Only daughter of my mother usually means the speaker herself (if female). Read carefully.' },
      { heading: 'Directions', body: 'Face North: left = West, right = East. Sketch arrows for multi-turn problems.' },
    ],
    example: {
      question: 'A is B’s brother. C is A’s mother. How is C related to B?',
      steps: ['A and B are siblings', 'C is mother of A', 'Therefore C is also mother of B'],
      answer: 'Mother',
    },
  },
  {
    id: 'lc-1', dayNumber: 2, subject: 'Language Comprehension', title: 'Reading Comprehension Basics',
    summary: 'How to approach RC passages — main idea, tone, inference.',
    keyConcepts: ['main idea', 'tone', 'inference'], estimatedMinutes: 40,
    lessons: [
      { heading: 'First pass', body: 'Read first and last paragraph carefully. Note the author’s main claim.' },
      { heading: 'Main idea vs detail', body: 'Main idea asks what the passage is primarily about. Avoid options that are true but too narrow.' },
      { heading: 'Inference', body: 'Must be strongly supported by the text — not outside knowledge.' },
      { heading: 'Tone', body: 'Match the author’s attitude: critical, optimistic, neutral, sceptical, analytical.' },
    ],
    example: {
      question: 'A passage argues urban parks improve mental health with survey data. Best main idea?',
      steps: ['Focus on the author’s claim', 'Eliminate options about only one city', 'Choose parks + mental health + evidence'],
      answer: 'Urban parks are linked to better mental health, as suggested by survey evidence.',
    },
  },
  {
    id: 'gk-1', dayNumber: 2, subject: 'General Knowledge', title: 'Indian Economy Snapshot',
    summary: 'High-yield economy GK — GDP, RBI, budget basics.',
    keyConcepts: ['GDP', 'RBI', 'budget'], estimatedMinutes: 30,
    lessons: [
      { heading: 'GDP', body: 'Market value of all final goods and services produced within a country in a period.' },
      { heading: 'RBI', body: 'Central bank: monetary policy (repo, CRR, SLR), issues currency, regulates banks.' },
      { heading: 'Budget basics', body: 'Fiscal deficit = total expenditure − total receipts excluding borrowings.' },
    ],
    example: {
      question: 'Who sets the repo rate in India?',
      steps: ['Repo rate is a monetary policy tool', 'Conducted by the central bank', 'RBI via the MPC'],
      answer: 'Reserve Bank of India (Monetary Policy Committee)',
    },
  },
  {
    id: 'ie-1', dayNumber: 3, subject: 'Innovation & Entrepreneurship', title: 'Startup Ecosystem India',
    summary: 'Schemes and terminology — DPIIT, unicorn, bootstrapping.',
    keyConcepts: ['DPIIT', 'unicorn', 'bootstrapping'], estimatedMinutes: 30,
    lessons: [
      { heading: 'Startup definition (India)', body: 'DPIIT recognition matters for tax and scheme benefits.' },
      { heading: 'Unicorn', body: 'Privately held startup valued at USD 1 billion or more.' },
      { heading: 'Bootstrapping', body: 'Building with personal funds or revenue, without external VC.' },
    ],
    example: {
      question: 'What is a unicorn startup?',
      steps: ['Valuation threshold', 'USD 1 billion private valuation'],
      answer: 'A privately held startup valued at $1 billion or more',
    },
  },
  {
    id: 'qt-2', dayNumber: 3, subject: 'Quantitative Techniques', title: 'Averages & Mixtures',
    summary: 'Weighted averages and alligation method.',
    keyConcepts: ['weighted avg', 'alligation'], estimatedMinutes: 40,
    lessons: [
      { heading: 'Simple average', body: 'Average = Sum / Count. Average of 5 numbers is 20 → sum = 100.' },
      { heading: 'Weighted average', body: '(n1×a1 + n2×a2) / (n1+n2). Weight by count or quantity.' },
      { heading: 'Alligation', body: 'Ratio of quantities = inverse ratio of differences from mean concentration.' },
    ],
    example: {
      question: 'Average of 5 numbers is 20. One number 30 removed. New average?',
      steps: ['Sum of 5 = 100', 'Remove 30 → 70', '70/4 = 17.5'],
      answer: '17.5',
    },
  },
  {
    id: 'lr-2', dayNumber: 4, subject: 'Logical Reasoning', title: 'Syllogisms & Venn',
    summary: 'Standard syllogism patterns with Venn diagrams.',
    keyConcepts: ['all/some/none', 'Venn'], estimatedMinutes: 35,
    lessons: [
      { heading: 'Statements', body: 'All / Some / No / Some not. Draw circles; do not assume some means not all.' },
      { heading: 'Conclusions', body: 'Follows only if true in every possible diagram.' },
      { heading: 'Exam tip', body: 'For possibility questions, one valid diagram is enough.' },
    ],
    example: {
      question: 'All cats are animals. Some animals are wild. Some cats are wild?',
      steps: ['Cats inside Animals', 'Wild may not overlap Cats', 'Does not necessarily follow'],
      answer: 'No — does not necessarily follow',
    },
  },
  {
    id: 'lc-2', dayNumber: 4, subject: 'Language Comprehension', title: 'Vocabulary in Context',
    summary: 'Synonyms, antonyms, and usage from context clues.',
    keyConcepts: ['context clues', 'roots'], estimatedMinutes: 30,
    lessons: [
      { heading: 'Context first', body: 'Read the full sentence; tone and nearby words constrain meaning.' },
      { heading: 'Roots & affixes', body: 'bene- (good), mal- (bad), -able (can be).' },
      { heading: 'Elimination', body: 'Remove options that change intensity or polarity.' },
    ],
    example: {
      question: 'The CEO’s speech was laconic but effective. Meaning of laconic?',
      steps: ['But effective → brevity is fine', 'Laconic = using few words'],
      answer: 'Brief / concise in speech',
    },
  },
];

export const QUIZZES: Quiz[] = [
  {
    id: 'quiz-qt-1', title: 'Percentages Drill', subtitle: 'Topic quiz · Quant', subject: 'Quantitative Techniques', topicId: 'qt-1',
    examFormat: 'topic_quiz', timeLimitMinutes: 12, passingPercent: 50,
    questions: [
      { id: 'q1', questionText: 'What is 20% of 150?', options: ['20', '30', '25', '35'], correctOptionIndex: 1, explanation: '0.2 × 150 = 30.' },
      { id: 'q2', questionText: 'A price rises 10% then falls 10%. Net change?', options: ['0%', '−1%', '+1%', '−10%'], correctOptionIndex: 1, explanation: '1.1 × 0.9 = 0.99 → −1%.' },
      { id: 'q3', questionText: 'SP is ₹120 after 20% profit. CP is?', options: ['₹100', '₹96', '₹144', '₹110'], correctOptionIndex: 0, explanation: 'CP = 120 / 1.2 = 100.' },
    ],
  },
  {
    id: 'quiz-lr-1', title: 'Blood Relations Drill', subtitle: 'Topic quiz · LR', subject: 'Logical Reasoning', topicId: 'lr-1',
    examFormat: 'topic_quiz', timeLimitMinutes: 10, passingPercent: 50,
    questions: [
      { id: 'q1', questionText: 'A is B’s brother. C is A’s mother. How is C related to B?', options: ['Sister', 'Mother', 'Aunt', 'Grandmother'], correctOptionIndex: 1, explanation: 'C is mother of both.' },
      { id: 'q2', questionText: 'His mother is the only daughter of my mother. The man is her?', options: ['Brother', 'Son', 'Uncle', 'Father'], correctOptionIndex: 1, explanation: 'Man is her son.' },
    ],
  },
  {
    id: 'quiz-sectional-qt', title: 'Quant Sectional', subtitle: 'Sectional style', subject: 'Quantitative Techniques', topicId: 'qt-1',
    examFormat: 'sectional', timeLimitMinutes: 20, passingPercent: 50,
    questions: [
      { id: 'q1', questionText: 'Average of 5 numbers is 20. One number 30 removed. New average?', options: ['17.5', '18', '16', '19'], correctOptionIndex: 0, explanation: '70/4 = 17.5.' },
      { id: 'q2', questionText: 'SI on ₹1000 at 10% for 2 years?', options: ['₹200', '₹100', '₹220', '₹180'], correctOptionIndex: 0, explanation: 'P×R×T/100 = 200.' },
      { id: 'q3', questionText: 'Ratio 2:3; +4 each → 3:4. Original numbers?', options: ['8 and 12', '6 and 9', '4 and 6', '10 and 15'], correctOptionIndex: 0, explanation: 'x=4 → 8 and 12.' },
    ],
  },
];
