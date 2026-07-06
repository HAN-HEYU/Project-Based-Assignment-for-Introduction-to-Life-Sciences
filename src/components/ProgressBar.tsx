interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
}

export function ProgressBar({ value, max, label }: ProgressBarProps) {
  const percent = max === 0 ? 0 : Math.round((value / max) * 100);

  return (
    <div className="progress-wrap" aria-label={label ?? "学习进度"}>
      <div className="progress-meta">
        <span>{label ?? "学习进度"}</span>
        <strong>{percent}%</strong>
      </div>
      <div className="progress-track">
        <span className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
