"use client";

import React from "react";
import { ArrowUpRight, ShieldCheck, Mail } from "lucide-react";
import { ConstellationCore3D } from "../lunar-gravity-card";
import Link from "next/link";

export const Cta3DSection: React.FC = () => {
  return (
    <section className="relative py-32 px-4 bg-[#050706] overflow-hidden border-t border-emerald-500/10">
      {/* Ambient 3D Constellation Core */}
      <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none -z-10 scale-90">
        <ConstellationCore3D ringState="visible" interactive={false} className="w-full max-w-4xl h-[600px]" />
      </div>

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#35F5B4]/[0.08] blur-[150px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35F5B4]/10 border border-[#35F5B4]/30 text-[#35F5B4] text-xs font-mono mb-8 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#35F5B4] animate-pulse" />
          <span>Core Guarantee</span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#F3F6F5] justify-center mb-6 leading-[1.08]">
          Nothing here is a black box.
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-starlight-muted max-w-xl mx-auto leading-relaxed mb-10">
          Your course has always been an interconnected cosmos. GuruKul AI is the telescope that makes the light visible.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <Link
            href="/app"
            className="px-8 py-4 rounded-full bg-[#35F5B4] text-[#050706] text-base font-mono font-semibold tracking-wide hover:bg-[#1AC98B] transition-all duration-300 shadow-[0_0_25px_rgba(53,245,180,0.4)] flex items-center gap-2 group"
          >
            <span>Build my constellation</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <a
            href="mailto:hello@gurukul.ai"
            className="px-6 py-4 rounded-full bg-[#090D0C] border border-white/10 hover:border-[#35F5B4]/40 text-sm font-mono text-starlight-muted hover:text-[#F3F6F5] transition-all duration-300 flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-[#35F5B4]" />
            <span>Questions? hello@gurukul.ai</span>
          </a>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-starlight-dim">
          <ShieldCheck className="w-4 h-4 text-[#35F5B4]" />
          <span>Works with PDF, Markdown, Canvas, and Blackboard syllabi</span>
        </div>
      </div>
    </section>
  );
};

