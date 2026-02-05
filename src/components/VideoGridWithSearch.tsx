"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import VideoCard from "./VideoCard";
import { Video } from "@/types/video";

interface VideoGridWithSearchProps {
  videos: Video[];
}

export default function VideoGridWithSearch({ videos }: VideoGridWithSearchProps) {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const filteredVideos = useMemo(() => {
    if (!query) return videos;
    return videos.filter((video) => {
      const matchTitle = video.title.toLowerCase().includes(query);
      const matchCategory = video.category?.toLowerCase().includes(query);
      const matchTags = video.tags?.some((tag) => tag.toLowerCase().includes(query));
      const matchDescription = video.description?.toLowerCase().includes(query);
      return matchTitle || matchCategory || matchTags || matchDescription;
    });
  }, [videos, query]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {filteredVideos.length === 0 && (
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
          <h2 className="text-xl text-white mb-2">
            {query ? "該当する動画がありません" : "動画がありません"}
          </h2>
          <p className="text-[var(--secondary-text)] text-center max-w-md">
            {query
              ? "別のキーワードで検索してみてください。"
              : "public/videos/ に動画ファイルを配置し、src/data/videos.ts にエントリを追加してください。"}
          </p>
        </div>
      )}
    </>
  );
}
