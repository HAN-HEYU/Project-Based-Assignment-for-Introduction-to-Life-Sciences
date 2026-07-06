import type { LearningModule } from "../types";
import { ScienceIcon } from "./ScienceIcon";
import type { KeyboardEvent, MouseEvent } from "react";

interface ModuleCardProps {
  module: LearningModule;
  index: number;
  completed: boolean;
  onOpen: () => void;
}

export function ModuleCard({ module, index, completed, onOpen }: ModuleCardProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpen();
  };

  return (
    <article
      className={`module-card ${completed ? "complete" : ""}`}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      aria-label={`进入${module.title}`}
    >
      <div className="module-card-top">
        <span className="module-index">{String(index + 1).padStart(2, "0")}</span>
        <ScienceIcon name={completed ? "check" : "dna"} />
      </div>
      <h3>{module.title}</h3>
      <p>{module.subtitle}</p>
      <div className="keyword-row">
        {module.keywords.slice(0, 3).map((keyword) => (
          <span key={keyword}>{keyword}</span>
        ))}
      </div>
      <button className="text-link" onClick={handleButtonClick}>
        {completed ? "复习模块" : "进入模块"}
      </button>
    </article>
  );
}
