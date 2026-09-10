"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileText,
  Sparkles,
  Send,
  BookOpen,
  CheckCircle2,
  Zap,
  ArrowLeft,
  Compass,
  Sliders,
  Layers,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { Constellation } from "@/components/Constellation";
import { CONSTELLATION_NODES, TRACE_QUERIES, ConstellationNode } from "@/data/constellationData";
import { Starfield } from "@/components/Starfield";

export default function AppWorkspace() {
  const [activeCourse, setActiveCourse] = useState("CS 229 • Machine Learning Topology");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isUploaded, setIsUploaded] = useState(true);

  // App workspace states
  const [activeTab, setActiveTab] = useState<"graph" | "trace" | "progress">("graph");
  const [selectedNode, setSelectedNode] = useState<ConstellationNode | null>(null);

  // Illumination state
  const [litNodeIds, setLitNodeIds] = useState<Set<string>>(
    new Set(CONSTELLATION_NODES.slice(0, 18).map((n) => n.id))
  );

  // Q&A trace states
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const [customQuestion, setCustomQuestion] = useState("");
  const [traceStage, setTraceStage] = useState<"idle" | "tracing" | "flared" | "answered">("answered");

  const currentQuery = TRACE_QUERIES[selectedQueryIndex];

  // Handle fake syllabus upload synthesis
  const handleUploadSyllabus = (courseName: string) => {
    setActiveCourse(courseName);
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setIsUploaded(true);
    }, 1600);
  };

  // Handle Q&A trace trigger
  const handleRunTrace = (index: number) => {
    setSelectedQueryIndex(index);
    setTraceStage("tracing");
    setTimeout(() => {
      setTraceStage("flared");
    }, 650);
    setTimeout(() => {
      setTraceStage("answered");
    }, 1300);
  };

  // Toggle node illumination
  const toggleNodeLit = (nodeId: string) => {
    setLitNodeIds((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const illuminatedCount = litNodeIds.size;
  const totalCount = CONSTELLATION_NODES.length;
  const illuminatedPercent = Math.round((illuminatedCount / totalCount) * 100);

  return (
    <main className="relative min-h-screen bg-[#050706] text-[#F3F6F5] flex flex-col font-sans overflow-x-hidden">
      <Starfield density={70} />

      {/* Top Application Bar */}
      <header className="relative z-40 w-full border-b border-emerald-500/10 bg-[#090D0C]/90 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-starlight-muted hover:text-[#35F5B4] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </Link>

          <div className="h-4 w-px bg-white/10" />

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#35F5B4] shadow-[0_0_10px_#35F5B4] animate-pulse" />
            <span className="font-display text-sm font-bold tracking-tight text-[#F3F6F5]">
              GuruKul AI <span className="text-xs font-mono font-normal text-starlight-muted ml-1">Observatory</span>
            </span>
          </div>
        </div>

        {/* Active Course & Mastery Meter */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050706] border border-emerald-500/10 text-xs font-mono text-starlight-muted">
            <BookOpen className="w-3.5 h-3.5 text-[#35F5B4]" />
            <span className="text-[#F3F6F5] font-medium">{activeCourse}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#35F5B4]/10 border border-[#35F5B4]/30 text-xs font-mono text-[#35F5B4]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{illuminatedPercent}% Radiant ({illuminatedCount}/{totalCount})</span>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="relative z-30 flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        {/* Course Ingestion Strip */}
        <div className="p-4 rounded-2xl bg-[#090D0C] border border-emerald-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0C1110] border border-[#35F5B4]/20 flex items-center justify-center text-[#35F5B4]">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F3F6F5]">
                Ingest New Course Syllabus
              </h3>
              <p className="text-xs text-starlight-muted">
                Extract structure, prerequisites, and citation links automatically.
              </p>
            </div>
          </div>

          {/* Preset Syllabi Loaders */}
          <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
            {[
              "CS 229 • Machine Learning",
              "CS 106B • Data Structures",
              "MATH 51 • Linear Algebra",
            ].map((course) => (
              <button
                key={course}
                type="button"
                onClick={() => handleUploadSyllabus(course)}
                className={`px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                  activeCourse === course
                    ? "bg-[#35F5B4]/20 border-[#35F5B4] text-[#35F5B4]"
                    : "bg-[#050706] border-white/10 text-starlight-muted hover:border-white/20"
                }`}
              >
                {course}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Ingestion Loading State */}
        <AnimatePresence>
          {isSynthesizing && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 rounded-2xl bg-[#090D0C] border border-[#35F5B4]/30 flex items-center justify-center gap-3 text-sm font-mono text-[#35F5B4]"
            >
              <span className="w-2 h-2 rounded-full bg-[#35F5B4] animate-ping" />
              <span>Parsing Syllabus → Building Knowledge Topology...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Workspace View Controls */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            {[
              { id: "graph", label: "Constellation Map", icon: Compass },
              { id: "trace", label: "Q&A Light Trace", icon: Zap },
              { id: "progress", label: "Progress Illumination", icon: CheckCircle2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as "graph" | "trace" | "progress")}
                  className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#35F5B4] text-[#050706] font-semibold shadow-[0_0_15px_rgba(53,245,180,0.3)]"
                      : "bg-[#090D0C] text-starlight-muted hover:text-[#F3F6F5] border border-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-starlight-dim hidden sm:block">
            Mode: Interactive Observatory
          </div>
        </div>

        {/* TAB 1: Constellation Map View */}
        {activeTab === "graph" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 rounded-3xl bg-[#090D0C] border border-emerald-500/10 p-6 relative overflow-hidden h-[540px]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#35F5B4]">
                  <span className="w-2 h-2 rounded-full bg-[#35F5B4] animate-pulse" />
                  <span>Live Interactive Knowledge Constellation</span>
                </div>
                <span className="text-[10px] font-mono text-starlight-dim">
                  Click any node to inspect syllabus details
                </span>
              </div>

              <div className="w-full h-[460px]">
                <Constellation
                  nodeCount={22}
                  litPercentage={illuminatedPercent}
                  interactive={true}
                  showLabels={true}
                  onNodeSelect={(node) => setSelectedNode(node)}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Right: Node Detail Inspection Panel */}
            <div className="lg:col-span-4 rounded-3xl bg-[#090D0C] border border-white/10 p-6 flex flex-col justify-between h-[540px]">
              {selectedNode ? (
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono text-[#35F5B4] uppercase px-2 py-0.5 rounded bg-[#35F5B4]/10 border border-[#35F5B4]/30">
                        {selectedNode.sublabel}
                      </span>
                      <span className="text-[10px] font-mono text-starlight-dim">
                        Order #{selectedNode.order}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#F3F6F5] mb-2">
                      {selectedNode.label}
                    </h3>

                    <p className="text-xs text-starlight-muted leading-relaxed mb-4">
                      {selectedNode.summary}
                    </p>

                    <div className="p-3 rounded-xl bg-[#050706] border border-white/5 mb-4 space-y-2">
                      <div className="text-[10px] font-mono text-starlight-dim uppercase">
                        Primary Citation
                      </div>
                      <div className="text-xs font-mono text-[#35F5B4]">
                        {selectedNode.citation}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleNodeLit(selectedNode.id)}
                      className={`w-full py-2.5 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                        litNodeIds.has(selectedNode.id)
                          ? "bg-[#35F5B4]/20 border border-[#35F5B4] text-[#35F5B4]"
                          : "bg-white/5 border border-white/10 text-starlight-muted hover:text-[#F3F6F5]"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {litNodeIds.has(selectedNode.id)
                          ? "Illuminated (Marked Mastered)"
                          : "Mark as Mastered"}
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <Compass className="w-10 h-10 text-[#35F5B4]/40 mb-3 animate-pulse" />
                  <h4 className="text-sm font-semibold text-[#F3F6F5] mb-1">
                    Select a Node on the Graph
                  </h4>
                  <p className="text-xs text-starlight-muted">
                    Click any star node in the constellation map to inspect its summary, citation, and prerequisite dependencies.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Live Q&A Light Trace View */}
        {activeTab === "trace" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-4 rounded-2xl bg-[#090D0C] border border-white/10">
                <span className="text-[11px] font-mono uppercase text-starlight-dim block mb-2">
                  Sample Study Questions:
                </span>
                <div className="flex flex-col gap-2">
                  {TRACE_QUERIES.map((q, idx) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => handleRunTrace(idx)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all duration-200 flex items-center justify-between cursor-pointer ${
                        selectedQueryIndex === idx
                          ? "bg-[#35F5B4]/10 border-[#35F5B4] text-[#F3F6F5]"
                          : "bg-[#050706] border-white/5 text-starlight-muted hover:border-white/15"
                      }`}
                    >
                      <span>{q.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#35F5B4]" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Answer Card */}
              <div className="p-5 rounded-2xl bg-[#090D0C] border border-emerald-500/20">
                <div className="text-xs font-mono text-starlight-dim mb-1">Question</div>
                <div className="text-sm font-medium text-[#F3F6F5] mb-3">
                  &ldquo;{currentQuery.prompt}&rdquo;
                </div>

                <div className="p-3.5 rounded-xl bg-[#050706] border border-white/5 mb-3 text-xs leading-relaxed text-starlight-muted">
                  {currentQuery.answer}
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#35F5B4]">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{currentQuery.citation}</span>
                  </div>
                  <span>99.4% Grounded</span>
                </div>
              </div>
            </div>

            {/* Right: Active Photon Trace Visualization */}
            <div className="lg:col-span-7 rounded-3xl bg-[#090D0C] border border-emerald-500/10 p-6 h-[540px]">
              <div className="flex items-center justify-between mb-2 text-xs font-mono text-[#35F5B4]">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Photon Traversal Path Active</span>
                </div>
                <span>Target Node: {currentQuery.targetNodeId.toUpperCase()}</span>
              </div>

              <div className="w-full h-[460px]">
                <Constellation
                  nodeCount={22}
                  litPercentage={illuminatedPercent}
                  activeTracePath={currentQuery.path}
                  flaringNodeId={
                    traceStage === "flared" || traceStage === "answered"
                      ? currentQuery.targetNodeId
                      : null
                  }
                  interactive={true}
                  showLabels={true}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Semester Progress Illumination View */}
        {activeTab === "progress" && (
          <div className="p-6 rounded-3xl bg-[#090D0C] border border-emerald-500/10 flex flex-col gap-6">
            <div>
              <h3 className="font-display text-xl font-bold text-[#F3F6F5] mb-1">
                Semester Topic Illumination Checklist
              </h3>
              <p className="text-xs text-starlight-muted">
                Check off topics as you study to illuminate your syllabus constellation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {CONSTELLATION_NODES.map((node) => {
                const isLit = litNodeIds.has(node.id);
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => toggleNodeLit(node.id)}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all duration-200 cursor-pointer ${
                      isLit
                        ? "bg-[#35F5B4]/10 border-[#35F5B4]/40 text-[#F3F6F5]"
                        : "bg-[#050706] border-white/5 text-starlight-dim opacity-60 hover:opacity-100"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center text-[10px] ${
                        isLit
                          ? "bg-[#35F5B4] text-[#050706] font-bold"
                          : "border border-white/20"
                      }`}
                    >
                      {isLit ? "✓" : ""}
                    </span>
                    <div>
                      <div className="text-xs font-semibold">{node.label}</div>
                      <div className="text-[10px] font-mono text-starlight-dim">
                        {node.sublabel}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
