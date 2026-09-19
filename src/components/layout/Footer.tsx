import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative z-20 w-full bg-[#08090B] border-t border-white/[0.08] pt-20 pb-12 px-6 md:px-12 text-[#969BA3]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt="19 Hours Fitness Logo"
                width={56}
                height={56}
                className="h-12 md:h-14 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl tracking-wider text-[#F5F5F5] leading-none">
                  19 HOURS
                </span>
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#00E5FF] uppercase font-semibold mt-1">
                  FITNESS CLUB
                </span>
              </div>
            </Link>
            <p className="text-sm font-light text-[#969BA3] max-w-sm leading-relaxed">
              {BRAND.tagline} Where athletic performance, intentional coaching, and disciplined lifestyle converge in Virar West.
            </p>
            <div className="font-mono text-xs text-[#00E5FF] tracking-widest">
              VIRAR WEST · MAHARASHTRA 401303
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-xs text-[#F5F5F5] uppercase tracking-widest font-semibold block">
              NAVIGATION
            </span>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#00E5FF] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-xs text-[#F5F5F5] uppercase tracking-widest font-semibold block">
              CONNECT
            </span>
            <ul className="space-y-3 text-xs tracking-wider uppercase">
              <li>
                <a
                  href={BRAND.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#00E5FF] transition-colors group"
                >
                  <span>WhatsApp Direct</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#00E5FF] transition-colors group"
                >
                  <span>Instagram {BRAND.instagramHandle}</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href={BRAND.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#00E5FF] transition-colors group"
                >
                  <span>Google Maps Directions</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & NAP */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono tracking-widest text-[#969BA3]/60">
          <div>
            © {new Date().getFullYear()} 19 HOURS FITNESS. ALL RIGHTS RESERVED.
          </div>
          <div>
            PLOT NO. 201–202, VARKHANA BHAVAN, VIVA COLLEGE RD, VIRAR WEST
          </div>
        </div>
      </div>
    </footer>
  );
}
