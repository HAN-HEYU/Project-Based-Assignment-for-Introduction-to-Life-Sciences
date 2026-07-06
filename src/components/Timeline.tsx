import { useState } from "react";
import { timelineEvents } from "../data/cases";
import { ScienceIcon } from "./ScienceIcon";

export function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = timelineEvents[activeIndex];

  return (
    <section className="page-section">
      <div className="section-title">
        <span>Timeline</span>
        <h2>从传统育种到基因编辑</h2>
        <p>点击节点，查看基因技术如何一步步从田间走向医院和未来实验室。</p>
      </div>

      <div className="timeline-shell">
        <div className="timeline-track">
          {timelineEvents.map((event, index) => (
            <button
              key={event.title}
              className={`timeline-node ${activeIndex === index ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <span>{index + 1}</span>
              <strong>{event.title}</strong>
            </button>
          ))}
        </div>

        <article className="timeline-card reveal">
          <ScienceIcon name={active.icon} />
          <div>
            <span>{active.era}</span>
            <h3>{active.title}</h3>
            <p>{active.description}</p>
            <div className="timeline-keywords">
              {active.keywords.map((keyword) => (
                <strong key={keyword}>{keyword}</strong>
              ))}
            </div>
            <div className="timeline-explain-grid">
              <section>
                <b>这是什么</b>
                <p>{active.what}</p>
              </section>
              <section>
                <b>它解决了什么问题</b>
                <p>{active.solves}</p>
              </section>
              <section>
                <b>它带来了什么新风险</b>
                <p>{active.risk}</p>
              </section>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
