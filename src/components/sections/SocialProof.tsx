"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { REVIEWS } from "@/lib/constants";

export default function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const current = REVIEWS[currentIndex];

  return (
    <section
      id="reviews"
      className="relative z-20 w-full lg:min-h-[70vh] bg-[#08090B] py-16 sm:py-20 md:py-28 lg:py-32 px-6 md:px-12 border-t border-white/[0.06] flex flex-col justify-center"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <SectionLabel number="08" label="VERIFIED TESTIMONY" />
            <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl text-[#F5F5F5] uppercase tracking-tight">
              WHAT MEMBERS SAY.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prevReview}
              className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center text-[#F5F5F5] hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="w-12 h-12 rounded-none border border-white/10 flex items-center justify-center text-[#F5F5F5] hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Editorial Review Block */}
        <div className="relative p-8 md:p-16 bg-[#101216] border border-white/[0.08] max-w-4xl">
          <Quote className="w-12 h-12 text-[#00E5FF]/20 mb-8" />

          {/* Rating Stars */}
          <div className="flex items-center gap-1.5 mb-6">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#00E5FF] text-[#00E5FF]" />
            ))}
          </div>

          <blockquote className="text-xl md:text-3xl text-[#F5F5F5] font-light leading-snug tracking-tight">
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          <div className="mt-10 pt-8 border-t border-white/[0.08] flex items-center justify-between">
            <div>
              <span className="font-display font-bold text-lg text-[#F5F5F5] tracking-wide block">
                {current.author}
              </span>
              <span className="font-mono text-[11px] text-[#969BA3] uppercase tracking-widest">
                {current.source} · {current.tag}
              </span>
            </div>

            <div className="font-mono text-xs text-[#00E5FF] tracking-widest">
              0{currentIndex + 1} / 0{REVIEWS.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
