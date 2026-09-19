"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setComplete(true);
      return;
    }

    const container = containerRef.current;
    const text = textRef.current;
    const percentEl = percentRef.current;
    if (!container || !text || !percentEl) return;

    const progressObj = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        setComplete(true);
      },
    });

    // Fast ~1s total sequence
    tl.to(progressObj, {
      value: 100,
      duration: 0.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (percentEl) {
          percentEl.innerText = Math.round(progressObj.value).toString().padStart(2, "0");
        }
      },
    })
      .to(
        text,
        {
          yPercent: -100,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
        },
        "+=0.05"
      )
      .to(
        container,
        {
          yPercent: -100,
          duration: 0.6,
          ease: "expo.inOut",
        },
        "-=0.1"
      );

    return () => {
      tl.kill();
    };
  }, []);

  if (complete) return null;

  return (
    <aside
      ref={containerRef}
      aria-label="Loading page"
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-between bg-[#08090B] px-8 py-12 text-[#F5F5F5] select-none pointer-events-none will-change-transform"
    >
      <div className="flex w-full justify-between items-center text-xs font-mono tracking-widest text-[#969BA3]">
        <span>VIRAR WEST · MH</span>
        <span>EST. 19 HOURS</span>
      </div>

      <div className="overflow-hidden text-center flex flex-col items-center gap-4">
        <Image
          src="/images/logo.png"
          alt="19 Hours Fitness Logo"
          width={96}
          height={96}
          priority
          className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-[0_0_20px_rgba(0,178,254,0.3)]"
        />
        <h1
          ref={textRef}
          className="font-display text-huge font-bold tracking-tight leading-none text-[#F5F5F5]"
        >
          19 HOURS
        </h1>
      </div>

      <div className="flex w-full justify-between items-end">
        <div className="text-[10px] font-mono tracking-widest text-[#969BA3]">
          INITIALIZING EXPERIENCE
        </div>
        <div className="font-mono text-xl text-[#00E5FF] font-bold">
          <span ref={percentRef}>00</span>%
        </div>
      </div>
    </aside>
  );
}
