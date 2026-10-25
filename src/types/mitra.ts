export type ExplanationLanguage = 'hinglish' | 'english' | 'hindi';
export type ExplanationDepth = 'step_by_step' | 'concise';

export type SubjectKey =
  | 'Quantitative Techniques'
  | 'Logical Reasoning'
  | 'Language Comprehension'
  | 'General Awareness'
  | 'Innovation & Entrepreneurship';

export type TopicStatus =
  | 'not_started'
  | 'viewed'
  | 'quiz_attempted'
  | 'quiz_passed'
  | 'mastered';

export type ExamFormat = 'topic_quiz' | 'sectional' | 'full_mock';

export interface UserLearningProfile {
  id: string;
  displayName: string;
  preferredLanguage: ExplanationLanguage;
  explanationDepth: ExplanationDepth;
  currentDay: number;
  currentSubject: SubjectKey;
  currentTopicId: string;
  totalStudyMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface SyllabusTopic {
  id: string;
  dayNumber: number;
  subject: SubjectKey;
  title: string;
  summary: string;
  keyConcepts: string[];
  estimatedMinutes: number;
  linkedQuizId?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface TopicProgressRecord {
  topicId: string;
  subject: SubjectKey;
  status: TopicStatus;
  bestScore: number;
  totalQuestions: number;
  attemptsCount: number;
  timeSpentMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'numeric' | 'short';
  questionText: string;
  options?: string[];
  correctOptionIndex?: number;
  correctAnswer?: string;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  subject?: SubjectKey;
}

export interface QuizSet {
  id: string;
  title: string;
  subtitle?: string;
  subject: SubjectKey;
  topicId: string;
  examFormat: ExamFormat;
  questions: QuizQuestion[];
  timeLimitMinutes: number;
  passingPercent: number;
}

export interface QuizAttemptRecord {
  id: string;
  quizId: string;
  title: string;
  subject: SubjectKey;
  topicId: string;
  examFormat: ExamFormat;
  score: number;
  total: number;
  accuracyPercent: number;
  durationSeconds: number;
  passed: boolean;
  status: 'completed' | 'in_progress' | 'abandoned';
  createdAt: string;
}

export interface ErrorLogRecord {
  id: string;
  topicId: string;
  subject: SubjectKey;
  questionId?: string;
  note: string;
  resolved: boolean;
  createdAt: string;
}

export interface StudyNoteRecord {
  id: string;
  topicId: string;
  subject: SubjectKey;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationThread {
  id: string;
  title: string;
  subject?: SubjectKey;
  topicId?: string;
  createdAt: string;
  updatedAt: string;
  archived?: boolean;
}

export interface ChatMessageItem {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
}

export interface ChatAttachment {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  url?: string;
}

export interface AIProviderStatus {
  liveAvailable: boolean;
  provider: string;
  message?: string;
}

export interface DailySubjectSlot {
  subject: SubjectKey;
  statusLabel: string;
  detail: string;
  completed: boolean;
  pendingAssessment: boolean;
}

export interface DailyProgressCardSnapshot {
  dayNumber: number;
  dateLabel: string;
  targetMinutes: number;
  minutesStudied: number;
  overallAccuracy: number;
  subjects: DailySubjectSlot[];
  nextRecommendedAction?: {
    label: string;
    reason?: string;
    topicId?: string;
    quizId?: string;
  };
}

export interface SectionAnalyticsItem {
  subject: SubjectKey;
  totalTopics: number;
  masteredTopics: number;
  masteryPercent: number;
  accuracyPercent: number;
  studyMinutes: number;
  weakAreas: string[];
}

export interface DailyTimetableSlot {
  subject: SubjectKey;
  alternateSubject?: SubjectKey;
  minutes: number;
  activity: string;
}
