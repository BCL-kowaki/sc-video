"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import VideoListRow from "@/components/VideoListRow";
import { getVideosInDisplayOrder, getFullVideo, getDigestVideo } from "@/data/videos";
import { Video } from "@/types/video";

type TabId = "all" | "full" | "digest" | "split";

function filterByTab(list: Video[], tab: TabId): Video[] {
  if (tab === "all") return list;
  if (tab === "full") return list.filter((v) => v.tags?.includes("全編"));
  if (tab === "digest") return list.filter((v) => v.tags?.includes("ダイジェスト"));
  if (tab === "split") return list.filter((v) => v.tags?.includes("分割"));
  return list;
}

/** 動画を ダイジェスト / 全編 / 分割 の3グループに分ける */
function groupVideosByType(list: Video[]) {
  const digest = list.filter((v) => v.tags?.includes("ダイジェスト"));
  const full = list.filter((v) => v.tags?.includes("全編") && v.id !== "digest");
  const split = list.filter((v) => v.tags?.includes("分割"));
  return { digest, full, split };
}

const SECTION_SEPARATOR = (
  <div className="border-b border-[var(--border-color)] my-6" aria-hidden />
);

const TAB_LIST: { id: TabId; label: string; href?: string }[] = [
  { id: "full", label: "全編" },
  { id: "digest", label: "ダイジェスト" },
  { id: "split", label: "分割動画" },
];

function TopPageContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") as TabId | null;
  const validTab: TabId = ["full", "digest", "split"].includes(tab ?? "") ? tab! : "all";

  const ordered = useMemo(() => getVideosInDisplayOrder(), []);
  const filtered = useMemo(() => filterByTab(ordered, validTab), [ordered, validTab]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-[960px] mx-auto px-4 pt-2 pb-10">
        {/* タブ: 全編・ダイジェスト・分割動画・説明資料（説明資料は資料一覧へ） */}
        <div className="flex gap-2 mb-2 overflow-x-auto pb-2 scrollbar-hide">
          {TAB_LIST.map((t, i) =>
            t.href ? (
              <a
                key="docs"
                href={t.href}
                className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all bg-[var(--card-bg)] text-[var(--secondary-text)] border border-[var(--border-color)] hover:border-[#B88F3A]"
              >
                {t.label}
              </a>
            ) : (
              <a
                key={t.id === "split" ? "split" : t.id}
                href={`/top/?tab=${t.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  validTab === t.id
                    ? "bg-gradient-to-r from-[#8B6910] via-[#9A7B2E] to-[#B88F3A] text-white"
                    : "bg-[var(--card-bg)] text-[var(--secondary-text)] border border-[var(--border-color)] hover:border-[#B88F3A]"
                }`}
              >
                {t.label}
              </a>
            )
          )}
        </div>

        {/* 【全編】→ 全編動画ページの中身 */}
        {validTab === "full" && (() => {
          const full = getFullVideo();
          if (!full) return <p className="text-[var(--secondary-text)] py-8 text-center">動画を準備中です。</p>;
          const desc = full.description || "当社の事業概要を全編（約53分）で解説しています。詳細なスライド資料は説明資料一覧からご確認ください。";
          return (
            <section className="pt-0">
              <h3 className="text-white text-[14px] md:text-base tracking-[0.25em] uppercase text-center mb-2 pt-2" style={{ fontWeight: 400 }}>FULL VIDEO</h3>
              <h1 className="text-white text-[22px] md:text-[2rem] lg:text-[2.5rem] text-center tracking-wide mb-2 leading-tight" style={{ fontWeight: 900 }}>
                {full.title.replace(/^【全編動画】/, "").trim() || "BioVault事業説明（全編）"}
              </h1>
              <h2 className="text-[#B88F3A] text-[14px] md:text-base tracking-[0.15em] uppercase text-center mb-6" style={{ fontWeight: 600 }}>全編動画</h2>
              <div className="max-w-[900px] mx-auto mb-6">
                <VideoPlayer src={full.videoUrl} poster={full.thumbnail} title={full.title} />
              </div>
              <div className="max-w-[640px] mx-auto mb-6">
                <p className="text-white/95 text-base md:text-lg leading-relaxed text-left">{desc}</p>
              </div>
              <div className="max-w-[560px] mx-auto flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a href="/docs/" className="inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-white font-bold text-base bg-gradient-to-r from-[#8B6910] via-[#9A7B2E] to-[#B88F3A] hover:from-[#B88F3A] hover:via-[#9A7B2E] hover:to-[#8B6910] transition-all duration-300 shadow-lg hover:shadow-[#B88F3A]/25 hover:scale-[1.02] w-full sm:w-auto">
                  説明資料一覧 <span className="text-white" aria-hidden>&gt;</span>
                </a>
                <a href="/top/" className="inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-white font-bold text-base bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[#B88F3A] hover:text-[#B88F3A] transition-all duration-300 w-full sm:w-auto">
                  動画一覧 <span className="text-white" aria-hidden>&gt;</span>
                </a>
              </div>
            </section>
          );
        })()}

        {/* 【ダイジェスト】→ ホームの中身 */}
        {validTab === "digest" && (() => {
          const digest = getDigestVideo();
          if (!digest) return <p className="text-[var(--secondary-text)] py-8 text-center">動画を準備中です。</p>;
          return (
            <section className="pt-0">
              <h3 className="text-white text-[14px] md:text-base tracking-[0.25em] uppercase text-center mb-2 pt-2" style={{ fontWeight: 400 }}>DIGEST VIDEO</h3>
              <h1 className="text-white text-[26px] md:text-[2.25rem] lg:text-[2.75rem] text-center tracking-wide mb-2 leading-tight" style={{ fontWeight: 900 }}>
                <span style={{ fontFamily: '"Noto Serif JP", "Yu Mincho", "游明朝", "Hiragino Mincho Pro", serif' }}>&ldquo;</span>自身の細胞を資産化せよ<span style={{ fontFamily: '"Noto Serif JP", "Yu Mincho", "游明朝", "Hiragino Mincho Pro", serif' }}>&rdquo;</span>
              </h1>
              <h2 className="text-[#B88F3A] text-[16px] md:text-lg tracking-[0.15em] uppercase text-center mb-6" style={{ fontWeight: 600 }}>OWN YOUR CELL, LITERALLY</h2>
              <div className="max-w-[900px] mx-auto mb-6">
                <VideoPlayer src={digest.videoUrl} poster={digest.thumbnail} title={digest.title} />
              </div>
              <p className="text-white/95 text-base md:text-lg leading-relaxed text-left mb-6 max-w-[640px] mx-auto">
                革命的技術で未来の健康と資産の在り方を変える。iPSオーダーメイドメンバーシップの概要をダイジェストでお届けしています。
              </p>
              <section className="max-w-[560px] mx-auto text-center">
                <p className="text-white/90 text-sm  text-[12px] md:text-base mb-6">続きは全編動画（約53分）で詳しくご説明しています。</p>
                <a href="/full/" className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl text-white font-bold text-base md:text-lg bg-gradient-to-r from-[#8B6910] via-[#9A7B2E] to-[#B88F3A] hover:from-[#B88F3A] hover:via-[#9A7B2E] hover:to-[#8B6910] transition-all duration-300 shadow-lg hover:shadow-[#B88F3A]/25 hover:scale-[1.02]">
                  全編動画を見る <span className="text-white" aria-hidden>&gt;</span>
                </a>
                <p className="text-white text-xs mt-6">動画一覧・資料は上部メニューからご利用ください。</p>
              </section>
            </section>
          );
        })()}

        {/* 一覧表示（すべて → ダイジェスト/全編/分割で区切り、分割動画 → フラット一覧） */}
        {(validTab === "all" || validTab === "split") && (
          <section>
            <h2 className="text-white font-bold text-lg mt-4 mb-2">
              {validTab === "all" && "動画一覧"}
              {validTab === "split" && "分割動画"}
            </h2>
            <p className="text-white text-[12px] md:text-sm mb-6 text-left">
              確認されたい動画をクリックして、詳細をご確認ください。
            </p>

            {validTab === "all" ? (
              (() => {
                const { digest, full, split } = groupVideosByType(ordered);
                return (
                  <div className="flex flex-col gap-0">
                    {digest.length > 0 && (
                      <>
                        <h3 className="text-white text-sm font-semibold mb-2">ダイジェスト</h3>
                        <div className="flex flex-col gap-1">
                          {digest.map((v) => <VideoListRow key={v.id} video={v} />)}
                        </div>
                        {SECTION_SEPARATOR}
                      </>
                    )}
                    {full.length > 0 && (
                      <>
                        <h3 className="text-white text-sm font-semibold mb-2">全編動画</h3>
                        <div className="flex flex-col gap-1">
                          {full.map((v) => <VideoListRow key={v.id} video={v} />)}
                        </div>
                        {SECTION_SEPARATOR}
                      </>
                    )}
                    {split.length > 0 && (
                      <>
                        <h3 className="text-white text-sm font-semibold mb-2">分割動画</h3>
                        <p className="text-white text-[12px] md:text-sm mb-3 text-left">
                          全編動画を分割した各項目動画を用意しております。確認されたい項目をクリックしてご視聴ください。
                        </p>
                        <div className="flex flex-col gap-1">
                          {split.map((v) => <VideoListRow key={v.id} video={v} />)}
                        </div>
                      </>
                    )}
                    {digest.length === 0 && full.length === 0 && split.length === 0 && (
                      <p className="text-[var(--secondary-text)] py-8 text-center">該当する動画はありません。</p>
                    )}
                  </div>
                );
              })()
            ) : (
              <div className="flex flex-col gap-1">
                {filtered.length === 0 ? (
                  <p className="text-[var(--secondary-text)] py-8 text-center">該当する動画はありません。</p>
                ) : (
                  filtered.map((video) => <VideoListRow key={video.id} video={video} />)
                )}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default function TopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--background)] flex items-center justify-center"><p className="text-[var(--secondary-text)]">読み込み中...</p></div>}>
      <TopPageContent />
    </Suspense>
  );
}
