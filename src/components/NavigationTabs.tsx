"use client";

import Link from "next/link";

type NavItem = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { id: "full", label: "全編", href: "/top/" },
  { id: "digest", label: "ダイジェスト", href: "/" },
  { id: "split", label: "分割動画", href: "/top/?tab=split" },
  { id: "docs", label: "資料", href: "https://sc-project-partners.co.jp/files/bonds/biovault/bo/doc.pdf", external: true },
  { id: "company", label: "会社案内", href: "/company/" },
];

interface NavigationTabsProps {
  activeId?: string;
  /** 動画タブのクリックを親で処理する場合に指定。未指定ならリンク遷移 */
  onTabClick?: (id: string) => void;
}

export default function NavigationTabs({ activeId, onTabClick }: NavigationTabsProps) {
  const activeStyle =
    "bg-gradient-to-r from-[#8B6910] via-[#9A7B2E] to-[#B88F3A] text-white";
  const inactiveStyle =
    "bg-[var(--card-bg)] text-[var(--secondary-text)] border border-[var(--border-color)] hover:border-[#B88F3A] hover:text-white";
  const baseStyle =
    "px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300";

  const videoTabIds = ["full", "split"];

  return (
    <div className="flex gap-3 mb-3 overflow-x-auto pb-2 scrollbar-hide">
      {NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id;

        // 外部リンク（資料など）は別タブで開く
        if (item.external) {
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}
            >
              {item.label}
            </a>
          );
        }

        // ダイジェストは常にホーム（/）へリンク
        if (item.id === "digest") {
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}
            >
              {item.label}
            </Link>
          );
        }

        // 全編・分割動画で onTabClick が渡されている場合はボタンとして動作（/top/ のみ）
        if (videoTabIds.includes(item.id) && onTabClick) {
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabClick(item.id)}
              className={`${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}
            >
              {item.label}
            </button>
          );
        }

        // それ以外はリンク遷移
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
