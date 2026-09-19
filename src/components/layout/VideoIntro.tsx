"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

const SESSION_STORAGE_KEY = "19hours_intro_seen";

export default function VideoIntro() {
  const [mounted, setMounted] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);

    // Check if user has already seen the intro in this browser tab session
    try {
      const hasSeen = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (hasSeen === "true") {
        setShouldPlay(false);
        return;
      }
    } catch {
      // In case sessionStorage is blocked by privacy mode
    }

    setShouldPlay(true);
    document.body.style.overflow = "hidden";

    // Allow user to press Escape to skip intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        finishIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  const finishIntro = () => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
    } catch {
      // Ignore sessionStorage errors
    }

    const container = containerRef.current;
    if (!container) {
      setShouldPlay(false);
      document.body.style.overflow = "";
      return;
    }

    // Smooth cinematic curtain reveal
    gsap.to(container, {
      opacity: 0,
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        setShouldPlay(false);
        document.body.style.overflow = "";
      },
    });
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const currentProgress = (video.currentTime / video.duration) * 100;
    setProgress(currentProgress);
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Don't render until mounted on client, or if intro was already seen
  if (!mounted || !shouldPlay) return null;

  return (
    <aside
      ref={containerRef}
      aria-label="Cinematic Video Intro"
      className="fixed inset-0 z-[10000] w-full h-full bg-[#08090B] flex flex-col justify-between overflow-hidden select-none will-change-transform"
    >
      {/* Background Video Canvas */}
      <div className="absolute inset-0 z-0 w-full h-full bg-[#08090B] flex items-center justify-center">
        {/* Ambient blurred backdrop for desktop widescreen */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-30 blur-3xl scale-125 hidden lg:block">
          <video
            src="/images/experience/Video-14356.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Primary Foreground Video (Vertical 9:16 portrait on mobile; framed on desktop) */}
        <video
          ref={videoRef}
          src="/images/experience/Video-14356.mp4"
          autoPlay
          muted={isMuted}
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={finishIntro}
          onError={finishIntro}
          className="relative z-10 w-full h-full max-h-screen object-cover lg:object-contain lg:max-w-[480px] xl:max-w-[540px] shadow-2xl"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#08090B] via-transparent to-[#08090B]/60" />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-30 w-full px-6 md:px-12 pt-8 flex items-center justify-between">
        <div className="inline-flex items-center gap-3 bg-[#08090B]/80 backdrop-blur-md px-3.5 py-1.5 border border-white/10">
          <Image
            src="/images/logo.png"
            alt="19 Hours Fitness Logo"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#F5F5F5] font-medium">
            19 HOURS · VIRAR WEST
          </span>
        </div>

        {/* Sound Toggle Button */}
        <button
          onClick={toggleSound}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="inline-flex items-center gap-2 bg-[#08090B]/80 hover:bg-[#08090B] backdrop-blur-md px-3.5 py-1.5 border border-white/10 hover:border-[#00E5FF] text-[#F5F5F5] hover:text-[#00E5FF] font-mono text-xs tracking-wider uppercase transition-colors"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#969BA3]" />
              <span className="hidden sm:inline">SOUND OFF</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span className="hidden sm:inline text-[#00E5FF]">SOUND ON</span>
            </>
          )}
        </button>
      </header>

      {/* Bottom Controls Bar */}
      <footer className="relative z-30 w-full px-6 md:px-12 pb-8 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="font-mono text-xs text-[#969BA3] tracking-widest uppercase">
            <span className="text-[#00E5FF]">THE EXPERIENCE</span> · VIRAR WEST
          </div>

          {/* Skip Intro Button */}
          <button
            onClick={finishIntro}
            className="group inline-flex items-center gap-2 bg-[#00E5FF] hover:bg-[#F5F5F5] text-[#08090B] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
          >
            <span>SKIP INTRO</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Real-time Progress Bar */}
        <div className="w-full h-1 bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] transition-all duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </footer>
    </aside>
  );
}
