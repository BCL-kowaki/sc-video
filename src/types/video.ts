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
}
