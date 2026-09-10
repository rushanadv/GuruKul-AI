"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Compass, TrendingUp, Sparkles, Check, Flame } from "lucide-react";
import { Constellation } from "../Constellation";

export const ProgressSection: React.FC = () => {
  // Preset milestone percentages
  const [litPercent, setLitPercent] = useState<number>(90);
  const [activePreset, setActivePreset] = useState<"day1" | "midterm" | "finals">("finals");

  const milestones = [
    {
      id: "day1",
      label: "Day 1: Ingestion",
      sublabel: "Syllabus Initialized",
      percentage: 18,
      conceptsCount: 4,
      desc: "Foundational math and linear algebra nodes awaken. The rest of the curriculum awaits your curiosity.",
    },
    {
      id: "midterm",
      label: "Week 7: Midterm",
      sublabel: "Core Dynamics Active",
      percentage: 55,
      conceptsCount: 12,
      desc: "Backpropagation, gradient descent, and convolutional vision networks fully illuminated.",
    },
    {
      id: "finals",
      label: "Week 14: Finals",
      sublabel: "Constellation Radiant",
      percentage: 100,
      conceptsCount: 22,
      desc: "Zero cognitive blindspots. Attention mechanisms, transformers, and alignment fully mastered.",
    },
  ];

  const handleSelectPreset = (presetId: "day1" | "midterm" | "finals", pct: number) => {
    setActivePreset(presetId);
    setLitPercent(pct);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setLitPercent(val);
    if (val < 35) setActivePreset("day1");
    else if (val < 75) setActivePreset("midterm");
    else setActivePreset("finals");
  };

  return (
    <section id="mastery" className="relative py-28 px-4 bg-space-950 border-t border-white/[0.04]">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-celestial-cyan/[0.07] blur-[150px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-celestial-violet-dim border border-celestial-violet/30 text-celestial-violet text-xs font-mono mb-4">
            <Flame className="w-3.5 h-3.5 text-celestial-cyan" />
            <span>Section 5: Progress Illumination</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter text-starlight-pure mb-4">
            Every bit of progress is visible.
          </h2>

          <p className="text-starlight-muted text-base sm:text-lg leading-relaxed">
            Forget vague completion percentages. As you solve problem sets and verify citations,
            watch dormant slate nodes organically ignite into radiant celestial starlight.
          </p>
        </div>

        {/* Interactive Milestone Switcher & Scrub Slider */}
        <div className="max-w-2xl mx-auto mb-10 flex flex-col items-center gap-6">
          {/* 3 Preset Milestone Buttons */}
          <div className="grid grid-cols-3 gap-2 w-full p-1.5 rounded-2xl bg-space-850/80 border border-white/10 backdrop-blur-md">
            {milestones.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() =>
                  handleSelectPreset(m.id as "day1" | "midterm" | "finals", m.percentage)
                }
                className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all duration-300 flex flex-col items-center gap-0.5 ${
                  activePreset === m.id
                    ? "bg-space-750 text-starlight-pure border border-celestial-cyan/40 shadow-glow-cyan"
                    : "text-starlight-muted hover:text-starlight-base"
                }`}
              >
                <span className="font-semibold">{m.label}</span>
                <span className="text-[10px] font-mono text-celestial-cyan">
                  {m.percentage}% Lit
                </span>
              </button>
            ))}
          </div>

          {/* Continuous Smooth Scrub Slider */}
          <div className="w-full flex items-center gap-4 px-2">
            <span className="text-xs font-mono text-starlight-dim whitespace-nowrap">
              0% Dormant
            </span>
            <input
              type="range"
              min={5}
              max={100}
              value={litPercent}
              onChange={handleSliderChange}
              className="w-full h-2 bg-space-800 rounded-lg appearance-none cursor-pointer accent-celestial-cyan"
              aria-label="Constellation illumination percentage"
            />
            <span className="text-xs font-mono text-celestial-cyan font-bold whitespace-nowrap min-w-[50px] text-right">
              {litPercent}% Lit
            </span>
          </div>
        </div>

        {/* Graphic Stage: The Constellation illuminating organically */}
        <div className="relative rounded-2xl bg-space-900 border border-white/[0.08] p-4 sm:p-8 shadow-glass-surface overflow-hidden mb-8">
          <div className="relative w-full h-[380px] sm:h-[480px]">
            <Constellation
              nodeCount={22}
              litPercentage={litPercent}
              interactive={true}
              showLabels={true}
              staggerLit={true}
              className="w-full h-full"
            />
          </div>

          {/* Floating Live State Badge */}
          <div className="absolute top-6 right-6 p-3 rounded-xl bg-space-950/80 backdrop-blur-md border border-white/10 hidden sm:flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-celestial-cyan/10 border border-celestial-cyan/30 flex items-center justify-center text-celestial-cyan">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-starlight-pure font-bold">
                Organic Fill-Up Sequence
              </div>
              <div className="text-[10px] font-mono text-starlight-dim">
                Non-linear cognitive activation
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-space-850/50 border border-white/[0.06] flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-celestial-cyan/10 text-celestial-cyan border border-celestial-cyan/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-starlight-dim mb-1">
                Illuminated Nodes
              </div>
              <div className="font-display text-2xl font-bold text-starlight-pure">
                {Math.round((litPercent / 100) * 22)} / 22
              </div>
              <div className="text-xs text-starlight-muted mt-1">
                Active conceptual mastery points
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-space-850/50 border border-white/[0.06] flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-celestial-violet/10 text-celestial-violet border border-celestial-violet/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-starlight-dim mb-1">
                Prerequisite Retention
              </div>
              <div className="font-display text-2xl font-bold text-celestial-cyan">
                {(82 + (litPercent / 100) * 17.8).toFixed(1)}%
              </div>
              <div className="text-xs text-starlight-muted mt-1">
                Grounded across course syllabus
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-space-850/50 border border-white/[0.06] flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-starlight-dim mb-1">
                Black-Box Gaps
              </div>
              <div className="font-display text-2xl font-bold text-emerald-400">
                0 Gaps
              </div>
              <div className="text-xs text-starlight-muted mt-1">
                Every node cites primary literature
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
