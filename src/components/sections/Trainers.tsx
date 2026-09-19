"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { TRAINERS, BRAND } from "@/lib/constants";

export default function Trainers() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    // Estimate active index based on scroll position
    const card = slider.firstElementChild as HTMLElement;
    if (card) {
      const cardWidth = card.offsetWidth + 24; // width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, TRAINERS.length - 1));
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    checkScroll();
    slider.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      slider.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.firstElementChild as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 24 : 360;

    slider.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="trainers"
      className="relative z-20 w-full lg:min-h-screen bg-[#08090B] py-16 sm:py-20 md:py-28 lg:py-32 px-6 md:px-12 border-t border-white/[0.06] flex flex-col justify-center"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Header with Title and Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <SectionLabel number="06" label="COACHING CADRE" />
            <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl text-[#F5F5F5] uppercase tracking-tight">
              THE COACHES.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="max-w-md text-sm text-[#969BA3] font-light leading-relaxed">
              Our certified coaching cadre brings uncompromising discipline, biomechanical precision, and tailored periodization to every session in Virar West.
            </p>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
              <button
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous trainer"
                className={`w-11 h-11 border transition-all flex items-center justify-center ${
                  canScrollLeft
                    ? "border-white/20 text-[#F5F5F5] hover:border-[#00E5FF] hover:text-[#00E5FF] active:scale-95"
                    : "border-white/[0.06] text-[#969BA3]/30 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Next trainer"
                className={`w-11 h-11 border transition-all flex items-center justify-center ${
                  canScrollRight
                    ? "border-white/20 text-[#F5F5F5] hover:border-[#00E5FF] hover:text-[#00E5FF] active:scale-95"
                    : "border-white/[0.06] text-[#969BA3]/30 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Swiper / Slider Container:
            - Desktop (lg:): Exactly 3 cards visible per viewport (w-[calc((100%-3rem)/3)])
            - Tablet (md:): 2 cards visible per viewport (w-[calc((100%-1.5rem)/2)])
            - Mobile (< md:): 1 card with peek (w-[85vw] / max-w-[340px])
        */}
        <div className="relative w-full">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4 pt-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {TRAINERS.map((trainer, index) => (
              <div
                key={trainer.id}
                className="group relative flex-none w-[85vw] sm:w-[340px] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] snap-start flex flex-col bg-[#101216] border border-white/[0.08] hover:border-[#00E5FF]/40 transition-all duration-300 overflow-hidden"
              >
                {/* Subtle Ambient Hover Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Trainer Photo Card */}
                <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden bg-[#14171d]">
                  <Image
                    src={trainer.image}
                    alt={`${trainer.name} - 19 Hours Fitness Coach`}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101216] via-[#101216]/30 to-transparent" />

                  {/* Top Coach Number Badge */}
                  <div className="absolute top-4 left-4 font-mono text-xs tracking-widest text-[#00E5FF] font-semibold bg-[#08090B]/85 backdrop-blur-md px-3 py-1 border border-white/10">
                    {trainer.number}
                  </div>

                  {/* Location Tag */}
                  <div className="absolute top-4 right-4 font-mono text-[10px] tracking-wider text-[#F5F5F5]/80 uppercase bg-[#08090B]/85 backdrop-blur-md px-2.5 py-1 border border-white/10">
                    VIRAR WEST
                  </div>
                </div>

                {/* Trainer Details */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    {/* Trainer Name in Bold Display Typography */}
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-[#F5F5F5] uppercase tracking-tight group-hover:text-[#00E5FF] transition-colors duration-300">
                      {trainer.name}
                    </h3>

                    <p className="mt-2 font-mono text-xs uppercase tracking-wider text-[#00E5FF] font-medium">
                      {trainer.role}
                    </p>
                    <p className="mt-1 text-xs text-[#969BA3] font-light leading-relaxed">
                      {trainer.discipline}
                    </p>
                  </div>

                  {/* Card Footer / Direct WhatsApp 1-on-1 */}
                  <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                    <a
                      href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%2019%20Hours%20Fitness%2C%20I%20would%20like%20to%20train%20with%20${encodeURIComponent(
                        trainer.name
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#969BA3] group-hover:text-[#F5F5F5] transition-colors"
                    >
                      <span>REQUEST 1-ON-1</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#00E5FF] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>

                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#00E5FF] group-hover:shadow-[0_0_8px_#00E5FF] transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Progress / Index Indicator */}
          <div className="mt-6 flex items-center justify-between text-xs font-mono tracking-widest text-[#969BA3]">
            <div className="flex items-center gap-2">
              <span className="text-[#00E5FF]">
                0{activeIndex + 1}
              </span>
              <span>/</span>
              <span>0{TRAINERS.length} COACHES</span>
            </div>

            <span className="hidden sm:inline text-[11px] text-[#969BA3]/60 uppercase">
              DRAG OR USE ARROWS TO BROWSE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
