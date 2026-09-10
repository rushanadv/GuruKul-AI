"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Starfield } from "@/components/Starfield";
import { PreLandingIntro } from "@/components/sections/PreLandingIntro";
import { Hero3DSection } from "@/components/sections/Hero3DSection";
import { InteriorRevealSection } from "@/components/sections/InteriorRevealSection";
import { KnowledgeOrbitCard } from "@/components/KnowledgeOrbitCard";
import { GlobalVisionSection } from "@/components/sections/GlobalVisionSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { RevealSection } from "@/components/sections/RevealSection";
import { Cta3DSection } from "@/components/sections/Cta3DSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#040605] text-[#F3F6F5] overflow-x-hidden selection:bg-[#35F5B4]/30 selection:text-[#F3F6F5]">
      {/* Top Floating Navigation */}
      <Navbar />

      {/* Background Deep Space Starfield */}
      <Starfield density={85} />

      {/* 0. Cinematic Pre-Landing Warp Tunnel Intro */}
      <PreLandingIntro />

      {/* 1. Fullscreen Landing Hero Section & Learning Arc */}
      <Hero3DSection />

      {/* 2. Product Interface Reveal */}
      <InteriorRevealSection />

      {/* 3. Premium Interactive Feature Showcase: Knowledge Orbit */}
      <KnowledgeOrbitCard />

      {/* 4. Mid-Page Visual Story: Beyond One Syllabus (Wireframe Dotted Globe) */}
      <GlobalVisionSection />

      {/* 5. Protocol Overview (How The Constellation Operates) */}
      <ProcessSection />

      {/* 6. Syllabus Dissolution Teaser Reveal */}
      <RevealSection />

      {/* 7. Closing Guarantee & Product Entry CTA */}
      <Cta3DSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
