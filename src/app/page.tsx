import Hero from "@/components/sections/Hero";
import BrandStatement from "@/components/sections/BrandStatement";
import Experience from "@/components/sections/Experience";
import Transformation from "@/components/sections/Transformation";
import TypographicBreak from "@/components/sections/TypographicBreak";
import Training from "@/components/sections/Training";
import Trainers from "@/components/sections/Trainers";
import GymEnvironment from "@/components/sections/GymEnvironment";
import ThreeDExperience from "@/components/sections/ThreeDExperience";
import SocialProof from "@/components/sections/SocialProof";
import InstagramStrip from "@/components/sections/InstagramStrip";
import Location from "@/components/sections/Location";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#08090B]">
      {/* 00: Full-screen Cinematic Hero */}
      <Hero />

      {/* 01: Brand Statement / The Mindset */}
      <BrandStatement />

      {/* 02: Pinned Horizontal Scroll Experience */}
      <Experience />

      {/* 03: Real People. Real Transformations (Interactive Before/After) */}
      <Transformation />

      {/* 04: Typographic Pause (Stronger is Built) */}
      <TypographicBreak />

      {/* 05: Training Directives (Split Goal Switcher) */}
      <Training />

      {/* 06: Coaching Cadre (Trainers) */}
      <Trainers />

      {/* 07: Gym Environment (Asymmetric Editorial Gallery) */}
      <GymEnvironment />

      {/* 07: 3D Interaction (Biomechanical Harmony) */}
      <ThreeDExperience />

      {/* 08: Social Proof / What Members Say */}
      <SocialProof />

      {/* 09: Community Culture / Instagram Strip */}
      <InstagramStrip />

      {/* 10: Facility Location & Google Maps */}
      <Location />

      {/* 11: Final Call to Action */}
      <FinalCTA />
    </div>
  );
}
