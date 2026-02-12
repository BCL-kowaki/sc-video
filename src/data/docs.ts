import { Doc } from "@/types/doc";

const BASE = "https://sc-project-partners.co.jp/files/bonds/biovault/bo";

/** 全体資料 → 分割資料の順で表示 */
export const docs: Doc[] = [
  {
    id: "d000",
    title: "全体資料",
    description: "全編動画で使用しているスライド資料です。事業概要・iPS細胞・細胞資産、技術提携企業・サービス内容・事業提携・ビジネスモデル・運営会社まで、一通りまとめたPDFです。動画とあわせてご覧いただくと理解が深まります。",
    cover: "/thumbnails/doc/00.png",
    url: `${BASE}/doc.pdf`,
  },
  {
    id: "d001",
    title: "01｜iPS細胞とは？",
    description: "iPS細胞の基礎と当社での活用について解説した資料です。再生医療・創薬への応用や、BioVaultサービスにおける位置づけを図解でまとめています。動画「01_iPS細胞とは？」と対応しています。",
    cover: "/thumbnails/doc/01.png",
    url: `${BASE}/ips.pdf`,
  },
  {
    id: "d002",
    title: "02｜技術提携企業",
    description: "当社が連携する技術提携企業の概要と連携内容をまとめた資料です。各社の強みと、品質・安心を支える体制が分かります。動画「03_技術提携企業概要」の補足資料としてご利用ください。",
    cover: "/thumbnails/doc/02.png",
    url: `${BASE}/ice.pdf`,
  },
  {
    id: "d003",
    title: "03｜事業提携",
    description: "当社と事業提携している企業の概要と連携内容をまとめた資料です。動画「05_事業提携企業」とあわせてご参照ください。",
    cover: "/thumbnails/doc/03.png",
    url: `${BASE}/bp.pdf`,
  },
  {
    id: "d004",
    title: "04｜ビジネスモデル",
    description: "BioVaultのビジネスモデルと収益の仕組みをまとめた資料です。メンバーシップの価値と今後の展開が一目で分かります。動画「06_ビジネスモデル概要」とあわせてご参照ください。",
    cover: "/thumbnails/doc/04.png",
    url: `${BASE}/bm.pdf`,
  },
  {
    id: "d005",
    title: "05｜FAQ",
    description: "よくあるご質問と回答をまとめた資料です。サービス内容・お申し込み・費用などについて、お気軽にご確認ください。",
    cover: "/thumbnails/doc/05.png",
    url: `${BASE}/faq.pdf`,
  },
];

/** トップに表示するメイン説明資料（1件） */
export function getMainDoc(): Doc | undefined {
  return docs[0];
}

/** 一覧用（メインを除く or 全て） */
export function getDocsList(): Doc[] {
  return docs;
}
