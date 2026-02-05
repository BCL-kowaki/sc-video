import VideoCard from "@/components/VideoCard";
import { videos, getAllCategories, getVideosByCategory } from "@/data/videos";

export default function Home() {
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-[2000px] mx-auto px-4 py-6">
        {/* Category Filter */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button className="px-4 py-1.5 bg-gradient-to-r from-[#A68114] via-[#D9A441] to-[#F2BA52] text-black rounded-lg text-sm font-medium whitespace-nowrap hover:from-[#BF9A2A] hover:via-[#F2C84B] hover:to-[#F2BA52] transition-all">
            すべて
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-1.5 bg-[var(--card-hover)] text-white rounded-lg text-sm font-medium whitespace-nowrap hover:bg-[#333] transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Empty State */}
        {videos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-[var(--secondary-text)] mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <h2 className="text-xl text-white mb-2">動画がありません</h2>
            <p className="text-[var(--secondary-text)] text-center max-w-md">
              public/videos/ に動画ファイルを配置し、
              <br />
              src/data/videos.ts にエントリを追加してください。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
