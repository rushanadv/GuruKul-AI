"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HeroConstellationGraph } from "../HeroConstellationGraph";

export const Hero3DSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll choreography into editorial sections
  const { scrollY } = useScroll();
  const leftColY = useTransform(scrollY, [0, 450], [0, -40]);
  const leftColOpacity = useTransform(scrollY, [0, 350], [1, 0]);
  const rightColScale = useTransform(scrollY, [0, 500], [1, 1.08]);
  const rightColOpacity = useTransform(scrollY, [0, 450], [1, 0.15]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[750px] overflow-hidden bg-[#050706] flex items-center px-6 sm:px-12 pt-20 pb-8 select-none"
    >
      {/* Background grain noise */}
      <div className="cosmic-noise" />

      {/* Main 2-Column Asymmetric Grid Container */}
      <div className="max-w-7xl mx-auto w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-20">
        {/* LEFT COLUMN — approx 48% width (lg:col-span-6 or 5) */}
        <motion.div
          style={{ y: leftColY, opacity: leftColOpacity }}
          className="lg:col-span-6 flex flex-col items-start justify-center pr-0 lg:pr-4"
        >
          {/* Small Eyebrow (IBM Plex Mono) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-mono text-xs font-medium text-[#39F5B5] tracking-[0.15em] uppercase mb-6"
          >
            THE KNOWLEDGE CONSTELLATION
          </motion.div>

          {/* Large Editorial Headline (Manrope 500, letter-spacing: -0.045em, line-height: 0.94) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-medium text-[#F4F7F5] tracking-[-0.045em] leading-[0.94] text-[clamp(44px,5.8vw,104px)] mb-8"
          >
            Turn your syllabus <br />
            into something <br />
            you can see.
          </motion.h1>

          {/* Body Copy (Manrope, 17-19px, line-height 1.6, muted white, max-w ~540px) */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base sm:text-[18px] text-[#F4F7F5]/55 leading-[1.6] max-w-[520px] mb-10"
          >
            GuruKul AI transforms your syllabus into a living map of topics, prerequisites, sources and progress — so every answer has a visible origin.
          </motion.p>

          {/* Action Row: Primary Pill CTA + Secondary Link */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6"
          >
            <Link
              href="/app"
              className="px-6 py-3.5 rounded-full bg-[#39F5B5] text-[#050706] font-sans font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(57,245,181,0.3)] hover:bg-[#1BBF8A] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <span>Build my constellation</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <a
              href="#process"
              className="font-sans text-sm text-[#F4F7F5]/60 hover:text-[#F4F7F5] transition-colors flex items-center gap-1"
            >
              <span>See how it works</span>
              <span className="text-[#39F5B5]">↓</span>
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — approx 52% width (lg:col-span-6) */}
        <motion.div
          style={{ scale: rightColScale, opacity: rightColOpacity }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 w-full h-[450px] sm:h-[540px] flex items-center justify-center relative"
        >
          <HeroConstellationGraph />
        </motion.div>
      </div>
    </section>
  );
};


