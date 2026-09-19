"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function TypographicBreak() {
  const containerRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!container || !line1 || !line2) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.set([line1, line2], { yPercent: 120, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.to(line1, {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power4.out",
    }).to(
      line2,
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power4.out",
      },
      "-=0.8"
    );

    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full min-h-[70vh] md:min-h-[85vh] bg-[#08090B] flex flex-col justify-center items-center px-6 md:px-12 py-24 border-t border-white/[0.06] select-none"
    >
      <div className="max-w-5xl text-center space-y-4">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00E5FF] block mb-4">
          04 / MANIFESTO
        </span>

        <h2 className="font-display font-black text-huge text-[#F5F5F5] uppercase tracking-tight leading-[0.88]">
          <span className="block overflow-hidden">
            <span ref={line1Ref} className="block will-change-transform">
              STRONGER
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              ref={line2Ref}
              className="block will-change-transform text-transparent [-webkit-text-stroke:1.5px_#F5F5F5] md:[-webkit-text-stroke:2.5px_#F5F5F5]"
            >
              IS BUILT.
            </span>
          </span>
        </h2>

        <p className="mt-8 max-w-lg mx-auto text-sm md:text-base text-[#969BA3] font-light leading-relaxed">
          Not through coincidence, but through unrelenting reps in the dark when nobody is watching.
        </p>
      </div>
    </section>
  );
}
