"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { InteractiveCinematicGraph } from "@/components/InteractiveCinematicGraph";

export const HeroCinematicSequence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Bind scroll progress across the 400vh pinned scroll container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring smoothing for 60fps organic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.001,
  });

  // --- PHASE 1 (0% -> 20%) HERO TRANSFORMATIONS ---
  const heroOpacity = useTransform(smoothProgress, [0.02, 0.17], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -70]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.96]);

  // Graph Position & Camera Dolly
  const graphX = useTransform(smoothProgress, [0.04, 0.28, 0.84, 0.95], ["22%", "0%", "0%", "0%"]);
  const graphScale = useTransform(smoothProgress, [0, 0.3, 0.65, 0.92], [1.0, 1.34, 1.45, 1.0]);
  const graphRotateZ = useTransform(smoothProgress, [0, 0.35], [0, -3.5]);

  // --- PHASE 2 (20% -> 45%) ENTER THE CONSTELLATION ---
  const phase2Opacity = useTransform(smoothProgress, [0.21, 0.27, 0.39, 0.44], [0, 1, 1, 0]);
  const phase2Y = useTransform(smoothProgress, [0.21, 0.44], [30, -30]);

  // --- PHASE 3 (45% -> 65%) QUESTION TRACE ---
  const phase3Opacity = useTransform(smoothProgress, [0.46, 0.52, 0.62, 0.66], [0, 1, 1, 0]);
  const phase3Y = useTransform(smoothProgress, [0.46, 0.66], [30, -30]);

  // --- PHASE 4 (65% -> 85%) PROGRESS ILLUMINATION ---
  const phase4Opacity = useTransform(smoothProgress, [0.67, 0.72, 0.81, 0.85], [0, 1, 1, 0]);
  const phase4Y = useTransform(smoothProgress, [0.67, 0.85], [30, -30]);

  // --- PHASE 5 (85% -> 100%) FINAL TRANSFORMATION ---
  const phase5Opacity = useTransform(smoothProgress, [0.86, 0.94], [0, 1]);
  const phase5Y = useTransform(smoothProgress, [0.86, 0.94], [40, 0]);

  // Navigation bar fade during initial scroll
  const navOpacity = useTransform(smoothProgress, [0.05, 0.2], [1, 0.45]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#040605]">
      {/* Sticky Fullscreen Cinematic Viewport Container */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center select-none">
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#35F5B4]/25 to-transparent pointer-events-none z-20" />

        {/* Ambient Nav Fade Overlay */}
        <motion.div style={{ opacity: navOpacity }} className="pointer-events-none" />

        {/* --- CENTRAL GRAPH VISUALIZATION (PINNED HERO OBJECT) --- */}
        <motion.div
          style={{
            x: graphX,
            scale: graphScale,
            rotateZ: graphRotateZ,
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center z-10 pointer-events-auto"
        >
          <InteractiveCinematicGraph scrollProgress={smoothProgress} />
        </motion.div>

        {/* --- PHASE 1: ASYMMETRIC HERO OVERLAY --- */}
        <motion.div
          style={{
            opacity: heroOpacity,
            y: heroY,
            scale: heroScale,
          }}
          className="relative z-20 w-full max-w-7xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 items-center pointer-events-none"
        >
          <div className="md:col-span-6 space-y-7 pointer-events-auto">
            {/* Technical Eyebrow Label */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#35F5B4]/10 border border-[#35F5B4]/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35F5B4] animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#35F5B4] font-medium">
                THE KNOWLEDGE CONSTELLATION
              </span>
            </div>

            {/* Editorial Headline */}
            <h1
              className="font-sans text-[#F3F6F4] font-normal tracking-[-0.05em] leading-[0.92]"
              style={{ fontSize: "clamp(52px, 6.8vw, 108px)" }}
            >
              Turn your syllabus <br />
              <span className="text-[#F3F6F4]/90">into something</span> <br />
              <span className="italic text-[#35F5B4] font-light">you can see.</span>
            </h1>

            {/* Concise Product Subtitle */}
            <p className="font-sans text-[#F3F6F4]/60 text-base md:text-lg max-w-lg font-light leading-relaxed">
              GuruKul AI transforms your course syllabus into an interactive, 3D map of topics, prerequisites, and source citations — so every answer has a visible origin.
            </p>

            {/* Single Primary Pill CTA */}
            <div className="pt-2 flex items-center gap-6">
              <Link href="/app">
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#35F5B4] text-[#040605] font-sans font-medium text-sm md:text-base tracking-tight shadow-[0_0_28px_rgba(53,245,180,0.3)] transition-all"
                >
                  <span>Build my constellation</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </motion.div>
              </Link>
              <span className="font-mono text-xs text-[#F3F6F4]/40 uppercase tracking-[0.1em]">
                Scroll to explore ↓
              </span>
            </div>
          </div>
        </motion.div>

        {/* --- PHASE 2: FLOATING SCENE TEXT (WEEK 01 / INERT DOCUMENT PHASE) --- */}
        <motion.div
          style={{
            opacity: phase2Opacity,
            y: phase2Y,
          }}
          className="absolute left-8 md:left-20 top-1/2 -translate-y-1/2 z-20 max-w-md space-y-4 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F6F4]/10 border border-[#F3F6F4]/20 backdrop-blur-md">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#F3F6F4]">
              WEEK 01 • INERT DOCUMENT PHASE
            </span>
          </div>

          <h2 className="font-sans text-3xl md:text-5xl font-medium text-[#F3F6F4] tracking-[-0.04em] leading-[1.05]">
            Flat syllabus, <br />
            <span className="text-[#F3F6F4]/50">ignored by week two.</span>
          </h2>

          <p className="font-sans text-sm md:text-base text-[#F3F6F4]/60 font-light leading-relaxed">
            Static course PDFs lose context instantly. GuruKul converts passive reading into a dynamic, spatial structure that evolves with your learning.
          </p>
        </motion.div>

        {/* --- PHASE 3: FLOATING QUESTION TRACE CARD & ANSWER SOURCE REVEAL --- */}
        <motion.div
          style={{
            opacity: phase3Opacity,
            y: phase3Y,
          }}
          className="absolute left-8 md:left-20 top-1/2 -translate-y-1/2 z-20 max-w-lg space-y-5 pointer-events-none"
        >
          {/* Question Prompt Floating Chip */}
          <div className="p-4 md:p-5 rounded-2xl bg-[#040605]/85 border border-[#35F5B4]/30 backdrop-blur-xl space-y-2 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#35F5B4]">
              QUESTION TRACE SIGNAL
            </div>
            <p className="font-sans text-base md:text-lg text-[#F3F6F4] font-medium">
              &quot;What do I need to understand before machine learning?&quot;
            </p>
          </div>

          {/* Source Attribution Text */}
          <div className="space-y-2 pl-2">
            <h3 className="font-sans text-2xl md:text-4xl text-[#F3F6F4] font-medium tracking-[-0.03em]">
              Every answer has a visible source.
            </h3>
            <p className="font-sans text-sm md:text-base text-[#F3F6F4]/60 font-light leading-relaxed">
              GuruKul shows exactly where an answer comes from inside your syllabus, tracing prerequisite connections back to core fundamentals.
            </p>
          </div>
        </motion.div>

        {/* --- PHASE 4: PROGRESS ILLUMINATION CALLOUT --- */}
        <motion.div
          style={{
            opacity: phase4Opacity,
            y: phase4Y,
          }}
          className="absolute left-8 md:left-20 top-1/2 -translate-y-1/2 z-20 max-w-md space-y-4 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#35F5B4]/10 border border-[#35F5B4]/20 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35F5B4]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#35F5B4]">
              PROGRESS ILLUMINATION
            </span>
          </div>

          <h2 className="font-sans text-3xl md:text-5xl font-medium text-[#F3F6F4] tracking-[-0.04em] leading-[1.05]">
            Your progress <br />
            <span className="text-[#35F5B4]">becomes visible.</span>
          </h2>

          <p className="font-sans text-sm md:text-base text-[#F3F6F4]/60 font-light leading-relaxed">
            Studied topics remain illuminated, turning the course into a living map of what you know and what lies ahead.
          </p>
        </motion.div>

        {/* --- PHASE 5: FINAL CAMERA PULL BACK & CTA OVERLAY --- */}
        <motion.div
          style={{
            opacity: phase5Opacity,
            y: phase5Y,
          }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 pointer-events-auto bg-gradient-to-t from-[#040605] via-transparent to-[#040605]/80"
        >
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#35F5B4]/10 border border-[#35F5B4]/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#35F5B4]" />
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#35F5B4] font-medium">
                COMPLETE CONSTELLATION SYNTHESIS
              </span>
            </div>

            <h2
              className="font-sans text-[#F3F6F4] font-medium tracking-[-0.05em] leading-[0.92]"
              style={{ fontSize: "clamp(48px, 6vw, 92px)" }}
            >
              Your course. <br />
              <span className="text-[#35F5B4] italic font-light">Mapped.</span>
            </h2>

            <p className="font-sans text-[#F3F6F4]/70 text-base md:text-xl font-light max-w-lg mx-auto leading-relaxed">
              Trace every answer. See every connection. Watch your knowledge grow.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/app">
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#35F5B4] text-[#040605] font-sans font-medium text-base tracking-tight shadow-[0_0_32px_rgba(53,245,180,0.35)] transition-all"
                >
                  <span>Build my constellation</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
