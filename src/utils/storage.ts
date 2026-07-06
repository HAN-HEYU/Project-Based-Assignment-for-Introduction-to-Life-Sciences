import type {
  ExamDraft,
  ExamResultData,
  FinalReportData,
  ModuleId,
  QuizProgress,
  StoredProgress,
  WrongAnswer,
} from "../types";

const STORAGE_KEY = "gene-time-machine-v2";
const LEGACY_KEY = "gene-time-machine-progress-v1";

const moduleIds: ModuleId[] = [
  "food-safety",
  "plants",
  "animals",
  "gene-therapy",
  "gene-editing",
];

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function safeParse(value: string | null): unknown {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function isModuleId(value: unknown): value is ModuleId {
  return typeof value === "string" && moduleIds.includes(value as ModuleId);
}

function uniqueModules(value: unknown): ModuleId[] {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.filter(isModuleId)));
}

export function createDefaultProgress(): StoredProgress {
  return {
    version: 2,
    completedModules: [],
    moduleProgress: {},
    quizProgress: {},
    examDraft: null,
    examResult: null,
    wrongAnswers: [],
    finalReport: null,
    lastVisitedModule: "food-safety",
    currentModule: "food-safety",
  };
}

function normalizeQuizProgress(value: unknown): QuizProgress {
  if (!value || typeof value !== "object") return {};
  return moduleIds.reduce<QuizProgress>((acc, id) => {
    const raw = (value as Record<string, unknown>)[id];
    if (typeof raw === "boolean") acc[id] = raw;
    return acc;
  }, {});
}

function normalizeModuleProgress(value: unknown): Partial<Record<ModuleId, number>> {
  if (!value || typeof value !== "object") return {};
  return moduleIds.reduce<Partial<Record<ModuleId, number>>>((acc, id) => {
    const raw = (value as Record<string, unknown>)[id];
    if (typeof raw === "number" && Number.isFinite(raw)) {
      acc[id] = Math.max(0, Math.min(1, raw));
    }
    return acc;
  }, {});
}

function normalizeWrongAnswers(value: unknown): WrongAnswer[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is WrongAnswer => {
    if (!item || typeof item !== "object") return false;
    const record = item as Record<string, unknown>;
    return (
      typeof record.id === "string" &&
      typeof record.questionId === "string" &&
      typeof record.question === "string" &&
      typeof record.explanation === "string"
    );
  });
}

function normalizeProgress(raw: unknown): StoredProgress {
  const defaults = createDefaultProgress();
  if (!raw || typeof raw !== "object") return defaults;
  const record = raw as Record<string, unknown>;
  const completedModules = uniqueModules(record.completedModules);
  const quizProgress = normalizeQuizProgress(record.quizProgress);
  const moduleProgress = {
    ...normalizeModuleProgress(record.moduleProgress),
    ...completedModules.reduce<Partial<Record<ModuleId, number>>>((acc, id) => {
      acc[id] = 1;
      return acc;
    }, {}),
  };
  const currentModule = isModuleId(record.currentModule)
    ? record.currentModule
    : isModuleId(record.lastVisitedModule)
      ? record.lastVisitedModule
      : defaults.currentModule;

  return {
    version: 2,
    completedModules,
    moduleProgress,
    quizProgress,
    examDraft: record.examDraft && typeof record.examDraft === "object" ? (record.examDraft as ExamDraft) : null,
    examResult:
      record.examResult && typeof record.examResult === "object"
        ? (record.examResult as ExamResultData)
        : null,
    wrongAnswers: normalizeWrongAnswers(record.wrongAnswers),
    finalReport:
      record.finalReport && typeof record.finalReport === "object"
        ? (record.finalReport as FinalReportData)
        : null,
    lastVisitedModule: currentModule,
    currentModule,
  };
}

function migrateLegacy(): StoredProgress {
  if (!canUseStorage()) return createDefaultProgress();
  const legacy = safeParse(window.localStorage.getItem(LEGACY_KEY));
  return normalizeProgress(legacy);
}

export function loadProgress(): StoredProgress {
  if (!canUseStorage()) return createDefaultProgress();
  const current = safeParse(window.localStorage.getItem(STORAGE_KEY));
  if (current) return normalizeProgress(current);
  return migrateLegacy();
}

export function saveProgress(progress: StoredProgress) {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeProgress(progress)));
  } catch {
    // localStorage may be unavailable or full; the app should keep running.
  }
}

export function markModuleComplete(progress: StoredProgress, moduleId: ModuleId): StoredProgress {
  const completedModules = progress.completedModules.includes(moduleId)
    ? progress.completedModules
    : [...progress.completedModules, moduleId];

  return {
    ...progress,
    completedModules,
    quizProgress: { ...progress.quizProgress, [moduleId]: true },
    moduleProgress: { ...progress.moduleProgress, [moduleId]: 1 },
    currentModule: moduleId,
    lastVisitedModule: moduleId,
  };
}

export function updateModuleProgress(
  progress: StoredProgress,
  moduleId: ModuleId,
  value: number,
): StoredProgress {
  return {
    ...progress,
    moduleProgress: {
      ...progress.moduleProgress,
      [moduleId]: Math.max(0, Math.min(1, value)),
    },
    currentModule: moduleId,
    lastVisitedModule: moduleId,
  };
}

export function setCurrentModule(progress: StoredProgress, moduleId: ModuleId): StoredProgress {
  return {
    ...progress,
    currentModule: moduleId,
    lastVisitedModule: moduleId,
    moduleProgress: {
      ...progress.moduleProgress,
      [moduleId]: Math.max(progress.moduleProgress[moduleId] ?? 0.08, 0.08),
    },
  };
}

export function setFinalReport(
  progress: StoredProgress,
  report: FinalReportData | null,
): StoredProgress {
  return { ...progress, finalReport: report };
}

export function setExamDraft(progress: StoredProgress, draft: ExamDraft | null): StoredProgress {
  return { ...progress, examDraft: draft };
}

export function setExamResult(
  progress: StoredProgress,
  result: ExamResultData | null,
): StoredProgress {
  return { ...progress, examResult: result };
}

export function setWrongAnswers(
  progress: StoredProgress,
  wrongAnswers: WrongAnswer[],
): StoredProgress {
  const unique = Array.from(
    new Map(wrongAnswers.map((item) => [`${item.source}-${item.questionId}`, item])).values(),
  );
  return { ...progress, wrongAnswers: unique };
}

export function clearProgress(): StoredProgress {
  if (canUseStorage()) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
  }
  return createDefaultProgress();
}
