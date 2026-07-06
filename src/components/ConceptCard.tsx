import type { ConceptItem } from "../types";
import { ScienceIcon } from "./ScienceIcon";

interface ConceptCardProps {
  concept: ConceptItem;
}

export function ConceptCard({ concept }: ConceptCardProps) {
  return (
    <article className="concept-card concept-definition">
      <div className="concept-heading">
        <ScienceIcon name={concept.icon ?? "dna"} />
        <h3>{concept.title}</h3>
      </div>
      <div className="concept-field">
        <span>一句话定义</span>
        <p>{concept.definition}</p>
      </div>
      <div className="concept-field">
        <span>例子</span>
        <p>{concept.example}</p>
      </div>
      <div className="concept-field warning">
        <span>常见误解</span>
        <p>{concept.misconception}</p>
      </div>
    </article>
  );
}
