"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { WarpDriveShader } from "@/components/ui/warp-drive-shader";
import { ConstellationGrid } from "@/components/ui/constellation-grid";
import { InteractiveCinematicGraph } from "@/components/InteractiveCinematicGraph";

export const UnifiedLandingStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isShaderPaused, setIsShaderPaused] = useState(false);

  // Single continuous scroll progress pipeline across 500vh master track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 22,
    restDelta: 0.001,
  });

  // Pause WebGL WarpDriveShader after white flash handoff (progress >= 0.30) to conserve GPU
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest >= 0.30 && !isShaderPaused) {
      setIsShaderPaused(true);
    } else if (latest < 0.30 && isShaderPaused) {
      setIsShaderPaused(false);
    }
  });

  // --- STAGE 1: WARP TUNNEL PRE-LANDING INTRO (0.00 -> 0.30) ---
  const warpSpeed = useTransform(smoothProgress, [0, 0.14, 0.24, 0.30], [1.0, 1.0, 5.0, 12.0]);
  const warpIntensity = useTransform(smoothProgress, [0, 0.14, 0.24, 0.30], [1.0, 1.0, 3.2, 5.5]);
  const radialBrightness = useTransform(smoothProgress, [0, 0.14, 0.24, 0.30], [1.0, 1.0, 2.5, 5.0]);

  const preLandingTextOpacity = useTransform(smoothProgress, [0, 0.14, 0.24], [1.0, 1.0, 0.0]);
  const preLandingTextScale = useTransform(smoothProgress, [0, 0.14, 0.24], [1.0, 1.0, 0.95]);
  const tunnelOpacity = useTransform(smoothProgress, [0, 0.24, 0.28], [1.0, 1.0, 0.0]);

  // Spatial Radial White Flash Expansion Overlay (0.14 -> 0.38)
  const whiteFlashScale = useTransform(smoothProgress, [0.14, 0.26, 0.36], [0.1, 16.0, 16.0]);
  const whiteFlashOpacity = useTransform(smoothProgress, [0.14, 0.24, 0.30, 0.36], [0.0, 0.95, 1.0, 0.0]);

  // Active state props for WebGL shader
  const [shaderProps, setShaderProps] = useState({
    speed: 1.0,
    intensity: 1.0,
    brightness: 1.0,
  });

  useMotionValueEvent(smoothProgress, "change", () => {
    setShaderProps({
      speed: warpSpeed.get(),
      intensity: warpIntensity.get(),
      brightness: radialBrightness.get(),
    });
  });

  // --- STAGE 2: MAIN HERO SCENE (0.30 -> 0.58) ---
  const heroOpacity = useTransform(smoothProgress, [0.26, 0.30, 0.52, 0.60], [0.0, 1.0, 1.0, 0.0]);
  const heroY = useTransform(smoothProgress, [0.52, 0.60], [0, -40]);

  // --- KNOWLEDGE GRAPH & BACKDROP MESH ANIMATIONS ---
  const graphX = useTransform(smoothProgress, [0.30, 0.45, 0.58, 0.92], ["22%", "22%", "0%", "0%"]);
  const graphScale = useTransform(smoothProgress, [0.30, 0.55, 0.75, 0.92], [1.0, 1.18, 1.45, 1.0]);
  const graphRotateZ = useTransform(smoothProgress, [0.30, 0.55], [0, -3.5]);

  // --- STAGE 3: STUDENT LEARNING ARC MILESTONES (0.58 -> 1.00) ---
  // Week 01 • Inert Document Phase (0.58 -> 0.68)
  const week1Opacity = useTransform(smoothProgress, [0.56, 0.60, 0.66, 0.70], [0, 1, 1, 0]);
  const week1Y = useTransform(smoothProgress, [0.56, 0.70], [30, -30]);

  // Week 03 • Question Trace Signal (0.68 -> 0.80)
  const week3Opacity = useTransform(smoothProgress, [0.68, 0.72, 0.78, 0.82], [0, 1, 1, 0]);
  const week3Y = useTransform(smoothProgress, [0.68, 0.82], [30, -30]);

  // Week 06 • Progress Illumination (0.80 -> 0.90)
  const week6Opacity = useTransform(smoothProgress, [0.80, 0.84, 0.88, 0.92], [0, 1, 1, 0]);
  const week6Y = useTransform(smoothProgress, [0.80, 0.92], [30, -30]);

  // Week 12 • Visible Mastery & Final Synthesis (0.90 -> 1.00)
  const week12Opacity = useTransform(smoothProgress, [0.90, 0.95], [0, 1]);
  const week12Y = useTransform(smoothProgress, [0.90, 0.95], [40, 0]);

  // Nav opacity fade during initial hero scroll
  const navOpacity = useTransform(smoothProgress, [0.30, 0.52], [1, 0.45]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#040605]">
      {/* STICKY FULLSCREEN VIEWPORT STAGE — FIXED AT TOP: 0 THROUGHOUT THE 500VH TRACK */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#040605] z-30 select-none flex items-center justify-center">
        {/* LAYER 0: CONSTELLATION GRID INTERACTIVE MESH BACKDROP */}
        <ConstellationGrid scrollProgress={smoothProgress} className="z-0" />

        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#35F5B4]/25 to-transparent pointer-events-none z-5" />

        {/* Ambient Nav Fade Overlay */}
        <motion.div style={{ opacity: navOpacity }} className="pointer-events-none" />

        {/* LAYER 10: CENTRAL INTERACTIVE KNOWLEDGE CONSTELLATION GRAPH */}
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

        {/* LAYER 20: WARP DRIVE WEBGL SHADER CANVAS (PRE-LANDING STAGE 1) */}
        <motion.div
          style={{ opacity: tunnelOpacity }}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        >
          <WarpDriveShader
            warpSpeed={shaderProps.speed}
            warpIntensity={shaderProps.intensity}
            radialBrightness={shaderProps.brightness}
            paused={isShaderPaused}
          />
        </motion.div>

        {/* LAYER 30: PRE-LANDING INTRO TYPOGRAPHY */}
        <motion.div
          style={{
            opacity: preLandingTextOpacity,
            scale: preLandingTextScale,
          }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 max-w-3xl mx-auto space-y-6 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#35F5B4]/10 border border-[#35F5B4]/25 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35F5B4] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#35F5B4] font-medium">
              GURUKUL AI
            </span>
          </div>

          <h1
            className="font-sans text-[#F3F6F4] font-medium tracking-[-0.045em] leading-[0.94]"
            style={{ fontSize: "clamp(48px, 6.5vw, 96px)" }}
          >
            Enter the Knowledge <br />
            <span className="italic text-[#35F5B4] font-light">Constellation</span>
          </h1>

          <p className="font-sans text-[#F3F6F4]/60 text-base sm:text-xl font-light max-w-lg leading-relaxed">
            Your syllabus is about to become a living map.
          </p>

          <div className="pt-8 flex items-center gap-2 text-[#35F5B4]">
            <span className="font-mono text-xs uppercase tracking-[0.14em] opacity-80">
              SCROLL TO ENTER ↓
            </span>
          </div>
        </motion.div>

        {/* LAYER 40: SPATIAL RADIAL WHITE FLASH EXPANSION OVERLAY */}
        <motion.div
          style={{
            opacity: whiteFlashOpacity,
          }}
          className="absolute inset-0 z-40 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden"
        >
          <motion.div
            style={{
              scale: whiteFlashScale,
              background:
                "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.92) 30%, rgba(53,245,180,0.4) 60%, transparent 80%)",
            }}
            className="w-[100vw] h-[100vh] rounded-full"
          />
        </motion.div>

        {/* LAYER 50: STAGE 2 MAIN HERO COPY OVERLAY */}
        <motion.div
          style={{
            opacity: heroOpacity,
            y: heroY,
          }}
          className="relative z-50 w-full max-w-7xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 items-center pointer-events-none"
        >
          <div className="md:col-span-6 space-y-7 pointer-events-auto">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#35F5B4]/10 border border-[#35F5B4]/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35F5B4] animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#35F5B4] font-medium">
                THE KNOWLEDGE CONSTELLATION
              </span>
            </div>

            <h1
              className="font-sans text-[#F3F6F4] font-normal tracking-[-0.05em] leading-[0.92]"
              style={{ fontSize: "clamp(52px, 6.8vw, 108px)" }}
            >
              Turn your syllabus <br />
              <span className="text-[#F3F6F4]/90">into something</span> <br />
              <span className="italic text-[#35F5B4] font-light">you can see.</span>
            </h1>

            <p className="font-sans text-[#F3F6F4]/60 text-base md:text-lg max-w-lg font-light leading-relaxed">
              GuruKul AI transforms your course syllabus into an interactive, 3D map of topics, prerequisites, and source citations — so every answer has a visible origin.
            </p>

            <div className="pt-2 flex items-center gap-6">
              <Link href="/app">
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#35F5B4] text-[#040605] font-sans font-medium text-sm md:text-base tracking-tight shadow-[0_0_28px_rgba(53,245,180,0.3)] transition-all cursor-pointer"
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

        {/* LAYER 50: STAGE 3 • WEEK 01 SCENE OVERLAY */}
        <motion.div
          style={{
            opacity: week1Opacity,
            y: week1Y,
          }}
          className="absolute left-8 md:left-20 top-1/2 -translate-y-1/2 z-50 max-w-md space-y-4 pointer-events-none"
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

        {/* LAYER 50: STAGE 3 • WEEK 03 QUESTION TRACE SCENE OVERLAY */}
        <motion.div
          style={{
            opacity: week3Opacity,
            y: week3Y,
          }}
          className="absolute left-8 md:left-20 top-1/2 -translate-y-1/2 z-50 max-w-lg space-y-5 pointer-events-none"
        >
          <div className="p-4 md:p-5 rounded-2xl bg-[#040605]/85 border border-[#35F5B4]/30 backdrop-blur-xl space-y-2 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#35F5B4]">
              QUESTION TRACE SIGNAL
            </div>
            <p className="font-sans text-base md:text-lg text-[#F3F6F4] font-medium">
              &quot;What do I need to understand before machine learning?&quot;
            </p>
          </div>

          <div className="space-y-2 pl-2">
            <h3 className="font-sans text-2xl md:text-4xl text-[#F3F6F4] font-medium tracking-[-0.03em]">
              Every answer has a visible source.
            </h3>
            <p className="font-sans text-sm md:text-base text-[#F3F6F4]/60 font-light leading-relaxed">
              GuruKul shows exactly where an answer comes from inside your syllabus, tracing prerequisite connections back to core fundamentals.
            </p>
          </div>
        </motion.div>

        {/* LAYER 50: STAGE 3 • WEEK 06 PROGRESS ILLUMINATION SCENE OVERLAY */}
        <motion.div
          style={{
            opacity: week6Opacity,
            y: week6Y,
          }}
          className="absolute left-8 md:left-20 top-1/2 -translate-y-1/2 z-50 max-w-md space-y-4 pointer-events-none"
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

        {/* LAYER 50: STAGE 3 • WEEK 12 SYNTHESIS & FINAL CTA OVERLAY */}
        <motion.div
          style={{
            opacity: week12Opacity,
            y: week12Y,
          }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center px-6 pointer-events-auto bg-gradient-to-t from-[#040605] via-transparent to-[#040605]/80"
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
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#35F5B4] text-[#040605] font-sans font-medium text-base tracking-tight shadow-[0_0_32px_rgba(53,245,180,0.35)] transition-all cursor-pointer"
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
