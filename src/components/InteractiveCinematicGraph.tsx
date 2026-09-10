"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface Node {
  id: string;
  label?: string;
  x: number;
  y: number;
  radius: number;
  isPrimary: boolean;
  depth: "bg" | "mid" | "fg"; // Depth layering for parallax
  cluster?: string;
}

interface Edge {
  source: string;
  target: string;
  isPulsePath?: boolean;
}

interface InteractiveCinematicGraphProps {
  scrollProgress: MotionValue<number>;
  flaringNodeId?: string | null;
}

export const InteractiveCinematicGraph: React.FC<InteractiveCinematicGraphProps> = ({
  scrollProgress,
  flaringNodeId = "n3", // MACHINE LEARNING node
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 16,
        y: (e.clientY / innerHeight - 0.5) * 16,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Parallax motion transforms based on normalized scroll progress (0 to 1)
  const bgY = useTransform(scrollProgress, [0, 1], [0, -120]);
  const midY = useTransform(scrollProgress, [0, 1], [0, -40]);
  const fgY = useTransform(scrollProgress, [0, 1], [0, 80]);
  const fgScale = useTransform(scrollProgress, [0, 1], [1, 1.25]);

  // Phase-specific transforms
  // Phase 3 light trace pulse progress (0.45 to 0.65)
  const pulseDashOffset = useTransform(scrollProgress, [0.45, 0.63], [1200, 0]);
  const pulseOpacity = useTransform(scrollProgress, [0.44, 0.47, 0.63, 0.66], [0, 1, 1, 0]);

  // Phase 3 node flare for MACHINE LEARNING (n3)
  const flareScale = useTransform(scrollProgress, [0.58, 0.64, 0.70], [1, 2.5, 1]);
  const flareOpacity = useTransform(scrollProgress, [0.58, 0.63, 0.72], [0, 0.85, 0]);

  // Phase 4 cascading node illumination (0.65 to 0.85)
  const secondaryNodeOpacity = useTransform(scrollProgress, [0.65, 0.83], [0.25, 0.95]);
  const secondaryEdgeOpacity = useTransform(scrollProgress, [0.65, 0.83], [0.12, 0.45]);
  const dimOverlayOpacity = useTransform(
    scrollProgress,
    [0.18, 0.25, 0.40, 0.46, 0.66, 0.84, 0.90],
    [0, 0.45, 0.45, 0, 0.35, 0, 0]
  );

  // Generate 38 clean, realistic knowledge graph nodes
  const nodes: Node[] = useMemo(
    () => [
      // Primary key nodes with labels
      { id: "n1", label: "CALCULUS", x: 170, y: 150, radius: 4.5, isPrimary: true, depth: "mid" },
      { id: "n2", label: "DATA STRUCTURES", x: 470, y: 110, radius: 4.5, isPrimary: true, depth: "mid" },
      { id: "n3", label: "MACHINE LEARNING", x: 360, y: 300, radius: 5.5, isPrimary: true, depth: "mid" },
      { id: "n4", label: "PROBABILITY", x: 130, y: 370, radius: 4.5, isPrimary: true, depth: "mid" },

      // Secondary structural nodes - Midground
      { id: "n5", x: 250, y: 100, radius: 2.8, isPrimary: false, depth: "mid" },
      { id: "n6", x: 330, y: 160, radius: 3, isPrimary: false, depth: "mid" },
      { id: "n7", x: 410, y: 210, radius: 2.8, isPrimary: false, depth: "mid" },
      { id: "n8", x: 90, y: 230, radius: 2.5, isPrimary: false, depth: "mid" },
      { id: "n9", x: 210, y: 260, radius: 3, isPrimary: false, depth: "mid" },
      { id: "n10", x: 280, y: 380, radius: 2.5, isPrimary: false, depth: "mid" },
      { id: "n11", x: 450, y: 320, radius: 3, isPrimary: false, depth: "mid" },
      { id: "n12", x: 520, y: 230, radius: 2.5, isPrimary: false, depth: "mid" },
      { id: "n13", x: 550, y: 370, radius: 2.5, isPrimary: false, depth: "mid" },
      { id: "n14", x: 400, y: 430, radius: 2.5, isPrimary: false, depth: "mid" },
      { id: "n15", x: 230, y: 460, radius: 2.5, isPrimary: false, depth: "mid" },

      // Background nodes (Slow Parallax)
      { id: "n16", x: 110, y: 480, radius: 1.8, isPrimary: false, depth: "bg" },
      { id: "n17", x: 70, y: 130, radius: 1.8, isPrimary: false, depth: "bg" },
      { id: "n18", x: 210, y: 50, radius: 1.8, isPrimary: false, depth: "bg" },
      { id: "n19", x: 380, y: 60, radius: 2, isPrimary: false, depth: "bg" },
      { id: "n20", x: 570, y: 130, radius: 1.8, isPrimary: false, depth: "bg" },
      { id: "n21", x: 610, y: 270, radius: 1.8, isPrimary: false, depth: "bg" },
      { id: "n22", x: 490, y: 470, radius: 1.8, isPrimary: false, depth: "bg" },
      { id: "n23", x: 320, y: 500, radius: 1.8, isPrimary: false, depth: "bg" },
      { id: "n24", x: 170, y: 510, radius: 1.8, isPrimary: false, depth: "bg" },
      { id: "n25", x: 50, y: 330, radius: 1.8, isPrimary: false, depth: "bg" },

      // Foreground particles (Fast Parallax + Slight Blur)
      { id: "n26", x: 140, y: 200, radius: 4, isPrimary: false, depth: "fg" },
      { id: "n27", x: 290, y: 230, radius: 4.5, isPrimary: false, depth: "fg" },
      { id: "n28", x: 470, y: 170, radius: 4, isPrimary: false, depth: "fg" },
      { id: "n29", x: 370, y: 380, radius: 4.5, isPrimary: false, depth: "fg" },
      { id: "n30", x: 250, y: 320, radius: 4, isPrimary: false, depth: "fg" },
      { id: "n31", x: 580, y: 210, radius: 3.5, isPrimary: false, depth: "fg" },
      { id: "n32", x: 190, y: 410, radius: 3.5, isPrimary: false, depth: "fg" },
    ],
    []
  );

  const edges: Edge[] = useMemo(
    () => [
      // Primary trace path: n1 (CALCULUS) -> n5 -> n6 -> n3 (MACHINE LEARNING)
      { source: "n1", target: "n5", isPulsePath: true },
      { source: "n5", target: "n6", isPulsePath: true },
      { source: "n6", target: "n3", isPulsePath: true },
      { source: "n4", target: "n9", isPulsePath: true },
      { source: "n9", target: "n3", isPulsePath: true },
      { source: "n2", target: "n7", isPulsePath: true },
      { source: "n7", target: "n3", isPulsePath: true },

      // Structural edges
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

  // Continuous SVG path string for Phase 3 light trace pulse
  const tracePathD = useMemo(() => {
    const p1 = nodeMap.get("n1")!;
    const p2 = nodeMap.get("n5")!;
    const p3 = nodeMap.get("n6")!;
    const p4 = nodeMap.get("n3")!;
    return `M ${p1.x} ${p1.y} Q ${(p1.x + p2.x) / 2} ${(p1.y + p2.y) / 2 - 10} ${p2.x} ${p2.y} Q ${(p2.x + p3.x) / 2} ${(p2.y + p3.y) / 2 - 8} ${p3.x} ${p3.y} Q ${(p3.x + p4.x) / 2} ${(p3.y + p4.y) / 2 - 6} ${p4.x} ${p4.y}`;
  }, [nodeMap]);

  return (
    <motion.div
      animate={{
        x: mousePos.x,
        y: mousePos.y,
      }}
      transition={{ type: "spring", stiffness: 45, damping: 25 }}
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      {/* Soft Ethereal Volumetric Emerald Glow behind graph */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[150px] pointer-events-none transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(53, 245, 180, 0.14) 0%, rgba(88, 216, 255, 0.04) 55%, transparent 80%)",
        }}
      />

      {/* Dim Overlay when floating text cards appear in Phase 2 & Phase 4 */}
      <motion.div
        style={{ opacity: dimOverlayOpacity }}
        className="absolute inset-0 bg-[#040605]/50 pointer-events-none transition-opacity duration-300 z-10"
      />

      <svg
        viewBox="20 20 640 520"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full max-w-[680px] max-h-[560px] overflow-visible"
        aria-label="Knowledge Constellation Visualization"
      >
        <defs>
          <filter id="emeraldGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="intenseFlare" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- Background Nodes Layer (Slow Parallax) --- */}
        <motion.g style={{ y: bgY }}>
          {nodes
            .filter((n) => n.depth === "bg")
            .map((node) => (
              <circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r={node.radius}
                fill="rgba(243, 246, 244, 0.25)"
              />
            ))}
        </motion.g>

        {/* --- Connection Edges Layer --- */}
        <motion.g style={{ y: midY }}>
          {edges.map((edge, idx) => {
            const u = nodeMap.get(edge.source);
            const v = nodeMap.get(edge.target);
            if (!u || !v) return null;

            const midX = (u.x + v.x) / 2;
            const midY = (u.y + v.y) / 2 - (idx % 2 === 0 ? 8 : -8);

            return (
              <motion.path
                key={`${edge.source}-${edge.target}`}
                d={`M ${u.x} ${u.y} Q ${midX} ${midY} ${v.x} ${v.y}`}
                fill="none"
                stroke="#35F5B4"
                strokeWidth={edge.isPulsePath ? 1.4 : 1}
                style={{
                  opacity: edge.isPulsePath ? 0.35 : secondaryEdgeOpacity,
                }}
              />
            );
          })}

          {/* Phase 3 Photonic Trace Pulse along continuous SVG path */}
          <motion.path
            d={tracePathD}
            fill="none"
            stroke="#35F5B4"
            strokeWidth={3}
            strokeDasharray="1200"
            strokeDashoffset={pulseDashOffset}
            filter="url(#emeraldGlow)"
            style={{ opacity: pulseOpacity }}
          />
        </motion.g>

        {/* --- Midground Nodes & Labels Layer --- */}
        <motion.g style={{ y: midY }}>
          {nodes
            .filter((n) => n.depth === "mid")
            .map((node) => {
              const isTargetFlare = node.id === flaringNodeId;

              return (
                <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                  {/* Flaring Halo for Destination Node in Phase 3 */}
                  {isTargetFlare && (
                    <motion.circle
                      r={node.radius * 3.5}
                      fill="rgba(53, 245, 180, 0.45)"
                      filter="url(#intenseFlare)"
                      style={{
                        scale: flareScale,
                        opacity: flareOpacity,
                      }}
                    />
                  )}

                  {/* Primary Node Halo */}
                  {node.isPrimary && (
                    <circle
                      r={node.radius * 2.2}
                      fill="rgba(53, 245, 180, 0.16)"
                      filter="url(#emeraldGlow)"
                    />
                  )}

                  {/* Node Dot */}
                  <motion.circle
                    r={node.radius}
                    fill={node.isPrimary ? "#35F5B4" : "#F3F6F4"}
                    stroke={node.isPrimary ? "#35F5B4" : "rgba(53, 245, 180, 0.4)"}
                    strokeWidth={node.isPrimary ? 1.6 : 0.8}
                    filter={node.isPrimary ? "url(#emeraldGlow)" : undefined}
                    style={{
                      opacity: node.isPrimary ? 1 : secondaryNodeOpacity,
                    }}
                  />

                  {/* Technical Label in IBM Plex Mono */}
                  {node.label && (
                    <text
                      x={0}
                      y={node.radius + 15}
                      textAnchor="middle"
                      fill="#35F5B4"
                      fontSize="9.5px"
                      fontFamily="var(--font-ibm-plex-mono), monospace"
                      fontWeight="500"
                      letterSpacing="0.12em"
                      className="pointer-events-none select-none opacity-90"
                    >
                      {node.label}
                    </text>
                  )}
                </g>
              );
            })}
        </motion.g>

        {/* --- Foreground Particles Layer (Fast Parallax) --- */}
        <motion.g style={{ y: fgY, scale: fgScale }}>
          {nodes
            .filter((n) => n.depth === "fg")
            .map((node) => (
              <circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r={node.radius}
                fill="rgba(53, 245, 180, 0.28)"
                filter="url(#emeraldGlow)"
                className="opacity-40"
              />
            ))}
        </motion.g>
      </svg>
    </motion.div>
  );
};
