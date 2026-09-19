"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { BRAND } from "@/lib/constants";

export default function FinalCTA() {
  return (
    <section className="relative z-20 w-full lg:min-h-screen bg-[#08090B] flex items-center justify-center px-6 md:px-12 py-20 sm:py-24 md:py-32 border-t border-white/[0.06] overflow-hidden select-none">
      {/* Background Atmosphere Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta-bg.jpg"
          alt="19 Hours Fitness High-End Facility"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.25] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/60 to-[#08090B]" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#00E5FF] block">
          VIRAR WEST · STEP ONTO THE PLATFORM
        </span>

        <h2 className="font-display font-black text-huge text-[#F5F5F5] uppercase tracking-tight leading-[0.85]">
          READY
          <br />
          TO TRANSFORM?
        </h2>

        <p className="max-w-xl mx-auto text-base md:text-xl text-[#969BA3] font-light leading-relaxed">
          Your first session starts here. Claim your complimentary trial workout and experience the new standard of fitness in Virar West.
        </p>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-5">
          <MagneticButton strength={0.3}>
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#00E5FF] hover:bg-[#F5F5F5] text-[#08090B] font-bold text-xs md:text-sm uppercase tracking-[0.2em] transition-colors duration-300 group"
            >
              <span>Book a Free Trial</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-transparent border border-white/20 hover:border-[#00E5FF] text-[#F5F5F5] hover:text-[#00E5FF] font-bold text-xs md:text-sm uppercase tracking-[0.2em] transition-colors duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
