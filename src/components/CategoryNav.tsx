"use client";

const CATEGORIES = [
  { id: "full", label: "全編動画", href: "/full/" },
  { id: "videos", label: "動画一覧", href: "/top/" },
  { id: "docs", label: "資料一覧", href: "/docs/" },
  { id: "company", label: "会社案内", href: "/company/" },
];

interface CategoryNavProps {
  activeId?: string;
}

export default function CategoryNav({ activeId }: CategoryNavProps) {
  return (
    <nav className="w-full border-b border-[var(--border-color)] mb-2">
      <ul className="flex flex-nowrap items-center justify-center gap-0 overflow-x-auto scrollbar-hide min-h-[48px]">
        {CATEGORIES.map((cat, i) => {
          const isActive = activeId === cat.id;
          return (
            <li key={cat.id} className="flex items-center shrink-0">
              {i > 0 && (
                <span className="text-[var(--secondary-text)]/50 px-1 sm:px-2" aria-hidden>
                  |
                </span>
              )}
              <a
                href={cat.href}
                className={`py-3 px-3 sm:px-5 text-sm font-medium whitespace-nowrap transition-colors duration-200 border-b-2 -mb-[1px] ${
                  isActive
                    ? "text-[#B88F3A] border-[#B88F3A]"
                    : "text-[var(--secondary-text)] border-transparent hover:text-white hover:border-[var(--border-color)]"
                }`}
              >
                {cat.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
