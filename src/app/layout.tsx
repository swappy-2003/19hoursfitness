import type { Metadata } from "next";
import { Oswald, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Preloader from "@/components/layout/Preloader";
import VideoIntro from "@/components/layout/VideoIntro";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/ui/FloatingActions";
import { BRAND } from "@/lib/constants";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "19 Hours Fitness | Premium Gym in Virar West",
  description:
    "19 Hours Fitness is a premium fitness club in Virar West offering strength training, CrossFit, personal training, cardio and transformation programs.",
  keywords: [
    "19 Hours Fitness Virar",
    "19 Hours Fitness Virar West",
    "gym in Virar West",
    "gym near Virar",
    "fitness centre Virar",
    "CrossFit Virar",
    "personal training Virar",
    "gym near Viva College Virar",
    "strength training Virar",
  ],
  authors: [{ name: "19 Hours Fitness" }],
  creator: "19 Hours Fitness",
  metadataBase: new URL("https://19hoursfitness.com"),
  openGraph: {
    title: "19 Hours Fitness | Premium Gym in Virar West",
    description:
      "Where Transformation Becomes a Lifestyle. Experience high-performance strength, CrossFit, and recovery in Virar West.",
    url: "https://19hoursfitness.com",
    siteName: "19 Hours Fitness",
    images: [
      {
        url: "/images/realHero.png",
        width: 1200,
        height: 630,
        alt: "19 Hours Fitness Gym in Virar West",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "19 Hours Fitness | Premium Gym in Virar West",
    description:
      "Where Transformation Becomes a Lifestyle. Experience high-performance strength, CrossFit, and recovery in Virar West.",
    images: ["/images/realHero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: "19 Hours Fitness",
  alternateName: "19 Hours Fitness Club",
  url: "https://19hoursfitness.com",
  logo: "https://19hoursfitness.com/images/logo.png",
  image: "https://19hoursfitness.com/images/realHero.png",
  description:
    "19 Hours Fitness is a premium fitness club in Virar West offering strength training, CrossFit, personal training, cardio and transformation programs.",
  telephone: BRAND.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot No. 201–202, Varkhana Bhavan, Viva College Road",
    addressLocality: "Virar West",
    addressRegion: "Maharashtra",
    postalCode: "401303",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "19.4674",
    longitude: "72.8041",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "05:30",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "07:00",
      closes: "20:00",
    },
  ],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#08090B] text-[#F5F5F5] selection:bg-[#00E5FF] selection:text-[#08090B] relative min-h-screen overflow-x-hidden">
        <SmoothScroll>
          <GrainOverlay />
          <CustomCursor />
          <Preloader />
          <VideoIntro />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
          <FloatingActions />
        </SmoothScroll>
      </body>
    </html>
  );
}
