import { videos } from "../data/videos";
import { VideoCard } from "./VideoCard";

export function ModuleVideoSection({ videoIds }: { videoIds: string[] }) {
  const moduleVideos = videoIds
    .map((id) => videos.find((video) => video.id === id))
    .filter((video): video is NonNullable<typeof video> => Boolean(video));

  if (moduleVideos.length === 0) return null;

  return (
    <section className="module-video-section">
      <div className="section-title compact">
        <span>Recommended Videos</span>
        <h2>推荐科普视频</h2>
        <p>资源用于课程学习展示，版权归原作者或机构所有；链接可替换为教师指定视频。</p>
      </div>
      <div className="video-grid compact">
        {moduleVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
