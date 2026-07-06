import { useMemo, useState } from "react";
import { animalEvidenceNeeds, animalProjects, ethicsDimensions } from "../data/cases";

type Scores = Record<string, Record<string, number>>;

function createInitialScores(): Scores {
  return Object.fromEntries(
    animalProjects.map((project) => [
      project.id,
      Object.fromEntries(ethicsDimensions.map((dimension) => [dimension.id, 3])),
    ]),
  );
}

export function AnimalEthicsPanel() {
  const [scores, setScores] = useState<Scores>(() => createInitialScores());
  const [showReport, setShowReport] = useState(false);

  const report = useMemo(() => {
    return animalProjects.map((project) => {
      const projectScores = scores[project.id];
      const valueScore = projectScores.science + projectScores.application + projectScores.acceptance;
      const riskScore = projectScores.welfare + projectScores.ecology + projectScores.alternative;
      const balance = valueScore - riskScore;
      const decision =
        balance >= 3
          ? "可考虑在严格条件下继续研究"
          : balance <= -3
            ? "暂不建议直接推进，应先修改方案"
            : "收益与风险接近，需要补充证据后再审查";

      return {
        id: project.id,
        title: project.title,
        decision,
        line: `${project.title}：${decision}。价值权重 ${valueScore}/15，风险与替代压力 ${riskScore}/15。${project.valueHint}`,
      };
    });
  }, [scores]);

  return (
    <div className="interaction-card">
      <span className="task-label">动物伦理审查会议</span>
      <h3>为三个项目打分</h3>
      <p>1 分表示低，5 分表示高。替代方案可行性越高，越需要解释为什么仍需动物项目。</p>

      <div className="ethics-list">
        {animalProjects.map((project) => (
          <article key={project.id} className="ethics-project">
            <h4>{project.title}</h4>
            {ethicsDimensions.map((dimension) => (
              <label key={dimension.id}>
                <span>
                  {dimension.label}
                  <strong>{scores[project.id][dimension.id]}</strong>
                </span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={scores[project.id][dimension.id]}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    setScores((current) => ({
                      ...current,
                      [project.id]: {
                        ...current[project.id],
                        [dimension.id]: value,
                      },
                    }));
                  }}
                />
              </label>
            ))}
          </article>
        ))}
      </div>

      <button className="glow-button primary full" onClick={() => setShowReport(true)}>
        生成审查意见
      </button>

      {showReport && (
        <div className="result-box success">
          {report.map((item) => (
            <p key={item.id}>{item.line}</p>
          ))}
          <div className="evidence-list">
            <strong>需要补充的证据</strong>
            {animalEvidenceNeeds.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="evidence-list">
            <strong>伦理限制与风险控制</strong>
            {["减少痛苦并优化照护", "设置生态隔离和追踪", "公开审查理由", "定期复审项目必要性"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
