"use client";

import Image from "next/image";
import { Doc } from "@/types/doc";
import { useState } from "react";

interface DocListRowProps {
  doc: Doc;
}

const DESCRIPTION_MAX = 80;

export default function DocListRow({ doc }: DocListRowProps) {
  const [imageError, setImageError] = useState(false);
  const excerpt =
    doc.description.length > DESCRIPTION_MAX
      ? doc.description.slice(0, DESCRIPTION_MAX) + "…"
      : doc.description;

  return (
    <a
      href={doc.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="flex gap-4 p-2 rounded-lg hover:bg-[var(--card-bg)]/50 transition-colors">
        <div className="relative w-[200px] sm:w-[280px] md:w-[320px] shrink-0 aspect-video rounded overflow-hidden bg-[var(--card-bg)]">
          {!imageError ? (
            <Image
              src={doc.cover}
              alt={doc.title}
              fill
              sizes="320px"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-200"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="h-12 w-12 text-[var(--secondary-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          )}
          <div className="absolute bottom-1.5 right-1.5 bg-black/85 text-white text-xs px-1.5 py-0.5 rounded font-medium">
            PDF
          </div>
        </div>
        <div className="flex-1 min-w-0 py-1">
          <h3 className="text-white font-semibold text-base md:text-lg line-clamp-2 group-hover:text-[#B88F3A] transition-colors">
            {doc.title}
          </h3>
          <p className="text-[var(--secondary-text)] text-sm mt-1 line-clamp-2 sm:line-clamp-3">
            {excerpt}
          </p>
          <p className="text-[#B88F3A] text-xs mt-2">PDFを開く →</p>
        </div>
      </div>
    </a>
  );
}
