"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, OrbitControls, Line } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// --- 3D CENTRAL KNOWLEDGE CORE ("MACHINE LEARNING") ---
const KnowledgeCore: React.FC<{
  isRevealed: boolean;
  onCoreClick: () => void;
}> = ({ isRevealed, onCoreClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const networkRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const emissiveTarget = isRevealed ? 0.85 : 0.25;

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12;
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = THREE.MathUtils.lerp(
          mat.emissiveIntensity,
          emissiveTarget,
          delta * 2.5
        );
      }
    }
    if (networkRef.current) {
      networkRef.current.rotation.y -= delta * 0.08;
      networkRef.current.rotation.x = Math.sin(time * 0.5) * 0.05;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group onClick={onCoreClick}>
      {/* Outer Cyan Rim Edge Atmosphere */}
      <mesh ref={atmosphereRef} scale={[1.75, 1.75, 1.75]}>
        <sphereGeometry args={[1, 36, 36]} />
        <meshBasicMaterial
          color="#58D8FF"
          transparent
          opacity={isRevealed ? 0.12 : 0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Faint Outer Network Lattice Texture */}
      <mesh ref={networkRef} scale={[1.68, 1.68, 1.68]}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial
          color="#35F5B4"
          wireframe
          transparent
          opacity={isRevealed ? 0.22 : 0.12}
        />
      </mesh>

      {/* Central Dark Graphite Knowledge Core Sphere */}
      <mesh ref={meshRef} scale={[1.55, 1.55, 1.55]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#080c0f"
          roughness={0.25}
          metalness={0.8}
          emissive="#003b35"
          emissiveIntensity={emissiveTarget}
        />
      </mesh>

      {/* Central Core Title Label */}
      <Text
        position={[0, 2.1, 0]}
        fontSize={0.22}
        color="#35F5B4"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
      >
        MACHINE LEARNING
      </Text>
      <Text
        position={[0, 1.86, 0]}
        fontSize={0.11}
        color="#F3F6F4"
        fillOpacity={0.6}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
      >
        [CORE TOPIC]
      </Text>
    </group>
  );
};

// --- ORBITING TOPIC CONCEPT NODES ---
interface ConceptNodeData {
  id: string;
  label: string;
  sub: string;
  radius: number;
  speed: number;
  phase: number;
  color: string;
}

const TOPIC_NODES: ConceptNodeData[] = [
  { id: "n1", label: "LINEAR ALGEBRA", sub: "PREREQUISITE", radius: 3.4, speed: 0.2, phase: 0.2, color: "#35F5B4" },
  { id: "n2", label: "PROBABILITY", sub: "STATISTICS", radius: 3.9, speed: 0.16, phase: 1.4, color: "#58D8FF" },
  { id: "n3", label: "OPTIMIZATION", sub: "GRADIENT DESCENT", radius: 4.3, speed: 0.18, phase: 2.7, color: "#35F5B4" },
  { id: "n4", label: "DATA STRUCTURES", sub: "GRAPHS & TREES", radius: 3.6, speed: 0.14, phase: 3.9, color: "#8A6DFF" },
  { id: "n5", label: "ALGORITHMS", sub: "COMPLEXITY", radius: 4.1, speed: 0.17, phase: 5.1, color: "#58D8FF" },
];

const OrbitingConceptNodes: React.FC<{ revealProgress: number }> = ({ revealProgress }) => {
  const groupRefs = useRef<THREE.Group[]>([]);
  const [nodePositions, setNodePositions] = useState<{ [key: string]: [number, number, number] }>({});

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const newPos: { [key: string]: [number, number, number] } = {};

    TOPIC_NODES.forEach((node, idx) => {
      const g = groupRefs.current[idx];
      if (g) {
        const curAngle = node.phase + time * node.speed;
        const scaleTarget = Math.max(0.001, Math.min(1, (revealProgress - 0.4) * 2));
        
        g.position.x = Math.cos(curAngle) * node.radius;
        g.position.z = Math.sin(curAngle) * node.radius;
        g.position.y = Math.sin(curAngle * 2) * 0.3;
        
        g.scale.setScalar(scaleTarget);
        g.rotation.y += delta * 0.5;

        newPos[node.id] = [g.position.x, g.position.y, g.position.z];
      }
    });

    setNodePositions(newPos);
  });

  const lineOpacity = Math.max(0, Math.min(0.35, (revealProgress - 0.7) * 2));

  return (
    <group rotation={[0.25, 0, -0.08]}>
      {/* Connecting Rays from Core to Concept Nodes */}
      {TOPIC_NODES.map((node) => {
        const targetPos = nodePositions[node.id] || [0, 0, 0];
        return (
          <Line
            key={`line-${node.id}`}
            points={[[0, 0, 0], targetPos]}
            color={node.color}
            transparent
            opacity={lineOpacity}
            lineWidth={1.5}
          />
        );
      })}

      {/* Orbiting Abstract Concept Geometry Nodes */}
      {TOPIC_NODES.map((node, idx) => (
        <group
          key={node.id}
          ref={(el) => {
            if (el) groupRefs.current[idx] = el;
          }}
        >
          {/* Node Core Geometry */}
          <mesh>
            <icosahedronGeometry args={[0.3, 1]} />
            <meshStandardMaterial
              color="#0d141a"
              roughness={0.3}
              metalness={0.7}
              emissive={node.color}
              emissiveIntensity={0.6}
            />
          </mesh>

          {/* Wireframe Outline */}
          <mesh scale={[1.05, 1.05, 1.05]}>
            <icosahedronGeometry args={[0.3, 1]} />
            <meshBasicMaterial
              color={node.color}
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>

          {/* Floating Topic Label */}
          <Text
            position={[0, 0.52, 0]}
            fontSize={0.14}
            color={node.color}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.08}
          >
            {node.label}
          </Text>
          <Text
            position={[0, 0.38, 0]}
            fontSize={0.09}
            color="#F3F6F4"
            fillOpacity={0.6}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.1}
          >
            {node.sub}
          </Text>
        </group>
      ))}
    </group>
  );
};

// --- INSTANCED MICRO-PARTICLE KNOWLEDGE ORBIT RING ---
const KnowledgeParticleOrbit: React.FC<{ revealProgress: number }> = ({ revealProgress }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 12000;

  const [positions, originalRadii, angles, speeds, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const radii = new Float32Array(count);
    const ang = new Float32Array(count);
    const spd = new Float32Array(count);
    const col = new Float32Array(count * 3);

    const emerald = new THREE.Color("#35F5B4");
    const cyan = new THREE.Color("#58D8FF");
    const violet = new THREE.Color("#8A6DFF");
    const starlight = new THREE.Color("#F3F6F4");

    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 2.5;
      const angle = Math.random() * Math.PI * 2;
      const heightSpread = (Math.random() - 0.5) * 0.22;

      radii[i] = radius;
      ang[i] = angle;
      spd[i] = (0.15 + Math.random() * 0.3) * (Math.random() > 0.5 ? 1 : -1);

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = heightSpread;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      const pick = Math.random();
      const c = pick < 0.5 ? emerald : pick < 0.8 ? cyan : pick < 0.95 ? violet : starlight;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, radii, ang, spd, col];
  }, [count]);

  const particleTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 15);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.4, "rgba(53, 245, 180, 0.8)");
    grad.addColorStop(0.8, "rgba(88, 216, 255, 0.3)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    // Scale orbit expansion smoothly based on reveal progress
    const orbitScale = Math.max(0.01, Math.min(1, (revealProgress - 0.2) * 1.5));

    for (let i = 0; i < count; i++) {
      angles[i] += speeds[i] * delta * 0.4;
      const angle = angles[i];
      const r = originalRadii[i] * (2.2 - 1.2 * orbitScale);
      const wave = Math.sin(angle * 4 + time * 1.2) * 0.08 * orbitScale;

      posArray[i * 3] = Math.cos(angle) * r;
      posArray[i * 3 + 1] = wave + (Math.random() - 0.5) * 0.01;
      posArray[i * 3 + 2] = Math.sin(angle) * r;
    }

    posAttr.needsUpdate = true;
  });

  const particleOpacity = Math.max(0.05, Math.min(0.8, revealProgress * 0.85));

  return (
    <group rotation={[0.35, 0.1, -0.1]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          map={particleTexture || undefined}
          vertexColors
          transparent
          opacity={particleOpacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

// --- SCENE RIG & RESTRICTED INTERACTION CONTROLS ---
const KnowledgeOrbitScene: React.FC<{
  isRevealed: boolean;
  revealProgress: number;
  onCoreClick: () => void;
}> = ({ isRevealed, revealProgress, onCoreClick }) => {
  const { pointer } = useThree();
  const sceneGroup = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (sceneGroup.current) {
      sceneGroup.current.rotation.y = THREE.MathUtils.damp(
        sceneGroup.current.rotation.y,
        pointer.x * 0.18,
        3,
        delta
      );
      sceneGroup.current.rotation.x = THREE.MathUtils.damp(
        sceneGroup.current.rotation.x,
        -pointer.y * 0.12,
        3,
        delta
      );
    }
  });

  return (
    <group ref={sceneGroup}>
      {/* Controlled Lighting */}
      <ambientLight intensity={0.25} color="#081014" />
      <directionalLight position={[5, 7, 6]} intensity={2.8} color="#FFFFFF" />
      <pointLight position={[-5, 3, -4]} intensity={5.0} color="#35F5B4" distance={18} />
      <pointLight position={[5, -4, -3]} intensity={4.0} color="#58D8FF" distance={18} />

      {/* Core Sphere */}
      <KnowledgeCore isRevealed={isRevealed} onCoreClick={onCoreClick} />

      {/* Orbiting Concept Nodes & Ray Connections */}
      <OrbitingConceptNodes revealProgress={revealProgress} />

      {/* Micro-Particle Orbit Ring */}
      <KnowledgeParticleOrbit revealProgress={revealProgress} />

      {/* Soft Bloom Filter */}
      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom
          luminanceThreshold={0.45}
          luminanceSmoothing={0.5}
          intensity={0.4}
          mipmapBlur
        />
      </EffectComposer>
    </group>
  );
};

// --- MAIN FEATURE COMPONENT: KNOWLEDGE ORBIT ---
interface KnowledgeOrbitCardProps {
  ringState?: string;
  interactive?: boolean;
  className?: string;
}

export const KnowledgeOrbitCard: React.FC<KnowledgeOrbitCardProps> = ({
  className = "",
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Timed emergence sequence on click
  const handleTriggerReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);

    const startTime = Date.now();
    const duration = 2200; // 2.2 seconds total sequence

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const prog = Math.min(1, elapsed / duration);
      setRevealProgress(prog);

      if (prog >= 1) {
        clearInterval(interval);
      }
    }, 16);
  };

  return (
    <section className="relative w-full py-20 px-6 md:px-12 bg-[#030504] border-y border-[#35F5B4]/10 select-none overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#35F5B4]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#58D8FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
        {/* LEFT COLUMN: EDITORIAL CONTENT & CTA */}
        <div className="lg:col-span-5 space-y-8 z-10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#35F5B4]/10 border border-[#35F5B4]/20 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35F5B4] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#35F5B4] font-medium">
              KNOWLEDGE ORBIT
            </span>
          </div>

          <h2 className="font-sans text-4xl md:text-6xl font-medium text-[#F3F6F4] tracking-[-0.04em] leading-[1.02]">
            Every concept <br />
            <span className="italic text-[#35F5B4] font-light">lives in context.</span>
          </h2>

          <p className="font-sans text-base md:text-lg text-[#F3F6F4]/70 font-light leading-relaxed">
            See prerequisites, related topics, and foundational principles orbit around a central idea. GuruKul AI turns flat course modules into a living 3D knowledge universe.
          </p>

          {/* REVEAL TRIGGER & STATUS HINT */}
          <div className="pt-2 space-y-4">
            <button
              onClick={handleTriggerReveal}
              disabled={isRevealed}
              className={`group flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 font-mono text-xs uppercase tracking-[0.14em] ${
                isRevealed
                  ? "bg-[#35F5B4]/15 border-[#35F5B4]/40 text-[#35F5B4]"
                  : "bg-[#040605] border-[#35F5B4]/30 text-[#F3F6F4] hover:border-[#35F5B4] hover:bg-[#35F5B4]/10 cursor-pointer"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isRevealed ? "bg-[#35F5B4] animate-ping" : "bg-[#58D8FF]"
                }`}
              />
              <span>
                {isRevealed
                  ? "KNOWLEDGE ORBIT ACTIVE • 5 NODES CONNECTED"
                  : "CLICK TO REVEAL CONNECTIONS"}
              </span>
            </button>
          </div>

          {/* REAL CTA LINK TO SYLLABUS APP */}
          <div className="pt-4 border-t border-[#F3F6F4]/10">
            <Link href="/app">
              <motion.div
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-2 font-sans font-medium text-sm md:text-base text-[#35F5B4] hover:text-[#58D8FF] transition-colors cursor-pointer"
              >
                <span>Explore your own constellation</span>
                <span>↗</span>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D INTERACTIVE KNOWLEDGE ORBIT VISUAL */}
        <div className="lg:col-span-7 relative w-full h-[420px] md:h-[540px] rounded-3xl bg-[#040605] border border-[#35F5B4]/15 overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
          {/* Subtle Corner Status */}
          <div className="absolute top-4 left-5 z-20 font-mono text-[10px] uppercase tracking-[0.14em] text-[#35F5B4]/60">
            [INTERACTIVE 3D ORBIT FIELD]
          </div>
          <div className="absolute top-4 right-5 z-20 font-mono text-[10px] uppercase tracking-[0.14em] text-[#F3F6F4]/40">
            DRAG TO ROTATE
          </div>

          {mounted ? (
            <Canvas
              camera={{ position: [0, 0, 7.8], fov: 42 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 1.5]}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              {/* Restricted Orbit Controls: Subtle drag rotation, NO zoom, NO pan */}
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.35}
                maxPolarAngle={Math.PI / 1.8}
                minPolarAngle={Math.PI / 2.5}
              />
              <Suspense fallback={null}>
                <KnowledgeOrbitScene
                  isRevealed={isRevealed}
                  revealProgress={revealProgress}
                  onCoreClick={handleTriggerReveal}
                />
              </Suspense>
            </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-[#35F5B4]/10 blur-xl animate-pulse" />
            </div>
          )}

          {/* Click Overlay Hint if not yet revealed */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleTriggerReveal}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-[#040605]/80 border border-[#35F5B4]/30 backdrop-blur-md text-center cursor-pointer"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#35F5B4]">
                  CLICK CORE TO REVEAL KNOWLEDGE ORBIT ↓
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeOrbitCard;
export { KnowledgeOrbitCard as LunarGravityCard };
