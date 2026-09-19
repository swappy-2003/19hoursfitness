"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ArrowDown, Volume2, VolumeX, SkipForward } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { BRAND } from "@/lib/constants";
import { useVideoIntro } from "@/contexts/VideoIntroContext";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const { introPlaying, completeIntro } = useVideoIntro();
  const [introExiting, setIntroExiting] = useState(false);
  const hasRevealedRef = useRef(false);

  const heroRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 800);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Autoplay muted video on mobile
  useEffect(() => {
    if (isMobile && videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      video.play().catch(() => {
        // Browser blocked autoplay — poster image shows as fallback
      });
    }
  }, [isMobile]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      videoRef.current.play().catch(() => {});
    }
  };

  // ---------- Mobile intro reveal choreography ----------
  const runRevealAnimation = useCallback(() => {
    if (hasRevealedRef.current) return;
    hasRevealedRef.current = true;

    const eyebrow = eyebrowRef.current;
    const headline = headlineRef.current;
    const textGroup = textGroupRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    // Step 1: Guarantee video keeps looping smoothly and in mute as hero background
    if (videoRef.current) {
      videoRef.current.loop = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
    setIsMuted(true);

    // Step 2: Fade out intro controls overlay
    setIntroExiting(true);

    // Step 3: Staggered GSAP reveal of all hero UI
    const revealTl = gsap.timeline({ delay: 0.35 });

    // Eyebrow badge slides in
    if (eyebrow) {
      revealTl.fromTo(
        eyebrow,
        { x: -25, opacity: 0, visibility: "visible" },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        0
      );
    }

    // Main headline lines reveal upward
    const heroLines = headline?.querySelectorAll(".hero-line") ?? [];
    if (heroLines.length > 0) {
      revealTl.fromTo(
        heroLines,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power4.out",
        },
        0.1
      );
    }

    // Subtitle paragraph
    if (textGroup) {
      const subtitle = textGroup.querySelector("p");
      if (subtitle) {
        revealTl.fromTo(
          subtitle,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          0.45
        );
      }
      revealTl.set(textGroup, { visibility: "visible", opacity: 1 }, 0);
    }

    // Scroll indicator at bottom
    if (scrollIndicator) {
      revealTl.fromTo(
        scrollIndicator,
        { y: 15, opacity: 0, visibility: "visible" },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        0.65
      );
    }

    // Intro completes once reveal is underway
    revealTl.call(() => {
      completeIntro();
      setIntroExiting(false);
    }, undefined, 0.7);
  }, [completeIntro]);

  // Handle video ended (if user doesn't skip, video ends naturally)
  useEffect(() => {
    if (!isMobile || !introPlaying) return;

    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      // Restart the video to loop, then reveal
      video.currentTime = 0;
      video.play().catch(() => {});
      runRevealAnimation();
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [isMobile, introPlaying, runRevealAnimation]);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Video continues playing — we just reveal the UI
    runRevealAnimation();
  };

  // Skip-button progress ring: track video currentTime / duration
  const [videoProgress, setVideoProgress] = useState(0);

  useEffect(() => {
    if (!isMobile || !introPlaying) return;

    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration && isFinite(video.duration)) {
        setVideoProgress(video.currentTime / video.duration);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isMobile, introPlaying]);

  // Desktop animations (mouse parallax and scrollTrigger - 100% untouched)
  useEffect(() => {
    const hero = heroRef.current;
    const imageWrapper = imageWrapperRef.current;
    const textGroup = textGroupRef.current;
    const headline = headlineRef.current;
    const eyebrow = eyebrowRef.current;
    if (!hero || !imageWrapper || !textGroup) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobileDevice = window.innerWidth <= 800 || window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (isMobileDevice || prefersReducedMotion) {
      // On mobile, if intro is NOT playing, set elements visible immediately
      // If intro IS playing, the reveal animation handles visibility
      if (!introPlaying) {
        gsap.set(imageWrapper, { scale: 1, opacity: 1 });
        gsap.set(eyebrow, { y: 0, opacity: 1 });
        gsap.set(headline?.querySelectorAll(".hero-line") ?? [], { yPercent: 0, opacity: 1 });
      }
      return;
    }

    // Initial entrance animation on desktop
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      imageWrapper,
      { scale: 1.15, opacity: 0.4 },
      { scale: 1.05, opacity: 1, duration: 1.8, ease: "power2.out" }
    )
      .fromTo(
        eyebrow,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=1.2"
      )
      .fromTo(
        headline?.querySelectorAll(".hero-line") ?? [],
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: "power4.out" },
        "-=0.9"
      );

    // Subtle desktop mouse parallax (max 15px)
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let mouseCleanup: (() => void) | undefined;

    if (isFinePointer) {
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 24;
        const y = (e.clientY / window.innerHeight - 0.5) * 24;

        gsap.to(imageWrapper, {
          x: -x * 0.7,
          y: -y * 0.7,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.to(textGroup, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.8,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      mouseCleanup = () => window.removeEventListener("mousemove", handleMouseMove);
    }

    // ScrollTrigger cinematic transition (Desktop only)
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        pin: true,
        pinSpacing: false,
      },
    });

    scrollTl
      .to(imageWrapper, {
        scale: 1.25,
        yPercent: 10,
        opacity: 0.35,
        ease: "none",
      })
      .to(
        textGroup,
        {
          yPercent: -40,
          opacity: 0.1,
          ease: "none",
        },
        0
      )
      .to(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: "power1.out",
        },
        0
      );

    return () => {
      tl.kill();
      scrollTl.kill();
      if (mouseCleanup) mouseCleanup();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-[#08090B] flex flex-col justify-between px-6 md:px-12 pt-28 pb-12 select-none"
    >
      {/* Background Media */}
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 z-0 will-change-transform pointer-events-none"
      >
        {/* Desktop Image (Untouched) */}
        <Image
          src="/images/realHero.png"
          alt="19 Hours Fitness Facility in Virar West"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="hidden md:block object-cover object-center brightness-[0.92] contrast-[1.05]"
        />

        {/* Mobile hero image fallback (shows instantly while video buffers) */}
        <Image
          src="/images/realHero.png"
          alt="19 Hours Fitness"
          fill
          priority
          sizes="100vw"
          className="md:hidden object-cover object-center"
        />

        {/* Mobile-only video (plays over the fallback image once loaded) */}
        <video
          ref={videoRef}
          src="/images/experience/Video-14356.mp4"
          poster="/images/realHero.png"
          className="hero-media__mobile-video"
          playsInline
          autoPlay
          muted
          loop={!introPlaying}
          preload="metadata"
        />

        {/* Soft Vignette Overlay (desktop only) */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/25 to-black/20 pointer-events-none" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#08090B]/60 via-transparent to-[#08090B]/30 pointer-events-none" />

        {/* Light mobile vignette for text readability */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ========== MOBILE INTRO OVERLAY ========== */}
      {isMobile && introPlaying && (
        <div
          ref={overlayRef}
          className={`video-intro-overlay ${introExiting ? "is-exiting" : ""}`}
        >
          <div className="video-intro-controls">
            {/* Unmute button */}
            <button
              onClick={toggleSound}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className={`video-intro-btn video-intro-btn--unmute ${!isMuted ? "is-unmuted" : ""}`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Sound On</span>
                </>
              )}
            </button>

            {/* Skip button with countdown progress ring around icon */}
            <button
              onClick={handleSkip}
              aria-label="Skip intro"
              className="video-intro-btn video-intro-btn--skip"
            >
              <div className="relative flex items-center justify-center w-5 h-5">
                <svg className="w-5 h-5 -rotate-90">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="#00E5FF"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 8}
                    strokeDashoffset={2 * Math.PI * 8 * (1 - videoProgress)}
                    strokeLinecap="round"
                    className="transition-[stroke-dashoffset] duration-150"
                  />
                </svg>
                <SkipForward className="w-2.5 h-2.5 text-[#F5F5F5] absolute" />
              </div>
              <span>Skip</span>
            </button>
          </div>
        </div>
      )}

      {/* Eyebrow / Location */}
      <div
        ref={eyebrowRef}
        className={`relative z-10 pt-4 ${isMobile && introPlaying ? "hero-intro-hidden" : ""}`}
      >
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-3 bg-[#08090B]/75 backdrop-blur-md px-3.5 py-1.5 border border-white/10 shadow-lg">
            <Image
              src="/images/logo.png"
              alt="19 Hours Fitness Logo"
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
            <span className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-[#F5F5F5]/90 font-medium">
              {BRAND.eyebrow}
            </span>
          </div>
        </div>
      </div>

      {/* Main Massive Editorial Typography */}
      <div
        ref={textGroupRef}
        className={`relative z-10 my-auto will-change-transform ${isMobile && introPlaying ? "hero-intro-hidden" : ""}`}
      >
        <h1
          ref={headlineRef}
          className="font-display font-black tracking-tight text-huge leading-[0.85] text-[#F5F5F5] uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
        >
          <span className="block overflow-hidden">
            <span className="hero-line block text-[#F5F5F5]">19 HOURS</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block text-transparent [-webkit-text-stroke:1.5px_#F5F5F5] md:[-webkit-text-stroke:2.5px_#F5F5F5] hover:text-[#00E5FF] hover:[-webkit-text-stroke:0px] transition-colors duration-500">
              FITNESS.
            </span>
          </span>
        </h1>

        <p className="mt-6 md:mt-8 max-w-xl text-sm md:text-lg text-[#F5F5F5]/90 font-light tracking-wide leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          {BRAND.tagline} A sanctuary for athletic discipline, progressive strength, and high-performance living in Virar West.
        </p>
      </div>

      {/* Bottom Bar & Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className={`relative z-10 flex items-end justify-between border-t border-white/[0.08] pt-6 text-[11px] font-mono tracking-[0.25em] text-[#969BA3] ${isMobile && introPlaying ? "hero-intro-hidden" : ""}`}
      >
        <div className="hidden sm:block uppercase">
          STRENGTH · CROSSFIT · RECOVERY
        </div>

        <a
          href="#about"
          className="group inline-flex items-center gap-3 text-[#F5F5F5] hover:text-[#00E5FF] transition-colors"
        >
          <span>SCROLL</span>
          <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#00E5FF] transition-colors">
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </div>
        </a>

        <div className="hidden md:block text-right uppercase">
          VIRAR WEST, MH 401303
        </div>
      </div>
    </section>
  );
}
