"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qFromUrl = searchParams.get("q") ?? "";
  const [searchQuery, setSearchQuery] = useState(qFromUrl);

  useEffect(() => {
    setSearchQuery(qFromUrl);
  }, [qFromUrl]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push("/?q=" + encodeURIComponent(q));
    } else {
      router.push("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--header-bg)] border-b border-[var(--border-color)]">
      <div className="flex items-center justify-between gap-3 px-3 md:px-6 py-[10px] md:py-[15px]">
        {/* Logo - public/logo.png に画像を配置してください */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="w-[100px] md:w-[120px] h-auto object-contain"
            priority
          />
        </Link>

        {/* Search Bar - タイトル・タグで検索（静的サイトのままクライアントで絞り込み） */}
        <form onSubmit={handleSearch} className="flex items-center flex-1 md:flex-none md:w-1/2 min-w-0">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="動画を検索（タイトル・タグ）"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 md:px-4 py-1.5 md:py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-l-full text-white text-sm placeholder-[var(--secondary-text)] focus:outline-none focus:border-[#B88F3A]"
            />
            <button type="submit" className="px-3 md:px-6 py-1.5 md:py-2 bg-[var(--card-hover)] border border-l-0 border-[var(--border-color)] rounded-r-full hover:bg-[#383838] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
