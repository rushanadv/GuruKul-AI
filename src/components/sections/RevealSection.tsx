"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, ArrowUpRight, Sparkles } from "lucide-react";
import { Constellation } from "../Constellation";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const RevealSection: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const docRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);
  const graphRef = useRef<HTMLDivElement | null>(null);

  const [manualProgress, setManualProgress] = useState<number>(0);
  const [isPinnedActive, setIsPinnedActive] = useState<boolean>(false);

  // Dissolve particle fragments that break off the document
  const particles = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const distance = 160 + (i % 6) * 45;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 4 + (i % 4) * 3,
    };
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || window.innerWidth < 768) {
      setIsPinnedActive(false);
      return;
    }

    setIsPinnedActive(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            setManualProgress(Math.round(self.progress * 100));
          },
        },
      });

      // 1. Flat Document floats and dissolves
      tl.to(
        docRef.current,
        {
          scale: 0.78,
          opacity: 0,
          filter: "blur(16px)",
          duration: 0.4,
          ease: "power2.inOut",
        },
        0
      );

      // 2. Particles break off & radiate outward
      if (particlesRef.current) {
        const particleEls = particlesRef.current.children;
        tl.fromTo(
          particleEls,
          {
            opacity: 0,
            scale: 0.2,
            x: 0,
            y: 0,
          },
          {
            opacity: 1,
            scale: 1.3,
            duration: 0.35,
            stagger: 0.012,
            ease: "power2.out",
          },
          0.05
        );

        tl.to(
          particleEls,
          {
            opacity: 0,
            scale: 0,
            duration: 0.3,
            ease: "power2.in",
          },
          0.38
        );
      }

      // 3. Constellation Graph emerges and illuminates
      tl.fromTo(
        graphRef.current,
        {
          opacity: 0,
          scale: 0.75,
          filter: "blur(18px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
        },
        0.28
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const effectiveProgress = isPinnedActive ? manualProgress : manualProgress || 100;

  return (
    <section id="reveal" className="relative bg-[#050706] border-t border-emerald-500/10">
      {/* ScrollTrigger Pin Target Container */}
      <div
        ref={triggerRef}
        className="relative w-full h-[100svh] min-h-[700px] flex flex-col justify-between py-10 px-4 overflow-hidden"
      >
        {/* Atmospheric ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#35F5B4]/[0.08] blur-[150px] rounded-full pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Top Header */}
        <div className="max-w-4xl mx-auto text-center z-10 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35F5B4]/10 border border-[#35F5B4]/30 text-[#35F5B4] text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="uppercase tracking-wider font-semibold">THE REVEAL</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[#F3F6F5] mb-3">
            {effectiveProgress < 40 ? (
              <span>{"A syllabus shouldn't stay a document."}</span>
            ) : (
              <span className="text-[#35F5B4] drop-shadow-[0_0_20px_rgba(53,245,180,0.3)]">
                Turn yours into a constellation.
              </span>
            )}
          </h2>

          <p className="text-sm sm:text-base text-starlight-muted max-w-xl mx-auto leading-relaxed">
            Watch dead paper break apart and reassemble into living, force-directed conceptual links.
          </p>
        </div>

        {/* Center Stage: Transforming Artifact */}
        <div className="relative flex-1 flex items-center justify-center my-4 min-h-[420px] max-h-[540px] w-full max-w-6xl mx-auto">
          {/* 1. Flat Document */}
          <div
            ref={docRef}
            className={`absolute z-20 w-80 sm:w-96 rounded-2xl bg-[#090D0C] border border-[#35F5B4]/20 p-6 shadow-2xl transition-all duration-300 ${
              effectiveProgress > 75 ? "pointer-events-none" : ""
            }`}
            style={{
              opacity: isPinnedActive ? undefined : 1 - effectiveProgress / 100,
              transform: isPinnedActive ? undefined : `scale(${1 - (effectiveProgress / 100) * 0.2})`,
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#35F5B4]" />
                <span className="text-xs font-mono font-semibold text-[#F3F6F5]">
                  Syllabus_Ingestion.pdf
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#35F5B4]/10 text-[#35F5B4] border border-[#35F5B4]/30">
                DISINTEGRATING
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs opacity-60">
              <div className="h-2.5 w-3/4 bg-[#35F5B4]/30 rounded animate-pulse" />
              <div className="h-2 w-full bg-white/10 rounded" />
              <div className="h-2 w-5/6 bg-white/10 rounded" />
              <div className="p-3 rounded bg-[#050706] border border-white/5 text-[11px] space-y-1 text-starlight-dim">
                <div>• Module 1: Foundational Topology</div>
                <div>• Module 2: Prerequisite Lineage</div>
                <div>• Module 3: Grounded Q&A Nodes</div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#35F5B4] flex items-center justify-between">
              <span>Constellation Synthesizing</span>
              <span className="animate-spin text-xs">✦</span>
            </div>
          </div>

          {/* 2. Particle Array */}
          <div
            ref={particlesRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            aria-hidden="true"
          >
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full bg-[#35F5B4] shadow-[0_0_10px_#35F5B4]"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  transform: `translate(${p.x}px, ${p.y}px)`,
                }}
              />
            ))}
          </div>

          {/* 3. The Living Constellation */}
          <div
            ref={graphRef}
            className="relative z-10 w-full h-[400px] sm:h-[480px]"
            style={{
              opacity: isPinnedActive ? undefined : effectiveProgress / 100,
            }}
          >
            <Constellation
              nodeCount={22}
              litPercentage={Math.max(30, effectiveProgress)}
              interactive={true}
              showLabels={true}
              staggerLit={true}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="max-w-xl mx-auto w-full z-20 text-center pb-4">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#35F5B4] text-[#050706] text-base font-mono font-semibold tracking-wide hover:bg-[#1AC98B] transition-all duration-300 shadow-[0_0_30px_rgba(53,245,180,0.45)] group cursor-pointer"
          >
            <span>Build my constellation</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

