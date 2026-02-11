import { Suspense } from "react";
import VideoSectionWithTabs from "@/components/VideoSectionWithTabs";
import FirstVisitRedirect from "@/components/FirstVisitRedirect";
import { videos } from "@/data/videos";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <FirstVisitRedirect />
      <div className="max-w-[2000px] mx-auto px-4 pt-4 pb-6">
        <Suspense fallback={<div className="text-[var(--secondary-text)]">読み込み中...</div>}>
          <VideoSectionWithTabs videos={videos} />
        </Suspense>
      </div>
    </div>
  );
}
