"use client";

import React from "react";
import { Sparkles, Compass, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 px-4 bg-space-950 border-t border-white/[0.06] text-starlight-muted text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-space-850 border border-white/10 flex items-center justify-center text-celestial-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-celestial-cyan shadow-glow-cyan" />
          </div>
          <div>
            <div className="font-display text-sm font-bold text-starlight-pure">
              GuruKul<span className="text-celestial-cyan"> AI</span>
            </div>
            <div className="text-[10px] font-mono text-starlight-dim">
              The Knowledge Constellation Engine
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px]">
          <a href="#problem" className="hover:text-celestial-cyan transition-colors">
            The Problem
          </a>
          <a href="#reveal" className="hover:text-celestial-cyan transition-colors">
            The Reveal
          </a>
          <a href="#trace" className="hover:text-celestial-cyan transition-colors">
            Light Trace
          </a>
          <a href="#mastery" className="hover:text-celestial-cyan transition-colors">
            Illumination
          </a>
          <a href="#process" className="hover:text-celestial-cyan transition-colors">
            How It Works
          </a>
        </div>

        {/* Status Line */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-starlight-dim">
          <span className="w-1.5 h-1.5 rounded-full bg-celestial-cyan animate-pulse" />
          <span>All Nodes Grounded In Primary Citations</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-starlight-dim gap-2">
        <span>© {new Date().getFullYear()} GuruKul AI. Built for deep comprehension.</span>
        <span>Awwwards-Tier Engineering • Next.js 14 + GSAP + Framer Motion</span>
      </div>
    </footer>
  );
};
