"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  speed: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export const Starfield: React.FC<{ density?: number; className?: string }> = ({
  density = 120,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const initStars = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = [];

      const count = Math.floor((width * height) / 12000) * (density / 100);

      for (let i = 0; i < count; i++) {
        const baseAlpha = 0.15 + Math.random() * 0.55;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() < 0.15 ? 1.8 : Math.random() < 0.4 ? 1.2 : 0.8,
          alpha: baseAlpha,
          baseAlpha,
          speed: 0.05 + Math.random() * 0.12,
          twinkleSpeed: 0.015 + Math.random() * 0.03,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initStars();

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Render subtle celestial dust clouds
      const grad1 = ctx.createRadialGradient(
        width * 0.25,
        height * 0.35,
        0,
        width * 0.25,
        height * 0.35,
        width * 0.5
      );
      grad1.addColorStop(0, "rgba(0, 217, 192, 0.03)");
      grad1.addColorStop(1, "rgba(0, 217, 192, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.75,
        height * 0.65,
        0,
        width * 0.75,
        height * 0.65,
        width * 0.55
      );
      grad2.addColorStop(0, "rgba(139, 92, 246, 0.025)");
      grad2.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw and update stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (!prefersReducedMotion) {
          star.twinklePhase += star.twinkleSpeed;
          star.alpha =
            star.baseAlpha + Math.sin(star.twinklePhase) * (star.baseAlpha * 0.4);
          star.y -= star.speed * delta * 60;
          if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
          }
        }

        ctx.fillStyle = `rgba(232, 230, 221, ${Math.max(0.05, Math.min(1, star.alpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra soft halo on rare larger stars
        if (star.size > 1.4) {
          ctx.fillStyle = `rgba(0, 217, 192, ${star.alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      initStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
};
