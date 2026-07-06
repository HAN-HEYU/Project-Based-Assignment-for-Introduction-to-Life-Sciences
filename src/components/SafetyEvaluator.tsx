import { useMemo, useState } from "react";
import { safetyChecklist } from "../data/cases";
import { ProgressBar } from "./ProgressBar";

const steps = ["产品信息", "证据勾选", "充分性判断", "生成结论"];

export function SafetyEvaluator() {
  const [checked, setChecked] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [evidenceReady, setEvidenceReady] = useState<"unknown" | "partial" | "enough">("unknown");
  const requiredIds = useMemo(
    () => safetyChecklist.filter((item) => item.required).map((item) => item.id),
    [],
  );
  const completedCount = checked.filter((id) => requiredIds.includes(id)).length;
  const complete = requiredIds.every((id) => checked.includes(id));
  const evidenceLevel =
    evidenceReady === "enough" && complete
      ? "充分"
      : completedCount >= 4
        ? "接近充分"
        : completedCount >= 2
          ? "部分"
          : "不足";

  return (
    <div className="interaction-card">
      <span className="task-label">食品安全评估官</span>
      <h3>虚拟案例：抗虫玉米 A-01</h3>
      <p>完成四步评估表。此案例只用于学习框架，不代表真实产品结论。</p>

      <div className="mini-stepper">
        {steps.map((item, index) => (
          <button
            key={item}
            className={step === index ? "active" : index < step ? "done" : ""}
            onClick={() => setStep(index)}
          >
            {index + 1}. {item}
          </button>
        ))}
      </div>

      {step === 0 && (
        <div className="scenario-box">
          <strong>产品信息</strong>
          <p>作物：虚构抗虫玉米 A-01；目标：降低虫害造成的产量损失；用途：食品原料候选。</p>
          <p>待评估问题：人体健康、生态影响、监管审查和公众知情。</p>
        </div>
      )}

      {step === 1 && (
        <>
          <ProgressBar value={completedCount} max={requiredIds.length} label="证据维度" />
          <div className="check-list">
            {safetyChecklist.map((item) => (
              <label key={item.id} className={checked.includes(item.id) ? "selected" : ""}>
                <input
                  type="checkbox"
                  checked={checked.includes(item.id)}
                  onChange={(event) => {
                    setChecked((current) =>
                      event.target.checked
                        ? [...current, item.id]
                        : current.filter((id) => id !== item.id),
                    );
                  }}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="evidence-meter" data-level={evidenceLevel}>
            <div className="evidence-rail">
              <span style={{ width: `${Math.round((completedCount / requiredIds.length) * 100)}%` }} />
            </div>
            <p>证据等级：{evidenceLevel}</p>
          </div>
          <div className="segmented">
            {[
              ["unknown", "缺口较多"],
              ["partial", "可形成阶段意见"],
              ["enough", "证据较充分"],
            ].map(([value, label]) => (
              <button
                key={value}
                className={evidenceReady === value ? "active" : ""}
                onClick={() => setEvidenceReady(value as typeof evidenceReady)}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 3 && (
        <div className={`result-box ${complete ? "success" : ""}`}>
          {complete
            ? "基于当前虚构材料，本案例不能仅凭“转基因”三个字判断安全或危险。合理结论应建立在具体性状、检测证据、长期监测和监管审查基础上。"
            : "评估证据仍不充分。请补全营养、过敏原、毒性、目标性状、生态影响和公众知情等维度。"}
        </div>
      )}

      <div className="button-row">
        <button className="glow-button" onClick={() => setStep(Math.max(0, step - 1))}>
          上一步
        </button>
        <button className="glow-button primary" onClick={() => setStep(Math.min(3, step + 1))}>
          下一步
        </button>
      </div>
    </div>
  );
}
