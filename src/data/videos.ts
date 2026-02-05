import { Video } from "@/types/video";

/**
 * 動画データの管理
 * 
 * 新しい動画を追加する手順:
 * 1. 動画ファイル (.mp4) を public/videos/ に配置
 * 2. サムネイル画像 (.jpg/.png/.webp) を public/thumbnails/ に配置
 * 3. 下記の配列に新しいエントリを追加
 * 4. npm run build でビルド → デプロイ
 */
export const videos: Video[] = [
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
