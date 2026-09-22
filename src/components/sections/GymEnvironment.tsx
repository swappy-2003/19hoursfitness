"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import { GALLERY_IMAGES } from "@/lib/constants";

export default function GymEnvironment() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const parallaxItems = section.querySelectorAll(".parallax-image");

    parallaxItems.forEach((item, index) => {
      const speed = (index % 2 === 0 ? 1 : -1) * 35;
      gsap.to(item, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative z-20 w-full lg:min-h-screen bg-[#08090B] py-16 sm:py-20 md:py-28 lg:py-32 px-6 md:px-12 border-t border-white/[0.06]"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <SectionLabel number="06" label="THE SANCTUARY" />
            <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl text-[#F5F5F5] uppercase tracking-tight">
              GYM ENVIRONMENT.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#969BA3] font-light leading-relaxed">
            Architected for deep concentration and peak output. Dark matte surfaces, focused spotlighting, and zero visual chaos.
          </p>
        </div>

        {/* Asymmetrical Editorial Gallery Layout */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Main Large Visual - Functional & CrossFit Arena */}
          <div className="col-span-12 lg:col-span-8 relative aspect-[16/10] overflow-hidden border border-white/[0.08] bg-[#101216] group transition-colors duration-500 hover:border-[#00E5FF]/40">
            <div className="parallax-image relative w-full h-[115%] -top-[7%]">
              <Image
                src={GALLERY_IMAGES[0].src}
                alt={GALLERY_IMAGES[0].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/90 via-[#08090B]/20 to-transparent" />
            </div>
            <div className="absolute top-4 left-4 md:top-6 md:left-6">
              <span className="px-2.5 py-1 text-[10px] md:text-xs font-mono tracking-widest uppercase bg-[#08090B]/70 backdrop-blur-sm border border-white/10 text-[#00E5FF]">
                {GALLERY_IMAGES[0].tag}
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-xs md:text-sm font-mono tracking-widest text-[#F5F5F5]">
              <span className="font-semibold">{GALLERY_IMAGES[0].caption}</span>
              <span className="text-[#00E5FF] hidden sm:inline">{GALLERY_IMAGES[0].location}</span>
            </div>
          </div>

          {/* Right Stacked Visuals - Dumbbells & Olympic Platform */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 md:gap-8">
            <div className="relative aspect-[4/3] overflow-hidden border border-white/[0.08] bg-[#101216] group transition-colors duration-500 hover:border-[#00E5FF]/40">
              <div className="parallax-image relative w-full h-[115%] -top-[7%]">
                <Image
                  src={GALLERY_IMAGES[1].src}
                  alt={GALLERY_IMAGES[1].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/90 via-[#08090B]/10 to-transparent" />
              </div>
              <div className="absolute top-3 left-3">
                <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-[#08090B]/70 backdrop-blur-sm border border-white/10 text-[#00E5FF]">
                  {GALLERY_IMAGES[1].tag}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[11px] md:text-xs font-mono tracking-widest text-[#F5F5F5]">
                <span>{GALLERY_IMAGES[1].caption}</span>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden border border-white/[0.08] bg-[#101216] group transition-colors duration-500 hover:border-[#00E5FF]/40">
              <div className="parallax-image relative w-full h-[115%] -top-[7%]">
                <Image
                  src={GALLERY_IMAGES[2].src}
                  alt={GALLERY_IMAGES[2].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/90 via-[#08090B]/10 to-transparent" />
              </div>
              <div className="absolute top-3 left-3">
                <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-[#08090B]/70 backdrop-blur-sm border border-white/10 text-[#00E5FF]">
                  {GALLERY_IMAGES[2].tag}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[11px] md:text-xs font-mono tracking-widest text-[#F5F5F5]">
                <span>{GALLERY_IMAGES[2].caption}</span>
              </div>
            </div>
          </div>

          {/* Middle Three Specialized Stations */}
          <div className="col-span-12 md:col-span-4 relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden border border-white/[0.08] bg-[#101216] group transition-colors duration-500 hover:border-[#00E5FF]/40">
            <div className="parallax-image relative w-full h-[115%] -top-[7%]">
              <Image
                src={GALLERY_IMAGES[3].src}
                alt={GALLERY_IMAGES[3].alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/90 via-[#08090B]/10 to-transparent" />
            </div>
            <div className="absolute top-3 left-3">
              <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-[#08090B]/70 backdrop-blur-sm border border-white/10 text-[#00E5FF]">
                {GALLERY_IMAGES[3].tag}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-xs font-mono tracking-widest text-[#F5F5F5]">
              <span>{GALLERY_IMAGES[3].caption}</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden border border-white/[0.08] bg-[#101216] group transition-colors duration-500 hover:border-[#00E5FF]/40">
            <div className="parallax-image relative w-full h-[115%] -top-[7%]">
              <Image
                src={GALLERY_IMAGES[4].src}
                alt={GALLERY_IMAGES[4].alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/90 via-[#08090B]/10 to-transparent" />
            </div>
            <div className="absolute top-3 left-3">
              <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-[#08090B]/70 backdrop-blur-sm border border-white/10 text-[#00E5FF]">
                {GALLERY_IMAGES[4].tag}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-xs font-mono tracking-widest text-[#F5F5F5]">
              <span>{GALLERY_IMAGES[4].caption}</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden border border-white/[0.08] bg-[#101216] group transition-colors duration-500 hover:border-[#00E5FF]/40">
            <div className="parallax-image relative w-full h-[115%] -top-[7%]">
              <Image
                src={GALLERY_IMAGES[5].src}
                alt={GALLERY_IMAGES[5].alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/90 via-[#08090B]/10 to-transparent" />
            </div>
            <div className="absolute top-3 left-3">
              <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-[#08090B]/70 backdrop-blur-sm border border-white/10 text-[#00E5FF]">
                {GALLERY_IMAGES[5].tag}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-xs font-mono tracking-widest text-[#F5F5F5]">
              <span>{GALLERY_IMAGES[5].caption}</span>
            </div>
          </div>

          {/* Bottom Panoramic Visual - Member Lounge & Consultation */}
          <div className="col-span-12 relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] overflow-hidden border border-white/[0.08] bg-[#101216] group transition-colors duration-500 hover:border-[#00E5FF]/40">
            <div className="parallax-image relative w-full h-[115%] -top-[7%]">
              <Image
                src={GALLERY_IMAGES[6].src}
                alt={GALLERY_IMAGES[6].alt}
                fill
                sizes="100vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/90 via-[#08090B]/20 to-transparent" />
            </div>
            <div className="absolute top-4 left-4 md:top-6 md:left-6">
              <span className="px-2.5 py-1 text-[10px] md:text-xs font-mono tracking-widest uppercase bg-[#08090B]/70 backdrop-blur-sm border border-white/10 text-[#00E5FF]">
                {GALLERY_IMAGES[6].tag}
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-xs md:text-sm font-mono tracking-widest text-[#F5F5F5]">
              <span className="font-semibold">{GALLERY_IMAGES[6].caption}</span>
              <span className="text-[#00E5FF]">{GALLERY_IMAGES[6].location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
