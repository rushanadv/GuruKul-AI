"use client";

import React, { useEffect, useState, useRef } from "react";

interface CircumferenceTextRingProps {
  radius?: number;
  tiltAngle?: number; // degrees
  speed?: number; // rad/sec
  words?: string[];
  className?: string;
  externalRotY?: number;
}

export const CircumferenceTextRing: React.FC<CircumferenceTextRingProps> = ({
  radius = 480, // Orbit sits cleanly outside the sphere's visual boundary
  tiltAngle = 18,
  speed = 0.16,
  words = ["STRUCTURE", "•", "CLARITY", "•", "TRUST", "•", "PROVENANCE", "•"],
  className = "",
  externalRotY,
}) => {
  const [rotation, setRotation] = useState(0);
  const animRef = useRef<number>();
  const lastTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    const loop = (time: number) => {
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      setRotation((prev) => prev + speed * delta);
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [speed]);

  const effectiveRotation = externalRotY !== undefined ? externalRotY : rotation;

  const totalTokens = words.length;
  const tiltRad = (tiltAngle * Math.PI) / 180;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 ${className}`}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <div className="relative w-0 h-0">
        {words.map((token, i) => {
          const baseAngle = (i / totalTokens) * Math.PI * 2;
          const currentAngle = baseAngle + effectiveRotation;

          // 3D elliptical coordinates with tilt
          const x = Math.cos(currentAngle) * radius;
          const z = Math.sin(currentAngle) * radius; // depth
          const y = Math.sin(currentAngle) * (radius * 0.28) * Math.sin(tiltRad);

          // Front-to-back depth cues
          const depthNorm = (z + radius) / (radius * 2); // 0 (back) to 1 (front)
          let baseOpacity = 0.2 + depthNorm * 0.8;
          const scale = 0.8 + depthNorm * 0.3;

          // Strict Paragraph-Safe Zone:
          // The center paragraph block has max-width ~340px (half-width 170px).
          // To ensure no label ever intersects the paragraph's bounding box:
          // Any label with |x| < 235px is completely faded to 0 opacity.
          const absX = Math.abs(x);
          let centerFade = 1;
          if (absX < 235) {
            centerFade = 0;
          } else if (absX < 310) {
            centerFade = (absX - 235) / (310 - 235);
          }

          const finalOpacity = baseOpacity * centerFade;
          const isBullet = token === "•";

          return (
            <div
              key={`${token}-${i}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-75"
              style={{
                transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
                opacity: finalOpacity,
                visibility: finalOpacity < 0.05 ? "hidden" : "visible",
                zIndex: Math.round(depthNorm * 20),
              }}
            >
              <span
                className={`font-mono uppercase tracking-widest text-[11px] sm:text-xs font-semibold whitespace-nowrap ${
                  isBullet
                    ? "text-celestial-cyan text-[8px]"
                    : depthNorm > 0.55
                    ? "text-starlight-pure drop-shadow-[0_0_12px_rgba(0,217,192,0.6)]"
                    : "text-starlight-dim/70"
                }`}
              >
                {token}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
