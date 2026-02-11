"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import VideoGridWithSearch from "./VideoGridWithSearch";
import NavigationTabs from "./NavigationTabs";
import { Video } from "@/types/video";

type TabId = "full" | "digest" | "split";

function filterByTab(videos: Video[], tab: TabId): Video[] {
  if (tab === "full") return videos.filter((v) => v.tags?.includes("全編"));
  if (tab === "digest") return videos.filter((v) => v.tags?.includes("ダイジェスト"));
  if (tab === "split") return videos.filter((v) => v.tags?.includes("分割"));
  return videos;
}

interface VideoSectionWithTabsProps {
  videos: Video[];
}

export default function VideoSectionWithTabs({ videos }: VideoSectionWithTabsProps) {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab") as TabId | null;
  const initialTab: TabId = tabFromUrl && ["full", "digest", "split"].includes(tabFromUrl) ? tabFromUrl : "full";
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);

  const filteredVideos = useMemo(
    () => filterByTab(videos, activeTab),
    [videos, activeTab]
  );

  return (
    <>
      <NavigationTabs
        activeId={activeTab}
        onTabClick={(id) => {
          if (id === "full" || id === "digest" || id === "split") {
            setActiveTab(id as TabId);
          }
        }}
      />

      <VideoGridWithSearch videos={filteredVideos} />
    </>
  );
}
