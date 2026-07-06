interface LearningStepperProps {
  steps: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function LearningStepper({ steps, activeIndex, onSelect }: LearningStepperProps) {
  return (
    <div className="learning-stepper" aria-label="本章学习路径">
      {steps.map((step, index) => (
        <button
          key={step}
          className={index === activeIndex ? "active" : index < activeIndex ? "done" : ""}
          onClick={() => onSelect(index)}
        >
          <span>{index + 1}</span>
          <strong>{step}</strong>
        </button>
      ))}
    </div>
  );
}
