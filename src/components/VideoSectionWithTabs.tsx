"use client";

import { useState, useMemo } from "react";
import VideoGridWithSearch from "./VideoGridWithSearch";
import { Video } from "@/types/video";

type TabId = "all" | "full" | "items";

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "すべて" },
  { id: "full", label: "全編" },
  { id: "items", label: "項目別" },
];

function filterByTab(videos: Video[], tab: TabId): Video[] {
  if (tab === "all") return videos;
  if (tab === "full") return videos.filter((v) => v.tags?.includes("全編"));
  if (tab === "items") return videos.filter((v) => v.tags?.includes("項目別"));
  return videos;
}

interface VideoSectionWithTabsProps {
  videos: Video[];
}

export default function VideoSectionWithTabs({ videos }: VideoSectionWithTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("all");

  const filteredVideos = useMemo(
    () => filterByTab(videos, activeTab),
    [videos, activeTab]
  );

  return (
    <>
      {/* タブメニュー：【すべて】【全編】【項目別】 */}
      <div className="flex gap-3 mb-3 overflow-x-auto pb-2 scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#8B6910] via-[#9A7B2E] to-[#B88F3A] text-white hover:from-[#B88F3A] hover:via-[#9A7B2E] hover:to-[#8B6910]"
                : "bg-[var(--card-bg)] text-[var(--secondary-text)] border border-[var(--border-color)] hover:border-[#B88F3A] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <VideoGridWithSearch videos={filteredVideos} />
    </>
  );
}
