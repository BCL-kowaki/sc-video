"use client";

import Link from "next/link";
import Image from "next/image";
import { Video } from "@/types/video";
import { useState } from "react";

interface RelatedVideoCardProps {
  video: Video;
}

export default function RelatedVideoCard({ video }: RelatedVideoCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/watch/${video.id}/`} className="block group">
      <div className="flex gap-2">
        {/* Thumbnail */}
        <div className="relative w-40 shrink-0 aspect-video rounded-lg overflow-hidden bg-[var(--card-bg)]">
          {!imageError ? (
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              sizes="160px"
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[var(--secondary-text)]"
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
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded text-[10px]">
            {video.duration}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-[#F2C84B] transition-colors">
            {video.title}
          </h4>
          <p className="text-[var(--secondary-text)] text-xs mt-1">
            {video.category || "動画"}
          </p>
        </div>
      </div>
    </Link>
  );
}
