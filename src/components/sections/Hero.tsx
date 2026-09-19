"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { BRAND } from "@/lib/constants";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const imageWrapper = imageWrapperRef.current;
    const textGroup = textGroupRef.current;
    const headline = headlineRef.current;
    const eyebrow = eyebrowRef.current;
    if (!hero || !imageWrapper || !textGroup) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Initial entrance animation
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

    if (prefersReducedMotion) return;

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

    // ScrollTrigger cinematic transition
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
      {/* Background Image Container with Gradient Overlay */}
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 z-0 will-change-transform pointer-events-none"
      >
        <Image
          src="/images/realHero.png"
          alt="19 Hours Fitness Facility in Virar West"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center brightness-[0.7] contrast-[1.15]"
        />
        {/* Cinematic Vignette and Dark Editorial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/40 to-[#08090B]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090B]/80 via-transparent to-[#08090B]/80" />
      </div>

      {/* Eyebrow / Location */}
      <div ref={eyebrowRef} className="relative z-10 pt-4 opacity-0">
        <div className="inline-flex items-center gap-3 bg-[#08090B]/60 backdrop-blur-sm px-3.5 py-1.5 border border-white/10">
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

      {/* Main Massive Editorial Typography */}
      <div ref={textGroupRef} className="relative z-10 my-auto will-change-transform">
        <h1
          ref={headlineRef}
          className="font-display font-black tracking-tight text-huge leading-[0.85] text-[#F5F5F5] uppercase"
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

        <p className="mt-6 md:mt-8 max-w-xl text-sm md:text-lg text-[#969BA3] font-light tracking-wide leading-relaxed">
          {BRAND.tagline} A sanctuary for athletic discipline, progressive strength, and high-performance living in Virar West.
        </p>
      </div>

      {/* Bottom Bar & Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-10 flex items-end justify-between border-t border-white/[0.08] pt-6 text-[11px] font-mono tracking-[0.25em] text-[#969BA3]"
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
