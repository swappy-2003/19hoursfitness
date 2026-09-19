"use client";

import React from "react";
import { MapPin, Clock, MessageSquare, ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { BRAND } from "@/lib/constants";

export default function Location() {
  return (
    <section
      id="location"
      className="relative z-20 w-full lg:min-h-[70vh] bg-[#08090B] py-16 sm:py-20 md:py-28 lg:py-32 px-6 md:px-12 border-t border-white/[0.06] flex flex-col justify-center"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Massive Typography */}
          <div className="lg:col-span-6 space-y-6">
            <SectionLabel number="10" label="FACILITY LOCATION" />
            <h2 className="font-display font-bold text-huge text-[#F5F5F5] uppercase tracking-tight leading-[0.88]">
              FIND YOUR
              <span className="block text-transparent [-webkit-text-stroke:1.5px_#F5F5F5] md:[-webkit-text-stroke:2.5px_#F5F5F5]">
                PLACE.
              </span>
            </h2>

            <p className="max-w-md text-sm md:text-base text-[#969BA3] font-light leading-relaxed">
              Situated in the heart of Virar West along Viva College Road, engineered with ample parking, easy transit access, and dedicated training zones.
            </p>
          </div>

          {/* Right: Clean Editorial Address & Operating Card */}
          <div className="lg:col-span-6 space-y-8 bg-[#101216] border border-white/[0.08] p-8 md:p-12">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#00E5FF]">
                <MapPin className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-widest font-semibold">
                  OFFICIAL ADDRESS
                </span>
              </div>
              <p className="text-lg md:text-xl text-[#F5F5F5] font-light leading-snug">
                {BRAND.fullAddress}
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/[0.08]">
              <div className="flex items-center gap-3 text-[#00E5FF]">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-widest font-semibold">
                  OPERATING HOURS
                </span>
              </div>
              <p className="text-sm md:text-base text-[#F5F5F5] font-light leading-relaxed">
                {BRAND.hours}
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex flex-wrap gap-4">
              <a
                href={BRAND.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F5F5F5] hover:bg-[#00E5FF] text-[#08090B] font-bold text-xs uppercase tracking-[0.18em] transition-colors group"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-white/20 hover:border-[#00E5FF] text-[#F5F5F5] hover:text-[#00E5FF] font-bold text-xs uppercase tracking-[0.18em] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
