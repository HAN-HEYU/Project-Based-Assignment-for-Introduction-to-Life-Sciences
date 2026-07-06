import type { ReactNode } from "react";
import type { AnimationId } from "../types";
import { animations } from "../data/animations";

function AnimationShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="animation-card">
      <div className="animation-stage">{children}</div>
      <div className="animation-copy">
        <span>Animated Concept</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export function DNAHelixAnimation() {
  return (
    <AnimationShell title="DNA 双螺旋" description="DNA 是遗传信息的载体，基因是其中与功能相关的片段。">
      <svg viewBox="0 0 260 180" role="img" aria-label="DNA 双螺旋概念动画">
        {Array.from({ length: 9 }).map((_, index) => {
          const y = 18 + index * 18;
          const x1 = 82 + Math.sin(index * 0.9) * 34;
          const x2 = 178 - Math.sin(index * 0.9) * 34;
          return (
            <g key={index} className="helix-rung" style={{ animationDelay: `${index * 0.12}s` }}>
              <line x1={x1} y1={y} x2={x2} y2={y} />
              <circle cx={x1} cy={y} r="5" />
              <circle cx={x2} cy={y} r="5" />
            </g>
          );
        })}
        <path className="helix-line a" d="M88 18 C180 45 80 75 172 104 C214 118 126 148 176 162" />
        <path className="helix-line b" d="M172 18 C80 45 180 75 88 104 C46 118 134 148 84 162" />
      </svg>
    </AnimationShell>
  );
}

export function GeneExpressionAnimation() {
  const items = ["DNA", "RNA", "蛋白质", "性状"];
  return (
    <AnimationShell title="基因表达概念流" description="基因影响蛋白质，蛋白质参与细胞功能，最终影响性状表现。">
      <div className="expression-flow">
        {items.map((item, index) => (
          <div key={item} className="expression-node" style={{ animationDelay: `${index * 0.18}s` }}>
            <span>{item}</span>
            {index < items.length - 1 && <i>→</i>}
          </div>
        ))}
      </div>
    </AnimationShell>
  );
}

export function GMOvsGeneEditingAnimation() {
  return (
    <AnimationShell title="转基因 vs 基因编辑" description="转基因常引入外源基因；基因编辑强调定点修改原有 DNA。">
      <div className="split-animation">
        <section>
          <strong>转基因</strong>
          <div className="gene-strip">
            <span>A</span>
            <span>T</span>
            <span className="insert">外源</span>
            <span>C</span>
          </div>
        </section>
        <section>
          <strong>基因编辑</strong>
          <div className="gene-strip">
            <span>A</span>
            <span className="edit">G</span>
            <span>C</span>
            <span>T</span>
          </div>
        </section>
      </div>
    </AnimationShell>
  );
}

export function SafetyAssessmentFlowAnimation() {
  const steps = ["营养", "过敏原", "毒性", "稳定性", "环境", "知情"];
  return (
    <AnimationShell title="食品安全证据流" description="安全结论来自多个维度的证据，而不是一句口号。">
      <div className="orbit-flow">
        {steps.map((step, index) => (
          <span key={step} style={{ animationDelay: `${index * 0.12}s` }}>
            {step}
          </span>
        ))}
        <strong>综合评估</strong>
      </div>
    </AnimationShell>
  );
}

export function SmartFarmFlowAnimation() {
  const steps = ["传感器", "AI 预警", "品种改良", "精准管理", "反馈监测"];
  return (
    <AnimationShell title="智慧农场决策流" description="农业问题需要数据、管理和遗传改良协同。">
      <div className="farm-flow">
        {steps.map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
    </AnimationShell>
  );
}

export function GeneTherapyFlowAnimation() {
  const steps = ["疾病基因", "目标细胞", "治疗策略", "效果观察", "安全监管"];
  return (
    <AnimationShell title="基因治疗流程" description="安全监测和伦理监管贯穿治疗思路全过程。">
      <div className="therapy-flow-animation">
        {steps.map((step, index) => (
          <span key={step} style={{ animationDelay: `${index * 0.16}s` }}>
            {step}
          </span>
        ))}
      </div>
    </AnimationShell>
  );
}

export function CrisprCutAnimation() {
  return (
    <AnimationShell title="CRISPR 概念剪切" description="虚构 DNA 片段用于说明目标识别与修复路径，不提供真实实验指导。">
      <div className="crispr-animation">
        <div className="fake-dna">
          {["ATCG", "AAGT", "CCGA", "TTAC"].map((fragment) => (
            <span key={fragment} className={fragment === "CCGA" ? "target" : ""}>
              {fragment}
            </span>
          ))}
        </div>
        <div className="guide-line">guide RNA → Cas → 修复路径</div>
      </div>
    </AnimationShell>
  );
}

export function RiskBalanceAnimation() {
  return (
    <AnimationShell title="风险收益天平" description="生命科学技术评估需要同时看收益、风险、伦理、监管和社会影响。">
      <div className="balance-animation">
        <div className="pan left">收益</div>
        <div className="balance-pole" />
        <div className="pan right">风险</div>
        <div className="balance-base">证据 + 监管 + 伦理</div>
      </div>
    </AnimationShell>
  );
}

function renderAnimation(id: AnimationId) {
  switch (id) {
    case "dna-helix":
      return <DNAHelixAnimation />;
    case "gene-expression":
      return <GeneExpressionAnimation />;
    case "gmo-vs-editing":
      return <GMOvsGeneEditingAnimation />;
    case "safety-flow":
      return <SafetyAssessmentFlowAnimation />;
    case "smart-farm-flow":
      return <SmartFarmFlowAnimation />;
    case "gene-therapy-flow":
      return <GeneTherapyFlowAnimation />;
    case "crispr-cut":
      return <CrisprCutAnimation />;
    case "risk-balance":
      return <RiskBalanceAnimation />;
    default:
      return null;
  }
}

export function ModuleAnimationSection({ animationIds }: { animationIds: AnimationId[] }) {
  if (animationIds.length === 0) return null;
  return (
    <section className="module-animation-section">
      <div className="section-title compact">
        <span>Concept Animations</span>
        <h2>动画讲解</h2>
        <p>轻量 SVG 与 CSS 动画用于解释概念，所有 DNA 片段均为虚构示例。</p>
      </div>
      <div className="animation-grid">
        {animationIds.map((id) => {
          const info = animations.find((animation) => animation.id === id);
          return (
            <div key={id}>
              {renderAnimation(id)}
              {info && <p className="animation-point">{info.learningPoint}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
