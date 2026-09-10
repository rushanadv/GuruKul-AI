"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WireframeDottedGlobe } from "@/components/ui/wireframe-dotted-globe";

export const GlobalVisionSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Section entry/exit scroll mappings
  const globeScale = useTransform(scrollYProgress, [0.1, 0.45, 0.85, 1.0], [0.78, 1.05, 1.05, 0.88]);
  const globeOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.8, 1.0], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.35], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.82, 0.95], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 px-6 md:px-12 bg-[#030605] border-t border-[#35F5B4]/10 overflow-hidden select-none"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#35F5B4]/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
        {/* LEFT COLUMN: EDITORIAL VISION COPY */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="lg:col-span-5 space-y-7 z-10"
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#35F5B4]/10 border border-[#35F5B4]/20 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35F5B4] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#35F5B4] font-medium">
              BEYOND ONE SYLLABUS
            </span>
          </div>

          <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-medium text-[#F3F6F4] tracking-[-0.04em] leading-[1.02]">
            One constellation today. <br />
            <span className="italic text-[#35F5B4] font-light">
              A universe of knowledge tomorrow.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#F3F6F4]/70 font-light leading-relaxed">
            GuruKul begins with a single syllabus, but the same structure can connect subjects, semesters and eventually entire learning ecosystems.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-[#35F5B4]/80">
            {["COURSES", "CONCEPTS", "SOURCES", "LEARNING PATHS"].map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-md bg-[#040605] border border-[#35F5B4]/15"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* RIGHT COLUMN: INTERACTIVE WIREFRAME DOTTED GLOBE */}
        <motion.div
          style={{
            scale: globeScale,
            opacity: globeOpacity,
          }}
          className="lg:col-span-7 relative w-full h-[450px] sm:h-[540px] lg:h-[620px] flex items-center justify-center"
        >
          <WireframeDottedGlobe className="w-full h-full" />
        </motion.div>
      </div>
    </section>
  );
};
