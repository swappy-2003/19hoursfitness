"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  aspectRatio?: string;
  sizes?: string;
  clipDirection?: "vertical" | "horizontal" | "circle";
  dataCursor?: "view" | "drag";
}

export default function ImageReveal({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  clipDirection = "vertical",
  dataCursor,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imageRef.current;
    if (!container || !img) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Initial clip state
    const initialClip =
      clipDirection === "vertical"
        ? "inset(100% 0% 0% 0%)"
        : clipDirection === "horizontal"
        ? "inset(0% 100% 0% 0%)"
        : "circle(0% at 50% 50%)";

    const finalClip =
      clipDirection === "circle" ? "circle(100% at 50% 50%)" : "inset(0% 0% 0% 0%)";

    gsap.set(container, { clipPath: initialClip });
    gsap.set(img, { scale: 1.15 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.to(container, {
      clipPath: finalClip,
      duration: 1.2,
      ease: "power3.inOut",
    }).to(
      img,
      {
        scale: 1,
        duration: 1.4,
        ease: "power2.out",
      },
      "-=1.0"
    );

    return () => {
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [clipDirection]);

  return (
    <div
      ref={containerRef}
      data-cursor-view={dataCursor === "view" ? true : undefined}
      data-cursor-drag={dataCursor === "drag" ? true : undefined}
      className={cn("relative overflow-hidden bg-[#101216]", className)}
      style={{ willChange: "clip-path" }}
    >
      <div ref={imageRef as unknown as React.RefObject<HTMLDivElement>} className="relative w-full h-full will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover object-center", imageClassName)}
        />
      </div>
    </div>
  );
}
