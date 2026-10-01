import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Award, Clock, ExternalLink, ShieldCheck, Sparkles, Crown } from "lucide-react";
import { TRAINERS, BRAND } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

type Props = {
  params: Promise<{ id: string }>;
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://19hoursfitness.vercel.app");

// Generate static routes for all trainers
export async function generateStaticParams() {
  return TRAINERS.map((trainer) => ({
    id: trainer.id,
  }));
}

// Dynamic SEO & WhatsApp-compatible OpenGraph metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const trainer = TRAINERS.find((t) => t.id === id);

  if (!trainer) {
    return {
      title: "Coach Profile | 19 Hours Fitness Virar West",
      description: "Elite personal trainer and strength coach at 19 Hours Fitness, Virar West.",
    };
  }

  // Direct trainer portrait image for OpenGraph & WhatsApp preview (< 80KB)
  const ogImageUrl = `${siteUrl}${trainer.ogImage || trainer.ogPhoto || `/images/trainers/og/${trainer.id}.jpg` || trainer.image}`;

  const title = trainer.isOwner
    ? `${trainer.name} | Founder & Owner · 19 Hours Fitness`
    : `${trainer.name} | Coach ${trainer.number} · 19 Hours Fitness`;

  const description = trainer.isOwner
    ? `Founder and Owner of 19 Hours Fitness, ${trainer.name} leads Virar West's premier athletic club, specializing in ${trainer.discipline}.`
    : `${trainer.name} is an elite ${trainer.role} specializing in ${trainer.discipline} at 19 Hours Fitness in Virar West.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/trainers/${trainer.id}`,
    },
    openGraph: {
      title: `${trainer.name} · ${trainer.isOwner ? "Founder & Owner" : trainer.role} | 19 Hours Fitness`,
      description: trainer.quote ?? trainer.discipline,
      url: `${siteUrl}/trainers/${trainer.id}`,
      siteName: "19 Hours Fitness",
      locale: "en_IN",
      type: "profile",
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 800,
          height: 1000,
          alt: `${trainer.name} - ${trainer.isOwner ? "Founder & Owner" : trainer.role} at 19 Hours Fitness`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${trainer.name} · ${trainer.isOwner ? "Founder & Owner" : trainer.role} | 19 Hours Fitness`,
      description: trainer.quote ?? trainer.discipline,
      images: [ogImageUrl],
    },
  };
}

export default async function TrainerProfilePage({ params }: Props) {
  const { id } = await params;
  const trainer = TRAINERS.find((t) => t.id === id);

  if (!trainer) {
    notFound();
  }

  // Get other trainers for the "Explore Other Coaches" section
  const otherTrainers = TRAINERS.filter((t) => t.id !== trainer.id);

  // JSON-LD schema for Google and WhatsApp Rich Snippets
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: trainer.name,
    jobTitle: trainer.isOwner ? "Founder & Owner" : trainer.role,
    description: trainer.bio,
    image: `${siteUrl}${trainer.ogPhoto || trainer.image}`,
    worksFor: {
      "@type": "ExerciseGym",
      name: "19 Hours Fitness",
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Plot No. 201–202, Varkhana Bhavan, Viva College Road",
        addressLocality: "Virar West",
        addressRegion: "Maharashtra",
        postalCode: "401303",
        addressCountry: "IN",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F5F5] pt-28 sm:pt-36 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Navigation Bar / Breadcrumbs */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-12 md:mb-16">
          <Link
            href="/#trainers"
            className="inline-flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-[#969BA3] hover:text-[#00E5FF] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#00E5FF]" />
            <span>BACK TO ALL COACHES</span>
          </Link>

          <div className="font-mono text-xs tracking-widest text-[#00E5FF] uppercase">
            {trainer.isOwner ? "CADRE // FOUNDER & OWNER" : `CADRE SPEC // ${trainer.number}`}
          </div>
        </div>

        {/* Hero Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Full Portrait with Cyberpunk/Athletic Framing */}
          <div className="lg:col-span-5 relative group">
            <div className={`relative w-full aspect-[3/4] sm:aspect-[4/5] bg-[#101216] border overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] ${
              trainer.isOwner ? "border-[#00E5FF]/40 shadow-[0_0_40px_rgba(0,229,255,0.15)]" : "border-white/[0.08]"
            }`}>
              <Image
                src={trainer.image}
                alt={`${trainer.name} - 19 Hours Fitness ${trainer.isOwner ? "Founder & Owner" : "Coach"}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Ambient Vignette & Bottom Fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />

              {/* Founder / Coach Badge Overlays */}
              <div
                className={`absolute top-4 left-4 font-mono text-xs tracking-widest font-bold backdrop-blur-md px-3 py-1.5 border flex items-center gap-1.5 ${
                  trainer.isOwner
                    ? "bg-[#00E5FF] text-[#08090B] border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.6)]"
                    : "bg-[#08090B]/90 text-[#00E5FF] border-white/10"
                }`}
              >
                {trainer.isOwner && <Crown className="w-3.5 h-3.5" />}
                <span>{trainer.isOwner ? "FOUNDER & OWNER" : `COACH ${trainer.number}`}</span>
              </div>

              <div className="absolute top-4 right-4 font-mono text-[10px] tracking-wider text-[#F5F5F5]/80 uppercase bg-[#08090B]/90 backdrop-blur-md px-3 py-1.5 border border-white/10">
                VIRAR WEST
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#969BA3] uppercase bg-[#08090B]/85 backdrop-blur-md px-3.5 py-2 border border-white/10">
                <span>ATHLETE PROFILE</span>
                <span className="text-[#00E5FF]">
                  {trainer.isOwner ? "CLUB FOUNDER" : "VERIFIED CADRE"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: In-depth Dossier */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {trainer.isOwner ? (
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#08090B] bg-[#00E5FF] px-3.5 py-1.5 shadow-[0_0_20px_rgba(0,229,255,0.3)] uppercase w-fit mb-2">
                <Crown className="w-3.5 h-3.5" />
                <span>FOUNDER &amp; OWNER OF 19 HOURS FITNESS</span>
              </div>
            ) : (
              <SectionLabel number={trainer.number} label="COACHING CADRE" />
            )}

            <h1 className="mt-4 font-display font-bold text-4xl sm:text-6xl md:text-7xl text-[#F5F5F5] uppercase tracking-tight leading-none">
              {trainer.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[#00E5FF] font-medium bg-[#00E5FF]/10 px-3 py-1 border border-[#00E5FF]/20">
                {trainer.role}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#969BA3]">
                {trainer.discipline}
              </span>
            </div>

            {/* Founder Note / Quote Block */}
            {trainer.quote && (
              <div className="mt-8 relative p-6 bg-[#101216]/80 border-l-2 border-[#00E5FF] border-y border-r border-white/[0.06]">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#00E5FF] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  {trainer.isOwner ? "FOUNDER'S MISSION & PHILOSOPHY" : "COACHING PHILOSOPHY"}
                </div>
                <p className="text-lg sm:text-xl font-light text-[#F5F5F5] italic leading-relaxed">
                  "{trainer.quote}"
                </p>
              </div>
            )}

            {/* Bio Dossier */}
            {trainer.bio && (
              <div className="mt-8 space-y-4">
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#969BA3]">
                  {trainer.isOwner ? "FOUNDER BACKGROUND & VISION" : "BIOGRAPHY & BACKGROUND"}
                </h2>
                <p className="text-sm sm:text-base text-[#969BA3] font-light leading-relaxed">
                  {trainer.bio}
                </p>
              </div>
            )}

            {/* Credentials / Experience Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/[0.08] pt-8">
              {/* Experience */}
              <div className="p-5 bg-[#101216] border border-white/[0.06] flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-[#08090B] border border-white/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#969BA3] uppercase tracking-widest block mb-1">
                    EXPERIENCE
                  </span>
                  <p className="text-[#F5F5F5] font-display font-semibold text-lg uppercase tracking-tight">
                    {trainer.experience || "10+ Years"}
                  </p>
                  <p className="text-xs text-[#969BA3]/70 font-light mt-0.5">
                    {trainer.isOwner ? "Club Leadership & Elite Coaching" : "Elite 1-on-1 & Group Mentorship"}
                  </p>
                </div>
              </div>

              {/* Certifications */}
              <div className="p-5 bg-[#101216] border border-white/[0.06] flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-[#08090B] border border-white/10 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#969BA3] uppercase tracking-widest block mb-1">
                    CREDENTIALS
                  </span>
                  <div className="space-y-1">
                    {trainer.certifications && trainer.certifications.length > 0 ? (
                      trainer.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-[#F5F5F5] font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-[#F5F5F5]">Certified Fitness Professional</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%2019%20Hours%20Fitness%2C%20I%20would%20like%20to%20train%201-on-1%20with%20${encodeURIComponent(
                  trainer.name
                )}%20at%20Virar%20West.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-[#F5F5F5] hover:bg-[#00E5FF] text-[#08090B] px-8 py-4 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]"
              >
                <span>REQUEST 1-ON-1 TRAINING</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {trainer.instagram && (
                <a
                  href={trainer.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 border border-white/20 hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 text-[#F5F5F5] hover:text-[#00E5FF] px-6 py-4 font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>CLUB INSTAGRAM</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Explore Other Coaches Section */}
        <div className="mt-24 pt-16 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <SectionLabel number="07" label="THE CADRE" />
              <h3 className="mt-2 font-display font-bold text-2xl sm:text-4xl text-[#F5F5F5] uppercase tracking-tight">
                EXPLORE OTHER COACHES.
              </h3>
            </div>

            <Link
              href="/#trainers"
              className="font-mono text-xs tracking-widest text-[#00E5FF] uppercase hover:underline inline-flex items-center gap-1.5"
            >
              <span>VIEW ALL {TRAINERS.length} COACHES</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherTrainers.slice(0, 3).map((other) => (
              <Link
                key={other.id}
                href={`/trainers/${other.id}`}
                className="group flex flex-col bg-[#101216] border border-white/[0.08] hover:border-[#00E5FF]/40 transition-all duration-300 overflow-hidden"
              >
                <div className="relative w-full h-64 overflow-hidden bg-[#101216]">
                  <Image
                    src={other.image}
                    alt={`${other.name} - 19 Hours Fitness Coach`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101216] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest text-[#00E5FF] font-semibold bg-[#08090B]/85 px-2 py-0.5 border border-white/10">
                    {other.isOwner ? "FOUNDER" : other.number}
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="font-display font-bold text-xl text-[#F5F5F5] uppercase group-hover:text-[#00E5FF] transition-colors">
                      {other.name}
                    </h4>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#00E5FF]">
                      {other.role}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#969BA3] group-hover:text-[#F5F5F5] transition-colors">
                    <span>VIEW PROFILE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#00E5FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
