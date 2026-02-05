import { notFound } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import RelatedVideoCard from "@/components/RelatedVideoCard";
import { videos, getVideoById, getRelatedVideos } from "@/data/videos";

// 静的エクスポート用: 全動画のパスを生成
export function generateStaticParams() {
  return videos.map((video) => ({
    id: video.id,
  }));
}

interface WatchPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const video = getVideoById(id);

  if (!video) {
    notFound();
  }

  const relatedVideos = getRelatedVideos(id, 8);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-[1800px] mx-auto px-4 py-6">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Video Player */}
            <VideoPlayer
              src={video.videoUrl}
              poster={video.thumbnail}
              title={video.title}
            />

            {/* Video Info */}
            <div className="mt-4">
              <h1 className="text-xl font-bold text-white">{video.title}</h1>

              <div className="flex items-center gap-4 mt-3 pb-4 border-b border-[var(--border-color)]">
                <p className="text-[var(--secondary-text)] text-sm">
                  {video.category || "動画"} • {video.uploadDate}
                </p>
              </div>

              {/* Description */}
              <div className="mt-4 p-4 bg-[var(--card-bg)] rounded-xl">
                <div className="flex gap-2 text-sm text-[var(--secondary-text)] mb-2">
                  <span>{video.uploadDate}</span>
                  {video.tags && video.tags.length > 0 && (
                    <>
                      <span>•</span>
                      <div className="flex gap-2">
                        {video.tags.map((tag) => (
                          <span key={tag} className="text-blue-400">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <p className="text-white text-sm whitespace-pre-wrap">
                  {video.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <div className="xl:w-[400px] shrink-0">
            <h2 className="text-white font-bold mb-4">関連動画</h2>
            <div className="flex flex-col gap-3">
              {relatedVideos.map((relatedVideo) => (
                <RelatedVideoCard key={relatedVideo.id} video={relatedVideo} />
              ))}
            </div>

            {relatedVideos.length === 0 && (
              <p className="text-[var(--secondary-text)] text-sm">
                関連動画はありません
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
