import type { CompareCardData, FlowStepData, MisconceptionData } from "../types";

export function CompareCard({ card }: { card: CompareCardData }) {
  return (
    <article className="compare-card">
      <h3>{card.title}</h3>
      <div className="compare-card-grid">
        <section>
          <span>{card.leftTitle}</span>
          <ul>
            {card.leftPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
        <section>
          <span>{card.rightTitle}</span>
          <ul>
            {card.rightPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
      </div>
      <p>{card.takeaway}</p>
    </article>
  );
}

export function FlowCard({ steps }: { steps: FlowStepData[] }) {
  return (
    <div className="flow-card">
      {steps.map((step, index) => (
        <article key={`${step.title}-${index}`}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <strong>{step.title}</strong>
            {step.tag && <em>{step.tag}</em>}
          </div>
          <p>{step.description}</p>
        </article>
      ))}
    </div>
  );
}

export function RiskCard({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <article className="risk-card">
      <span>Risk Check</span>
      <h3>{title}</h3>
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  );
}

export function MisconceptionCard({ item }: { item: MisconceptionData }) {
  return (
    <article className="misconception-card">
      <span>常见误区</span>
      <h3>{item.myth}</h3>
      <p>{item.clarification}</p>
    </article>
  );
}

export function ThinkPromptCard({
  question,
  hint,
}: {
  question: string;
  hint: string;
}) {
  return (
    <article className="think-card">
      <span>课堂提问</span>
      <h3>{question}</h3>
      <p>{hint}</p>
    </article>
  );
}
