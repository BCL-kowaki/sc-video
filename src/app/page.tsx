import HomeDigestPlayer from "@/components/HomeDigestPlayer";
import { getDigestVideo } from "@/data/videos";

export default function Home() {
  const digest = getDigestVideo();

  if (!digest) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <p className="text-[var(--secondary-text)]">動画を準備中です。</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-[960px] mx-auto px-4 pt-4 pb-8">
        <h3 className="text-white text-[14px] md:text-base tracking-[0.25em] uppercase text-center mb-2" style={{ fontWeight: 400 }}>
          DIGEST VIDEO
        </h3>
        <h1 className="text-white text-[26px] md:text-[2.25rem] lg:text-[2.75rem] text-center tracking-wide mb-2 leading-tight" style={{ fontWeight: 900 }}>
          <span style={{ fontFamily: '"Noto Serif JP", "Yu Mincho", "游明朝", "Hiragino Mincho Pro", serif' }}>&ldquo;</span>自身の細胞を資産化せよ<span style={{ fontFamily: '"Noto Serif JP", "Yu Mincho", "游明朝", "Hiragino Mincho Pro", serif' }}>&rdquo;</span>
        </h1>
        <h2 className="text-[#B88F3A] text-[16px] md:text-lg tracking-[0.15em] uppercase text-center mb-6" style={{ fontWeight: 600 }}>
          OWN YOUR CELL, LITERALLY
        </h2>

        <div className="max-w-[900px] mx-auto mb-6">
          <HomeDigestPlayer
            src={digest.videoUrl}
            poster={digest.thumbnail}
            title={digest.title}
          />
        </div>

        <p className="text-white/95 text-[14px] leading-relaxed text-left mb-4 max-w-[640px] mx-auto">
          革命的技術で未来の健康と資産の在り方を変える。iPSオーダーメイドメンバーシップの概要をダイジェストでお届けしています。
        </p>

        {/* ダイジェスト視聴後 → 全編動画への誘導 */}
        <section className="max-w-[560px] mx-auto text-center">
          <p className="text-white/90 text-[12px] mb-6">
            続きは全編動画（約53分）で詳しくご説明しています。
          </p>
          <a
            href="/full/"
            className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl text-white font-bold text-base md:text-lg bg-gradient-to-r from-[#8B6910] via-[#9A7B2E] to-[#B88F3A] hover:from-[#B88F3A] hover:via-[#9A7B2E] hover:to-[#8B6910] transition-all duration-300 shadow-lg hover:shadow-[#B88F3A]/25 hover:scale-[1.02]"
          >
            全編動画を見る
            <span className="text-white" aria-hidden>&gt;</span>
          </a>
          <p className="text-white text-xs mt-6">
            動画一覧・資料は上部メニューからご利用ください。
          </p>
        </section>
      </div>
    </div>
  );
}
