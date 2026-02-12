import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer";
import { getDigestVideo, getFullVideo } from "@/data/videos";

export default function Home() {
  const digest = getDigestVideo();
  const full = getFullVideo();
  const fullDocUrl = full?.linkUrl ?? "#";

  if (!digest) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <p className="text-[var(--secondary-text)]">動画を準備中です。</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-[900px] mx-auto px-4 py-8 md:py-12">
        <h3 className="text-white text-[14px] md:text-base tracking-[0.25em] uppercase text-center mb-2" style={{ fontWeight: 400 }}>
          DIGEST VIDEO
        </h3>
        <h1 className="text-white text-[26px] md:text-[2.25rem] lg:text-[2.75rem] text-center tracking-wide mb-2 leading-tight" style={{ fontWeight: 900 }}>
          <span style={{ fontFamily: '"Noto Serif JP", "Yu Mincho", "游明朝", "Hiragino Mincho Pro", serif' }}>&ldquo;</span>自身の細胞を資産化せよ<span style={{ fontFamily: '"Noto Serif JP", "Yu Mincho", "游明朝", "Hiragino Mincho Pro", serif' }}>&rdquo;</span>
        </h1>
        <h2 className="text-[#B88F3A] text-[16px] md:text-lg tracking-[0.15em] uppercase text-center mb-6" style={{ fontWeight: 600 }}>
          OWN YOUR CELL, LITERALLY
        </h2>

        <div className="mb-6">
          <VideoPlayer
            src={digest.videoUrl}
            poster={digest.thumbnail}
            title={digest.title}
          />
        </div>

        <p className="text-white/95 text-base md:text-lg leading-relaxed text-left mb-8 max-w-[640px] mx-auto">
          革命的技術で未来の健康と資産の在り方を変える。iPSオーダーメイドメンバーシップの全編動画をご確認ください。また、以下リンクの詳細資料は、動画内で使用されているスライド資料になります。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mx-auto w-[95%] sm:w-auto">
          <Link
            href="/top/?tab=full"
            className="flex items-center justify-center gap-2 py-4 px-8 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-[#8B6910] via-[#9A7B2E] to-[#B88F3A] hover:from-[#B88F3A] hover:via-[#9A7B2E] hover:to-[#8B6910] transition-all duration-500 shadow-lg hover:shadow-[#B88F3A]/30 hover:scale-[1.02] shrink-0"
          >
            全編動画はこちら
            <span className="text-white">&gt;</span>
          </Link>
          <a
            href={fullDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-4 px-8 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-[#8B6910] via-[#9A7B2E] to-[#B88F3A] hover:from-[#B88F3A] hover:via-[#9A7B2E] hover:to-[#8B6910] transition-all duration-500 shadow-lg hover:shadow-[#B88F3A]/30 hover:scale-[1.02] shrink-0"
          >
            詳細資料はこちら
            <span className="text-white">&gt;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
