"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FirstVisitRedirect() {
  const router = useRouter();

  useEffect(() => {
    try {
      const hasVisited = localStorage.getItem("bv_visited");
      if (!hasVisited) {
        localStorage.setItem("bv_visited", "1");
        router.replace("/top/");
      }
    } catch {
      // localStorage が使えない環境では何もしない
    }
  }, [router]);

  return null;
}
