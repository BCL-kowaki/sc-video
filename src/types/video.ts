export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  /** 空の場合は Coming Soon（動画は後からアップロード） */
  videoUrl: string;
  duration: string;
  uploadDate: string;
  category?: string;
  tags?: string[];
  /** 説明欄に表示するボタンリンク（ラベルとURL） */
  linkLabel?: string;
  linkUrl?: string;
  /** true のときサムネ上に Coming Soon オーバーレイを表示 */
  comingSoon?: boolean;
}
