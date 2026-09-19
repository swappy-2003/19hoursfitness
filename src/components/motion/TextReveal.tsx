"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: "lines" | "words";
  triggerOnScroll?: boolean;
}

export default function TextReveal({
  children,
  as: Component = "div",
  className,
  delay = 0,
  stagger = 0.08,
  splitBy = "words",
  triggerOnScroll = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".reveal-item");
    if (!items.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768 || window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (prefersReducedMotion || isMobile) {
      gsap.set(items, { yPercent: 0, opacity: 1 });
      return;
    }

    gsap.set(items, { yPercent: 110, opacity: 0 });

    const anim = gsap.to(items, {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      stagger,
      delay,
      ease: "power3.out",
      scrollTrigger: triggerOnScroll
        ? {
            trigger: container,
            start: "top 88%",
            toggleActions: "play none none none",
          }
        : undefined,
    });

    return () => {
      anim.kill();
      if (anim.scrollTrigger) {
        anim.scrollTrigger.kill();
      }
    };
  }, [delay, stagger, triggerOnScroll]);

  // Split content
  const tokens = splitBy === "words" ? children.split(" ") : children.split("\n");

  return (
    // @ts-expect-error dynamic component type
    <Component ref={containerRef} className={cn("overflow-hidden leading-tight", className)}>
      {tokens.map((token, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 align-top">
          <span className="reveal-item inline-block will-change-transform">
            {token}
            {splitBy === "words" && index < tokens.length - 1 ? "" : ""}
          </span>
        </span>
      ))}
    </Component>
  );
}
