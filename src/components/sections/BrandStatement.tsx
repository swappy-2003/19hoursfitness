"use client";

import React from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import TextReveal from "@/components/motion/TextReveal";
import ImageReveal from "@/components/motion/ImageReveal";

export default function BrandStatement() {
  return (
    <section
      id="about"
      className="relative z-20 w-full lg:min-h-screen bg-[#08090B] py-16 sm:py-20 md:py-32 lg:py-48 px-6 md:px-12 flex flex-col justify-center border-t border-white/[0.06]"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Section Label */}
        <div className="mb-12 md:mb-16">
          <SectionLabel number="01" label="THE MINDSET" />
        </div>

        {/* Massive Editorial Headline */}
        <div className="max-w-5xl">
          <TextReveal
            as="h2"
            splitBy="words"
            className="font-display font-bold text-display-lg text-[#F5F5F5] uppercase tracking-tight leading-[0.92]"
          >
            DISCIPLINE CHANGES EVERYTHING.
          </TextReveal>
        </div>

        {/* Editorial Content + Supporting High-End Image */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Supporting Statement */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-[#F5F5F5] font-light leading-snug">
                19 Hours Fitness is built around consistent training, structured programs, and an environment designed to help people become stronger.
              </p>
              <p className="text-sm md:text-base text-[#969BA3] leading-relaxed font-light">
                We eliminate the superficial distractions of commercial gyms. Here, every rack, platform, and movement has an intentional purpose: elevating your physical output, fortifying mental resilience, and engineering sustainable transformations.
              </p>
            </div>

            <div className="pt-8 border-t border-white/[0.08] flex items-center gap-12 font-mono text-xs tracking-wider text-[#969BA3]">
              <div>
                <span className="block text-2xl md:text-3xl font-bold font-display text-[#00E5FF]">19</span>
                <span className="text-[10px] uppercase text-[#969BA3]/70">HOURS DEDICATION</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-bold font-display text-[#F5F5F5]">100%</span>
                <span className="text-[10px] uppercase text-[#969BA3]/70">DISCIPLINE DRIVEN</span>
              </div>
            </div>
          </div>

          {/* Large Striking Editorial Image */}
          <div className="lg:col-span-6">
            <ImageReveal
              src="/images/mindset.jpg"
              alt="Disciplined athlete preparing for heavy barbell lift"
              aspectRatio="4/3"
              className="aspect-[4/3] w-full border border-white/[0.08]"
              dataCursor="view"
            />
            <div className="mt-4 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#969BA3]">
              <span>FIGURE 01.1 — THE CHALK & IRON</span>
              <span>VIRAR WEST</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
