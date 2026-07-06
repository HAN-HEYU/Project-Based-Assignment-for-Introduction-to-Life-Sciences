import { glossary } from "../data/glossary";
import { videos } from "../data/videos";
import type { LearningModule, ModuleId, StoredProgress } from "../types";
import { ProgressBar } from "./ProgressBar";
import { VideoCard } from "./VideoCard";

interface ReviewCenterProps {
  modules: LearningModule[];
  progress: StoredProgress;
  onOpenModule: (id: ModuleId) => void;
  onOpenExam: () => void;
  onClearProgress: () => void;
}

export function ReviewCenter({
  modules,
  progress,
  onOpenModule,
  onOpenExam,
  onClearProgress,
}: ReviewCenterProps) {
  const completed = new Set(progress.completedModules);
  const reviewVideos = videos.slice(0, 4);

  const clearWithConfirm = () => {
    const confirmed = window.confirm("确定清空本机学习记录、考试草稿、成绩和错题本吗？此操作不可撤销。");
    if (confirmed) onClearProgress();
  };

  return (
    <section className="page-section review-center">
      <div className="section-title">
        <span>Review Center</span>
        <h2>复习中心</h2>
        <p>这里汇总模块完成度、错题解析、关键概念和推荐回看资源，方便课前展示或课后复习。</p>
      </div>

      <div className="review-dashboard">
        <article className="review-panel">
          <span>学习进度</span>
          <h3>已完成 {progress.completedModules.length} / {modules.length} 个模块</h3>
          <ProgressBar value={progress.completedModules.length} max={modules.length} label="模块点亮" />
          <div className="review-module-list">
            {modules.map((module) => (
              <button key={module.id} onClick={() => onOpenModule(module.id)}>
                <strong>{module.title}</strong>
                <span>{completed.has(module.id) ? "已完成" : "继续学习"}</span>
              </button>
            ))}
          </div>
        </article>

        <article className="review-panel">
          <span>考试成绩</span>
          <h3>{progress.examResult ? `${progress.examResult.score} / 100 分` : "尚未完成结课小测"}</h3>
          <p>{progress.examResult?.level ?? "完成五个模块后，可进入最终挑战进行综合评估。"}</p>
          <button className="glow-button primary" onClick={onOpenExam}>
            进入结课小测
          </button>
        </article>
      </div>

      <div className="review-grid">
        <article className="review-panel wrong-book">
          <span>错题本</span>
          <h3>{progress.wrongAnswers.length} 条待复习记录</h3>
          {progress.wrongAnswers.length === 0 ? (
            <p>暂无错题。完成模块小测或结课试卷后，这里会自动收集需要复习的题目。</p>
          ) : (
            progress.wrongAnswers.slice(0, 8).map((item) => (
              <section key={item.id}>
                <strong>{item.relatedConcept}</strong>
                <p>{item.question}</p>
                <small>你的答案：{item.userAnswer}</small>
                <small>参考答案：{item.correctAnswer}</small>
              </section>
            ))
          )}
        </article>

        <article className="review-panel">
          <span>关键概念</span>
          <h3>术语快速回看</h3>
          <div className="concept-chip-grid">
            {glossary.slice(0, 14).map((term) => (
              <span key={term.term}>{term.term}</span>
            ))}
          </div>
        </article>
      </div>

      <div className="section-title compact">
        <span>Recommended Replay</span>
        <h2>推荐回看视频</h2>
      </div>
      <div className="video-grid compact">
        {reviewVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      <div className="danger-zone">
        <h3>学习记录管理</h3>
        <p>清空后将移除已完成模块、模块进度、考试草稿、成绩、错题和最终报告。</p>
        <button className="glow-button warn" onClick={clearWithConfirm}>
          清空学习记录
        </button>
      </div>
    </section>
  );
}
