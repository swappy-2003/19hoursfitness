"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { TRAINERS, BRAND } from "@/lib/constants";

export default function Trainers() {
  return (
    <section
      id="trainers"
      className="relative z-20 w-full min-h-screen bg-[#08090B] py-32 px-6 md:px-12 border-t border-white/[0.06] flex flex-col justify-center"
    >
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <SectionLabel number="06" label="COACHING CADRE" />
            <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl text-[#F5F5F5] uppercase tracking-tight">
              THE COACHES.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#969BA3] font-light leading-relaxed">
            Our certified coaching cadre brings uncompromising discipline, biomechanical precision, and tailored periodization to every session in Virar West.
          </p>
        </div>

        {/* 6 Trainer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="group relative p-8 md:p-10 bg-[#101216] border border-white/[0.08] hover:border-[#00E5FF]/40 transition-all duration-300 flex flex-col justify-between min-h-[300px] overflow-hidden"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between font-mono text-xs tracking-widest text-[#969BA3] mb-8 pb-4 border-b border-white/[0.06]">
                  <span className="text-[#00E5FF] font-semibold">{trainer.number}</span>
                  <span className="uppercase text-[10px] text-[#969BA3]/70">VIRAR WEST COACH</span>
                </div>

                {/* Trainer Name in Bold Display Typography */}
                <h3 className="font-display font-bold text-3xl md:text-4xl text-[#F5F5F5] uppercase tracking-tight group-hover:text-[#00E5FF] transition-colors duration-300">
                  {trainer.name}
                </h3>

                <p className="mt-4 font-mono text-xs uppercase tracking-wider text-[#F5F5F5]/80 font-medium">
                  {trainer.role}
                </p>
                <p className="mt-1 text-xs text-[#969BA3] font-light">
                  {trainer.discipline}
                </p>
              </div>

              {/* Card Footer / Book 1-on-1 */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                <a
                  href={`${BRAND.whatsappUrl}&text=Hi%2019%20Hours%20Fitness%2C%20I%20would%20like%20to%20train%20with%20${encodeURIComponent(
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
          ))}
        </div>
      </div>
    </section>
  );
}
