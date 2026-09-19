"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { TRANSFORMATION_DATA, BRAND } from "@/lib/constants";
import { gsap } from "@/lib/gsap";

export default function Transformation() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Drag interaction
  const handleMove = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  // Scroll-based auto-reveal on first enter
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const animObj = { pos: 85 };
    const anim = gsap.to(animObj, {
      pos: 50,
      duration: 1.6,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        setSliderPosition(animObj.pos);
      },
    });

    return () => {
      anim.kill();
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="transformations"
      className="relative z-20 w-full min-h-screen bg-[#08090B] py-32 px-6 md:px-12 border-t border-white/[0.06]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <SectionLabel number="03" label="TRANSFORMATION" />
            <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl text-[#F5F5F5] uppercase tracking-tight">
              {TRANSFORMATION_DATA.title}
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#969BA3] font-light leading-relaxed">
            {TRANSFORMATION_DATA.subtitle} No shortcuts. Only measurable biological adaptations achieved inside our facility.
          </p>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div
          ref={containerRef}
          data-cursor-drag
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] max-h-[640px] overflow-hidden border border-white/[0.08] select-none cursor-ew-resize bg-[#101216]"
        >
          {/* AFTER Image (Full background) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={TRANSFORMATION_DATA.afterImage}
              alt="19 Hours Fitness Member Transformation After"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Label */}
            <div className="absolute top-6 right-6 z-10 bg-[#08090B]/85 backdrop-blur-sm px-4 py-1.5 border border-white/10 font-mono text-xs font-bold tracking-widest text-[#00E5FF]">
              AFTER · WEEK 16
            </div>
          </div>

          {/* BEFORE Image (Clipped overlay) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src={TRANSFORMATION_DATA.beforeImage}
              alt="19 Hours Fitness Member Transformation Before"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Label */}
            <div className="absolute top-6 left-6 z-10 bg-[#08090B]/85 backdrop-blur-sm px-4 py-1.5 border border-white/10 font-mono text-xs font-bold tracking-widest text-[#969BA3]">
              BEFORE · WEEK 01
            </div>
          </div>

          {/* Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[#00E5FF] shadow-[0_0_12px_#00E5FF] z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#08090B] border-2 border-[#00E5FF] flex items-center justify-center shadow-lg">
              <div className="w-2 h-2 rounded-full bg-[#00E5FF]" />
            </div>
          </div>
        </div>

        {/* Minimal Transformation Statistics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 border-t border-white/[0.08] items-center">
          {TRANSFORMATION_DATA.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="font-display font-bold text-3xl md:text-5xl text-[#F5F5F5] tracking-tight block">
                {stat.value}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#00E5FF]">
                {stat.label}
              </span>
            </div>
          ))}

          <div className="md:text-right">
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F5F5F5] hover:text-[#00E5FF] transition-colors group"
            >
              <span>View All Transformations</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
