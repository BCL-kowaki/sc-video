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
    description: "",
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
    description: "",
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
    id: "0001",
    title: "01_iPS細胞とは？",
    description: "",
    thumbnail: "/thumbnails/01_ips.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/ips-t.mp4",
    duration: "04:41",
    uploadDate: "2026-02-06",
    category: "事業概要",
    tags: ["分割"],
    linkLabel: "",
    linkUrl: "",
  },
  {
    id: "0002",
    title: "02_細胞資産とは？",
    description: "08:00",
    thumbnail: "/thumbnails/02_cellasset.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/cellasset-tt.mp4",
    duration: "",
    uploadDate: "2026-02-06",
    category: "事業概要",
    tags: ["分割"],
    linkLabel: "",
    linkUrl: "",
  },
  {
    id: "0003",
    title: "03_技術提携企業概要",
    description: "",
    thumbnail: "/thumbnails/03_ice.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/ice-t.mp4",
    duration: "03:27",
    uploadDate: "2026-02-06",
    category: "事業概要",
    tags: ["分割"],
    linkLabel: "",
    linkUrl: "",
  },
  {
    id: "0004",
    title: "04_サービス内容",
    description: "",
    thumbnail: "/thumbnails/04_service.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/service-tt.mp4",
    duration: "17:52",
    uploadDate: "2026-02-06",
    category: "事業概要",
    tags: ["分割"],
    linkLabel: "",
    linkUrl: "",
  },
  {
    id: "0005",
    title: "05_事業提携企業",
    description: "",
    thumbnail: "/thumbnails/05_bp.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/bp-tt.mp4",
    duration: "04:16",
    uploadDate: "2026-02-06",
    category: "事業概要",
    tags: ["分割"],
    linkLabel: "",
    linkUrl: "",
  },
  {
    id: "0006",
    title: "06_ビジネスモデル概要",
    description: "",
    thumbnail: "/thumbnails/06_bm.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/bm-t.mp4",
    duration: "10:04",
    uploadDate: "2026-02-06",
    category: "事業概要",
    tags: ["分割"],
    linkLabel: "",
    linkUrl: "",
  },
  {
    id: "0007",
    title: "07_BioVault運営会社",
    description: "",
    thumbnail: "/thumbnails/07_about.png",
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
