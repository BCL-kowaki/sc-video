# VideoHub - 動画保管サイト

YouTube風のUIを持つ静的動画保管サイトです。Next.jsで構築されており、静的エクスポートに対応しています。

## 特徴

- 🎬 YouTube風のモダンなダークテーマUI
- 📱 レスポンシブデザイン（PC・タブレット・スマートフォン対応）
- 🎥 高画質動画再生（画質劣化なし）
- ⌨️ キーボードショートカット対応
- 🚀 静的サイトとしてデプロイ可能

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド（静的エクスポート）
npm run build
```

## 動画の追加方法

### 1. 動画ファイルの配置

動画ファイル（.mp4推奨）を `public/videos/` ディレクトリに配置します。

```
public/
  videos/
    my-video-1.mp4
    my-video-2.mp4
```

### 2. サムネイル画像の配置

サムネイル画像（.jpg, .png, .webp）を `public/thumbnails/` ディレクトリに配置します。

```
public/
  thumbnails/
    my-video-1.jpg
    my-video-2.jpg
```

**推奨サムネイルサイズ:** 1280x720px (16:9比率)

### 3. 動画データの登録

`src/data/videos.ts` ファイルを編集し、`videos` 配列に新しいエントリを追加します。

```typescript
export const videos: Video[] = [
  {
    id: "my-video-1",           // ユニークなID（URLに使用）
    title: "動画タイトル",         // 動画のタイトル
    description: "動画の説明文",   // 詳細な説明
    thumbnail: "/thumbnails/my-video-1.jpg",  // サムネイルのパス
    videoUrl: "/videos/my-video-1.mp4",       // 動画ファイルのパス
    duration: "10:30",          // 動画の長さ（表示用）
    uploadDate: "2024-01-15",   // アップロード日
    category: "説明動画",        // カテゴリ（オプション）
    tags: ["タグ1", "タグ2"],    // タグ（オプション）
  },
  // 他の動画...
];
```

### 4. ビルドとデプロイ

```bash
# ビルド
npm run build

# outディレクトリに静的ファイルが生成されます
```

生成された `out/` ディレクトリの内容をWebサーバーにアップロードしてください。

## 高画質再生について

このサイトでは以下の設定により、動画の画質劣化を最小限に抑えています：

- **圧縮なし配信**: 動画は元のファイルがそのまま配信されます
- **HTML5 Video API**: ブラウザネイティブの動画再生を使用
- **preload="metadata"**: メタデータのみを事前読み込みし、再生開始を高速化

### 推奨動画フォーマット

| 項目 | 推奨値 |
|------|--------|
| コンテナ | MP4 |
| ビデオコーデック | H.264 (AVC) |
| オーディオコーデック | AAC |
| 解像度 | 1920x1080 (Full HD) 以上 |
| ビットレート | 8-15 Mbps |

## キーボードショートカット

| キー | 機能 |
|------|------|
| Space / K | 再生/一時停止 |
| F | フルスクリーン切替 |
| M | ミュート切替 |
| ← | 5秒戻る |
| → | 5秒進む |
| ↑ | 音量を上げる |
| ↓ | 音量を下げる |

## ディレクトリ構成

```
├── public/
│   ├── videos/          # 動画ファイル
│   └── thumbnails/      # サムネイル画像
├── src/
│   ├── app/
│   │   ├── page.tsx         # トップページ（動画一覧）
│   │   └── watch/[id]/      # 動画視聴ページ
│   ├── components/
│   │   ├── Header.tsx       # ヘッダー
│   │   ├── VideoCard.tsx    # 動画カード
│   │   ├── VideoPlayer.tsx  # 動画プレーヤー
│   │   └── RelatedVideoCard.tsx  # 関連動画カード
│   ├── data/
│   │   └── videos.ts        # 動画データ（ここを編集）
│   └── types/
│       └── video.ts         # 型定義
└── out/                     # ビルド出力（静的ファイル）
```

## デプロイ先の例

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- 任意のWebサーバー

## 注意事項

- 大容量の動画ファイルを多数追加する場合、ビルド時間とストレージ容量にご注意ください
- 動画のビットレートが高い場合、閲覧者の回線速度によっては再生が途切れる可能性があります
- ブラウザによってサポートされる動画フォーマットが異なる場合があります（MP4/H.264は広くサポートされています）
