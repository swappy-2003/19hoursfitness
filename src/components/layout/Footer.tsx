import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative z-20 w-full bg-[#08090B] border-t border-white/[0.08] pt-20 pb-12 px-6 md:px-12 text-[#969BA3]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-16 border-b border-white/[0.08]">
          {/* Brand Info */}
          <div className="md:col-span-6 lg:col-span-4 space-y-6">
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
          <div className="md:col-span-3 lg:col-span-2 space-y-4">
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
          <div className="md:col-span-3 lg:col-span-2 space-y-4">
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
                  <span>Instagram</span>
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
                  <span>Google Maps</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>

          {/* Interactive Editorial Map Card (Zero iframe, 100% responsive, no scroll trapping) */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#F5F5F5] uppercase tracking-widest font-semibold block">
                LOCATION MAP
              </span>
              <a
                href={BRAND.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] text-[#00E5FF] hover:text-[#F5F5F5] transition-colors group"
              >
                <span>OPEN IN MAPS</span>
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <a
              href={BRAND.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full h-[220px] overflow-hidden border border-white/[0.1] hover:border-[#00E5FF]/40 bg-[#101216] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              aria-label="Open 19 Hours Fitness on Google Maps"
            >
              {/* Dark Architectural Map Graphic */}
              <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                <svg
                  className="w-full h-full object-cover"
                  viewBox="0 0 400 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="0" y1="140" x2="400" y2="140" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="0" y1="190" x2="400" y2="190" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                  <line x1="70" y1="0" x2="70" y2="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="160" y1="0" x2="160" y2="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="250" y1="0" x2="250" y2="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                  <line x1="340" y1="0" x2="340" y2="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                  {/* Main Roads */}
                  <path d="M-20 120 L180 110 L260 70 L420 50" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                  <path d="M200 -20 L200 240" stroke="#00E5FF" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.65" />
                  <path d="M120 -20 L160 240" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
                  <path d="M280 -20 L270 240" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
                </svg>
              </div>

              {/* Central Location Pin & Radar Pulse */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-12 h-12 rounded-full bg-[#00E5FF]/20 animate-ping pointer-events-none" />
                  <span className="relative w-7 h-7 rounded-full bg-[#08090B] border-2 border-[#00E5FF] flex items-center justify-center shadow-[0_0_15px_#00E5FF]">
                    <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
                  </span>
                </div>
                <div className="mt-2 bg-[#08090B]/90 backdrop-blur-md px-2.5 py-1 border border-white/10 shadow-lg whitespace-nowrap">
                  <span className="font-mono text-[10px] text-[#F5F5F5] font-semibold tracking-wider block">
                    19 HOURS FITNESS
                  </span>
                </div>
              </div>

              {/* Bottom Details Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono tracking-wider text-[#969BA3]">
                <span>VIVA COLLEGE RD, VIRAR WEST</span>
                <span className="text-[#00E5FF] font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>GET DIRECTIONS</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </a>
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
