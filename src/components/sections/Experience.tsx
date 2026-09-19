"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import { EXPERIENCE_PANELS } from "@/lib/constants";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 1024;

    // On mobile or reduced motion, allow standard vertical scroll
    if (prefersReducedMotion || isMobile) return;

    const totalPanels = EXPERIENCE_PANELS.length;
    const scrollDistance = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${scrollDistance * 1.2}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-20 w-full bg-[#08090B] border-t border-white/[0.06]"
    >
      {/* Pinned Desktop Container / Fallback Mobile Container */}
      <div ref={triggerRef} className="relative w-full lg:h-screen overflow-visible lg:overflow-hidden flex flex-col justify-between py-24 lg:py-0">
        {/* Top Header Row on Desktop */}
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:pt-16 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SectionLabel number="02" label="THE EXPERIENCE" />
            <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl text-[#F5F5F5] tracking-tight uppercase">
              ENGINEERED FOR PROGRESS.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#969BA3] font-light leading-relaxed">
            Explore our specialized training ecosystems. Each zone is architected for maximum focus, safety, and athletic development.
          </p>
        </div>

        {/* Horizontal Track (Desktop: transforms X on scroll; Mobile: vertical stack) */}
        <div className="relative w-full lg:flex-1 lg:flex lg:items-center overflow-visible lg:overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-6 md:px-12 lg:px-16 w-full lg:w-max will-change-transform"
          >
            {EXPERIENCE_PANELS.map((panel) => (
              <div
                key={panel.number}
                className="group relative w-full lg:w-[480px] xl:w-[540px] flex-shrink-0 flex flex-col bg-[#101216] border border-white/[0.08] overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] overflow-hidden">
                  <Image
                    src={panel.image}
                    alt={panel.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101216] via-[#101216]/30 to-transparent" />
                  
                  {/* Badge Number */}
                  <div className="absolute top-6 left-6 font-mono text-sm tracking-widest text-[#00E5FF] font-semibold bg-[#08090B]/80 px-3 py-1 border border-white/10 backdrop-blur-sm">
                    {panel.number}
                  </div>
                </div>

                {/* Content Panel */}
                <div className="p-8 flex flex-col justify-between flex-1">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#00E5FF] block mb-2">
                      {panel.category}
                    </span>
                    <h3 className="font-display font-bold text-3xl md:text-4xl text-[#F5F5F5] uppercase tracking-tight">
                      {panel.title}
                    </h3>
                    <p className="mt-4 text-sm text-[#969BA3] font-light leading-relaxed">
                      {panel.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono tracking-widest text-[#969BA3] group-hover:text-[#F5F5F5] transition-colors">
                    <span>19 HOURS ZONE</span>
                    <span className="text-[#00E5FF]">VIRAR WEST →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom indicator on desktop */}
        <div className="hidden lg:flex max-w-[1440px] mx-auto w-full px-12 py-8 items-center justify-between text-xs font-mono tracking-widest text-[#969BA3] border-t border-white/[0.06]">
          <span>SCROLL HORIZONTALLY TO EXPLORE PANELS</span>
          <span className="text-[#00E5FF]">01 — 05 / COMPLETE ECOSYSTEM</span>
        </div>
      </div>
    </section>
  );
}
