"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { configureTextBuilder, preloadFont } from "troika-three-text";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

if (typeof window !== "undefined") {
  configureTextBuilder({
    useWorker: false,
    defaultFontURL: "/fonts/Roboto.woff",
  });
}

export type RingState = "hidden" | "animating" | "visible";

interface ConstellationCoreProps {
  ringState?: RingState;
  interactive?: boolean;
  scale?: number;
  className?: string;
  onRotationUpdate?: (rotY: number) => void;
}

// 1. Central Core Node-Sphere with Rich Depth, Gradient Falloff, and Rim Glow
const CoreSphere: React.FC<{
  groupRef: React.RefObject<THREE.Group>;
  onRotationUpdate?: (rotY: number) => void;
}> = ({ onRotationUpdate }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.16;
      if (onRotationUpdate) {
        onRotationUpdate(meshRef.current.rotation.y);
      }
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <group>
      {/* Outer Ethereal Atmosphere Rim Catching Cyan Rim Light */}
      <mesh ref={atmosphereRef} scale={[1.74, 1.74, 1.74]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color="#00D9C0"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Secondary Violet Outer Atmosphere */}
      <mesh scale={[1.82, 1.82, 1.82]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Core Node Sphere: Deep space body catching key directional and rim lights */}
      <mesh ref={meshRef} scale={[1.68, 1.68, 1.68]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#0d1b22"
          roughness={0.38}
          metalness={0.45}
          emissive="#003b35"
          emissiveIntensity={0.5} // Rich dark-cyan emissive base that combines with key directional light
        />
      </mesh>
    </group>
  );
};

// 2. Syllabus Fragment Particle Ring (Small glowing dashes/dots swirling into orbit)
const SyllabusParticleRing: React.FC<{ ringState: RingState }> = ({ ringState }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 750;

  const [positions, originalRadii, angles, speeds, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const radii = new Float32Array(count);
    const ang = new Float32Array(count);
    const spd = new Float32Array(count);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color("#00D9C0");
    const violet = new THREE.Color("#8B5CF6");
    const starlight = new THREE.Color("#E8E6DD");

    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 2.4;
      const angle = Math.random() * Math.PI * 2;
      const heightSpread = (Math.random() - 0.5) * 0.26;

      radii[i] = radius;
      ang[i] = angle;
      spd[i] = (0.2 + Math.random() * 0.35) * (Math.random() > 0.5 ? 1 : 1);

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = heightSpread;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      const pick = Math.random();
      const c = pick < 0.55 ? cyan : pick < 0.85 ? violet : starlight;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, radii, ang, spd, col];
  }, [count]);

  const particleTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.35, "rgba(0, 217, 192, 0.85)");
    gradient.addColorStop(0.7, "rgba(139, 92, 246, 0.35)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }, []);

  const progressRef = useRef(ringState === "visible" ? 1 : 0);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const targetProgress = ringState === "hidden" ? 0 : 1;
    const lerpSpeed = ringState === "animating" ? 2.5 : 4.0;
    progressRef.current = THREE.MathUtils.lerp(
      progressRef.current,
      targetProgress,
      delta * lerpSpeed
    );

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      angles[i] += speeds[i] * delta * 0.5;
      const angle = angles[i];

      const r = originalRadii[i] * (1.7 - 0.7 * progressRef.current);
      const wave = Math.sin(angle * 3 + time * 1.4) * 0.12 * progressRef.current;

      posArray[i * 3] = Math.cos(angle) * r;
      posArray[i * 3 + 1] = wave + (Math.random() - 0.5) * 0.02;
      posArray[i * 3 + 2] = Math.sin(angle) * r;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <group rotation={[0.42, 0.2, -0.15]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.085}
          map={particleTexture || undefined}
          vertexColors
          transparent
          opacity={ringState === "hidden" ? 0.15 : 0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

// 3. Floating Polyhedra with MeshStandardMaterial (Roughness ~0.4, Metalness ~0.2)
const OrbitingTopicIslands: React.FC = () => {
  const topicNodes = useMemo(
    () => [
      { id: "t1", label: "Foundations", radius: 3.3, speed: 0.22, phase: 0.3, size: 0.3, color: "#00D9C0" },
      { id: "t2", label: "Backpropagation", radius: 3.9, speed: 0.17, phase: 1.9, size: 0.36, color: "#8B5CF6" },
      { id: "t3", label: "Transformers", radius: 4.4, speed: 0.2, phase: 3.5, size: 0.4, color: "#00D9C0" },
      { id: "t4", label: "Alignment", radius: 3.6, speed: 0.14, phase: 5.1, size: 0.28, color: "#E8E6DD" },
    ],
    []
  );

  const groupRefs = useRef<THREE.Group[]>([]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    topicNodes.forEach((node, idx) => {
      const g = groupRefs.current[idx];
      if (g) {
        const curAngle = node.phase + time * node.speed;
        g.position.x = Math.cos(curAngle) * node.radius;
        g.position.z = Math.sin(curAngle) * node.radius;
        g.position.y = Math.sin(curAngle * 2) * 0.35;
        g.rotation.y += delta * 0.45;
        g.rotation.x += delta * 0.28;
      }
    });
  });

  return (
    <group rotation={[0.3, 0, -0.1]}>
      {topicNodes.map((node, idx) => (
        <group
          key={node.id}
          ref={(el) => {
            if (el) groupRefs.current[idx] = el;
          }}
        >
          {/* Low-poly icosahedron topic node with MeshStandardMaterial (roughness ~0.4, metalness ~0.2) */}
          <mesh>
            <icosahedronGeometry args={[node.size, 1]} />
            <meshStandardMaterial
              color="#161c28"
              roughness={0.4}
              metalness={0.2}
              emissive={node.color}
              emissiveIntensity={0.32} // Catches directional and rim lights while maintaining face contrast
              flatShading={true}
            />
          </mesh>

          {/* Delicate subtle wireframe rim outline */}
          <mesh scale={[1.02, 1.02, 1.02]}>
            <icosahedronGeometry args={[node.size, 1]} />
            <meshBasicMaterial
              color={node.color}
              wireframe
              transparent
              opacity={0.22}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// 4. True 3D Orbit Label with Curved Cylindrical Layout and Tangent Orientation
interface OrbitLabelProps {
  phrase: string;
  centerAngle: number;
  radius?: number;
  arcStep?: number;
  fontSize?: number;
  color?: string;
}

const OrbitLabel: React.FC<OrbitLabelProps> = ({
  phrase,
  centerAngle,
  radius = 1.76,
  arcStep = 0.088,
  fontSize = 0.15,
  color = "#00D9C0",
}) => {
  const chars = useMemo(() => phrase.split(""), [phrase]);
  const span = (chars.length - 1) * arcStep;

  return (
    <group>
      {chars.map((char, i) => {
        // Distribute characters across the arc
        // Decreasing angle so x moves left-to-right (from negative to positive)
        const angle = centerAngle + span / 2 - i * arcStep;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        // Face outward/tangent to the cylinder: rotation.y = PI/2 - angle
        const rotY = Math.PI / 2 - angle;

        return (
          <Text
            key={i}
            position={[x, 0, z]}
            rotation={[0, rotY, 0]}
            fontSize={fontSize}
            color={color}
            font="/fonts/Roboto.woff"
            anchorX="center"
            anchorY="middle"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            outlineWidth={0.006}
            outlineColor="#071217"
            material-toneMapped={false}
            material-depthTest={true}
            material-depthWrite={true}
          >
            {char}
          </Text>
        );
      })}
    </group>
  );
};

// 5. Glowing 3D Starlight Separator Node between phrases
const OrbitSeparator: React.FC<{ centerAngle: number; radius?: number }> = ({
  centerAngle,
  radius = 1.76,
}) => {
  const x = radius * Math.cos(centerAngle);
  const z = radius * Math.sin(centerAngle);
  return (
    <mesh position={[x, 0, z]}>
      <sphereGeometry args={[0.03, 12, 12]} />
      <meshBasicMaterial color="#E8E6DD" toneMapped={false} />
    </mesh>
  );
};

// 6. Orbiting Text Ring: 4 phrases spaced 90deg apart around the full circumference
const OrbitTextRing3D: React.FC<{
  radius?: number;
  rotationSpeed?: number;
}> = ({ radius = 1.76, rotationSpeed = 0.16 }) => {
  const ringGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group rotation={[0.12, 0, -0.04]} position={[0, -0.42, 0]}>
      <group ref={ringGroupRef}>
        {/* Quadrant 1: STRUCTURE (facing camera at t=0) */}
        <OrbitLabel
          phrase="STRUCTURE"
          centerAngle={Math.PI / 2}
          radius={radius}
          color="#00D9C0"
        />
        <OrbitSeparator centerAngle={Math.PI / 4} radius={radius} />

        {/* Quadrant 2: CLARITY (sweeps to front next) */}
        <OrbitLabel
          phrase="CLARITY"
          centerAngle={0}
          radius={radius}
          color="#00D9C0"
        />
        <OrbitSeparator centerAngle={(7 * Math.PI) / 4} radius={radius} />

        {/* Quadrant 3: TRUST (sweeps to front next) */}
        <OrbitLabel
          phrase="TRUST"
          centerAngle={(3 * Math.PI) / 2}
          radius={radius}
          color="#00D9C0"
        />
        <OrbitSeparator centerAngle={(5 * Math.PI) / 4} radius={radius} />

        {/* Quadrant 4: PROVENANCE (sweeps to front next) */}
        <OrbitLabel
          phrase="PROVENANCE"
          centerAngle={Math.PI}
          radius={radius}
          color="#00D9C0"
        />
        <OrbitSeparator centerAngle={(3 * Math.PI) / 4} radius={radius} />
      </group>
    </group>
  );
};

// 6. Parallax Camera & Lighting Rig (One Key Directional Light, One Soft Rim Light, Low Ambient)
const SceneRig: React.FC<{
  ringState: RingState;
  onRotationUpdate?: (rotY: number) => void;
}> = ({ ringState, onRotationUpdate }) => {
  const { pointer } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        pointer.x * 0.25,
        4,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        -pointer.y * 0.2,
        4,
        delta
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Low Ambient: gives deep spatial shadows */}
      <ambientLight intensity={0.3} color="#1b2030" />

      {/* 2. Key Directional Light: creates dramatic light-to-dark spherical falloff */}
      <directionalLight position={[6, 8, 7]} intensity={3.2} color="#FFFFFF" />

      {/* 3. Soft Rim Light in Accent Color (Electric Cyan) */}
      <pointLight position={[-6, 4, -4]} intensity={6.0} color="#00D9C0" distance={22} />

      {/* 4. Secondary Soft Rim Light in Cosmic Violet */}
      <pointLight position={[5, -5, -4]} intensity={5.0} color="#8B5CF6" distance={20} />

      {/* Central Constellation Core Sphere */}
      <CoreSphere groupRef={groupRef} onRotationUpdate={onRotationUpdate} />

      {/* 3D Orbiting Text Ring with Physical Depth Occlusion */}
      <Suspense fallback={null}>
        <OrbitTextRing3D radius={2.05} rotationSpeed={0.16} />
      </Suspense>

      {/* Swirling Syllabus Fragment Ring */}
      <SyllabusParticleRing ringState={ringState} />

      {/* Orbiting Topic Nodes */}
      <OrbitingTopicIslands />

      {/* Low/Subtle Bloom Post-Processing: Tuned so only highlights & glowing nodes softly bloom */}
      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom
          luminanceThreshold={0.4}
          luminanceSmoothing={0.5}
          intensity={0.45}
          mipmapBlur
        />
      </EffectComposer>
    </group>
  );
};

// 5. Main Reusable ConstellationCore Component
export const ConstellationCore3D: React.FC<ConstellationCoreProps> = ({
  ringState = "visible",
  className = "",
  onRotationUpdate,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-celestial-violet/20 via-celestial-cyan/20 to-transparent blur-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <SceneRig ringState={ringState} onRotationUpdate={onRotationUpdate} />
      </Canvas>
    </div>
  );
};

export default ConstellationCore3D;
export { ConstellationCore3D as LunarGravityCard };
