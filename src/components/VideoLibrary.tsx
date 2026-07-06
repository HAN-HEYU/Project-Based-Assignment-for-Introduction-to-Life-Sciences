import type { ModuleId } from "../types";
import { videos } from "../data/videos";
import { VideoCard } from "./VideoCard";

interface VideoLibraryProps {
  relatedModule?: ModuleId;
}

export function VideoLibrary({ relatedModule }: VideoLibraryProps) {
  const visibleVideos = relatedModule
    ? videos.filter((video) => video.relatedModule === relatedModule || video.id === "bioethics")
    : videos;

  return (
    <section className="page-section video-library">
      <div className="section-title">
        <span>Video Library</span>
        <h2>科普视频资源库</h2>
        <p>视频资源用于课程学习展示，版权归原作者或机构所有。无法稳定内嵌的资源以外部观看卡片呈现。</p>
      </div>
      <div className="video-grid">
        {visibleVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
