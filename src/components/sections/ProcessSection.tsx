"use client";

import React from "react";
import { UploadCloud, Network, MessageSquareCode, Sparkles } from "lucide-react";

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      icon: UploadCloud,
      title: "Upload Syllabus",
      description:
        "Upload a real course syllabus. GuruKul extracts its structure instead of treating it as plain text.",
    },
    {
      number: "02",
      icon: Network,
      title: "Constellation Synthesizes",
      description:
        "Topics become nodes and prerequisite relationships form the visible knowledge structure.",
    },
    {
      number: "03",
      icon: MessageSquareCode,
      title: "Ask Anything",
      description:
        "Ask a question. A visible pulse travels through the graph to the exact source node.",
    },
    {
      number: "04",
      icon: Sparkles,
      title: "Watch It Grow",
      description:
        "Studied topics remain illuminated until the entire course becomes a visible map of progress.",
    },
  ];

  return (
    <section id="process" className="py-24 px-4 bg-[#050706] border-t border-emerald-500/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 text-center sm:text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-[#35F5B4] font-semibold block mb-2">
            PROTOCOL OVERVIEW
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-medium tracking-tight text-[#F3F6F5]">
            How The Constellation Operates
          </h2>
        </div>

        {/* 4 Steps Horizontal Grid — Scientific Protocol Diagram Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-[#090D0C] border border-emerald-500/10 hover:border-[#35F5B4]/30 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-8 h-8 rounded-xl bg-[#0C1110] border border-emerald-500/20 flex items-center justify-center text-[#35F5B4]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono text-starlight-dim font-bold">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-semibold text-[#F3F6F5] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-starlight-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-starlight-dim">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35F5B4]" />
                  <span>Verified Protocol</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

