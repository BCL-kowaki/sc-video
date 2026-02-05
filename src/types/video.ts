export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  uploadDate: string;
  category?: string;
  tags?: string[];
  /** 説明欄に表示するボタンリンク（ラベルとURL） */
  linkLabel?: string;
  linkUrl?: string;
}
