"use client";

import Link from "next/link";
import Image from "next/image";
import { Video } from "@/types/video";
import { useState } from "react";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
      return `${diffDays}日前`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)}週間前`;
    } else if (diffDays < 365) {
      return `${Math.floor(diffDays / 30)}ヶ月前`;
    } else {
      return `${Math.floor(diffDays / 365)}年前`;
    }
  };

  return (
    <Link href={`/watch/${video.id}/`} className="block video-card">
      <div className="group cursor-pointer">
        {/* Thumbnail */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-[var(--card-bg)]">
          {!imageError ? (
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[var(--card-bg)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-[var(--secondary-text)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
            {video.duration}
          </div>
        </div>

        {/* Video Info */}
        <div className="mt-3">
          <h3 className="text-white font-medium text-sm leading-tight line-clamp-2 group-hover:text-[#F2C84B] transition-colors">
            {video.title}
          </h3>
          <p className="text-[var(--secondary-text)] text-xs mt-1">
            {video.category || "動画"}
          </p>
        </div>
      </div>
    </Link>
  );
}
