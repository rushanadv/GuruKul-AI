"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CONSTELLATION_NODES,
  CONSTELLATION_EDGES,
  ConstellationNode,
  ConstellationEdge,
} from "@/data/constellationData";

interface ConstellationProps {
  nodeCount?: number;
  litPercentage?: number; // 0 - 100
  activeTracePath?: string[]; // Node IDs in current traversal
  flaringNodeId?: string | null; // Node that pulses / flares
  interactive?: boolean;
  onNodeSelect?: (node: ConstellationNode) => void;
  className?: string;
  showLabels?: boolean;
  staggerLit?: boolean;
  scale?: number;
}

export const Constellation: React.FC<ConstellationProps> = ({
  nodeCount = 22,
  litPercentage = 100,
  activeTracePath = [],
  flaringNodeId = null,
  interactive = true,
  onNodeSelect,
  className = "",
  showLabels = true,
  staggerLit = false,
}) => {
  const [hoveredNode, setHoveredNode] = useState<ConstellationNode | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Filter nodes according to requested count
  const visibleNodes = useMemo(() => {
    return CONSTELLATION_NODES.slice(0, nodeCount);
  }, [nodeCount]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, ConstellationNode>();
    visibleNodes.forEach((node) => map.set(node.id, node));
    return map;
  }, [visibleNodes]);

  // Filter edges where both source and target exist
  const visibleEdges = useMemo(() => {
    return CONSTELLATION_EDGES.filter(
      (edge) => nodeMap.has(edge.source) && nodeMap.has(edge.target)
    );
  }, [nodeMap]);

  // Determine lit nodes based on litPercentage and order
  const litNodeIds = useMemo(() => {
    const total = visibleNodes.length;
    const litCount = Math.round((litPercentage / 100) * total);
    // Sort by node.order so the illumination follows semantic syllabus progression
    const sorted = [...visibleNodes].sort((a, b) => a.order - b.order);
    return new Set(sorted.slice(0, litCount).map((n) => n.id));
  }, [visibleNodes, litPercentage]);

  // Trace edges lookup: check if an edge connects two consecutive nodes in activeTracePath
  const activeTraceEdges = useMemo(() => {
    const set = new Set<string>();
    if (!activeTracePath || activeTracePath.length < 2) return set;
    for (let i = 0; i < activeTracePath.length - 1; i++) {
      const u = activeTracePath[i];
      const v = activeTracePath[i + 1];
      set.add(`${u}->${v}`);
      set.add(`${v}->${u}`);
    }
    return set;
  }, [activeTracePath]);

  // Calculate coordinates for trace photon animation
  const traceEdgeSegments = useMemo(() => {
    if (!activeTracePath || activeTracePath.length < 2) return [];
    const segments = [];
    for (let i = 0; i < activeTracePath.length - 1; i++) {
      const u = nodeMap.get(activeTracePath[i]);
      const v = nodeMap.get(activeTracePath[i + 1]);
      if (u && v) {
        segments.push({ from: u, to: v, index: i });
      }
    }
    return segments;
  }, [activeTracePath, nodeMap]);

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      <svg
        viewBox="60 130 880 430"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full overflow-visible"
        aria-label="GuruKul AI Knowledge Constellation Graph"
      >
        <defs>
          {/* Soft Layered Cyan Glow */}
          <filter id="softGlowCyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense Flare Filter for Active Retrieval */}
          <filter id="flareGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur2" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="24" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Violet Trace Glow */}
          <filter id="violetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial Gradient for Lit Nodes */}
          <radialGradient id="gradLitNode" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#00D9C0" />
            <stop offset="100%" stopColor="#008a7a" />
          </radialGradient>

          {/* Radial Gradient for Flaring Node */}
          <radialGradient id="gradFlareNode" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#A78BFA" />
            <stop offset="70%" stopColor="#00D9C0" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </radialGradient>

          {/* Radial Gradient for Dormant Nodes */}
          <radialGradient id="gradDormantNode" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4A4F5E" />
            <stop offset="70%" stopColor="#252833" />
            <stop offset="100%" stopColor="#15171F" />
          </radialGradient>

          {/* Linear Gradients for Active Trace Edges */}
          <linearGradient id="traceEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00D9C0" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* --- Background Edges --- */}
        <g className="edges-layer" opacity="0.85">
          {visibleEdges.map((edge) => {
            const u = nodeMap.get(edge.source);
            const v = nodeMap.get(edge.target);
            if (!u || !v) return null;

            const isTraceActive =
              activeTraceEdges.has(`${edge.source}->${edge.target}`) ||
              activeTraceEdges.has(`${edge.target}->${edge.source}`);

            const bothLit = litNodeIds.has(edge.source) && litNodeIds.has(edge.target);

            // Edge styling
            let strokeColor = "#252833";
            let strokeWidth = 1;
            let strokeOpacity = 0.35;
            let strokeDasharray = edge.isPrereq ? undefined : "3,3";

            if (isTraceActive) {
              strokeColor = "#00D9C0";
              strokeWidth = 2.4;
              strokeOpacity = 1;
              strokeDasharray = undefined;
            } else if (bothLit) {
              strokeColor = "rgba(0, 217, 192, 0.45)";
              strokeWidth = 1.3;
              strokeOpacity = 0.7;
            }

            return (
              <line
                key={edge.id}
                x1={u.x}
                y1={u.y}
                x2={v.x}
                y2={v.y}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeOpacity={strokeOpacity}
                strokeDasharray={strokeDasharray}
                filter={isTraceActive ? "url(#softGlowCyan)" : undefined}
                className="transition-colors duration-500"
              />
            );
          })}
        </g>

        {/* --- Traveling Photons along active trace paths --- */}
        {traceEdgeSegments.map((segment) => (
          <g key={`photon-${segment.index}`}>
            <circle r={3.5} fill="#FFFFFF" filter="url(#softGlowCyan)">
              <animateMotion
                path={`M ${segment.from.x} ${segment.from.y} L ${segment.to.x} ${segment.to.y}`}
                dur="1.2s"
                begin={`${segment.index * 0.28}s`}
                repeatCount="indefinite"
                keyPoints="0;1"
                keyTimes="0;1"
              />
            </circle>
            <circle r={7} fill="rgba(0, 217, 192, 0.4)" filter="url(#softGlowCyan)">
              <animateMotion
                path={`M ${segment.from.x} ${segment.from.y} L ${segment.to.x} ${segment.to.y}`}
                dur="1.2s"
                begin={`${segment.index * 0.28}s`}
                repeatCount="indefinite"
                keyPoints="0;1"
                keyTimes="0;1"
              />
            </circle>
          </g>
        ))}

        {/* --- Nodes Layer --- */}
        <g className="nodes-layer">
          {visibleNodes.map((node, index) => {
            const isLit = litNodeIds.has(node.id);
            const isFlaring = flaringNodeId === node.id;
            const isTraceMember = activeTracePath.includes(node.id);
            const isHovered = hoveredNode?.id === node.id;

            // Compute delay for organic stagger if enabled
            const staggerDelay = staggerLit ? (node.order * 0.04) % 0.6 : 0;

            // Flare radius multiplier
            const radius = isFlaring
              ? node.radius * 1.6
              : isHovered
              ? node.radius * 1.3
              : node.radius;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className={`cursor-pointer transition-transform duration-300 ${
                  interactive ? "pointer-events-auto" : "pointer-events-none"
                }`}
                onMouseEnter={() => interactive && setHoveredNode(node)}
                onMouseLeave={() => interactive && setHoveredNode(null)}
                onClick={() => interactive && onNodeSelect?.(node)}
              >
                {/* Flaring Ambient Shockwave Aura */}
                {isFlaring && (
                  <>
                    <circle
                      r={radius * 3.5}
                      fill="none"
                      stroke="#00D9C0"
                      strokeWidth={1.5}
                      opacity={0.7}
                      className="animate-ping origin-center"
                    />
                    <circle
                      r={radius * 2.6}
                      fill="rgba(0, 217, 192, 0.25)"
                      filter="url(#flareGlow)"
                    />
                  </>
                )}

                {/* Outer Glow Halo for Lit Nodes */}
                {(isLit || isTraceMember) && !isFlaring && (
                  <circle
                    r={radius * 2}
                    fill={isTraceMember ? "rgba(139, 92, 246, 0.35)" : "rgba(0, 217, 192, 0.2)"}
                    filter="url(#softGlowCyan)"
                    className="transition-all duration-700"
                    style={{
                      transitionDelay: `${staggerDelay}s`,
                    }}
                  />
                )}

                {/* Core Node Circle */}
                <circle
                  r={radius}
                  fill={
                    isFlaring
                      ? "url(#gradFlareNode)"
                      : isLit || isTraceMember
                      ? "url(#gradLitNode)"
                      : "url(#gradDormantNode)"
                  }
                  stroke={
                    isFlaring
                      ? "#FFFFFF"
                      : isTraceMember
                      ? "#A78BFA"
                      : isLit
                      ? "#00D9C0"
                      : "rgba(255, 255, 255, 0.12)"
                  }
                  strokeWidth={isFlaring ? 2.5 : isLit ? 1.5 : 1}
                  filter={
                    isFlaring
                      ? "url(#flareGlow)"
                      : isLit || isTraceMember
                      ? "url(#softGlowCyan)"
                      : undefined
                  }
                  className="transition-all duration-500"
                  style={{
                    transitionDelay: `${staggerDelay}s`,
                  }}
                />

                {/* Inner Bright Starlight Core for lit nodes */}
                {(isLit || isFlaring || isTraceMember) && (
                  <circle r={Math.max(2, radius * 0.35)} fill="#FFFFFF" opacity={0.9} />
                )}

                {/* Micro Label for Important or Flaring Nodes */}
                {showLabels && (isFlaring || node.importance >= 3 || isHovered) && (
                  <text
                    x={0}
                    y={radius + 14}
                    textAnchor="middle"
                    fill={isFlaring ? "#00D9C0" : isLit ? "#E8E6DD" : "#8E919A"}
                    fontSize={isFlaring || isHovered ? "11px" : "9.5px"}
                    fontWeight={isFlaring || isHovered ? "600" : "500"}
                    letterSpacing="0.02em"
                    className="pointer-events-none drop-shadow-md select-none transition-colors duration-300"
                  >
                    {node.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating Interactive Hover Card / Tooltip */}
      <AnimatePresence>
        {hoveredNode && interactive && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute bottom-4 left-4 max-w-xs z-30 pointer-events-none p-3.5 rounded-xl glass-panel border border-white/10 shadow-glass-surface"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  litNodeIds.has(hoveredNode.id)
                    ? "bg-celestial-cyan shadow-glow-cyan"
                    : "bg-dormant-node"
                }`}
              />
              <span className="text-[10px] uppercase font-mono tracking-widest text-celestial-cyan font-semibold">
                {hoveredNode.sublabel}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-starlight-pure mb-1">
              {hoveredNode.label}
            </h4>
            <p className="text-xs text-starlight-muted line-clamp-2 mb-2 leading-relaxed">
              {hoveredNode.summary}
            </p>
            <div className="text-[10px] font-mono text-celestial-cyan/90 border-t border-white/5 pt-1.5 flex items-center justify-between">
              <span>{hoveredNode.citation}</span>
              <span className="text-starlight-dim">
                {litNodeIds.has(hoveredNode.id) ? "Illuminated" : "Dormant"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
