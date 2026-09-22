"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play, Pause } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { INSTAGRAM_POSTS, BRAND } from "@/lib/constants";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function InstagramStrip() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      id="community"
      className="relative z-20 w-full bg-[#08090B] py-20 sm:py-28 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <SectionLabel number="09" label="COMMUNITY CULTURE" />
          <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl text-[#F5F5F5] uppercase tracking-tight">
            FOLLOW THE JOURNEY.
          </h2>
        </div>

        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          {/* Marquee Play/Pause Toggle */}
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-[#101216] font-mono text-[10px] uppercase tracking-wider text-[#969BA3] hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-colors cursor-pointer"
            aria-label={isPaused ? "Resume marquee motion" : "Pause marquee motion"}
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3 fill-current text-[#00E5FF]" />
                <span>RESUME MOTION</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 fill-current text-[#00E5FF]" />
                <span>PAUSE MOTION</span>
              </>
            )}
          </button>

          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#00E5FF] hover:text-[#F5F5F5] transition-colors group"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>{BRAND.instagramHandle}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden group/marquee">
        {/* Ambient Edge Gradient Vignettes */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-20 md:w-32 bg-gradient-to-r from-[#08090B] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-20 md:w-32 bg-gradient-to-l from-[#08090B] to-transparent z-10" />

        {/* Moving Track */}
        <div className={`flex flex-row flex-nowrap w-max animate-marquee-slow ${isPaused ? "is-paused" : ""}`}>
          {/* First Set of Posts */}
          <div className="flex gap-4 md:gap-6 pr-4 md:pr-6 flex-shrink-0">
            {INSTAGRAM_POSTS.map((post, idx) => (
              <a
                key={`post-a-${idx}`}
                href={post.url || BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-shrink-0 w-[260px] md:w-[310px] aspect-[4/5] overflow-hidden bg-[#101216] border border-white/[0.08] transition-all duration-300 hover:border-[#00E5FF]/50"
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 768px) 260px, 310px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Ambient Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/95 via-[#08090B]/25 to-transparent pointer-events-none" />

                {/* Top Tag & Reel Indicator */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-[#08090B]/75 backdrop-blur-sm border border-white/10 text-[#00E5FF]">
                    {post.tag}
                  </span>
                  {post.type === "reel" ? (
                    <span className="w-6 h-6 rounded-full bg-[#08090B]/75 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#00E5FF]">
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-full bg-[#08090B]/75 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#F5F5F5]">
                      <InstagramIcon className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs md:text-sm font-display font-medium text-[#F5F5F5] line-clamp-2 leading-snug group-hover:text-[#00E5FF] transition-colors">
                    {post.title}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#969BA3] uppercase">
                    <span>{post.type === "reel" ? "WATCH REEL" : "VIEW POST"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#00E5FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Second Duplicate Set for Seamless Loop */}
          <div className="flex gap-4 md:gap-6 pr-4 md:pr-6 flex-shrink-0" aria-hidden="true">
            {INSTAGRAM_POSTS.map((post, idx) => (
              <a
                key={`post-b-${idx}`}
                href={post.url || BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                className="group relative flex-shrink-0 w-[260px] md:w-[310px] aspect-[4/5] overflow-hidden bg-[#101216] border border-white/[0.08] transition-all duration-300 hover:border-[#00E5FF]/50"
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 768px) 260px, 310px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Ambient Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/95 via-[#08090B]/25 to-transparent pointer-events-none" />

                {/* Top Tag & Reel Indicator */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-[#08090B]/75 backdrop-blur-sm border border-white/10 text-[#00E5FF]">
                    {post.tag}
                  </span>
                  {post.type === "reel" ? (
                    <span className="w-6 h-6 rounded-full bg-[#08090B]/75 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#00E5FF]">
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-full bg-[#08090B]/75 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#F5F5F5]">
                      <InstagramIcon className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs md:text-sm font-display font-medium text-[#F5F5F5] line-clamp-2 leading-snug group-hover:text-[#00E5FF] transition-colors">
                    {post.title}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#969BA3] uppercase">
                    <span>{post.type === "reel" ? "WATCH REEL" : "VIEW POST"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#00E5FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
