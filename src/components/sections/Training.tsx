"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { TRAINING_GOALS } from "@/lib/constants";

export default function Training() {
  const [activeGoalIndex, setActiveGoalIndex] = useState(0);

  const activeGoal = TRAINING_GOALS[activeGoalIndex];

  return (
    <section
      id="training"
      className="relative z-20 w-full lg:min-h-screen bg-[#08090B] py-16 sm:py-20 md:py-28 lg:py-32 px-6 md:px-12 border-t border-white/[0.06]"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16">
          <SectionLabel number="05" label="TRAINING DIRECTIVES" />
          <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl text-[#F5F5F5] uppercase tracking-tight">
            TRAIN WITH PURPOSE.
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Interactive Goals List */}
          <div className="lg:col-span-6 space-y-4">
            {TRAINING_GOALS.map((goal, index) => {
              const isActive = index === activeGoalIndex;
              return (
                <div
                  key={goal.id}
                  onMouseEnter={() => setActiveGoalIndex(index)}
                  onClick={() => setActiveGoalIndex(index)}
                  className={`group relative p-6 md:p-8 border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#101216] border-[#00E5FF]/40 shadow-[0_0_30px_rgba(0,229,255,0.06)]"
                      : "bg-transparent border-white/[0.06] hover:border-white/20 hover:bg-[#101216]/40"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] tracking-widest text-[#00E5FF] uppercase block mb-1">
                        PROGRAM 0{index + 1}
                      </span>
                      <h3
                        className={`font-display font-bold text-3xl md:text-4xl uppercase tracking-tight transition-colors ${
                          isActive ? "text-[#F5F5F5]" : "text-[#969BA3] group-hover:text-[#F5F5F5]"
                        }`}
                      >
                        {goal.title}
                      </h3>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isActive
                          ? "text-[#00E5FF] translate-x-1"
                          : "text-[#969BA3]/50 group-hover:translate-x-1 group-hover:text-[#F5F5F5]"
                      }`}
                    />
                  </div>

                  <p className="mt-3 text-sm text-[#969BA3] font-light leading-relaxed">
                    {goal.subtitle}
                  </p>

                  {/* Active Expand details */}
                  {isActive && (
                    <div className="mt-6 pt-6 border-t border-white/[0.08] space-y-4">
                      <p className="text-xs md:text-sm text-[#F5F5F5]/80 font-light leading-relaxed">
                        {goal.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {goal.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] px-2.5 py-1 bg-[#08090B] border border-white/10 text-[#969BA3] uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Image Preview */}
          <div className="lg:col-span-6 relative aspect-[4/5] w-full overflow-hidden border border-white/[0.08] bg-[#101216]">
            {TRAINING_GOALS.map((goal, index) => (
              <div
                key={goal.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  index === activeGoalIndex ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                }`}
              >
                <Image
                  src={goal.image}
                  alt={goal.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-xs font-mono tracking-widest text-[#F5F5F5]">
                  <span>{goal.title} DIRECTIVE</span>
                  <span className="text-[#00E5FF]">VIRAR WEST</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
