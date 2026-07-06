import type { VideoResource } from "../types";

export function VideoCard({ video }: { video: VideoResource }) {
  return (
    <article className="video-card">
      <div className="video-frame">
        {video.embedUrl ? (
          <iframe
            title={video.title}
            src={video.embedUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="video-placeholder">
            <span>外部观看</span>
            <p>未强制内嵌，避免视频加载失败影响页面。</p>
          </div>
        )}
      </div>
      <div className="video-copy">
        <span>{video.provider} · {video.duration}</span>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        <div className="keyword-row">
          {video.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <small>{video.note}</small>
        {video.watchUrl && (
          <a className="text-link" href={video.watchUrl} target="_blank" rel="noreferrer">
            打开外部资源
          </a>
        )}
      </div>
    </article>
  );
}
