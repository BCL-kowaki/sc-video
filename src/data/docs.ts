import { Doc } from "@/types/doc";

const BASE = "https://sc-project-partners.co.jp/files/bonds/biovault/bo";

/** 全体資料 → 分割資料の順で表示 */
export const docs: Doc[] = [
  {
    id: "d000",
    title: "全編資料",
    description: "BioVaultの事業概要からiPS細胞の解説まで本事業の魅力のすべてを網羅。",
    cover: "/thumbnails/doc/00.png",
    url: `${BASE}/doc.pdf`,
  },
  {
    id: "d001",
    title: "【分割01】iPS細胞とは？",
    description: "iPS細胞の基礎と活用を解説。",
    cover: "/thumbnails/doc/01.png",
    url: `${BASE}/ips.pdf`,
  },
  {
    id: "d002",
    title: "【分割02】技術提携企業",
    description: "技術提携企業の概要を解説。",
    cover: "/thumbnails/doc/02.png",
    url: `${BASE}/ice.pdf`,
  },
  {
    id: "d003",
    title: "【分割03】事業提携",
    description: "事業提携企業の概要を解説。",
    cover: "/thumbnails/doc/03.png",
    url: `${BASE}/bp.pdf`,
  },
  {
    id: "d004",
    title: "【分割04】ビジネスモデル",
    description: "ビジネスモデル（収益構造）を解説。",
    cover: "/thumbnails/doc/04.png",
    url: `${BASE}/bm.pdf`,
  },
  {
    id: "d005",
    title: "【FAQ】よくある質問",
    description: "よくある質問と回答のまとめ。",
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
