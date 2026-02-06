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
  const isComingSoon = video.comingSoon || !video.videoUrl;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-[1800px] mx-auto px-4 py-6">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Video Player または Coming Soon プレースホルダー */}
            {isComingSoon ? (
              <div className="relative bg-black aspect-video w-full rounded-[5px] overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-2xl md:text-3xl font-medium tracking-wide">
                    Coming Soon...
                  </span>
                </div>
              </div>
            ) : (
              <VideoPlayer
                src={video.videoUrl}
                poster={video.thumbnail}
                title={video.title}
              />
            )}

            {/* Video Info */}
            <div className="mt-4">
              <h1 className="text-xl font-bold text-white">{video.title}</h1>

              {/* Description */}
              <div className="mt-4 p-4 bg-[var(--card-bg)] rounded-xl">
                {video.tags && video.tags.length > 0 && (
                  <div className="flex gap-2 text-sm text-[var(--secondary-text)] mb-2">
                    {video.tags.map((tag) => (
                      <span key={tag} className="text-blue-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                {video.description && (
                  <p className="text-white text-sm whitespace-pre-wrap mb-4">
                    {video.description}
                  </p>
                )}
                {video.linkUrl && video.linkLabel && (
                  <div className="flex justify-center">
                    <a
                      href={video.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8B6910] via-[#9A7B2E] to-[#B88F3A] text-white text-sm font-bold rounded-lg hover:from-[#B88F3A] hover:via-[#9A7B2E] hover:to-[#8B6910] transition-all duration-500 ease-in-out shadow-md"
                    >
                      {video.linkLabel}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
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
