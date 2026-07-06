import type { ModuleId } from "../types";
import { knowledgePath } from "../data/cases";
import { ScienceIcon } from "./ScienceIcon";

interface KnowledgeMapProps {
  completedIds: ModuleId[];
  moduleProgress?: Partial<Record<ModuleId, number>>;
  onOpenModule: (id: ModuleId) => void;
  onOpenFinal: () => void;
}

export function KnowledgeMap({
  completedIds,
  moduleProgress = {},
  onOpenModule,
  onOpenFinal,
}: KnowledgeMapProps) {
  const completed = new Set(completedIds);
  const allModulesComplete = completedIds.length >= 5;

  return (
    <section className="page-section">
      <div className="section-title">
        <span>Knowledge Map</span>
        <h2>基因岛屿地图</h2>
        <p>沿着学习路径点亮节点，最终进入伦理决策大厅。</p>
      </div>

      <div className="island-map">
        <div className="map-route" aria-hidden="true" />
        {knowledgePath.map((node, index) => {
          const isBasics = node.id === "basics";
          const isFinal = node.id === "final";
          const isComplete =
            isBasics || (isFinal ? allModulesComplete : completed.has(node.id as ModuleId));
          const isLearning =
            !isBasics && !isFinal && !isComplete && (moduleProgress[node.id as ModuleId] ?? 0) > 0;
          const canOpen = !isBasics;

          return (
            <button
              key={node.id}
              className={`island-node node-${index} ${isComplete ? "lit" : ""} ${isLearning ? "learning" : ""}`}
              title={node.hint}
              onClick={() => {
                if (isFinal) {
                  onOpenFinal();
                  return;
                }
                if (!isBasics) {
                  onOpenModule(node.id as ModuleId);
                }
              }}
              disabled={!canOpen}
            >
              <span className="node-icon">
                <ScienceIcon name={node.icon} />
              </span>
              <strong>{node.label}</strong>
              <span className="map-status">
                {isComplete ? "已完成" : isLearning ? "学习中" : "未开始"}
              </span>
              <small>{node.subtitle}</small>
              <em>{node.hint}</em>
            </button>
          );
        })}
      </div>
    </section>
  );
}
