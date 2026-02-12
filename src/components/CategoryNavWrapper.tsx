"use client";

import { usePathname } from "next/navigation";
import CategoryNav from "./CategoryNav";

function getActiveId(pathname: string): string | undefined {
  if (pathname.startsWith("/full")) return "full";
  if (pathname.startsWith("/top")) return "videos";
  if (pathname.startsWith("/docs")) return "docs";
  if (pathname.startsWith("/company")) return "company";
  return undefined;
}

export default function CategoryNavWrapper() {
  const pathname = usePathname();
  const activeId = getActiveId(pathname ?? "");
  return <CategoryNav activeId={activeId} />;
}
