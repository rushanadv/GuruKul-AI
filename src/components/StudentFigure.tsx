"use client";

import React from "react";

export const StudentFigure: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      className={`absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none z-10 w-full max-w-lg flex flex-col items-center justify-end ${className}`}
      aria-hidden="true"
    >
      {/* Upward ambient light wash bouncing from desk to sphere */}
      <div className="w-72 h-32 bg-celestial-cyan/10 blur-3xl rounded-full -mb-10 pointer-events-none" />

      <svg
        viewBox="0 0 400 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[160px] sm:max-h-[190px] drop-shadow-[0_-5px_20px_rgba(0,0,0,0.8)]"
      >
        <defs>
          <linearGradient id="figureRim" x1="200" y1="0" x2="200" y2="190" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00D9C0" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#07080C" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="bookLight" x1="200" y1="90" x2="200" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#00D9C0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00D9C0" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="lampCone" cx="200" cy="110" r="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00D9C0" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Lamp / Book upward lighting cone */}
        <path d="M150 160 L200 60 L250 160 Z" fill="url(#lampCone)" />

        {/* Study Desk Surface */}
        <rect x="60" y="150" width="280" height="40" rx="3" fill="#0A0B11" stroke="#1F2333" strokeWidth="1.2" />

        {/* Open Syllabus Notebook on desk */}
        <path d="M175 146 L198 143 L202 143 L225 146 L220 155 L200 152 L180 155 Z" fill="#181B26" stroke="#00D9C0" strokeWidth="0.8" />
        <ellipse cx="200" cy="144" rx="14" ry="4" fill="url(#bookLight)" />

        {/* Student Silhouette Looking Upwards (head tilted up toward orb) */}
        {/* Torso & Shoulders */}
        <path
          d="M165 190 C165 155 178 135 188 130 C194 128 206 128 212 130 C222 135 235 155 235 190 Z"
          fill="#08090E"
          stroke="url(#figureRim)"
          strokeWidth="1.5"
        />

        {/* Neck */}
        <path d="M194 130 L194 116 L206 116 L206 130 Z" fill="#08090E" />

        {/* Head tilted upward gazing at 45 degrees towards the floating orb */}
        <path
          d="M188 112 C186 98 194 86 206 86 C216 86 224 94 224 106 C224 116 216 122 204 122 C196 122 190 118 188 112 Z"
          fill="#08090E"
          stroke="#00D9C0"
          strokeWidth="1.4"
        />

        {/* Delicate rim light highlighting the jawline looking upward */}
        <path d="M200 87 C210 88 221 95 222 108" stroke="#00D9C0" strokeWidth="1.8" strokeLinecap="round" />

        {/* Laptop/Monitor or Desk lamp accent */}
        <path d="M110 150 L125 130 L127 150" stroke="#252A3B" strokeWidth="1.5" />
        <circle cx="125" cy="128" r="2.5" fill="#00D9C0" />
      </svg>
    </div>
  );
};
