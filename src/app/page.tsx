import { Suspense } from "react";
import VideoGridWithSearch from "@/components/VideoGridWithSearch";
import { videos } from "@/data/videos";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-[2000px] mx-auto px-4 pt-4 pb-6">
        {/* Category Filter - 一旦「すべて」のみ */}
        <div className="flex gap-3 mb-3 overflow-x-auto pb-2 scrollbar-hide">
          <button className="px-4 py-1.5 bg-gradient-to-r from-[#8B6910] via-[#9A7B2E] to-[#B88F3A] text-white rounded-lg text-sm font-medium whitespace-nowrap hover:from-[#B88F3A] hover:via-[#9A7B2E] hover:to-[#8B6910] transition-all duration-500 ease-in-out">
            すべて
          </button>
        </div>

        {/* Video Grid + 検索フィルタ（タイトル・タグでクライアント絞り込み） */}
        <Suspense fallback={<div className="text-[var(--secondary-text)]">読み込み中...</div>}>
          <VideoGridWithSearch videos={videos} />
        </Suspense>
      </div>
    </div>
  );
}
