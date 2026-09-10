"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, AlertTriangle, HelpCircle, EyeOff, XCircle } from "lucide-react";

export const ProblemSection: React.FC = () => {
  return (
    <section id="problem" className="relative py-28 px-4 border-t border-white/[0.04] bg-space-950">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dormant-node/60 border border-dormant-border text-starlight-muted text-xs font-mono mb-4">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500/80" />
            <span>The Status Quo Pathology</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter text-starlight-pure mb-4">
            The flat document that gets abandoned on day eight.
          </h2>
          <p className="text-starlight-muted text-base sm:text-lg leading-relaxed">
            Course syllabi are packed with semester-defining wisdom, yet they sit trapped in inert
            PDFs. Without living connections, students face three quiet crises.
          </p>
        </div>

        {/* Inert Document Mockup & 3 Breakdown Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: The Flat, Inert Syllabus Document Mockup (Deliberately Muted & Desaturated) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-[#0e0f14] border border-[#232630] p-6 text-starlight-dim shadow-inner overflow-hidden">
              {/* Header Bar of the Mock PDF */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#232630]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-[#181a22] text-[#6b7280]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#8b919e] font-semibold">
                      CS_229_Syllabus_Fall_FINAL_v3.pdf
                    </div>
                    <div className="text-[10px] font-mono text-[#555b68]">
                      Format: PDF • 18 Pages • Modified: Aug 24
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#1c1f28] text-[10px] font-mono text-[#6b7280] border border-[#282d3b]">
                  INERT
                </span>
              </div>

              {/* Dead Lines of Grayed Out Text */}
              <div className="space-y-4 opacity-75 select-none font-mono text-xs">
                <div>
                  <div className="h-3 w-1/3 bg-[#242834] rounded mb-2" />
                  <div className="h-2 w-full bg-[#1b1e27] rounded mb-1.5" />
                  <div className="h-2 w-5/6 bg-[#1b1e27] rounded" />
                </div>

                {/* Dead Table / Schedule */}
                <div className="rounded-lg border border-[#232630] bg-[#12141c] p-3 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-[#717887] pb-1 border-b border-[#1f222b]">
                    <span>Week 1: Vector Spaces & Linear Maps</span>
                    <span className="text-[#555a68]">Assigned</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#717887] pb-1 border-b border-[#1f222b]">
                    <span>Week 4: Backpropagation Chain Dynamics</span>
                    <span className="text-[#555a68]">Forgotten</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#717887] pb-1 border-b border-[#1f222b]">
                    <span>Week 8: Vanishing Gradient Collapse</span>
                    <span className="text-amber-500/70">Prerequisite Missing</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#717887]">
                    <span>Week 14: Final Exam (Cumulative)</span>
                    <span className="text-red-400/60">Panic Mode</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="h-2 w-full bg-[#1b1e27] rounded" />
                  <div className="h-2 w-4/5 bg-[#1b1e27] rounded" />
                  <div className="h-2 w-2/3 bg-[#1b1e27] rounded" />
                </div>
              </div>

              {/* Stamp of Ineffectiveness */}
              <div className="mt-6 pt-4 border-t border-[#232630] flex items-center justify-between text-[11px] font-mono text-[#5c6373]">
                <div className="flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-red-400/60" />
                  <span>No interactive connections</span>
                </div>
                <span>0% Luminous Tracing</span>
              </div>
            </div>
          </div>

          {/* Right: The Three Crises from PRD Part 1 */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Crisis 1 */}
            <div className="p-5 rounded-2xl bg-space-850/50 border border-white/[0.06] hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-red-950/40 border border-red-500/20 flex items-center justify-center text-red-400">
                  <EyeOff className="w-4 h-4" />
                </div>
                <h3 className="font-display text-base font-semibold text-starlight-pure">
                  1. The Syllabus Abandonment Cycle
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-starlight-muted leading-relaxed pl-11">
                Professors spend weeks crafting course roadmaps, yet 92% of students never open the
                document after the first week. It becomes a passive cemetery of unclicked links and
                obscure reading lists.
              </p>
            </div>

            {/* Crisis 2 */}
            <div className="p-5 rounded-2xl bg-space-850/50 border border-white/[0.06] hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-950/40 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="font-display text-base font-semibold text-starlight-pure">
                  2. The Invisible Prerequisite Gap
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-starlight-muted leading-relaxed pl-11">
                Knowledge is non-linear. When you fail to understand ResNet skip connections in Week 8,
                the root failure isn&apos;t ResNet—it&apos;s a shaky mental model of matrix multiplication from
                Week 1. Dead documents cannot show you that prerequisite bridge.
              </p>
            </div>

            {/* Crisis 3 */}
            <div className="p-5 rounded-2xl bg-space-850/50 border border-white/[0.06] hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-950/40 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h3 className="font-display text-base font-semibold text-starlight-pure">
                  3. The Black-Box AI Hallucination Trap
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-starlight-muted leading-relaxed pl-11">
                Students turn to generic LLMs in desperation. The chatbots output confident,
                unsourced answers that often drift outside the professor&apos;s curriculum, inventing
                untested notation and destroying academic trust.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
