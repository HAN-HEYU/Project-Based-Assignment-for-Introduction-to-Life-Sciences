import { useEffect, useMemo, useState } from "react";
import { FinalExam } from "./components/FinalExam";
import { GlossaryDrawer } from "./components/GlossaryDrawer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { KnowledgeMap } from "./components/KnowledgeMap";
import { ModuleCard } from "./components/ModuleCard";
import { ModulePage } from "./components/ModulePage";
import { ReviewCenter } from "./components/ReviewCenter";
import { Timeline } from "./components/Timeline";
import { VideoLibrary } from "./components/VideoLibrary";
import { references } from "./data/cases";
import { modules } from "./data/modules";
import type { ModuleId, StoredProgress, ViewId, WrongAnswer } from "./types";
import {
  clearProgress,
  loadProgress,
  markModuleComplete,
  saveProgress,
  setCurrentModule,
  setExamDraft,
  setExamResult,
  setWrongAnswers,
  updateModuleProgress,
} from "./utils/storage";

export default function App() {
  const [view, setView] = useState<ViewId>("home");
  const [progress, setProgress] = useState<StoredProgress>(() => loadProgress());
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>(
    () => progress.lastVisitedModule ?? progress.currentModule ?? "food-safety",
  );

  const activeModule = useMemo(
    () => modules.find((module) => module.id === activeModuleId) ?? modules[0],
    [activeModuleId],
  );

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const completedIds = progress.completedModules.filter((id) =>
    modules.some((module) => module.id === id),
  );

  const openModule = (id: ModuleId) => {
    setActiveModuleId(id);
    setProgress((current) => setCurrentModule(current, id));
    setView("module");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const completeModule = (id: ModuleId) => {
    setProgress((current) => markModuleComplete(current, id));
  };

  const updateModuleLearningProgress = (id: ModuleId, value: number) => {
    setProgress((current) => updateModuleProgress(current, id, value));
  };

  const addWrongAnswer = (wrong: WrongAnswer) => {
    setProgress((current) => setWrongAnswers(current, [...current.wrongAnswers, wrong]));
  };

  const addWrongAnswers = (wrongAnswers: WrongAnswer[]) => {
    setProgress((current) => setWrongAnswers(current, [...current.wrongAnswers, ...wrongAnswers]));
  };

  const clearAllProgress = () => {
    setProgress(clearProgress());
    setActiveModuleId("food-safety");
    setView("home");
  };

  const startExploring = () => {
    const firstIncomplete = modules.find((module) => !completedIds.includes(module.id));
    openModule(firstIncomplete?.id ?? modules[0].id);
  };

  return (
    <div className="app-shell">
      <Header
        currentView={view}
        currentModuleId={activeModuleId}
        completedCount={completedIds.length}
        totalCount={modules.length}
        examScore={progress.examResult?.score ?? null}
        onNavigate={setView}
      />

      <main>
        {view === "home" && (
          <>
            <Hero
              onStart={startExploring}
              onMap={() => setView("map")}
              onChallenge={() => setView("challenge")}
            />
            <section className="page-section">
              <div className="section-title">
                <span>Learning Modules</span>
                <h2>五个探索舱</h2>
                <p>沿着“基础概念、技术区别、应用场景、风险伦理、综合决策”的路径完成探索。</p>
              </div>
              <div className="module-grid">
                {modules.map((module, index) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    index={index}
                    completed={completedIds.includes(module.id)}
                    onOpen={() => openModule(module.id)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {view === "timeline" && <Timeline />}

        {view === "map" && (
          <KnowledgeMap
            completedIds={completedIds}
            moduleProgress={progress.moduleProgress}
            onOpenModule={openModule}
            onOpenFinal={() => setView("challenge")}
          />
        )}

        {view === "lab" && (
          <>
            <section className="page-section">
              <div className="section-title">
                <span>Interactive Lab</span>
                <h2>互动实验室</h2>
                <p>选择任意探索舱进入。所有模拟均为科普交互，不展示真实实验参数或操作流程。</p>
              </div>
              <div className="module-grid">
                {modules.map((module, index) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    index={index}
                    completed={completedIds.includes(module.id)}
                    onOpen={() => openModule(module.id)}
                  />
                ))}
              </div>
            </section>
            <VideoLibrary />
          </>
        )}

        {view === "module" && (
          <ModulePage
            module={activeModule}
            modules={modules}
            completedIds={completedIds}
            quizProgress={progress.quizProgress}
            moduleProgress={progress.moduleProgress[activeModule.id]}
            onSelectModule={openModule}
            onProgress={updateModuleLearningProgress}
            onComplete={completeModule}
            onWrongAnswer={addWrongAnswer}
          />
        )}

        {view === "challenge" && (
          <FinalExam
            draft={progress.examDraft}
            result={progress.examResult}
            onSaveDraft={(draft) => setProgress((current) => setExamDraft(current, draft))}
            onSubmitResult={(result) => setProgress((current) => setExamResult(current, result))}
            onWrongAnswers={addWrongAnswers}
          />
        )}

        {view === "review" && (
          <ReviewCenter
            modules={modules}
            progress={progress}
            onOpenModule={openModule}
            onOpenExam={() => setView("challenge")}
            onClearProgress={clearAllProgress}
          />
        )}

        {view === "references" && (
          <section className="page-section references-section">
            <div className="section-title">
              <span>References</span>
              <h2>参考资料</h2>
              <p>
                本网页用于课程科普学习，内容以概念理解、风险评估和伦理讨论为主，不提供实验操作指导。
              </p>
            </div>
            <div className="reference-board">
              {references.map((item) => (
                <article key={item}>{item}</article>
              ))}
            </div>
          </section>
        )}
      </main>

      <GlossaryDrawer />
    </div>
  );
}
