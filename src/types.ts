export type ModuleId =
  | "food-safety"
  | "plants"
  | "animals"
  | "gene-therapy"
  | "gene-editing";

export type InteractionType =
  | "safety"
  | "farm"
  | "animalEthics"
  | "therapyPuzzle"
  | "crispr";

export type ViewId =
  | "home"
  | "timeline"
  | "map"
  | "lab"
  | "review"
  | "challenge"
  | "references"
  | "module";

export type ModuleSectionId =
  | "lead"
  | "what"
  | "logic"
  | "use"
  | "risk"
  | "reality"
  | "summary";

export interface QuizQuestion {
  id: string;
  type: "single" | "multiple" | "boolean" | "matching" | "case";
  question: string;
  options?: string[];
  answerIndex?: number;
  answerIndexes?: number[];
  answerBoolean?: boolean;
  matchingPairs?: Array<{ prompt: string; answer: string }>;
  matchingOptions?: string[];
  explanation: string;
  hint: string;
  misconception: string;
  relatedConcept: string;
}

export type QuizAnswer = number | number[] | boolean | Record<string, string>;

export interface ModuleSection {
  id: ModuleSectionId;
  title: string;
  icon: string;
  points: string[];
  note?: string;
}

export interface ConceptItem {
  title: string;
  definition: string;
  example: string;
  misconception: string;
  icon?: string;
}

export interface CompareCardData {
  title: string;
  leftTitle: string;
  rightTitle: string;
  leftPoints: string[];
  rightPoints: string[];
  takeaway: string;
}

export interface FlowStepData {
  title: string;
  description: string;
  tag?: string;
}

export interface MisconceptionData {
  myth: string;
  clarification: string;
}

export interface LearningModule {
  id: ModuleId;
  title: string;
  subtitle: string;
  learningGoal: string;
  coreQuestion: string;
  estimatedMinutes: number;
  prerequisite: string;
  keywords: string[];
  summary: string;
  conceptCards: ConceptItem[];
  compareCards: CompareCardData[];
  flowSteps: FlowStepData[];
  misconceptions: MisconceptionData[];
  sections: ModuleSection[];
  interactionType: InteractionType;
  quizIds: string[];
  videoIds: string[];
  animationIds: AnimationId[];
  nextModuleId?: ModuleId;
  quiz: QuizQuestion[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export type QuizProgress = Partial<Record<ModuleId, boolean>>;

export type AnimationId =
  | "dna-helix"
  | "gene-expression"
  | "gmo-vs-editing"
  | "safety-flow"
  | "smart-farm-flow"
  | "gene-therapy-flow"
  | "crispr-cut"
  | "risk-balance";

export interface AnimationResource {
  id: AnimationId;
  title: string;
  description: string;
  relatedModule?: ModuleId;
  learningPoint: string;
}

export interface VideoResource {
  id: string;
  title: string;
  provider: string;
  description: string;
  relatedModule?: ModuleId;
  embedUrl?: string;
  watchUrl?: string;
  duration: string;
  tags: string[];
  note: string;
}

export interface FinalReportData {
  planId: string;
  planTitle: string;
  ratings: Record<string, string>;
  evidence: string[];
  riskControl: string;
  reason: string;
  judgment: string;
  createdAt: string;
}

export type ExamQuestionType = "single" | "multiple" | "boolean" | "matching" | "case";

export interface ExamQuestion {
  id: string;
  sectionId: string;
  type: ExamQuestionType;
  prompt: string;
  points: number;
  options?: string[];
  answerIndex?: number;
  answerIndexes?: number[];
  answerBoolean?: boolean;
  matchingPairs?: Array<{ prompt: string; answer: string }>;
  matchingOptions?: string[];
  scenario?: string;
  rubric?: string[];
  explanation: string;
  relatedConcept: string;
}

export interface ExamSection {
  id: string;
  title: string;
  description: string;
  questions: ExamQuestion[];
}

export interface ExamPaperData {
  title: string;
  totalPoints: number;
  sections: ExamSection[];
}

export interface ExamDraft {
  answers: Record<string, QuizAnswer>;
  updatedAt: string;
}

export interface ExamResultData {
  score: number;
  totalPoints: number;
  sectionScores: Record<string, { score: number; max: number }>;
  correctCount: number;
  questionCount: number;
  level: string;
  submittedAt: string;
  answers: Record<string, QuizAnswer>;
  wrongQuestionIds: string[];
}

export interface WrongAnswer {
  id: string;
  source: "module" | "exam";
  moduleId?: ModuleId;
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  relatedConcept: string;
  createdAt: string;
}

export interface StoredProgress {
  version: 2;
  completedModules: ModuleId[];
  moduleProgress: Partial<Record<ModuleId, number>>;
  quizProgress: QuizProgress;
  examDraft: ExamDraft | null;
  examResult: ExamResultData | null;
  wrongAnswers: WrongAnswer[];
  finalReport: FinalReportData | null;
  lastVisitedModule?: ModuleId;
  currentModule?: ModuleId;
}
