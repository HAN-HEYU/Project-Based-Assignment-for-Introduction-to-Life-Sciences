import { DragEvent, useMemo, useState } from "react";
import { therapySteps } from "../data/cases";

const shuffledSteps = [
  therapySteps[2],
  therapySteps[0],
  therapySteps[4],
  therapySteps[1],
  therapySteps[5],
  therapySteps[6],
  therapySteps[3],
];

export function GeneTherapyPuzzle() {
  const [items, setItems] = useState<string[]>(shuffledSteps);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const isCorrect = useMemo(
    () => items.every((item, index) => item === therapySteps[index]),
    [items],
  );
  const firstMismatch = useMemo(
    () => items.findIndex((item, index) => item !== therapySteps[index]),
    [items],
  );

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    setItems((current) => {
      const next = [...current];
      const [picked] = next.splice(from, 1);
      next.splice(to, 0, picked);
      return next;
    });
  };

  const onDrop = (event: DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    if (dragIndex !== null) {
      moveItem(dragIndex, index);
    }
    setDragIndex(null);
  };

  return (
    <div className="interaction-card">
      <span className="task-label">基因治疗流程拼图</span>
      <h3>拖拽或用箭头排序</h3>
      <p>把概念步骤排成合理流程。这里展示的是高层逻辑，不是临床或实验操作指南。</p>

      <div className="puzzle-list">
        {items.map((item, index) => (
          <div
            key={item}
            className="puzzle-item"
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => onDrop(event, index)}
          >
            <span>{index + 1}</span>
            <strong>{item}</strong>
            <div className="mini-actions">
              <button onClick={() => moveItem(index, index - 1)} aria-label="上移">
                ↑
              </button>
              <button onClick={() => moveItem(index, index + 1)} aria-label="下移">
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="button-row">
        <button className="glow-button primary" onClick={() => setChecked(true)}>
          检查顺序
        </button>
        <button
          className="glow-button"
          onClick={() => {
            setItems(shuffledSteps);
            setChecked(false);
          }}
        >
          重新排序
        </button>
      </div>

      {checked && (
        <div className={`result-box ${isCorrect ? "success" : ""}`}>
          {isCorrect ? (
            <>
              <p>排序正确：从识别疾病与基因关系开始，到伦理审查和监管跟踪结束。</p>
              <div className="flow-line">
                {therapySteps.map((step) => (
                  <span key={step}>{step}</span>
                ))}
              </div>
            </>
          ) : (
            `还差一点。第 ${firstMismatch + 1} 步应更符合“${therapySteps[firstMismatch]}”这一逻辑；先明确疾病相关基因，再考虑目标细胞、递送方式、干预和长期观察。`
          )}
        </div>
      )}
      {checked && isCorrect && (
        <div className="safety-throughline">
          安全监测不是最后才做一次，而是贯穿目标选择、递送、干预和效果观察的全过程。
        </div>
      )}
    </div>
  );
}
