"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, Volume2, VolumeX } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { BRAND } from "@/lib/constants";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isRevealed, setIsRevealed] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const heroRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check mobile & manage intro state with resize listener
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 800;
      setIsMobile(mobile);

      if (mobile) {
        // Skip intro if user already saw it this session or arrived via anchor hash (e.g., #contact)
        const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem("hero_intro_seen") === "true";
        const hasHash = typeof window !== "undefined" && Boolean(window.location.hash);

        if (alreadySeen || hasHash) {
          setIsRevealed(true);
          document.body.classList.remove("mobile-intro-active");
        } else {
          setIsRevealed(false);
          document.body.classList.add("mobile-intro-active");
        }
      } else {
        setIsRevealed(true);
        document.body.classList.remove("mobile-intro-active");
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      document.body.classList.remove("mobile-intro-active");
    };
  }, []);

  const handleReveal = () => {
    setIsRevealed(true);
    document.body.classList.remove("mobile-intro-active");
    try {
      sessionStorage.setItem("hero_intro_seen", "true");
    } catch { }

    // Switch video to muted ambient loop in the background
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.play().catch(() => { });
    }
  };

  const toggleSound = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Prevents triggering handleReveal
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  // Autoplay handler on mobile (plays both in intro and ambient loop)
  useEffect(() => {
    if (isMobile && videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If mobile browser policy blocks autoplay, reveal UI immediately
          handleReveal();
        });
      }
    }
  }, [isMobile, isRevealed]);

  // Safety fallback: Never leave user stuck on intro for more than 7 seconds
  useEffect(() => {
    if (isMobile && !isRevealed) {
      const timer = setTimeout(() => {
        handleReveal();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [isMobile, isRevealed]);

  // Desktop animations (mouse parallax and scrollTrigger - 100% untouched)
  useEffect(() => {
    const hero = heroRef.current;
    const imageWrapper = imageWrapperRef.current;
    const textGroup = textGroupRef.current;
    const headline = headlineRef.current;
    const eyebrow = eyebrowRef.current;
    if (!hero || !imageWrapper || !textGroup) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobileDevice = window.innerWidth < 1024 || window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (isMobileDevice || prefersReducedMotion) {
      gsap.set(imageWrapper, { scale: 1, opacity: 1 });
      gsap.set(eyebrow, { y: 0, opacity: 1 });
      gsap.set(headline?.querySelectorAll(".hero-line") ?? [], { yPercent: 0, opacity: 1 });
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

        {/* Mobile-only video */}
        <video
          ref={videoRef}
          src="/images/experience/Video-14356.mp4"
          className="hero-media__mobile-video"
          playsInline
          autoPlay
          muted={isMuted}
          loop={isRevealed}
          onEnded={handleReveal}
          preload="auto"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/25 to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090B]/60 via-transparent to-[#08090B]/30 pointer-events-none" />
      </div>

      {/* Mobile Intro Overlay (visible only before user interacts / video ends) */}
      {isMobile && !isRevealed && (
        <div
          className="hero-mobile-intro-overlay"
          onClick={handleReveal}
          onTouchEnd={handleReveal}
          role="button"
          tabIndex={0}
          aria-label="Tap screen to enter site"
        >
          <button
            type="button"
            className="hero-mobile-sound-btn"
            onClick={toggleSound}
            onTouchEnd={toggleSound}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{isMuted ? "Unmute" : "Sound On"}</span>
          </button>

          <div className="hero-mobile-skip-hint">
            <span>Tap screen to skip</span>
          </div>
        </div>
      )}

      {/* Eyebrow / Location */}
      <div ref={eyebrowRef} className="hero-content relative z-10 pt-4">
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

          {/* Sound Toggle on Mobile when revealed */}
          {isMobile && isRevealed && (
            <button
              onClick={toggleSound}
              onTouchEnd={toggleSound}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="inline-flex items-center gap-1.5 bg-[#08090B]/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[#F5F5F5] font-mono text-[10px] tracking-wider uppercase active:scale-95 transition-all"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3 h-3 text-[#969BA3]" />
                  <span>UNMUTE</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3 h-3 text-[#00E5FF]" />
                  <span className="text-[#00E5FF]">SOUND ON</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Massive Editorial Typography */}
      <div ref={textGroupRef} className="hero-content relative z-10 my-auto will-change-transform">
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
        className="hero-bottom relative z-10 flex items-end justify-between border-t border-white/[0.08] pt-6 text-[11px] font-mono tracking-[0.25em] text-[#969BA3]"
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
