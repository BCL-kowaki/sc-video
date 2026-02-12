"use client";

import Image from "next/image";
import { Video } from "@/types/video";
import { useState } from "react";

interface VideoListRowProps {
  video: Video;
}

const DESCRIPTION_MAX = 80;

/** 【〇〇】で始まるタイトルを [【〇〇】, 残り] に分割。スマホで【〇〇】の直後に改行するため */
function splitTitleForMobile(title: string): { prefix: string; rest: string } | null {
  const match = title.match(/^(\【[^】]*\】)\s*(.*)$/s);
  if (!match || !match[2]) return null;
  return { prefix: match[1], rest: match[2].trim() };
}

export default function VideoListRow({ video }: VideoListRowProps) {
  const [imageError, setImageError] = useState(false);
  const titleParts = splitTitleForMobile(video.title);
  const excerpt = video.description
    ? video.description.slice(0, DESCRIPTION_MAX) + (video.description.length > DESCRIPTION_MAX ? "…" : "")
    : "動画の説明はありません。";

  return (
    <a href={`/watch/${video.id}/`} className="block group">
      <div className="flex gap-3 md:gap-4 py-2 rounded-lg hover:bg-[var(--card-bg)]/50 transition-colors">
        <div className="relative w-1/2 min-w-0 shrink-0 md:w-[320px] aspect-video rounded overflow-hidden bg-[var(--card-bg)]">
          {!imageError ? (
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              sizes="320px"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-200"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="h-12 w-12 text-[var(--secondary-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {!video.comingSoon && video.duration && (
            <div className="absolute bottom-1.5 right-1.5 bg-black/85 text-white text-xs px-1.5 py-0.5 rounded font-medium">
              {video.duration}
            </div>
          )}
          {video.comingSoon && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white text-sm font-medium">Coming Soon...</span>
            </div>
          )}
        </div>
        <div className="w-1/2 min-w-0 md:flex-1 py-1">
          <h3 className="text-[#fff] font-semibold text-[14px] md:text-lg line-clamp-2 group-hover:text-[#B88F3A] transition-colors">
            {titleParts ? (
              <>
                <span className="block md:inline">{titleParts.prefix}</span>
                {titleParts.rest && <span className="block md:inline">{titleParts.rest}</span>}
              </>
            ) : (
              video.title
            )}
          </h3>
          <p className="text-[#fff] text-[12px] md:text-sm mt-1 line-clamp-2 sm:line-clamp-3">
            {excerpt}
          </p>
        </div>
      </div>
    </a>
  );
}
