"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Starfield } from "@/components/Starfield";
import { UnifiedLandingStory } from "@/components/sections/UnifiedLandingStory";
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

      {/* Master Pinned Stage: Pre-Landing Intro -> Main Hero -> Learning Arc Milestones */}
      <UnifiedLandingStory />

      {/* 3. Product Interface Reveal */}
      <InteriorRevealSection />

      {/* 3.5 Premium Interactive Feature Showcase: Knowledge Orbit */}
      <KnowledgeOrbitCard />

      {/* 3.8 Mid-Page Visual Story: Beyond One Syllabus (Wireframe Dotted Globe) */}
      <GlobalVisionSection />

      {/* 4. Protocol Overview (How The Constellation Operates) */}
      <ProcessSection />

      {/* 5. Syllabus Dissolution Teaser Reveal */}
      <RevealSection />

      {/* 6. Closing Guarantee & Product Entry CTA */}
      <Cta3DSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
