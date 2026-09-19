"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { INSTAGRAM_POSTS, BRAND } from "@/lib/constants";

export default function InstagramStrip() {
  return (
    <section
      id="community"
      className="relative z-20 w-full bg-[#08090B] py-28 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <SectionLabel number="09" label="COMMUNITY CULTURE" />
          <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl text-[#F5F5F5] uppercase tracking-tight">
            FOLLOW THE JOURNEY.
          </h2>
        </div>

        <a
          href={BRAND.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00E5FF] hover:text-[#F5F5F5] transition-colors group"
        >
          <span>{BRAND.instagramHandle}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Horizontal Strip */}
      <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar px-6 md:px-12 pb-4">
        {INSTAGRAM_POSTS.map((post, idx) => (
          <a
            key={idx}
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-shrink-0 w-[240px] md:w-[300px] aspect-square overflow-hidden bg-[#101216] border border-white/[0.08]"
          >
            <Image
              src={post.src}
              alt={post.alt}
              fill
              sizes="(max-width: 768px) 240px, 300px"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#08090B]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="font-mono text-xs text-[#00E5FF] tracking-widest uppercase flex items-center gap-1.5">
                <span>VIEW POST</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
