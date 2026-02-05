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
    id: "full-comp",
    title: "BioVault 事業説明動画（全編）",
    description: "",
    thumbnail: "/thumbnails/full_comp_.png",
    videoUrl: "https://pub-124d8dcf6aa94a1cbbbaafb724e4a831.r2.dev/bo/full_comp_.mp4",
    duration: "53:00",
    uploadDate: "2026-02-05",
    category: "事業概要",
    tags: ["事業概要"],
    linkLabel: "資料はこちら",
    linkUrl: "https://sc-project-partners.co.jp/files/bonds/biovault/bo/doc.pdf",
  },
  {
    id: "sample-1",
    title: "サンプル動画 1",
    description: "これはサンプル動画の説明文です。実際の動画をアップロードする際は、この内容を書き換えてください。",
    thumbnail: "/thumbnails/sample-1.jpg",
    videoUrl: "/videos/sample-1.mp4",
    duration: "10:30",
    uploadDate: "2024-01-15",
    category: "説明動画",
    tags: ["サンプル", "テスト"],
  },
  {
    id: "sample-2",
    title: "サンプル動画 2",
    description: "2つ目のサンプル動画です。動画の詳細な説明をここに記載できます。",
    thumbnail: "/thumbnails/sample-2.jpg",
    videoUrl: "/videos/sample-2.mp4",
    duration: "5:45",
    uploadDate: "2024-01-20",
    category: "チュートリアル",
    tags: ["サンプル", "ガイド"],
  },
  {
    id: "sample-3",
    title: "サンプル動画 3",
    description: "3つ目のサンプル動画です。",
    thumbnail: "/thumbnails/sample-3.jpg",
    videoUrl: "/videos/sample-3.mp4",
    duration: "8:15",
    uploadDate: "2024-01-25",
    category: "説明動画",
    tags: ["サンプル"],
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
 * 関連動画を取得（同じカテゴリの動画を返す）
 */
export function getRelatedVideos(currentVideoId: string, limit: number = 5): Video[] {
  const currentVideo = getVideoById(currentVideoId);
  if (!currentVideo) return videos.slice(0, limit);

  const related = videos
    .filter((video) => video.id !== currentVideoId)
    .filter((video) => video.category === currentVideo.category);

  if (related.length < limit) {
    const others = videos
      .filter((video) => video.id !== currentVideoId && video.category !== currentVideo.category)
      .slice(0, limit - related.length);
    return [...related, ...others];
  }

  return related.slice(0, limit);
}
