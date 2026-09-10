"use client";

import React, { useState } from "react";
import { Eye, Zap, BookOpen, CheckCircle2 } from "lucide-react";
import { Constellation } from "../Constellation";
import { TRACE_QUERIES } from "@/data/constellationData";

export const InteriorRevealSection: React.FC = () => {
  const [activeWindow, setActiveWindow] = useState<1 | 2 | 3>(1);
  const [litMastery, setLitMastery] = useState<number>(85);
  const [activeQueryIndex, setActiveQueryIndex] = useState<number>(0);

  const currentQuery = TRACE_QUERIES[activeQueryIndex];

  return (
    <section id="interior" className="relative py-28 px-4 sm:px-8 bg-[#050706] overflow-hidden">
      {/* Warm Ambient Amber Lighting for Product Reveal */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full blur-[160px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(233, 169, 47, 0.14) 0%, rgba(233, 169, 47, 0.04) 60%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9A92F]/10 border border-[#E9A92F]/30 text-[#E9A92F] text-xs font-mono mb-4 backdrop-blur-md">
            <Eye className="w-3.5 h-3.5 text-[#E9A92F]" />
            <span className="uppercase tracking-wider font-semibold">THE INTERIOR REVEAL • TANGIBLE INTERFACE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[#F3F6F5] mb-4 leading-[1.1]">
            {"This isn't a mockup. It's what studying with GuruKul feels like."}
          </h2>

          <p className="text-sm sm:text-base text-starlight-muted max-w-2xl mx-auto leading-relaxed">
            See the system through three observation windows: the knowledge constellation, the visual retrieval trace, and progress illumination.
          </p>

          {/* Window Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {[
              { id: 1, label: "WINDOW 01 — Knowledge Constellation" },
              { id: 2, label: "WINDOW 02 — Live Q&A Light Trace" },
              { id: 3, label: "WINDOW 03 — Progress Illumination" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveWindow(tab.id as 1 | 2 | 3)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                  activeWindow === tab.id
                    ? "bg-[#E9A92F]/20 border border-[#E9A92F]/60 text-[#E9A92F] shadow-[0_0_20px_rgba(233,169,47,0.25)]"
                    : "bg-[#090D0C] border border-white/10 text-starlight-muted hover:text-[#F3F6F5]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Observation Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* WINDOW 1: The Knowledge Constellation Panel */}
          <div
            className={`lg:col-span-7 transition-all duration-500 ${
              activeWindow === 1 ? "ring-1 ring-[#E9A92F]/40 shadow-[0_0_50px_rgba(233,169,47,0.12)]" : "opacity-90"
            }`}
          >
            <div className="relative h-full rounded-3xl bg-[#090D0C] border border-[#E9A92F]/20 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Corner scientific tag */}
              <div className="flex items-center justify-between z-10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E9A92F] animate-pulse shadow-[0_0_10px_#E9A92F]" />
                  <span className="text-xs font-mono text-[#F3F6F5] font-semibold uppercase tracking-wider">
                    OBSERVATION WINDOW 01 // KNOWLEDGE CONSTELLATION
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E9A92F]/10 text-[#E9A92F] border border-[#E9A92F]/30">
                  REAL-TIME GRAPH
                </span>
              </div>

              {/* Interactive Constellation View */}
              <div className="relative w-full h-[360px] sm:h-[420px] my-auto">
                <Constellation
                  nodeCount={22}
                  litPercentage={88}
                  interactive={true}
                  showLabels={true}
                  className="w-full h-full"
                />
              </div>

              {/* Footer Technical Caption */}
              <div className="z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-starlight-dim">
                <span className="text-[#E9A92F]">CS 229 • Machine Learning Topology</span>
                <span>22 Nodes • 30 Prerequisite Bridges</span>
              </div>
            </div>
          </div>

          {/* Right Side: WINDOW 2 & WINDOW 3 Stacked Panels */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* WINDOW 2: Live Q&A Light Trace */}
            <div
              className={`rounded-3xl bg-[#090D0C] border border-white/10 p-6 relative overflow-hidden transition-all duration-300 ${
                activeWindow === 2 ? "ring-1 ring-[#35F5B4]/50 shadow-[0_0_30px_rgba(53,245,180,0.2)]" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#35F5B4]" />
                  <span className="text-xs font-mono text-[#F3F6F5] font-semibold uppercase tracking-wider">
                    OBSERVATION WINDOW 02 // Q&A LIGHT TRACE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#35F5B4]">VERIFIED CITED SOURCE</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#050706] border border-white/10 mb-3">
                <div className="text-[10px] font-mono text-starlight-dim mb-1">
                  Query: {currentQuery.title}
                </div>
                <div className="text-xs text-[#F3F6F5] font-medium mb-2">
                  &ldquo;{currentQuery.prompt}&rdquo;
                </div>
                <div className="text-xs text-starlight-muted leading-relaxed mb-2 bg-[#0C1110] p-3 rounded-xl border border-white/5">
                  {currentQuery.answer}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#35F5B4]">
                  <BookOpen className="w-3 h-3" />
                  <span className="truncate">{currentQuery.citation}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-starlight-dim">
                <button
                  type="button"
                  onClick={() =>
                    setActiveQueryIndex((prev) => (prev + 1) % TRACE_QUERIES.length)
                  }
                  className="text-[#35F5B4] hover:underline cursor-pointer"
                >
                  Next Question →
                </button>
                <span>Confidence: 99.4%</span>
              </div>
            </div>

            {/* WINDOW 3: Progress Illumination */}
            <div
              className={`rounded-3xl bg-[#090D0C] border border-white/10 p-6 relative overflow-hidden transition-all duration-300 ${
                activeWindow === 3 ? "ring-1 ring-[#E9A92F]/50 shadow-[0_0_30px_rgba(233,169,47,0.2)]" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E9A92F]" />
                  <span className="text-xs font-mono text-[#F3F6F5] font-semibold uppercase tracking-wider">
                    OBSERVATION WINDOW 03 // PROGRESS ILLUMINATION
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#E9A92F]">{litMastery}% RADIANT</span>
              </div>

              <p className="text-xs text-starlight-muted mb-3 leading-relaxed">
                Drag slider to simulate semester comprehension progress:
              </p>

              <input
                type="range"
                min={10}
                max={100}
                value={litMastery}
                onChange={(e) => setLitMastery(Number(e.target.value))}
                className="w-full h-2 bg-[#0C1110] rounded-lg appearance-none cursor-pointer accent-[#E9A92F] mb-4"
              />

              <div className="grid grid-cols-2 gap-3 text-center text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#050706] border border-white/5">
                  <div className="text-[10px] text-starlight-dim">Illuminated Nodes</div>
                  <div className="font-bold text-[#E9A92F] mt-0.5">
                    {Math.round((litMastery / 100) * 22)} / 22 Active
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#050706] border border-white/5">
                  <div className="text-[10px] text-starlight-dim">Prerequisite Bridges</div>
                  <div className="font-bold text-[#35F5B4] mt-0.5">30 Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

