"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Node {
  id: string;
  label?: string;
  x: number;
  y: number;
  radius: number;
  isPrimary: boolean;
}

interface Edge {
  source: string;
  target: string;
}

export const HeroConstellationGraph: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate 32 clean, realistic knowledge graph nodes
  const nodes: Node[] = useMemo(
    () => [
      // Primary key nodes with labels
      { id: "n1", label: "CALCULUS", x: 180, y: 160, radius: 4.5, isPrimary: true },
      { id: "n2", label: "DATA STRUCTURES", x: 480, y: 120, radius: 4.5, isPrimary: true },
      { id: "n3", label: "MACHINE LEARNING", x: 360, y: 310, radius: 5, isPrimary: true },
      { id: "n4", label: "PROBABILITY", x: 140, y: 380, radius: 4.5, isPrimary: true },

      // Secondary structural nodes
      { id: "n5", x: 260, y: 110, radius: 2.5, isPrimary: false },
      { id: "n6", x: 340, y: 170, radius: 3, isPrimary: false },
      { id: "n7", x: 420, y: 220, radius: 2.5, isPrimary: false },
      { id: "n8", x: 100, y: 240, radius: 2.5, isPrimary: false },
      { id: "n9", x: 220, y: 270, radius: 3, isPrimary: false },
      { id: "n10", x: 290, y: 390, radius: 2.5, isPrimary: false },
      { id: "n11", x: 460, y: 330, radius: 3, isPrimary: false },
      { id: "n12", x: 530, y: 240, radius: 2.5, isPrimary: false },
      { id: "n13", x: 560, y: 380, radius: 2.5, isPrimary: false },
      { id: "n14", x: 410, y: 440, radius: 2.5, isPrimary: false },
      { id: "n15", x: 240, y: 470, radius: 2.5, isPrimary: false },
      { id: "n16", x: 120, y: 490, radius: 2.5, isPrimary: false },
      { id: "n17", x: 80, y: 140, radius: 2, isPrimary: false },
      { id: "n18", x: 220, y: 60, radius: 2, isPrimary: false },
      { id: "n19", x: 390, y: 70, radius: 2.5, isPrimary: false },
      { id: "n20", x: 580, y: 140, radius: 2, isPrimary: false },
      { id: "n21", x: 620, y: 280, radius: 2, isPrimary: false },
      { id: "n22", x: 500, y: 480, radius: 2, isPrimary: false },
      { id: "n23", x: 330, y: 510, radius: 2, isPrimary: false },
      { id: "n24", x: 180, y: 520, radius: 2, isPrimary: false },
      { id: "n25", x: 60, y: 340, radius: 2, isPrimary: false },
      { id: "n26", x: 150, y: 210, radius: 2.5, isPrimary: false },
      { id: "n27", x: 300, y: 240, radius: 2.5, isPrimary: false },
      { id: "n28", x: 480, y: 180, radius: 2.5, isPrimary: false },
      { id: "n29", x: 380, y: 390, radius: 2.5, isPrimary: false },
      { id: "n30", x: 260, y: 330, radius: 2.5, isPrimary: false },
    ],
    []
  );

  // Connecting edges forming topological prerequisite chains
  const edges: Edge[] = useMemo(
    () => [
      { source: "n1", target: "n5" },
      { source: "n5", target: "n6" },
      { source: "n6", target: "n3" },
      { source: "n2", target: "n7" },
      { source: "n7", target: "n3" },
      { source: "n4", target: "n9" },
      { source: "n9", target: "n3" },
      { source: "n1", target: "n8" },
      { source: "n8", target: "n4" },
      { source: "n2", target: "n19" },
      { source: "n19", target: "n6" },
      { source: "n2", target: "n12" },
      { source: "n12", target: "n11" },
      { source: "n3", target: "n11" },
      { source: "n3", target: "n29" },
      { source: "n29", target: "n14" },
      { source: "n4", target: "n10" },
      { source: "n10", target: "n15" },
      { source: "n15", target: "n24" },
      { source: "n14", target: "n23" },
      { source: "n11", target: "n13" },
      { source: "n13", target: "n22" },
      { source: "n12", target: "n21" },
      { source: "n2", target: "n20" },
      { source: "n1", target: "n18" },
      { source: "n18", target: "n5" },
      { source: "n1", target: "n17" },
      { source: "n17", target: "n8" },
      { source: "n8", target: "n25" },
      { source: "n25", target: "n4" },
      { source: "n26", target: "n9" },
      { source: "n27", target: "n3" },
      { source: "n28", target: "n7" },
      { source: "n30", target: "n3" },
    ],
    []
  );

  const nodeMap = useMemo(() => {
    const map = new Map<string, Node>();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [nodes]);

  // Pulse trajectory path: n1 -> n5 -> n6 -> n3 -> n11 -> n14
  const pulsePath = useMemo(() => {
    const p1 = nodeMap.get("n1")!;
    const p2 = nodeMap.get("n5")!;
    const p3 = nodeMap.get("n6")!;
    const p4 = nodeMap.get("n3")!;
    const p5 = nodeMap.get("n11")!;
    return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} L ${p5.x} ${p5.y}`;
  }, [nodeMap]);

  return (
    <motion.div
      animate={{
        x: mousePos.x,
        y: mousePos.y,
      }}
      transition={{ type: "spring", stiffness: 40, damping: 20 }}
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      {/* Soft Ethereal Emerald Radial Glow behind graph */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(57, 245, 181, 0.12) 0%, rgba(57, 245, 181, 0.02) 60%, transparent 80%)",
        }}
      />

      <svg
        viewBox="30 40 620 500"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full max-w-[620px] max-h-[520px] overflow-visible"
        aria-label="Knowledge Constellation Visualization"
      >
        <defs>
          <filter id="emeraldSoftGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- Connection Edges --- */}
        <g opacity={0.65}>
          {edges.map((edge, idx) => {
            const u = nodeMap.get(edge.source);
            const v = nodeMap.get(edge.target);
            if (!u || !v) return null;

            // Curved quadratic path for scientific aesthetic
            const midX = (u.x + v.x) / 2;
            const midY = (u.y + v.y) / 2 - (idx % 2 === 0 ? 8 : -8);

            return (
              <path
                key={`${edge.source}-${edge.target}`}
                d={`M ${u.x} ${u.y} Q ${midX} ${midY} ${v.x} ${v.y}`}
                fill="none"
                stroke="rgba(57, 245, 181, 0.14)"
                strokeWidth={1.2}
              />
            );
          })}
        </g>

        {/* --- Travelling Light Pulse (Traceable Answer Signal) --- */}
        <g>
          <circle r={3} fill="#39F5B5" filter="url(#emeraldSoftGlow)">
            <animateMotion
              path={pulsePath}
              dur="3.2s"
              repeatCount="indefinite"
              keyPoints="0;1"
              keyTimes="0;1"
            />
          </circle>
          <circle r={7} fill="rgba(57, 245, 181, 0.35)" filter="url(#emeraldSoftGlow)">
            <animateMotion
              path={pulsePath}
              dur="3.2s"
              repeatCount="indefinite"
              keyPoints="0;1"
              keyTimes="0;1"
            />
          </circle>
        </g>

        {/* --- Nodes & Annotations --- */}
        <g>
          {nodes.map((node) => (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              {/* Outer halo for primary nodes */}
              {node.isPrimary && (
                <circle
                  r={node.radius * 2.2}
                  fill="rgba(57, 245, 181, 0.14)"
                  filter="url(#emeraldSoftGlow)"
                />
              )}

              {/* Node Dot */}
              <circle
                r={node.radius}
                fill={node.isPrimary ? "#39F5B5" : "rgba(244, 247, 245, 0.45)"}
                stroke={node.isPrimary ? "#39F5B5" : "rgba(57, 245, 181, 0.3)"}
                strokeWidth={node.isPrimary ? 1.5 : 0.8}
                filter={node.isPrimary ? "url(#emeraldSoftGlow)" : undefined}
              />

              {/* Tiny Technical Label in IBM Plex Mono (Only 3-4 key labels) */}
              {node.label && (
                <text
                  x={0}
                  y={node.radius + 14}
                  textAnchor="middle"
                  fill="#39F5B5"
                  fontSize="10px"
                  fontFamily="var(--font-ibm-plex-mono), monospace"
                  fontWeight="500"
                  letterSpacing="0.12em"
                  className="pointer-events-none select-none opacity-90"
                >
                  {node.label}
                </text>
              )}
            </g>
          ))}
        </g>
      </svg>
    </motion.div>
  );
};
