import VideoPlayer from "@/components/VideoPlayer";
import { getFullVideo } from "@/data/videos";
import { notFound } from "next/navigation";

export default function FullPage() {
  const full = getFullVideo();

  if (!full) {
    notFound();
  }

  const description =
    full.description ||
    "当社の事業概要を全編（約53分）で解説しています。詳細なスライド資料は説明資料一覧からご確認ください。";

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-[960px] mx-auto px-4 pt-4 pb-8">
        {/* ホームと同じ見出し構成（全編用） */}
        <h3
          className="text-white text-[14px] md:text-base tracking-[0.25em] uppercase text-center mb-2"
          style={{ fontWeight: 400 }}
        >
          FULL VIDEO
        </h3>
        <h1
          className="text-white text-[22px] md:text-[2rem] lg:text-[2.5rem] text-center tracking-wide mb-2 leading-tight"
          style={{ fontWeight: 900 }}
        >
          {full.title.replace(/^【全編動画】/, "").trim() || "BioVault事業説明（全編）"}
        </h1>
        <h2
          className="text-[#B88F3A] text-[14px] md:text-base tracking-[0.15em] uppercase text-center mb-6"
          style={{ fontWeight: 600 }}
        >
          全編動画
        </h2>

        {/* 全編動画プレイヤー */}
        <div className="max-w-[900px] mx-auto mb-6">
          <VideoPlayer
            src={full.videoUrl}
            poster={full.thumbnail}
            title={full.title}
          />
        </div>

        {/* 動画の説明文 */}
        <section className="max-w-[640px] mx-auto mb-6">
          <p className="text-white/95 text-[14px] leading-relaxed text-left">
            {description}
          </p>
        </section>

        {/* 説明資料はこちら・分割動画はこちらへのボタン */}
        <section className="max-w-[560px] mx-auto flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="/docs/"
            className="inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-white font-bold text-base bg-gradient-to-r from-[#8B6910] via-[#9A7B2E] to-[#B88F3A] hover:from-[#B88F3A] hover:via-[#9A7B2E] hover:to-[#8B6910] transition-all duration-300 shadow-lg hover:shadow-[#B88F3A]/25 hover:scale-[1.02] w-full sm:w-auto"
          >
            説明資料はこちら
            <span className="text-white" aria-hidden>&gt;</span>
          </a>
          <a
            href="/top/"
            className="inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-white font-bold text-base bg-gradient-to-r from-[#8B6910] via-[#9A7B2E] to-[#B88F3A] hover:from-[#B88F3A] hover:via-[#9A7B2E] hover:to-[#8B6910] transition-all duration-300 shadow-lg hover:shadow-[#B88F3A]/25 hover:scale-[1.02] w-full sm:w-auto"
          >
            分割動画はこちら
            <span className="text-white" aria-hidden>&gt;</span>
          </a>
        </section>
      </div>
    </div>
  );
}
