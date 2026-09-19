"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, Volume2, VolumeX } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { BRAND } from "@/lib/constants";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Guarantee mobile video autoplay & loop
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Mobile video autoplay prevented:", err);
        });
      }
    }
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const imageWrapper = imageWrapperRef.current;
    const textGroup = textGroupRef.current;
    const headline = headlineRef.current;
    const eyebrow = eyebrowRef.current;
    if (!hero || !imageWrapper || !textGroup) return;

    const mobileCheck = window.innerWidth < 1024 || window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const phoneCheck = window.innerWidth < 768;
    setIsMobile(phoneCheck);

    // On desktop, intro is never active
    if (!phoneCheck) {
      setIsIntroActive(false);
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (mobileCheck || prefersReducedMotion) {
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

  const handleSkipIntro = () => {
    setIsIntroActive(false);
    // Mute video when entering standard website mode
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      onClick={isMobile && isIntroActive ? handleSkipIntro : undefined}
      className={`relative w-full h-screen overflow-hidden bg-[#08090B] flex flex-col justify-between px-6 md:px-12 pt-28 pb-12 select-none ${
        isMobile && isIntroActive ? "cursor-pointer" : ""
      }`}
    >
      {/* Background Media: Desktop Image / Mobile Video (with fallback poster) */}
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

        {/* Mobile Video (with realHero.png poster fallback) */}
        <video
          ref={videoRef}
          src="/images/Video-14356.mp4"
          poster="/images/realHero.png"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          onEnded={handleSkipIntro}
          className="block md:hidden w-full h-full object-cover brightness-[0.92] contrast-[1.05]"
        />

        {/* Soft Cinematic Vignette and Smooth Section Blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/25 to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090B]/60 via-transparent to-[#08090B]/30 pointer-events-none" />
      </div>

      {/* MOBILE VIDEO INTRO OVERLAY (Matches user screenshot: UNMUTE top right + TAP SCREEN TO SKIP bottom) */}
      {isMobile && isIntroActive && (
        <div className="absolute inset-0 z-30 flex flex-col justify-between p-6 pointer-events-auto">
          {/* Top Right: UNMUTE Pill Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={toggleSound}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="inline-flex items-center gap-2 bg-black/60 hover:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-[#F5F5F5] font-mono text-xs font-semibold tracking-wider uppercase active:scale-95 transition-all shadow-lg"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-white/80" />
                  <span>UNMUTE</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#00E5FF]" />
                  <span className="text-[#00E5FF]">MUTE</span>
                </>
              )}
            </button>
          </div>

          {/* Bottom Center: TAP SCREEN TO SKIP Pill Button */}
          <div className="flex justify-center pb-8">
            <button
              onClick={handleSkipIntro}
              className="bg-black/60 hover:bg-black/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/15 text-white/90 font-mono text-xs font-medium tracking-wider uppercase active:scale-95 transition-all shadow-lg"
            >
              TAP SCREEN TO SKIP
            </button>
          </div>
        </div>
      )}

      {/* Eyebrow / Location (Hidden during intro, smoothly reveals on skip) */}
      <div
        ref={eyebrowRef}
        className={`relative z-10 pt-4 transition-all duration-700 ${
          isMobile && isIntroActive ? "opacity-0 -translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
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

          {/* Sound Toggle on Mobile after entering normal site */}
          {isMobile && !isIntroActive && (
            <button
              onClick={toggleSound}
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

      {/* Main Massive Editorial Typography (Hidden during intro, smoothly reveals on skip) */}
      <div
        ref={textGroupRef}
        className={`relative z-10 my-auto will-change-transform transition-all duration-700 ${
          isMobile && isIntroActive ? "opacity-0 translate-y-6 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
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

      {/* Bottom Bar & Scroll Indicator (Hidden during intro, reveals on skip) */}
      <div
        ref={scrollIndicatorRef}
        className={`relative z-10 flex items-end justify-between border-t border-white/[0.08] pt-6 text-[11px] font-mono tracking-[0.25em] text-[#969BA3] transition-all duration-700 ${
          isMobile && isIntroActive ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
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
