"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Zap,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Shield,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import { TRACE_QUERIES, TraceQuery } from "@/data/constellationData";
import { Constellation } from "../Constellation";

export const LightTraceSection: React.FC = () => {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState<number>(0);
  const [animationStage, setAnimationStage] = useState<"idle" | "tracing" | "flared" | "answered">(
    "answered"
  );

  const activeQuery: TraceQuery = TRACE_QUERIES[selectedQueryIndex];

  // Execute trace sequence
  const executeTrace = (index: number) => {
    setSelectedQueryIndex(index);
    setAnimationStage("tracing");

    // Sequence timing:
    // 0ms: tracing begins (photons travel)
    // 600ms: target node flares visibly
    // 1200ms: answer card fades in below
    const timer1 = setTimeout(() => {
      setAnimationStage("flared");
    }, 650);

    const timer2 = setTimeout(() => {
      setAnimationStage("answered");
    }, 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  // Initial auto-trigger on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      executeTrace(0);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="trace" className="relative py-28 px-4 bg-space-900 border-t border-white/[0.04]">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-celestial-cyan/[0.06] blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-celestial-cyan-dim border border-celestial-cyan/30 text-celestial-cyan text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Section 4: Retrieval Made Visible</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter text-starlight-pure mb-4">
            Every answer fires a visible photon along the syllabus.
          </h2>

          <p className="text-starlight-muted text-base sm:text-lg leading-relaxed">
            No hallucinated black-box output. When you ask a question, GuruKul AI illuminates the
            exact path of foundational concepts leading to the answer before a single word appears.
          </p>
        </div>

        {/* Split Layout: Interactive Chat & Trace Terminal on Left, Constellation on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Chat & Provenance Terminal */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Query Selector Tabs */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-starlight-dim block">
                Select a Study Query:
              </span>
              <div className="flex flex-col gap-2">
                {TRACE_QUERIES.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => executeTrace(idx)}
                    type="button"
                    className={`text-left p-3 rounded-xl border transition-all duration-200 text-xs font-medium flex items-center justify-between group ${
                      selectedQueryIndex === idx
                        ? "bg-space-800 border-celestial-cyan/50 text-starlight-pure shadow-glow-cyan"
                        : "bg-space-850/40 border-white/[0.06] text-starlight-muted hover:border-white/15 hover:text-starlight-base"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          selectedQueryIndex === idx
                            ? "bg-celestial-cyan animate-ping"
                            : "bg-dormant-node"
                        }`}
                      />
                      <span>{q.title}</span>
                    </div>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        selectedQueryIndex === idx
                          ? "text-celestial-cyan translate-x-0.5"
                          : "text-starlight-dim group-hover:translate-x-0.5"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Mockup Card */}
            <div className="rounded-2xl bg-space-950 border border-white/10 p-5 shadow-glass-surface relative overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-celestial-cyan/60" />
                  <span className="text-[10px] font-mono text-starlight-dim ml-2">
                    gurukul-photon-trace::v2
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-celestial-cyan">
                  <span className="w-1.5 h-1.5 rounded-full bg-celestial-cyan animate-pulse" />
                  <span>
                    {animationStage === "tracing"
                      ? "Traveling Photons..."
                      : animationStage === "flared"
                      ? "Node Illuminated"
                      : "Provenance Verified"}
                  </span>
                </div>
              </div>

              {/* Input Prompt */}
              <div className="mb-4">
                <div className="text-[11px] font-mono text-starlight-dim mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-celestial-cyan" />
                  <span>Incoming Student Question</span>
                </div>
                <div className="p-3 rounded-xl bg-space-850 border border-white/5 text-sm text-starlight-pure font-medium">
                  &ldquo;{activeQuery.prompt}&rdquo;
                </div>
              </div>

              {/* Trace Path Lineage Chips */}
              <div className="mb-4">
                <div className="text-[10px] font-mono text-starlight-dim mb-1.5 uppercase tracking-wider">
                  Photon Prerequisite Route
                </div>
                <div className="flex items-center flex-wrap gap-1.5 text-[11px] font-mono">
                  {activeQuery.path.map((nodeId, idx) => (
                    <React.Fragment key={nodeId}>
                      <span
                        className={`px-2 py-0.5 rounded-md border ${
                          idx === activeQuery.path.length - 1
                            ? "bg-celestial-cyan/20 border-celestial-cyan text-celestial-cyan font-semibold shadow-glow-cyan"
                            : "bg-space-800 border-white/10 text-starlight-muted"
                        }`}
                      >
                        {nodeId.toUpperCase()}
                      </span>
                      {idx < activeQuery.path.length - 1 && (
                        <span className="text-celestial-cyan/60 font-bold">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Grounded Answer Card (fades in AFTER the flare happens visibly) */}
              <AnimatePresence mode="wait">
                {animationStage === "answered" && (
                  <motion.div
                    key={activeQuery.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="p-4 rounded-xl bg-space-850/90 border border-celestial-cyan/30 shadow-glass-surface"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-celestial-cyan" />
                        <span className="text-xs font-semibold text-starlight-pure">
                          Deterministic Answer
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-celestial-cyan px-2 py-0.5 rounded bg-celestial-cyan/10 border border-celestial-cyan/30">
                        {activeQuery.confidence}% Grounded
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-starlight-base leading-relaxed mb-3">
                      {activeQuery.answer}
                    </p>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-starlight-muted">
                      <div className="flex items-center gap-1.5 text-celestial-cyan">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[240px]">{activeQuery.citation}</span>
                      </div>
                      <span className="text-starlight-dim text-[10px]">Zero Hallucination</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Rerun Trace Button */}
              <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                <button
                  type="button"
                  onClick={() => executeTrace(selectedQueryIndex)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-celestial-cyan hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Replay Photon Wave</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Constellation Graph Display with Active Trace & Flaring Node */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-space-950 border border-white/[0.08] p-4 sm:p-6 shadow-2xl overflow-hidden min-h-[440px] flex flex-col justify-between">
              {/* Overlay Badge */}
              <div className="flex items-center justify-between z-20 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-celestial-cyan animate-pulse shadow-glow-cyan" />
                  <span className="text-xs font-mono text-starlight-pure font-semibold">
                    Live Knowledge Graph Trace
                  </span>
                </div>
                <span className="text-[10px] font-mono text-starlight-dim">
                  Interactive Node Inspection Enabled
                </span>
              </div>

              {/* Constellation SVG Component */}
              <div className="relative w-full h-[380px] sm:h-[460px]">
                <Constellation
                  nodeCount={22}
                  litPercentage={85}
                  activeTracePath={activeQuery.path}
                  flaringNodeId={
                    animationStage === "flared" || animationStage === "answered"
                      ? activeQuery.targetNodeId
                      : null
                  }
                  interactive={true}
                  showLabels={true}
                  className="w-full h-full"
                />
              </div>

              {/* Sub-bar explaining the flare timing */}
              <div className="z-20 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-starlight-dim gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-celestial-violet" />
                  <span>Path Traversal: {activeQuery.path.length} Prerequisites</span>
                </div>
                <div className="flex items-center gap-1.5 text-celestial-cyan">
                  <span>Target Node Flared: {activeQuery.targetNodeId.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
