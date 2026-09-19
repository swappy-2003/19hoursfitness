"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menu, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.6,
        ease: "power3.inOut",
      });
      gsap.fromTo(
        menu.querySelectorAll(".mobile-nav-link"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.2,
          ease: "power3.out",
        }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menu, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#08090B]/85 backdrop-blur-md border-b border-white/[0.08] py-4"
            : "bg-transparent py-7"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group inline-flex items-center gap-3.5">
            <Image
              src="/images/logo.png"
              alt="19 Hours Fitness Logo"
              width={48}
              height={48}
              priority
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display font-black text-lg md:text-xl tracking-wider text-[#F5F5F5] leading-none">
                19 HOURS
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#00E5FF] uppercase font-semibold mt-0.5">
                FITNESS CLUB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            ref={navLinksRef}
            className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-[0.15em] uppercase text-[#969BA3]"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative py-1 transition-colors duration-200 hover:text-[#F5F5F5] group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00E5FF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <MagneticButton strength={0.25}>
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-[#F5F5F5] hover:bg-[#00E5FF] text-[#08090B] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 group"
              >
                <span>Book a Trial</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#F5F5F5] hover:text-[#00E5FF] transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Drawer */}
      <div
        ref={mobileMenuRef}
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        className="fixed inset-0 z-40 bg-[#08090B] flex flex-col justify-between px-8 pt-32 pb-12 lg:hidden text-[#F5F5F5]"
      >
        <div className="flex flex-col gap-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00E5FF]">
            Menu
          </span>
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="mobile-nav-link font-display text-4xl uppercase tracking-tight hover:text-[#00E5FF] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-8">
          <div className="text-xs text-[#969BA3] leading-relaxed">
            <p className="text-[#F5F5F5] font-semibold">{BRAND.name}</p>
            <p>{BRAND.location}</p>
          </div>
          <a
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center gap-2 py-4 bg-[#00E5FF] text-[#08090B] font-bold text-xs uppercase tracking-[0.2em]"
          >
            <span>Book a Trial Session</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
}
