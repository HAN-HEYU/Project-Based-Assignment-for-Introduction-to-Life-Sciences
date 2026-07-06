import { useMemo, useState } from "react";
import { farmProblemAdvice, farmProblems, farmSolutions } from "../data/cases";

export function SmartFarmSimulator() {
  const [problemId, setProblemId] = useState(farmProblems[0].id);
  const [solutionIds, setSolutionIds] = useState<string[]>(["transgenic", "smart", "biocontrol"]);

  const problem = useMemo(
    () => farmProblems.find((item) => item.id === problemId) ?? farmProblems[0],
    [problemId],
  );
  const selectedSolutions = useMemo(
    () => farmSolutions.filter((item) => solutionIds.includes(item.id)),
    [solutionIds],
  );

  const toggleSolution = (id: string) => {
    setSolutionIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  };

  return (
    <div className="interaction-card">
      <span className="task-label">智慧农场决策模拟器</span>
      <h3>选择问题与方案组合</h3>
      <p>真实农业决策通常需要组合方案。请选择一个农场问题，再勾选可搭配的工具。</p>

      <div className="segmented">
        {farmProblems.map((item) => (
          <button
            key={item.id}
            className={problemId === item.id ? "active" : ""}
            onClick={() => setProblemId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="scenario-box">
        <strong>田间情境</strong>
        <p>{problem.context}</p>
      </div>

      <div className="check-list compact">
        {farmSolutions.map((item) => (
          <label key={item.id} className={solutionIds.includes(item.id) ? "selected" : ""}>
            <input
              type="checkbox"
              checked={solutionIds.includes(item.id)}
              onChange={() => toggleSolution(item.id)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>

      <div className="decision-card-grid">
        {selectedSolutions.map((solution) => (
          <article key={solution.id} className="decision-card">
            <span>{solution.label}</span>
            <p><b>短期效果：</b>{solution.shortTerm}</p>
            <p><b>长期效果：</b>{solution.longTerm}</p>
            <p><b>成本：</b>{solution.cost}</p>
            <p><b>生态风险：</b>{solution.ecologyRisk}</p>
            <p><b>监管：</b>{solution.regulation}</p>
            <p><b>组合建议：</b>{solution.combinable}</p>
          </article>
        ))}
      </div>

      <div className="result-box success">
        {farmProblemAdvice[problem.id]}
        {selectedSolutions.length === 0 && " 请至少选择一个方案，才能生成评估卡。"}
      </div>
    </div>
  );
}
