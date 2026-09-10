"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { WarpDriveShader } from "@/components/ui/warp-drive-shader";
import { HeroCinematicSequence } from "./HeroCinematicSequence";

export const PreLandingIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Bind scroll progress across 250vh pinned transition container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 22,
    restDelta: 0.001,
  });

  // Pause WebGL shader rendering when transition reaches 98% to conserve GPU resources
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest >= 0.98 && !isPaused) {
      setIsPaused(true);
    } else if (latest < 0.98 && isPaused) {
      setIsPaused(false);
    }
  });

  // --- WebGL Shader Uniform Parameters derived from Scroll Progress ---
  const warpSpeed = useTransform(smoothProgress, [0, 0.35, 0.6, 0.78, 1.0], [1.0, 1.0, 4.5, 10.0, 0.0]);
  const warpIntensity = useTransform(smoothProgress, [0, 0.35, 0.6, 0.78, 1.0], [1.0, 1.0, 3.2, 5.5, 0.0]);
  const radialBrightness = useTransform(smoothProgress, [0, 0.35, 0.6, 0.78, 1.0], [1.0, 1.0, 2.5, 5.0, 0.0]);

  // Tunnel Canvas Opacity (Hidden during full white frame at 0.82)
  const tunnelOpacity = useTransform(smoothProgress, [0, 0.78, 0.82, 1.0], [1.0, 1.0, 0.0, 0.0]);

  // --- Center Intro Typography Animations ---
  const textOpacity = useTransform(smoothProgress, [0, 0.35, 0.58], [1.0, 1.0, 0.0]);
  const textScale = useTransform(smoothProgress, [0, 0.35, 0.58], [1.0, 1.0, 0.96]);

  // --- Spatial Radial White Flash Expansion Overlay (0.60 -> 0.86) ---
  const whiteFlashScale = useTransform(smoothProgress, [0.6, 0.78, 1.0], [0.05, 12.0, 12.0]);
  const whiteFlashOpacity = useTransform(smoothProgress, [0.6, 0.78, 0.86, 0.98], [0.0, 1.0, 1.0, 0.0]);

  // --- Landing Hero Scene Reveal (Mounted Underneath at Progress >= 0.82) ---
  const heroOpacity = useTransform(smoothProgress, [0.78, 0.83, 1.0], [0.0, 1.0, 1.0]);
  const heroScale = useTransform(smoothProgress, [0.84, 0.98], [1.015, 1.0]);

  // Active state props for shader
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

  return (
    <div ref={containerRef} className="relative w-full h-[250vh] bg-[#040605]">
      {/* Sticky Viewport pinned at top: 0 throughout the transition */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#040605] z-30 select-none">
        {/* Z-INDEX 10: EXISTING GURUKUL LANDING HERO (MOUNTED UNDERNEATH) */}
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
          }}
          className="absolute inset-0 w-full h-full z-10"
        >
          <HeroCinematicSequence />
        </motion.div>

        {/* Z-INDEX 20: WARP DRIVE WEBGL SHADER CANVAS */}
        <motion.div
          style={{ opacity: tunnelOpacity }}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        >
          <WarpDriveShader
            warpSpeed={shaderProps.speed}
            warpIntensity={shaderProps.intensity}
            radialBrightness={shaderProps.brightness}
            paused={isPaused}
          />
        </motion.div>

        {/* Z-INDEX 30: PRE-LANDING INTRO TYPOGRAPHY */}
        <motion.div
          style={{
            opacity: textOpacity,
            scale: textScale,
          }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 max-w-3xl mx-auto space-y-6 pointer-events-none"
        >
          {/* Small Monospace Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#35F5B4]/10 border border-[#35F5B4]/25 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35F5B4] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#35F5B4] font-medium">
              GURUKUL AI
            </span>
          </div>

          {/* Large Headline (Manrope 500) */}
          <h1
            className="font-sans text-[#F3F6F4] font-medium tracking-[-0.045em] leading-[0.94]"
            style={{ fontSize: "clamp(48px, 6.5vw, 96px)" }}
          >
            Enter the Knowledge <br />
            <span className="italic text-[#35F5B4] font-light">Constellation</span>
          </h1>

          {/* Small Supporting Text */}
          <p className="font-sans text-[#F3F6F4]/60 text-base sm:text-xl font-light max-w-lg leading-relaxed">
            Your syllabus is about to become a living map.
          </p>

          {/* Bottom Scroll Prompt */}
          <div className="pt-8 flex items-center gap-2 text-[#35F5B4]">
            <span className="font-mono text-xs uppercase tracking-[0.14em] opacity-80">
              SCROLL TO ENTER ↓
            </span>
          </div>
        </motion.div>

        {/* Z-INDEX 40: SPATIAL RADIAL WHITE FLASH EXPANSION OVERLAY */}
        <motion.div
          style={{
            opacity: whiteFlashOpacity,
          }}
          className="absolute inset-0 z-40 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden bg-white/20"
        >
          <motion.div
            style={{
              scale: whiteFlashScale,
              background:
                "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 25%, rgba(255,255,255,0) 70%)",
            }}
            className="w-[100vw] h-[100vh] rounded-full"
          />

          {/* SOLID WHITE COVER SHEET FOR 100% PURE WHITE FRAME DURING DOM SWAP */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.77, 0.82, 0.86, 0.98], [0.0, 1.0, 1.0, 0.0]),
            }}
            className="absolute inset-0 bg-white"
          />
        </motion.div>
      </div>
    </div>
  );
};
