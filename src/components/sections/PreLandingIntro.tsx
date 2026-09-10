"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { WarpDriveShader } from "@/components/ui/warp-drive-shader";

export const PreLandingIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bind scroll progress across 220vh pinned transition container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 22,
    restDelta: 0.001,
  });

  // Pause WebGL shader rendering when pre-landing scroll finishes (progress >= 0.98)
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest >= 0.98 && !isPaused) {
      setIsPaused(true);
    } else if (latest < 0.98 && isPaused) {
      setIsPaused(false);
    }
  });

  // WebGL Shader Uniform Parameters
  const warpSpeed = useTransform(smoothProgress, [0, 0.35, 0.65, 0.85, 1.0], [1.0, 1.0, 4.8, 12.0, 0.0]);
  const warpIntensity = useTransform(smoothProgress, [0, 0.35, 0.65, 0.85, 1.0], [1.0, 1.0, 3.2, 5.5, 0.0]);
  const radialBrightness = useTransform(smoothProgress, [0, 0.35, 0.65, 0.85, 1.0], [1.0, 1.0, 2.5, 5.0, 0.0]);

  // Center Intro Typography Animations
  const textOpacity = useTransform(smoothProgress, [0, 0.3, 0.55], [1.0, 1.0, 0.0]);
  const textScale = useTransform(smoothProgress, [0, 0.3, 0.55], [1.0, 1.0, 0.95]);

  // FIXED OVERLAY ANIMATIONS (position: fixed; inset: 0; z-index: 9999)
  // Layer 1: Radial Flash Bloom
  const radialFlashScale = useTransform(smoothProgress, [0.45, 0.75, 0.92], [0.1, 16.0, 18.0]);
  const radialFlashOpacity = useTransform(smoothProgress, [0.45, 0.70, 0.88, 0.98], [0.0, 0.95, 0.8, 0.0]);

  // Layer 2: Solid Fullscreen White Cover (0.60 -> 0.98)
  // Strictly goes 0 -> 1 -> 1 -> 0 to guarantee normal page rendering is NEVER white
  const solidWhiteOpacity = useTransform(smoothProgress, [0.60, 0.76, 0.88, 0.98], [0.0, 1.0, 1.0, 0.0]);

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
    <div ref={containerRef} className="relative w-full h-[220vh] bg-[#040605]">
      {/* Sticky Viewport Stage pinned at top: 0 throughout the pre-landing intro */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#040605] z-30 select-none">
        {/* WARP DRIVE WEBGL SHADER CANVAS */}
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
          <WarpDriveShader
            warpSpeed={shaderProps.speed}
            warpIntensity={shaderProps.intensity}
            radialBrightness={shaderProps.brightness}
            paused={isPaused}
          />
        </div>

        {/* PRE-LANDING INTRO TYPOGRAPHY */}
        <motion.div
          style={{
            opacity: textOpacity,
            scale: textScale,
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
      </div>

      {/* 
        FIXED FULLSCREEN TRANSITION OVERLAY (PORTALED TO BODY)
        Independent of the scrolling container (position: fixed, z-index: 9999).
        It NEVER slides upward with scrolling DOM elements.
      */}
      {mounted &&
        createPortal(
          <div className="fixed inset-0 w-screen h-[100svh] z-[9999] pointer-events-none overflow-hidden">
            {/* Layer 1: Radial Flash Bloom */}
            <motion.div
              style={{ opacity: radialFlashOpacity }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
            >
              <motion.div
                style={{
                  scale: radialFlashScale,
                  background:
                    "radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 35%, rgba(53,245,180,0.5) 65%, transparent 85%)",
                }}
                className="w-[100vw] h-[100vh] rounded-full pointer-events-none"
              />
            </motion.div>

            {/* Layer 2: Solid Fullscreen White Cover (Guarantees 100% viewport coverage) */}
            <motion.div
              style={{ opacity: solidWhiteOpacity }}
              className="absolute inset-0 w-full h-full bg-white pointer-events-none"
            />
          </div>,
          document.body
        )}
    </div>
  );
};
