import { useEffect, useMemo, useState } from "react";
import { glossary } from "../data/glossary";
import type { LearningModule, ModuleId, ModuleSection, QuizProgress, WrongAnswer } from "../types";
import { AnimalEthicsPanel } from "./AnimalEthicsPanel";
import { CompareCard, FlowCard, MisconceptionCard, RiskCard, ThinkPromptCard } from "./LearningCards";
import { ConceptCard } from "./ConceptCard";
import { CrisprSimulator } from "./CrisprSimulator";
import { GeneTherapyPuzzle } from "./GeneTherapyPuzzle";
import { LearningStepper } from "./LearningStepper";
import { ModuleAnimationSection } from "./LearningAnimations";
import { ModuleVideoSection } from "./ModuleVideoSection";
import { ProgressBar } from "./ProgressBar";
import { Quiz } from "./Quiz";
import { SafetyEvaluator } from "./SafetyEvaluator";
import { ScienceIcon } from "./ScienceIcon";
import { SmartFarmSimulator } from "./SmartFarmSimulator";

interface ModulePageProps {
  module: LearningModule;
  modules: LearningModule[];
  completedIds: ModuleId[];
  quizProgress: QuizProgress;
  moduleProgress?: number;
  onSelectModule: (id: ModuleId) => void;
  onProgress: (id: ModuleId, value: number) => void;
  onComplete: (id: ModuleId) => void;
  onWrongAnswer: (wrong: WrongAnswer) => void;
}

const learningSteps = ["导入问题", "核心概念", "技术逻辑", "应用案例", "风险争议", "小结练习"];

function renderInteraction(type: LearningModule["interactionType"]) {
  switch (type) {
    case "safety":
      return <SafetyEvaluator />;
    case "farm":
      return <SmartFarmSimulator />;
    case "animalEthics":
      return <AnimalEthicsPanel />;
    case "therapyPuzzle":
      return <GeneTherapyPuzzle />;
    case "crispr":
      return <CrisprSimulator />;
    default:
      return null;
  }
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightText({ text }: { text: string }) {
  const terms = glossary.map((item) => item.term).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        terms.includes(part) ? (
          <span className="glossary-inline" key={`${part}-${index}`}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

function SectionCard({ section }: { section: ModuleSection }) {
  return (
    <article className={`section-card section-${section.id}`} id={section.id}>
      <div className="concept-heading">
        <ScienceIcon name={section.icon} />
        <h3>{section.title}</h3>
      </div>
      <ul>
        {section.points.map((point) => (
          <li key={point}>
            <HighlightText text={point} />
          </li>
        ))}
      </ul>
      {section.note && <p className="concept-note">{section.note}</p>}
    </article>
  );
}

function getSection(module: LearningModule, id: ModuleSection["id"]) {
  return module.sections.find((section) => section.id === id) ?? module.sections[0];
}

export function ModulePage({
  module,
  modules,
  completedIds,
  quizProgress,
  moduleProgress,
  onSelectModule,
  onProgress,
  onComplete,
  onWrongAnswer,
}: ModulePageProps) {
  const [activeStep, setActiveStep] = useState(0);
  const completed = completedIds.includes(module.id) || Boolean(quizProgress[module.id]);
  const nextModule = useMemo(
    () => modules.find((item) => item.id === module.nextModuleId),
    [module.nextModuleId, modules],
  );
  const currentProgress = completed
    ? 1
    : Math.min(0.95, Math.max(moduleProgress ?? 0, (activeStep + 1) / learningSteps.length));

  useEffect(() => {
    setActiveStep(0);
  }, [module.id]);

  useEffect(() => {
    if (!completed && currentProgress > (moduleProgress ?? 0)) {
      onProgress(module.id, currentProgress);
    }
  }, [completed, currentProgress, module.id, onProgress]);

  const stepContent = [
    <div className="learning-panel" key="lead">
      <SectionCard section={getSection(module, "lead")} />
      <ThinkPromptCard
        question={module.coreQuestion}
        hint={`前置知识：${module.prerequisite}`}
      />
    </div>,
    <div className="learning-panel" key="concepts">
      <div className="concept-grid">
        {module.conceptCards.map((concept) => (
          <ConceptCard key={concept.title} concept={concept} />
        ))}
      </div>
      {module.compareCards[0] && <CompareCard card={module.compareCards[0]} />}
    </div>,
    <div className="learning-panel" key="logic">
      <SectionCard section={getSection(module, "logic")} />
      <FlowCard steps={module.flowSteps} />
      <ModuleAnimationSection animationIds={module.animationIds} />
    </div>,
    <div className="learning-panel" key="application">
      <SectionCard section={getSection(module, "use")} />
      <SectionCard section={getSection(module, "reality")} />
      <div className="interaction-lab-panel">{renderInteraction(module.interactionType)}</div>
      <ModuleVideoSection videoIds={module.videoIds} />
    </div>,
    <div className="learning-panel" key="risk">
      <SectionCard section={getSection(module, "risk")} />
      {module.compareCards.slice(1).map((card) => (
        <CompareCard key={card.title} card={card} />
      ))}
      <div className="misconception-grid">
        {module.misconceptions.map((item) => (
          <MisconceptionCard key={item.myth} item={item} />
        ))}
      </div>
      <RiskCard
        title="本章风险判断框架"
        points={getSection(module, "risk").points}
      />
    </div>,
    <div className="learning-panel" key="summary">
      <SectionCard section={getSection(module, "summary")} />
      <Quiz
        moduleId={module.id}
        questions={module.quiz}
        alreadyComplete={completed}
        onComplete={() => onComplete(module.id)}
        onWrongAnswer={onWrongAnswer}
      />
      <div className="chapter-summary next-stop">
        <strong>本章你学会了什么</strong>
        <p>{module.summary}</p>
        {nextModule ? (
          <button className="glow-button primary" onClick={() => onSelectModule(nextModule.id)}>
            进入下一站：{nextModule.title}
          </button>
        ) : (
          <button className="glow-button warn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            已到最后一站，可前往最终挑战
          </button>
        )}
      </div>
    </div>,
  ];

  return (
    <section className="module-page-v2">
      <div className="module-learning-main">
        <div className="module-cover reveal">
          <div>
            <span className="task-label">Module Cover</span>
            <h1>{module.title}</h1>
            <p>{module.subtitle}</p>
          </div>
          <div className="cover-meta">
            <div>
              <strong>{module.estimatedMinutes} 分钟</strong>
              <span>预计学习时间</span>
            </div>
            <div>
              <strong>{Math.round(currentProgress * 100)}%</strong>
              <span>当前完成度</span>
            </div>
            <div className={completed ? "status-pill complete" : "status-pill"}>
              {completed ? "已点亮" : "完成小测后点亮"}
            </div>
          </div>
          <ProgressBar value={currentProgress} max={1} label="章节进度" />
        </div>

        <LearningStepper steps={learningSteps} activeIndex={activeStep} onSelect={setActiveStep} />

        <div className="active-learning-card">
          <div className="active-learning-head">
            <span>Step {activeStep + 1}</span>
            <h2>{learningSteps[activeStep]}</h2>
          </div>
          {stepContent[activeStep]}
          <div className="step-actions">
            <button className="glow-button" onClick={() => setActiveStep(Math.max(0, activeStep - 1))}>
              上一步
            </button>
            <button
              className="glow-button primary"
              onClick={() => setActiveStep(Math.min(learningSteps.length - 1, activeStep + 1))}
            >
              下一步
            </button>
          </div>
        </div>
      </div>

      <aside className="learning-assistant">
        <span className="task-label">学习助手</span>
        <h2>{module.title}</h2>
        <ProgressBar value={currentProgress} max={1} label="本章进度" />
        <div className="core-question">
          <strong>待解决问题</strong>
          <p>{module.coreQuestion}</p>
        </div>
        <div className="keyword-panel">
          <strong>关键词</strong>
          <div className="keyword-row">
            {module.keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        </div>
        <div className="side-nav">
          {learningSteps.map((step, index) => (
            <button
              key={step}
              className={activeStep === index ? "active" : ""}
              onClick={() => setActiveStep(index)}
            >
              <span>{index < activeStep ? "●" : "○"}</span>
              {step}
            </button>
          ))}
        </div>
        <div className="side-nav module-switcher">
          {modules.map((item) => (
            <button
              key={item.id}
              className={item.id === module.id ? "active" : ""}
              onClick={() => onSelectModule(item.id)}
            >
              <span>{completedIds.includes(item.id) ? "●" : "○"}</span>
              {item.title}
            </button>
          ))}
        </div>
        <p className="assistant-note">右下角术语表始终可用，适合遇到关键词时快速回看。</p>
      </aside>
    </section>
  );
}
