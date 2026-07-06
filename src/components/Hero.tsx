import { ScienceIcon } from "./ScienceIcon";

interface HeroProps {
  onStart: () => void;
  onMap: () => void;
  onChallenge: () => void;
}

export function Hero({ onStart, onMap, onChallenge }: HeroProps) {
  const learningCards = [
    {
      title: "看懂技术区别",
      text: "区分传统育种、转基因、基因编辑和基因治疗的核心差异。",
      icon: "dna",
    },
    {
      title: "用证据看食品安全",
      text: "理解安全评估为什么要看具体产品、性状、证据和监管。",
      icon: "corn",
    },
    {
      title: "连接智慧农业",
      text: "认识传感器、AI 判断、精准管理和遗传改良如何协同。",
      icon: "sensor",
    },
    {
      title: "练习伦理评估",
      text: "从风险、监管、动物福利和社会影响角度评价技术应用。",
      icon: "scale",
    },
  ];

  return (
    <>
      <section className="hero-section">
        <div className="dna-backdrop" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.18}s` }} />
          ))}
        </div>

        <div className="hero-content reveal">
          <div className="chalk-kicker">
            <ScienceIcon name="dna" />
            基因技术探索实验室
          </div>
          <h1>转基因时光机</h1>
          <p>
            从一粒玉米、一只实验鼠，到一次基因治疗，探索基因技术如何改变农业、医学与未来生命科学。
          </p>

          <div className="hero-actions">
            <button className="glow-button primary" onClick={onStart}>
              开始探索
            </button>
            <button className="glow-button" onClick={onMap}>
              查看知识地图
            </button>
            <button className="glow-button warn" onClick={onChallenge}>
              进入最终挑战
            </button>
          </div>

          <div className="creator-mark" aria-label="创作标记">
            <span>崇新学堂</span>
            <strong>何昱隆 创作</strong>
          </div>
        </div>

      </section>

      <section className="page-section learn-section">
        <div className="section-title">
          <span>Learning Goals</span>
          <h2>你将学到什么</h2>
          <p>先建立基础概念，再比较技术差异，最后用证据、风险和伦理完成综合决策。</p>
        </div>
        <div className="learn-grid">
          {learningCards.map((card) => (
            <article className="learn-card reveal" key={card.title}>
              <ScienceIcon name={card.icon} />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section route-section">
        <div className="section-title">
          <span>Course Route</span>
          <h2>完整学习路线</h2>
          <p>这条路线把“转基因的前世今生”整理成从基础概念到综合评估的五层课程链条。</p>
        </div>
        <div className="route-ladder">
          {[
            ["第一层", "生命科学基础：DNA、基因、蛋白质、性状、环境与表型"],
            ["第二层", "技术发展脉络：传统育种、重组 DNA、转基因、基因治疗、CRISPR"],
            ["第三层", "关键区别：转基因 vs 基因编辑、食品安全 vs 生态风险、治疗 vs 增强"],
            ["第四层", "五大主题模块：食品、植物、动物、基因治疗、基因编辑"],
            ["第五层", "综合决策：用证据、风险、收益、伦理、监管和社会影响完成评估"],
          ].map(([label, text]) => (
            <article key={label}>
              <span>{label}</span>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
