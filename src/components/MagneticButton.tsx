"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  pulseGlow?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  href,
  className = "",
  variant = "primary",
  pulseGlow = true,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth magnetic translation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * 0.35;
    const deltaY = (clientY - centerY) * 0.35;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-medium rounded-full transition-colors duration-300 select-none group";

  const variants = {
    primary:
      "bg-celestial-cyan text-space-950 px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#1ff0d8]",
    secondary:
      "bg-space-800/80 backdrop-blur-md text-starlight-pure border border-white/10 px-6 py-3 text-sm hover:border-celestial-cyan/40 hover:bg-space-750",
    ghost:
      "bg-transparent text-starlight-muted hover:text-starlight-pure px-5 py-2 text-sm",
  };

  const content = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* Outer soft pulsing glow */}
      {pulseGlow && variant === "primary" && (
        <div
          className="absolute -inset-1 rounded-full bg-celestial-cyan/30 blur-md opacity-75 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse-slow -z-10"
          aria-hidden="true"
        />
      )}

      {/* Subtle border shimmer */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-block outline-none">
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-block bg-transparent p-0 border-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-celestial-cyan rounded-full"
    >
      {content}
    </button>
  );
};
