"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface WarpDriveShaderProps {
  warpSpeed?: number;
  warpIntensity?: number;
  radialBrightness?: number;
  collapseProgress?: number;
  paused?: boolean;
  className?: string;
}

export const WarpDriveShader: React.FC<WarpDriveShaderProps> = ({
  warpSpeed = 1.0,
  warpIntensity = 1.0,
  radialBrightness = 1.0,
  collapseProgress = 0.0,
  paused = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<{
    uTime: { value: number };
    uSpeed: { value: number };
    uWarpIntensity: { value: number };
    uRadialBrightness: { value: number };
    uCollapseProgress: { value: number };
    uResolution: { value: THREE.Vector2 };
  }>({
    uTime: { value: 0 },
    uSpeed: { value: warpSpeed },
    uWarpIntensity: { value: warpIntensity },
    uRadialBrightness: { value: radialBrightness },
    uCollapseProgress: { value: collapseProgress },
    uResolution: { value: new THREE.Vector2(1, 1) },
  });

  // Keep uniforms up-to-date with prop changes without re-initializing WebGL
  useEffect(() => {
    uniformsRef.current.uSpeed.value = warpSpeed;
    uniformsRef.current.uWarpIntensity.value = warpIntensity;
    uniformsRef.current.uRadialBrightness.value = radialBrightness;
    uniformsRef.current.uCollapseProgress.value = collapseProgress;
  }, [warpSpeed, warpIntensity, radialBrightness, collapseProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- WebGL Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Append canvas
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    uniformsRef.current.uResolution.value.set(
      container.clientWidth * pixelRatio,
      container.clientHeight * pixelRatio
    );

    // --- Custom Warp Tunnel Fragment Shader ---
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform float uSpeed;
      uniform float uWarpIntensity;
      uniform float uRadialBrightness;
      uniform float uCollapseProgress;
      uniform vec2 uResolution;
      varying vec2 vUv;

      // Pseudo-random noise function
      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      void main() {
        vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);

        // Radial coordinates (polar)
        float r = length(st);
        float angle = atan(st.y, st.x);

        // Apply singularity collapse transition (zooms inward to 0)
        float collapseScale = mix(1.0, 0.01, clamp(uCollapseProgress, 0.0, 1.0));
        r /= max(collapseScale, 0.001);

        // Tunnel depth mapping
        float z = 1.0 / max(r, 0.02);

        // Polar grid noise for tunnel star/streak rays
        float numRays = 64.0;
        float rayId = floor((angle + 3.14159265) / (2.0 * 3.14159265) * numRays);
        float rayNoise = hash(vec2(rayId, 1.54));

        // Time flow along z-axis driven by uSpeed
        float travel = uTime * (0.8 + uSpeed * 1.5) + rayNoise * 10.0;
        float streakZ = fract(z * 0.15 - travel);

        // Streak shape calculation
        float streakLength = mix(0.1, 0.6, clamp(uWarpIntensity, 0.0, 3.0));
        float streak = smoothstep(0.0, streakLength, streakZ) * smoothstep(1.0, 1.0 - streakLength, streakZ);

        // Angle ray sharpness
        float rayAngle = fract((angle + 3.14159265) / (2.0 * 3.14159265) * numRays);
        float rayLine = smoothstep(0.45, 0.5, rayAngle) * smoothstep(0.55, 0.5, rayAngle);

        // Combine streaks and rays
        float tunnelLight = streak * rayLine * rayNoise * (1.0 + uWarpIntensity * 1.8);

        // Color palette: Deep space black -> Emerald #35F5B4 -> Soft Cyan #58D8FF -> White flare
        vec3 darkBg = vec3(0.015, 0.023, 0.02);
        vec3 emerald = vec3(0.207, 0.96, 0.705); // #35F5B4
        vec3 cyan = vec3(0.345, 0.847, 1.0);    // #58D8FF
        vec3 whiteFlare = vec3(1.0, 1.0, 1.0);

        vec3 streakColor = mix(emerald, cyan, rayNoise);
        vec3 finalColor = darkBg + streakColor * tunnelLight * 1.8;

        // Add center radial core glow
        float coreGlow = exp(-r * (4.0 / max(uRadialBrightness, 0.5)));
        finalColor += mix(emerald, whiteFlare, clamp(uWarpIntensity * 0.4, 0.0, 1.0)) * coreGlow * uRadialBrightness * 1.2;

        // Brighten center flare during collapse phase
        if (uCollapseProgress > 0.5) {
          float collapseFlare = smoothstep(0.5, 1.0, uCollapseProgress);
          finalColor = mix(finalColor, whiteFlare, collapseFlare * 0.85);
        }

        // Vignette edges
        float vignette = smoothstep(1.2, 0.3, length(vUv - 0.5));
        finalColor *= vignette;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniformsRef.current,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      if (!paused && document.visibilityState === "visible") {
        const delta = clock.getDelta();
        uniformsRef.current.uTime.value += delta;
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const pr = Math.min(window.devicePixelRatio, 2);
      renderer.setSize(w, h);
      uniformsRef.current.uResolution.value.set(w * pr, h * pr);
    };

    window.addEventListener("resize", handleResize);

    // --- Cleanup on Unmount ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [paused]);

  return <div ref={containerRef} className={`relative w-full h-full ${className}`} />;
};
