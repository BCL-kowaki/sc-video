"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";

interface HomeDigestPlayerProps {
  src: string;
  poster: string;
  title: string;
}

/** 外部からの訪問時のみダイジェスト動画を自動再生する。同サイト内遷移では自動再生しない。 */
export default function HomeDigestPlayer({ src, poster, title }: HomeDigestPlayerProps) {
  const [shouldAutoplay, setShouldAutoplay] = useState(false);

  useEffect(() => {
    const referrer = document.referrer;
    const isExternal =
      !referrer ||
      (() => {
        try {
          return new URL(referrer).origin !== window.location.origin;
        } catch {
          return true;
        }
      })();
    setShouldAutoplay(isExternal);
  }, []);

  return (
    <VideoPlayer
      src={src}
      poster={poster}
      title={title}
      autoplay={shouldAutoplay}
    />
  );
}
