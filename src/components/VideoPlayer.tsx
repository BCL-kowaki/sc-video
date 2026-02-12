"use client";

import { useRef, useState, useEffect } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  /** 外部からの訪問時など、自動再生したい場合は true。音声付きで再生を試行（ブロック時は自動再生しない） */
  autoplay?: boolean;
}

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
}

export default function VideoPlayer({ src, poster, title, autoplay = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Format time (seconds to MM:SS)
  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle play/pause（フルスクリーンは拡大ボタンのみ。スマホでは再生開始でコントローラーを消す）
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
      if (isMobile) {
        setShowControls(true);
        controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2500);
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Handle fullscreen（iOSは video.webkitEnterFullscreen を使用）
  const toggleFullscreen = () => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      // iOS: 動画要素のネイティブフルスクリーン
      const v = video as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
      if (isMobile && v?.webkitEnterFullscreen) {
        v.webkitEnterFullscreen();
        return;
      }
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {});
      }
    } else {
      const d = document as Document & { webkitExitFullscreen?: () => void };
      if (d.webkitExitFullscreen) d.webkitExitFullscreen();
      else if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  // Show/hide controls（PC: マウスで表示、再生中は3秒で非表示 / スマホ: タップで表示、再生中は2.5秒で非表示）
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(
        () => setShowControls(false),
        isMobile ? 2500 : 3000
      );
    }
  };

  const handleTouchStart = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2500);
    }
  };

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  // 外部訪問時用: まず音声付きで再生を試行し、ブロックされたらミュートで自動再生（ユーザーがミュート解除で音声可能）
  useEffect(() => {
    if (!autoplay || !videoRef.current) return;
    const v = videoRef.current;
    v.muted = false;
    v.volume = 1;
    v.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        v.muted = true;
        setIsMuted(true);
        v.play().then(() => setIsPlaying(true)).catch(() => {});
      });
  }, [autoplay]);

  // Update fullscreen state（標準 + iOS webkit）
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element };
      setIsFullscreen(!!(document.fullscreenElement ?? doc.webkitFullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  // スマホフルスクリーン時: 指で画面が動かないように touchmove を完全に抑制（シークバー・ボタンは除外）
  const preventTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !isFullscreen) return;
    const target = e.target as Node;
    if (target instanceof Element && (target.closest("button") || target.closest('input[type="range"]'))) return;
    e.preventDefault();
  };

  useEffect(() => {
    if (!isMobile || !isFullscreen) return;

    const isControl = (target: EventTarget | null) => {
      if (!target || !(target instanceof Element)) return false;
      return !!(target.closest("button") || target.closest('input[type="range"]'));
    };

    const onTouchMove = (e: Event) => {
      if (isControl((e as TouchEvent).target)) return;
      e.preventDefault();
    };

    const doc = document;
    const body = doc.body;
    const fullscreenEl = (doc.fullscreenElement ?? (doc as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement) ?? null;

    // 1) document でキャプチャ phase で touchmove を止める（video より先に取得）
    doc.addEventListener("touchmove", onTouchMove, { capture: true, passive: false });

    // 2) フルスクリーン要素自体にも touch-action と listener
    if (fullscreenEl) {
      (fullscreenEl as HTMLElement).style.touchAction = "none";
      (fullscreenEl as HTMLElement).style.overflow = "hidden";
      fullscreenEl.addEventListener("touchmove", onTouchMove, { passive: false });
    }

    // 3) body を固定して背景が動かないようにする
    const prevOverflow = body.style.overflow;
    const prevPosition = body.style.position;
    const prevWidth = body.style.width;
    const prevTouchAction = body.style.touchAction;
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.width = "100%";
    body.style.touchAction = "none";

    return () => {
      doc.removeEventListener("touchmove", onTouchMove, { capture: true });
      if (fullscreenEl) {
        (fullscreenEl as HTMLElement).style.touchAction = "";
        (fullscreenEl as HTMLElement).style.overflow = "";
        fullscreenEl.removeEventListener("touchmove", onTouchMove);
      }
      body.style.overflow = prevOverflow;
      body.style.position = prevPosition;
      body.style.width = prevWidth;
      body.style.touchAction = prevTouchAction;
    };
  }, [isMobile, isFullscreen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime -= 5;
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime += 5;
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume((v) => {
            const newVol = Math.min(1, v + 0.1);
            if (videoRef.current) videoRef.current.volume = newVol;
            return newVol;
          });
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume((v) => {
            const newVol = Math.max(0, v - 0.1);
            if (videoRef.current) videoRef.current.volume = newVol;
            return newVol;
          });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  return (
    <div
      ref={containerRef}
      className="relative bg-black aspect-video w-full rounded-[5px] overflow-hidden group"
      style={
        isMobile && isFullscreen
          ? {
              touchAction: "none",
              WebkitTouchCallout: "none",
              userSelect: "none",
            }
          : undefined
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={preventTouchMove}
    >
      {/* Video Element - z-0 でコントロールの下に固定（iOSで前面に出るのを防ぐ） */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="relative z-0 w-full h-full object-contain"
        onClick={() => {
          if (!showControls) setShowControls(true);
          else togglePlay();
        }}
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
        onLoadedMetadata={() => {
          setDuration(videoRef.current?.duration || 0);
          setIsLoading(false);
        }}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => {
          setIsLoading(false);
          if (isMobile) {
            setShowControls(true);
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
            controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2500);
          }
        }}
        onEnded={() => setIsPlaying(false)}
        onError={() => setError(true)}
        preload="metadata"
        playsInline
        muted={isMuted}
      >
        <source src={src} type="video/mp4" />
        お使いのブラウザは動画再生に対応していません。
      </video>

      {/* スマホフルスクリーン時のみ: 動画エリアの touchmove をキャッチして画面が動かないようにするオーバーレイ（コントロールは z-20 で上にある） */}
      {isMobile && isFullscreen && (
        <div
          className="absolute inset-0 z-[15] touch-none"
          style={{ touchAction: "none" }}
          onTouchMove={preventTouchMove}
          onClick={() => {
            if (!showControls) setShowControls(true);
            else togglePlay();
          }}
          aria-hidden
        />
      )}

      {/* Loading Spinner */}
      {isLoading && !error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-4 border-[#B88F3A] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-[var(--secondary-text)] mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-[var(--secondary-text)]">動画を読み込めませんでした</p>
        </div>
      )}

      {/* Play Button Overlay */}
      {!isPlaying && !error && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer touch-manipulation"
          onClick={(e) => { e.preventDefault(); togglePlay(); }}
        >
          <div className="w-14 h-14 bg-gradient-to-br from-[#8B6910] via-[#9A7B2E] to-[#B88F3A] rounded-full flex items-center justify-center hover:from-[#B88F3A] hover:via-[#9A7B2E] hover:to-[#8B6910] transition-all duration-500 ease-in-out shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white ml-0.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Controls - YouTube風: 下部に固定。スマホは再生ボタン行の下にシークバー・パディング詰め */}
      <div
        className={`absolute left-0 right-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent px-1.5 py-0.5 md:px-3 md:py-3 transition-opacity duration-300 isolate ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "auto", bottom: 0, transform: "translateZ(0)" }}
      >
        {/* ボタン1行（上） - スマホ: 余白詰め [再生][音量][時間][拡大] */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1 md:gap-4">
            {/* Play/Pause */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="min-w-[40px] min-h-[40px] md:min-w-[44px] md:min-h-[44px] flex items-center justify-center text-white hover:text-[#B88F3A] transition-colors duration-300 touch-manipulation"
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-7 md:w-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-7 md:w-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Volume - スマホはアイコンのみ、PCはスライダーも */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                className="min-w-[40px] min-h-[40px] md:min-w-[44px] md:min-h-[44px] flex items-center justify-center text-white hover:text-[#B88F3A] transition-colors duration-300 touch-manipulation"
              >
                {isMuted || volume === 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                onClick={(e) => e.stopPropagation()}
                className="hidden md:block w-20 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>

            {/* Time */}
            <span className="text-white text-xs md:text-sm tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center">
            {/* 拡大 = フルスクリーン（スマホでタップでフル画面） */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
              className="min-w-[40px] min-h-[40px] md:min-w-[44px] md:min-h-[44px] flex items-center justify-center text-white hover:text-[#B88F3A] transition-colors duration-300 touch-manipulation"
              aria-label="フルスクリーン"
            >
              {isFullscreen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* シークバー（ボタンの下に配置・スマホで余白詰め） */}
        <div className="flex items-center w-full px-0.5 pt-0.5 pb-0.5 md:pt-1 md:pb-1 min-h-[24px] md:min-h-[24px] shrink-0">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-1.5 md:h-1 bg-gray-600 rounded-full appearance-none cursor-pointer touch-manipulation [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:touch-manipulation hover:[&::-webkit-slider-thumb]:scale-110 transition-transform"
            style={{
              background: `linear-gradient(to right, #B88F3A ${
                (currentTime / (duration || 1)) * 100
              }%, #4b5563 ${(currentTime / (duration || 1)) * 100}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
