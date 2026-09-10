"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface KnowledgeNode {
  id: string;
  label: string;
  coords: [number, number]; // [lng, lat]
}

const KNOWLEDGE_NODES: KnowledgeNode[] = [
  { id: "node1", label: "COURSES", coords: [-100.0, 40.0] },
  { id: "node2", label: "CONCEPTS", coords: [78.96, 20.59] },
  { id: "node3", label: "SOURCES", coords: [15.0, 50.0] },
  { id: "node4", label: "LEARNING PATHS", coords: [138.25, 36.2] },
  { id: "node5", label: "INSTITUTIONS", coords: [-60.0, -15.0] },
  { id: "node6", label: "ECOSYSTEMS", coords: [25.0, -28.0] },
];

// Connection arcs between knowledge hubs
const KNOWLEDGE_ARCS: [number, number][] = [
  [0, 1], // Courses <-> Concepts
  [1, 2], // Concepts <-> Sources
  [2, 3], // Sources <-> Learning Paths
  [0, 4], // Courses <-> Institutions
  [4, 5], // Institutions <-> Ecosystems
  [5, 1], // Ecosystems <-> Concepts
  [2, 4], // Sources <-> Institutions
];

// Generate land dot mesh points across world coordinates
function generateLandDotGrid(): [number, number][] {
  const dots: [number, number][] = [];

  // Approximate land bounding regions for clean dotted wireframe visualization
  const regions = [
    // North America
    { minLat: 15, maxLat: 70, minLng: -160, maxLng: -50, step: 4 },
    // South America
    { minLat: -55, maxLat: 12, minLng: -82, maxLng: -34, step: 4 },
    // Europe
    { minLat: 35, maxLat: 70, minLng: -10, maxLng: 40, step: 3.5 },
    // Africa
    { minLat: -35, maxLat: 35, minLng: -18, maxLng: 52, step: 4 },
    // Asia
    { minLat: 10, maxLat: 75, minLng: 40, maxLng: 150, step: 3.5 },
    // Australia
    { minLat: -42, maxLat: -10, minLng: 112, maxLng: 154, step: 3.5 },
    // India sub-region detail
    { minLat: 8, maxLat: 34, minLng: 68, maxLng: 90, step: 3 },
  ];

  regions.forEach((r) => {
    for (let lat = r.minLat; lat <= r.maxLat; lat += r.step) {
      for (let lng = r.minLng; lng <= r.maxLng; lng += r.step) {
        // Organic jitter for natural dot distribution
        const jLng = lng + (Math.random() - 0.5) * 0.8;
        const jLat = lat + (Math.random() - 0.5) * 0.8;
        dots.push([jLng, jLat]);
      }
    }
  });

  return dots;
}

interface WireframeDottedGlobeProps {
  className?: string;
}

export const WireframeDottedGlobe: React.FC<WireframeDottedGlobeProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationRef = useRef<[number, number, number]>([0, -20, 0]);

  const landDots = useRef<[number, number][]>([]);

  useEffect(() => {
    landDots.current = generateLandDotGrid();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const projection = d3
      .geoOrthographic()
      .scale(Math.min(width, height) * 0.38)
      .translate([width / 2, height / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(ctx);
    const graticule = d3.geoGraticule().step([15, 15])();

    let photonProgress = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Auto rotation if not dragging
      if (!isDraggingRef.current) {
        rotationRef.current[0] += 0.22;
      }

      projection.rotate(rotationRef.current);
      photonProgress = (photonProgress + 0.008) % 1;

      // 1. Globe Background Space Core (#030605)
      const center = projection.translate();
      const radius = projection.scale();

      ctx.beginPath();
      ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#030605";
      ctx.fill();

      // Ambient Core Glow
      const bgGrad = ctx.createRadialGradient(
        center[0],
        center[1],
        radius * 0.2,
        center[0],
        center[1],
        radius
      );
      bgGrad.addColorStop(0, "rgba(53, 245, 180, 0.06)");
      bgGrad.addColorStop(0.8, "rgba(3, 6, 5, 0.8)");
      bgGrad.addColorStop(1, "rgba(3, 6, 5, 1)");

      ctx.beginPath();
      ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI);
      ctx.fillStyle = bgGrad;
      ctx.fill();

      // 2. Graticule Wireframe Grid Lines (rgba(53, 245, 180, 0.08))
      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = "rgba(53, 245, 180, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. Land Dots (rgba(210, 240, 230, 0.45))
      landDots.current.forEach(([lng, lat]) => {
        const pt = projection([lng, lat]);
        if (pt) {
          // Check if point is on visible hemisphere
          const distance = d3.geoDistance([lng, lat], [
            -rotationRef.current[0],
            -rotationRef.current[1],
          ]);

          if (distance < Math.PI / 2) {
            const alpha = Math.max(0.1, (1 - distance / (Math.PI / 2)) * 0.45);
            ctx.beginPath();
            ctx.arc(pt[0], pt[1], 1.2, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(210, 240, 230, ${alpha})`;
            ctx.fill();
          }
        }
      });

      // 4. Knowledge Network Arcs & Photons
      KNOWLEDGE_ARCS.forEach(([startIdx, endIdx]) => {
        const source = KNOWLEDGE_NODES[startIdx];
        const target = KNOWLEDGE_NODES[endIdx];

        const srcDist = d3.geoDistance(source.coords, [
          -rotationRef.current[0],
          -rotationRef.current[1],
        ]);
        const tgtDist = d3.geoDistance(target.coords, [
          -rotationRef.current[0],
          -rotationRef.current[1],
        ]);

        if (srcDist < Math.PI / 2 || tgtDist < Math.PI / 2) {
          const arcGeo = {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [source.coords, target.coords],
            },
          } as any;

          ctx.beginPath();
          path(arcGeo);
          ctx.strokeStyle = "rgba(53, 245, 180, 0.25)";
          ctx.lineWidth = 1.4;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Traveling photon along arc
          const interpolator = d3.geoInterpolate(source.coords, target.coords);
          const currentPoint = interpolator(photonProgress);
          const pt = projection(currentPoint);

          if (pt) {
            ctx.beginPath();
            ctx.arc(pt[0], pt[1], 2.5, 0, 2 * Math.PI);
            ctx.fillStyle = "#35F5B4";
            ctx.shadowColor = "#35F5B4";
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // 5. Knowledge Hub Nodes & Labels
      KNOWLEDGE_NODES.forEach((node) => {
        const pt = projection(node.coords);
        const distance = d3.geoDistance(node.coords, [
          -rotationRef.current[0],
          -rotationRef.current[1],
        ]);

        if (pt && distance < Math.PI / 2) {
          const fade = Math.max(0.2, 1 - distance / (Math.PI / 2));

          // Outer Pulsing Halo
          ctx.beginPath();
          ctx.arc(pt[0], pt[1], 6, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(53, 245, 180, ${0.2 * fade})`;
          ctx.fill();

          // Inner Solid Core Node
          ctx.beginPath();
          ctx.arc(pt[0], pt[1], 3, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(53, 245, 180, ${0.95 * fade})`;
          ctx.fill();

          // Label
          ctx.font = "500 10px 'IBM Plex Mono', monospace";
          ctx.fillStyle = `rgba(243, 246, 244, ${0.8 * fade})`;
          ctx.fillText(node.label, pt[0] + 9, pt[1] + 3);
        }
      });

      // 6. Outer Sphere Boundary Ring (rgba(53, 245, 180, 0.35))
      ctx.beginPath();
      ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(53, 245, 180, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Mouse Drag Event Handlers (No wheel scroll interception)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    rotationRef.current[0] += deltaX * 0.4;
    rotationRef.current[1] -= deltaY * 0.4;

    // Clamp vertical tilt
    rotationRef.current[1] = Math.max(-60, Math.min(60, rotationRef.current[1]));

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className={`relative w-full h-full select-none cursor-grab active:cursor-grabbing ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isDraggingRef.current = false;
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-auto" />

      {/* Subtle Hint Overlay (Only visible when hovered) */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full bg-[#030605]/85 border border-[#35F5B4]/30 backdrop-blur-md transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#35F5B4]">
          DRAG TO EXPLORE
        </span>
      </div>
    </div>
  );
};

export default WireframeDottedGlobe;
