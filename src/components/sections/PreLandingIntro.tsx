"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { WarpDriveShader } from "@/components/ui/warp-drive-shader";

export const PreLandingIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Bind scroll progress across 200vh pinned intro section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 22,
    restDelta: 0.001,
  });

  // Pause WebGL shader rendering when user scrolls past 98% of intro to conserve GPU resources
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest > 0.98 && !isPaused) {
      setIsPaused(true);
    } else if (latest <= 0.98 && isPaused) {
      setIsPaused(false);
    }
  });

  // --- WebGL Shader Uniform Parameters derived from Scroll Progress ---
  const warpSpeed = useTransform(smoothProgress, [0, 0.35, 0.65, 0.9, 1.0], [1.0, 2.4, 5.5, 12.0, 0.0]);
  const warpIntensity = useTransform(smoothProgress, [0, 0.35, 0.65, 0.9, 1.0], [1.0, 1.8, 3.2, 5.0, 0.0]);
  const radialBrightness = useTransform(smoothProgress, [0, 0.5, 0.8, 0.95, 1.0], [1.0, 1.4, 3.0, 5.0, 0.0]);
  const collapseProgress = useTransform(smoothProgress, [0.82, 0.98, 1.0], [0.0, 0.95, 1.0]);

  // --- Center Overlay Text Animations ---
  const textOpacity = useTransform(smoothProgress, [0, 0.3, 0.6, 0.82], [1, 1, 0.9, 0]);
  const textScale = useTransform(smoothProgress, [0, 0.6, 0.9], [1.0, 1.08, 1.25]);
  const textY = useTransform(smoothProgress, [0, 0.82], [0, -40]);

  // --- Container Singularity Zoom / Collapse into Landing Hero ---
  const introContainerScale = useTransform(smoothProgress, [0.88, 0.99, 1.0], [1.0, 1.15, 0]);
  const introContainerOpacity = useTransform(smoothProgress, [0.9, 0.995, 1.0], [1.0, 0.8, 0]);

  // Read current values for shader component
  const [shaderProps, setShaderProps] = useState({
    speed: 1.0,
    intensity: 1.0,
    brightness: 1.0,
    collapse: 0.0,
  });

  useMotionValueEvent(smoothProgress, "change", () => {
    setShaderProps({
      speed: warpSpeed.get(),
      intensity: warpIntensity.get(),
      brightness: radialBrightness.get(),
      collapse: collapseProgress.get(),
    });
  });

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] bg-black">
      {/* Sticky Fullscreen Pre-Landing Intro Viewport */}
      <motion.div
        style={{
          scale: introContainerScale,
          opacity: introContainerOpacity,
        }}
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black z-40 flex items-center justify-center select-none"
      >
        {/* WebGL Warp Drive Shader Background */}
        <div className="absolute inset-0 w-full h-full">
          <WarpDriveShader
            warpSpeed={shaderProps.speed}
            warpIntensity={shaderProps.intensity}
            radialBrightness={shaderProps.brightness}
            collapseProgress={shaderProps.collapse}
            paused={isPaused}
          />
        </div>

        {/* Subtle Radial Ambient Center Flare Overlay */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(53, 245, 180, 0.18) 0%, rgba(88, 216, 255, 0.05) 55%, transparent 80%)",
          }}
        />

        {/* Minimal Center Intro Typography */}
        <motion.div
          style={{
            opacity: textOpacity,
            scale: textScale,
            y: textY,
          }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-3xl space-y-6 pointer-events-none"
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
      </motion.div>
    </div>
  );
};
