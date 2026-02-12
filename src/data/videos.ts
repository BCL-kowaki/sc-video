import { Video } from "@/types/video";

/**
 * 動画データの管理
 *
 * 動画をR2に置く場合:
 * 1. R2に動画をアップロードし、Public Development URL を有効化
 * 2. videoUrl に R2 の公開URLを指定（例: https://pub-xxx.r2.dev/bo/動画名.mp4）
 * 3. サムネイルは public/thumbnails/ に配置するか、R2のURLを指定
 *
 * 動画をVercelに置く場合（300MB未満）:
 * 1. 動画を public/videos/ に配置、videoUrl は /videos/ファイル名.mp4
 * 2. サムネイルを public/thumbnails/ に配置
 */
export const videos: Video[] = [

  {
    id: "digest",
    title: "【ダイジェスト】BioVault事業説明",
    description: "革命的技術で未来の健康と資産の在り方を変える、iPSオーダーメイドメンバーシップの概要を約4分でお届けするダイジェスト版です。事業の全体像と魅力をコンパクトにまとめています。",
    thumbnail: "/thumbnails/99_digest.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/digest.mp4",
    duration: "04:08",
    uploadDate: "2026-02-06",
    category: "事業概要",
    tags: ["ダイジェスト"],
    linkLabel: "",
    linkUrl: "",
  },
  {
    id: "full",
    title: "【全編動画】BioVault事業説明",
    description: "当社の事業概要を全編（約53分）で解説しています。iPS細胞の基礎、細胞資産の考え方、技術提携・サービス内容・事業提携・ビジネスモデル、運営会社まで、説明資料に沿って詳しくご説明しています。詳細なスライドは説明資料一覧からご確認ください。",
    thumbnail: "/thumbnails/00_full.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/full_comp_.mp4",
    duration: "53:00",
    uploadDate: "2026-02-05",
    category: "事業概要",
    tags: ["全編"],
    linkLabel: "資料を確認する",
    linkUrl: "https://sc-project-partners.co.jp/files/bonds/biovault/bo/doc.pdf",
  },
  {
    id: "v001",
    title: "01｜iPS細胞とは？",
    description: "ノーベル賞技術として知られるiPS細胞の基礎を解説します。再生医療や創薬、当社サービスとの関わりについて、分かりやすくお伝えしています。",
    thumbnail: "/thumbnails/01.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/ips-t.mp4",
    duration: "04:41",
    uploadDate: "2026-02-06",
    category: "事業概要",
    tags: ["分割"],
    linkLabel: "",
    linkUrl: "",
  },
  {
    id: "v002",
    title: "02｜細胞資産とは？",
    description: "自身の細胞を将来の健康や医療に活かす「細胞資産」の考え方を説明します。なぜいま細胞を保存することが価値を持つのか、その背景とメリットをお伝えしています。",
    thumbnail: "/thumbnails/02.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/cellasset-tt.mp4",
    duration: "",
    uploadDate: "2026-02-06",
    category: "事業概要",
    tags: ["分割"],
    linkLabel: "",
    linkUrl: "",
  },
  {
    id: "v003",
    title: "03｜技術提携企業概要",
    description: "当社が連携する技術提携企業の概要を紹介します。iPS細胞・再生医療分野での実績と、BioVaultサービスを支える技術基盤について解説しています。",
    thumbnail: "/thumbnails/03.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/ice-t.mp4",
    duration: "03:27",
    uploadDate: "2026-02-06",
    category: "事業概要",
    tags: ["分割"],
    linkLabel: "",
    linkUrl: "",
  },
  {
    id: "v004",
    title: "04｜サービス内容",
    description: "BioVaultのサービス内容を詳しくご説明します。細胞の採取・保管の流れ、メンバーシップの内容、ご利用いただける検査やオプションなど、約18分でお伝えしています。",
    thumbnail: "/thumbnails/04.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/service-tt.mp4",
    duration: "17:52",
    uploadDate: "2026-02-06",
    category: "事業概要",
    tags: ["分割"],
    linkLabel: "",
    linkUrl: "",
  },
  {
    id: "v005",
    title: "05｜事業提携企業",
    description: "当社と事業提携している企業の概要を紹介します。各社の強みと連携内容により、お客様に安心・高品質なサービスをお届けする体制についてお伝えしています。",
    thumbnail: "/thumbnails/05.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/bp-tt.mp4",
    duration: "04:16",
    uploadDate: "2026-02-06",
    category: "事業概要",
    tags: ["分割"],
    linkLabel: "",
    linkUrl: "",
  },
  {
    id: "v006",
    title: "06｜ビジネスモデル概要",
    description: "BioVaultのビジネスモデルと収益の仕組みを解説します。メンバーシップ料金体系、今後の展開や成長戦略について、約10分で分かりやすくご説明しています。",
    thumbnail: "/thumbnails/06.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/bm-t.mp4",
    duration: "10:04",
    uploadDate: "2026-02-06",
    category: "事業概要",
    tags: ["分割"],
    linkLabel: "",
    linkUrl: "",
  },
  {
    id: "v007",
    title: "07｜BioVault運営会社",
    description: "BioVaultを運営する会社の概要をご紹介します。企業理念、沿革、およびお客様に安心してご利用いただくための体制についてお伝えしています。",
    thumbnail: "/thumbnails/07.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/about-tt.mp4",
    duration: "05:18",
    uploadDate: "2026-02-06",
    category: "事業概要",
    tags: ["分割"],
    linkLabel: "",
    linkUrl: "",
  },
];

/**
 * IDで動画を取得
 */
export function getVideoById(id: string): Video | undefined {
  return videos.find((video) => video.id === id);
}

/**
 * カテゴリで動画をフィルタリング
 */
export function getVideosByCategory(category: string): Video[] {
  return videos.filter((video) => video.category === category);
}

/**
 * 全カテゴリを取得
 */
export function getAllCategories(): string[] {
  const categories = videos
    .map((video) => video.category)
    .filter((category): category is string => category !== undefined);
  return [...new Set(categories)];
}

/**
 * タグで動画をフィルタ
 */
export function getVideosByTag(tag: string): Video[] {
  return videos.filter((v) => v.tags?.includes(tag));
}

/** ダイジェスト動画（1本） */
export function getDigestVideo(): Video | undefined {
  return videos.find((v) => v.tags?.includes("ダイジェスト"));
}

/** 全編動画（1本） */
export function getFullVideo(): Video | undefined {
  return videos.find((v) => v.id === "full" || (v.tags?.includes("全編") && !v.tags?.includes("ダイジェスト")));
}

/** 分割動画（小分けの動画一覧） */
export function getSplitVideos(): Video[] {
  return getVideosByTag("分割");
}

/** 表示順: ダイジェスト → 全編 → 分割動画（ID順） */
export function getVideosInDisplayOrder(): Video[] {
  const digest = videos.find((v) => v.tags?.includes("ダイジェスト"));
  const full = videos.find((v) => v.tags?.includes("全編") && v.id !== "digest");
  const split = getVideosByTag("分割");
  return [digest, full, ...split].filter((v): v is Video => !!v);
}
