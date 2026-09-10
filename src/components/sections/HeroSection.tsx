"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Sparkles, Network } from "lucide-react";
import { MagneticButton } from "../MagneticButton";
import { Constellation } from "../Constellation";

export const HeroSection: React.FC = () => {
  const headlineWords = ["Your", "syllabus,", "as", "a", "living", "map", "of", "light."];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-28 pb-16 overflow-hidden">
      {/* Subtle Background Pre-Lit Constellation establishing the visual language */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none -z-10 scale-105">
        <Constellation
          nodeCount={16}
          litPercentage={45}
          interactive={false}
          showLabels={false}
          className="w-full max-w-5xl h-[700px]"
        />
      </div>

      {/* Atmospheric radial gradient glow behind text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-celestial-cyan/10 blur-[130px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/3 w-[400px] h-[250px] bg-celestial-violet/10 blur-[120px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-850/80 border border-celestial-cyan/25 text-celestial-cyan text-xs font-mono mb-8 backdrop-blur-md shadow-glass-surface"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Knowledge Constellation Engine</span>
          <span className="w-1 h-1 rounded-full bg-celestial-cyan/60" />
          <span className="text-starlight-muted">v2.0</span>
        </motion.div>

        {/* Staggered Word-by-Word Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-starlight-pure max-w-3xl leading-[1.08] mb-6"
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              variants={wordVariants}
              className={`inline-block mr-[0.25em] ${
                word === "living" || word === "light."
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-starlight-pure via-celestial-cyan to-[#5eead4]"
                  : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Trust Gap Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-starlight-muted max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
        >
          Replace dead-end syllabus PDFs and untraceable black-box AI answers with a{" "}
          <span className="text-starlight-base font-medium">living, luminous knowledge graph</span>.{" "}
          Every answer is traceable. Every bit of progress is visible.
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-14"
        >
          <MagneticButton href="#reveal" variant="primary" pulseGlow>
            <span>Convert Your Syllabus</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton href="#trace" variant="secondary" pulseGlow={false}>
            <Play className="w-3.5 h-3.5 text-celestial-cyan fill-celestial-cyan" />
            <span>Watch Retrieval Trace</span>
          </MagneticButton>
        </motion.div>

        {/* Bottom Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/[0.06] text-xs font-mono text-starlight-dim w-full max-w-2xl"
        >
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-celestial-cyan" />
            <span>Deterministic Provenance</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Network className="w-4 h-4 text-celestial-violet" />
            <span>Prerequisite Graph Extraction</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-celestial-cyan shadow-glow-cyan" />
            <span>Zero Hallucination Traps</span>
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-starlight-dim">
          Scroll To Dissolve
        </span>
        <div className="w-4 h-7 rounded-full border border-white/20 flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-celestial-cyan"
          />
        </div>
      </motion.div>
    </section>
  );
};
