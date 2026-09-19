"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { BRAND } from "@/lib/constants";
import MagneticButton from "./MagneticButton";
import { useVideoIntro } from "@/contexts/VideoIntroContext";

export default function FloatingActions() {
  const { introPlaying } = useVideoIntro();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`floating-actions fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none transition-opacity duration-700 ${
      introPlaying ? "floating-intro-hidden" : "opacity-100"
    }`}>
      {/* Back to Top Button */}
      <div
        className={`pointer-events-auto transition-all duration-500 ease-out ${
          showBackToTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <MagneticButton strength={0.25}>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group relative flex items-center justify-center w-12 h-12 bg-[#101216]/90 hover:bg-[#00E5FF] text-[#F5F5F5] hover:text-[#08090B] border border-white/15 hover:border-[#00E5FF] backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="sr-only">Back to top</span>
          </button>
        </MagneticButton>
      </div>

      {/* WhatsApp Floating Action Button */}
      <div className="pointer-events-auto">
        <MagneticButton strength={0.3}>
          <a
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#101216]/95 hover:bg-[#25D366] text-[#25D366] hover:text-[#08090B] border border-[#25D366]/40 hover:border-[#25D366] backdrop-blur-md transition-all duration-300 shadow-[0_0_25px_rgba(37,211,102,0.25)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)]"
          >
            {/* WhatsApp SVG Icon */}
            <svg
              className="w-6 h-6 md:w-7 md:h-7 fill-current transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.101-.475-.15-.676.15-.2.301-.776.978-.951 1.178-.175.2-.35.225-.651.075-.3-.15-1.267-.467-2.413-1.489-.893-.795-1.496-1.777-1.671-2.078-.176-.3-.019-.462.131-.611.136-.135.301-.35.451-.525.15-.176.2-.3.301-.5.101-.2.051-.376-.025-.526-.075-.15-.676-1.63-.927-2.233-.244-.588-.493-.508-.676-.518-.175-.008-.376-.01-.577-.01-.201 0-.526.075-.802.376-.275.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.909 1.228 3.109.15.2 2.119 3.235 5.133 4.538.717.31 1.277.495 1.713.633.72.229 1.375.197 1.893.12.578-.087 1.78-.727 2.031-1.429.251-.702.251-1.304.175-1.429-.075-.125-.275-.2-.576-.35zm-5.46 7.427h-.006a9.88 9.88 0 01-5.034-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.448 4.434-9.88 9.887-9.88 2.64 0 5.12 1.03 6.985 2.894a9.825 9.825 0 012.89 6.984c0 5.45-4.436 9.882-9.876 9.882zM12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.185 1.603 6.007L0 24l6.168-1.618A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
            </svg>

            {/* Desktop Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-[#08090B] border border-white/10 text-white font-mono text-[10px] tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 hidden md:block">
              Chat on WhatsApp
            </span>
          </a>
        </MagneticButton>
      </div>
    </div>
  );
}
