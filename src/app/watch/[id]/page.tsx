import { notFound } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import { videos, getVideoById } from "@/data/videos";

export function generateStaticParams() {
  return videos.map((video) => ({ id: video.id }));
}

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const video = getVideoById(id);

  if (!video) {
    notFound();
  }

  const isComingSoon = video.comingSoon || !video.videoUrl;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {isComingSoon ? (
          <div className="relative bg-black aspect-video w-full rounded-[5px] overflow-hidden">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white text-2xl font-medium">Coming Soon...</span>
            </div>
          </div>
        ) : (
          <VideoPlayer
            src={video.videoUrl}
            poster={video.thumbnail}
            title={video.title}
          />
        )}
        <h1 className="mt-4 text-xl font-bold text-white">{video.title}</h1>
      </div>
    </div>
  );
}
