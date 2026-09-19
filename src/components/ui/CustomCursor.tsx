"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch / mobile devices or small screens
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const isSmallScreen = window.innerWidth <= 800;
    if (isTouch || isSmallScreen) return;

    document.body.classList.add("has-custom-cursor");

    const cursor = cursorRef.current;
    if (!cursor) return;

    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Smooth lerp movement via GSAP ticker
    const updateCursor = () => {
      pos.x += (mouse.x - pos.x) * 0.2;
      pos.y += (mouse.y - pos.y) * 0.2;

      gsap.set(cursor, {
        x: pos.x,
        y: pos.y,
      });
    };

    gsap.ticker.add(updateCursor);

    // Event delegation for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const clickable = target.closest("a, button, [role='button'], .cursor-pointer");
      const dragArea = target.closest("[data-cursor-drag]");
      const viewArea = target.closest("[data-cursor-view]");

      if (dragArea) {
        setIsDrag(true);
        setIsHovered(true);
        setCursorText("DRAG");
      } else if (viewArea) {
        setIsDrag(false);
        setIsHovered(true);
        setCursorText("VIEW →");
      } else if (clickable) {
        setIsDrag(false);
        setIsHovered(true);
        setCursorText("");
      } else {
        setIsDrag(false);
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      gsap.ticker.remove(updateCursor);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ willChange: "transform" }}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-300 ${
          isDrag || cursorText
            ? "w-16 h-16 bg-[#00E5FF] text-[#08090B] font-bold text-[10px] tracking-wider uppercase scale-100 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
            : isHovered
            ? "w-10 h-10 bg-[#00E5FF]/20 border border-[#00E5FF] scale-125"
            : "w-3 h-3 bg-[#F5F5F5] scale-100"
        }`}
      >
        <span ref={cursorTextRef} className="select-none pointer-events-none">
          {cursorText}
        </span>
      </div>
    </div>
  );
}
