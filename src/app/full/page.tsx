import VideoPlayer from "@/components/VideoPlayer";
import RelatedVideoCard from "@/components/RelatedVideoCard";
import { getFullVideo, getSplitVideos } from "@/data/videos";
import { notFound } from "next/navigation";

export default function FullPage() {
  const full = getFullVideo();
  const splitVideos = getSplitVideos();

  if (!full) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* 全編動画 */}
        <VideoPlayer
          src={full.videoUrl}
          poster={full.thumbnail}
          title={full.title}
        />
        <h1 className="mt-4 text-xl font-bold text-white">{full.title}</h1>

        {/* 分割動画（関連動画と同じレイアウト：左サムネ・右タイトル） */}
        <section className="mt-8">
          <h2 className="text-white font-bold mb-4">分割動画</h2>
          <div className="flex flex-col gap-3">
            {splitVideos.map((video) => (
              <RelatedVideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
