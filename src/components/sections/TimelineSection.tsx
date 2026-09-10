"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Shield } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MilestoneBeat {
  id: string;
  week: string;
  title: string;
  desc: string;
  metric?: string;
  status: string;
}

const MILESTONE_BEATS: MilestoneBeat[] = [
  {
    id: "week-01",
    week: "WEEK 01",
    title: "Flat syllabus, ignored by week two",
    desc: "A dense syllabus PDF sits dormant after the first few days of the semester. Topic relationships stay hidden, deadlines blur together, and prerequisite chains remain invisible.",
    metric: "0% Illuminated • 0 Traced Sources",
    status: "INERT DOCUMENT PHASE",
  },
  {
    id: "week-03",
    week: "WEEK 03",
    title: "First light: your first question, traced to its source",
    desc: "A question enters GuruKul AI. Instead of returning a black-box answer, a pulse of light travels across the knowledge graph and illuminates the exact syllabus node that produced the answer.",
    metric: "22% Illuminated • 5 Sources Traced",
    status: "PROVENANCE AWAKENED",
  },
  {
    id: "week-06",
    week: "WEEK 06",
    title: "Half the constellation is already alive",
    desc: "Completed topics remain illuminated. Prerequisites become easier to understand and the student's course begins turning into a visible structure.",
    metric: "50% Illuminated • 15 Sources Traced",
    status: "CONSTELLATION GROWS",
  },
  {
    id: "week-12",
    week: "WEEK 12",
    title: "A map of everything you actually learned",
    desc: "What started as a static document is now a visible record of understanding — connected, illuminated and traceable.",
    metric: "100% Illuminated • 30 Sources Traced",
    status: "VISIBLE MASTERY",
  },
];

export const TimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const [activeBeatIndex, setActiveBeatIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const lastIndexRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || typeof window === "undefined") {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: "+=240%",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);

          const newIdx = Math.min(
            MILESTONE_BEATS.length - 1,
            Math.floor(p * MILESTONE_BEATS.length)
          );

          if (newIdx !== lastIndexRef.current) {
            lastIndexRef.current = newIdx;
            setActiveBeatIndex(newIdx);
          }
        },
      });
    }, pinRef);

    return () => ctx.revert();
  }, []);

  const activeBeat = MILESTONE_BEATS[activeBeatIndex];

  return (
    <section id="timeline" ref={containerRef} className="relative bg-[#050706]">
      {/* Pinned Stage */}
      <div
        ref={pinRef}
        className="relative w-full h-[100svh] min-h-[680px] flex flex-col justify-between py-10 px-6 sm:px-12 overflow-hidden"
      >
        {/* Subtle Cosmic Radial Illumination */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-colors duration-700"
          style={{
            backgroundColor:
              activeBeatIndex === 0
                ? "rgba(18, 24, 22, 0.2)"
                : activeBeatIndex === 1
                ? "rgba(53, 245, 180, 0.12)"
                : activeBeatIndex === 2
                ? "rgba(72, 232, 208, 0.14)"
                : "rgba(118, 86, 217, 0.16)",
          }}
        />

        {/* Top Header Information */}
        <div className="relative z-20 flex items-center justify-between max-w-6xl mx-auto w-full pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#090D0C] border border-[#35F5B4]/20 text-[#35F5B4] text-xs font-mono backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-[#35F5B4]" />
            <span className="tracking-wide">THE STUDENT LEARNING ARC • MILESTONE SCRUBBER</span>
          </div>

          <div className="text-xs font-mono text-starlight-dim flex items-center gap-3">
            <span>CHOREOGRAPHY 0{activeBeatIndex + 1} / 04</span>
            <div className="w-20 h-1 bg-[#0C1110] rounded-full overflow-hidden border border-emerald-500/10">
              <div
                className="h-full bg-[#35F5B4] transition-all duration-300 shadow-[0_0_10px_#35F5B4]"
                style={{ width: `${((activeBeatIndex + 1) / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Center Milestone Content Stage */}
        <div className="relative z-20 max-w-4xl mx-auto w-full my-auto flex flex-col justify-center min-h-[300px]">
          {/* Week Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold tracking-widest text-[#050706] px-2.5 py-1 rounded bg-[#35F5B4]">
              {activeBeat.week}
            </span>
            <span className="text-xs font-mono text-starlight-dim tracking-wider uppercase">
              {`// ${activeBeat.status}`}
            </span>
          </div>

          {/* Primary Milestone Headline */}
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#F3F6F5] leading-[1.08] mb-6">
            {activeBeat.title}
          </h2>

          {/* Milestone Description */}
          <p className="text-base sm:text-lg text-starlight-muted max-w-2xl leading-relaxed mb-8">
            {activeBeat.desc}
          </p>

          {/* Metric Pill */}
          {activeBeat.metric && (
            <div className="inline-flex items-center gap-3 p-3 rounded-xl bg-[#090D0C] border border-[#35F5B4]/20 w-fit backdrop-blur-md">
              <Shield className="w-4 h-4 text-[#35F5B4]" />
              <span className="text-xs font-mono text-[#35F5B4] font-medium">
                {activeBeat.metric}
              </span>
            </div>
          )}
        </div>

        {/* Bottom Horizontal Milestone Navigator */}
        <div className="relative z-20 max-w-4xl mx-auto w-full grid grid-cols-4 gap-3 pt-6 border-t border-emerald-500/10">
          {MILESTONE_BEATS.map((beat, i) => {
            const isActive = i === activeBeatIndex;
            return (
              <button
                key={beat.id}
                type="button"
                onClick={() => setActiveBeatIndex(i)}
                className={`flex flex-col items-start gap-1.5 cursor-pointer text-left transition-all duration-300 group ${
                  isActive ? "opacity-100" : "opacity-35 hover:opacity-75"
                }`}
              >
                <div className="flex items-center gap-2 w-full">
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-[#35F5B4] shadow-[0_0_10px_#35F5B4] scale-125"
                        : "bg-white/20"
                    }`}
                  />
                  <span
                    className={`text-xs font-mono font-bold tracking-wider ${
                      isActive ? "text-[#35F5B4]" : "text-starlight-dim"
                    }`}
                  >
                    {beat.week}
                  </span>
                </div>
                <div
                  className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                    isActive ? "bg-[#35F5B4] shadow-[0_0_8px_#35F5B4]" : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

