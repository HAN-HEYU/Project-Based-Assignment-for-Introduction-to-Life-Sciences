import { useState } from "react";
import { crisprCase } from "../data/cases";

const ethicsPrompts = [
  {
    id: "therapy",
    label: "治疗严重遗传病",
    feedback: "可在严格证据、安全性、知情同意和监管审查下讨论，但仍需长期随访。",
  },
  {
    id: "enhancement",
    label: "增强身高或智力",
    feedback: "增强用途涉及公平、社会压力和边界扩张，伦理争议显著高于疾病治疗。",
  },
  {
    id: "embryo",
    label: "编辑胚胎",
    feedback: "胚胎和生殖系编辑可能影响后代权益，监管和伦理门槛极高。",
  },
  {
    id: "crop",
    label: "改良农作物性状",
    feedback: "农业应用需评估食品安全、生态影响、农民接受度和监管分类。",
  },
];

export function CrisprSimulator() {
  const [selected, setSelected] = useState<string | null>(null);
  const [repair, setRepair] = useState<"random" | "template" | null>(null);
  const [ethicsId, setEthicsId] = useState(ethicsPrompts[0].id);
  const hit = selected === crisprCase.target;
  const ethics = ethicsPrompts.find((item) => item.id === ethicsId) ?? ethicsPrompts[0];

  return (
    <div className="interaction-card">
      <span className="task-label">CRISPR 概念模拟器</span>
      <h3>点击虚构 DNA 目标片段</h3>
      <p>{crisprCase.warning}</p>

      <div className="dna-sequence" aria-label="虚构 DNA 序列">
        {crisprCase.sequence.map((fragment) => (
          <button
            key={fragment}
            className={selected === fragment ? (hit ? "hit" : "miss") : ""}
            onClick={() => {
              setSelected(fragment);
              setRepair(null);
            }}
          >
            {fragment}
          </button>
        ))}
      </div>

      {selected && (
        <div className={`result-box ${hit ? "success" : ""}`}>
          {hit
            ? "命中目标片段：guide RNA 在科普模型中像导航地址一样帮助识别目标。"
            : "未命中目标：这提示我们关注脱靶风险和验证责任。"}
        </div>
      )}

      {hit && (
        <>
          <div className="repair-options">
            <button
              className={repair === "random" ? "active" : ""}
              onClick={() => setRepair("random")}
            >
              随机修复
            </button>
            <button
              className={repair === "template" ? "active" : ""}
              onClick={() => setRepair("template")}
            >
              模板修复
            </button>
          </div>

          {repair && (
            <div className="scenario-box">
              <strong>{repair === "random" ? "随机修复" : "模板修复"}</strong>
              <p>
                {repair === "random"
                  ? "可能造成基因功能失活，结果较难完全预测。"
                  : "理论上可能实现更精确修改，但仍需验证安全性和有效性。"}
              </p>
            </div>
          )}

          <div className="ethics-questions">
            {ethicsPrompts.map((item) => (
              <button
                key={item.id}
                className={ethicsId === item.id ? "active" : ""}
                onClick={() => setEthicsId(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="result-box">
            <strong>伦理讨论提示：{ethics.label}</strong>
            <p>{ethics.feedback}</p>
            <p>谁来决定边界，需要科学证据、伦理审查、监管制度和公众参与共同回答。</p>
          </div>
        </>
      )}
    </div>
  );
}
