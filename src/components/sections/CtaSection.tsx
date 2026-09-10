"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Compass, ShieldCheck } from "lucide-react";
import { MagneticButton } from "../MagneticButton";
import { Constellation } from "../Constellation";

export const CtaSection: React.FC = () => {
  return (
    <section className="relative py-32 px-4 bg-space-950 overflow-hidden border-t border-white/[0.04]">
      {/* Background Ambient Constellation Motif */}
      <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none -z-10 scale-110">
        <Constellation
          nodeCount={14}
          litPercentage={60}
          interactive={false}
          showLabels={false}
          className="w-full max-w-4xl h-[550px]"
        />
      </div>

      {/* Atmospheric radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-celestial-cyan/[0.09] blur-[150px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-850/80 border border-celestial-cyan/30 text-celestial-cyan text-xs font-mono mb-8 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Final Philosophy</span>
        </div>

        {/* PRD Demo Script Quote Headline */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-starlight-pure max-w-3xl leading-[1.08] mb-6">
          &ldquo;Nothing here is a black box.&rdquo;
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-starlight-muted max-w-xl mx-auto leading-relaxed mb-10">
          Your syllabus has always been an interconnected cosmos. GuruKul AI is the telescope that
          makes the light visible.
        </p>

        {/* Large Magnetic CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <MagneticButton href="#reveal" variant="primary" pulseGlow className="!px-8 !py-4 !text-base">
            <span>Synthesize Your Syllabus</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton href="#trace" variant="secondary" pulseGlow={false} className="!px-6 !py-4 !text-base">
            <Compass className="w-4 h-4 text-celestial-cyan" />
            <span>Interactive Demo</span>
          </MagneticButton>
        </div>

        {/* Assurance */}
        <div className="flex items-center gap-2 text-xs font-mono text-starlight-dim">
          <ShieldCheck className="w-4 h-4 text-celestial-cyan" />
          <span>Works with PDF, Markdown, Canvas, and Blackboard syllabi</span>
        </div>
      </div>
    </section>
  );
};
