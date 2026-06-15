"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type OrbVariant = "brand" | "teal" | "cold";

const VARIANTS: Record<
  OrbVariant,
  { core: string; glow: string; ring: string; ringSoft: string }
> = {
  brand: {
    core: "var(--gradient-orb)",
    glow: "var(--glow-brand)",
    ring: "var(--brand-primary)",
    ringSoft: "var(--brand-tertiary)",
  },
  teal: {
    core: "var(--gradient-orb-teal)",
    glow: "var(--glow-meeting)",
    ring: "var(--brand-tertiary)",
    ringSoft: "var(--success)",
  },
  cold: {
    core: "var(--gradient-orb-cold)",
    glow: "var(--glow-cold)",
    ring: "var(--cold-text)",
    ringSoft: "var(--cold-accent)",
  },
};

type Props = {
  size?: number;
  variant?: OrbVariant;
  /** 0 = dim/dormant, 1 = fully alive */
  intensity?: number;
  /** ambient breathing/rotation (idle hero state) */
  alive?: boolean;
  /** content layered over the orb (icons, cards) during morph reveals */
  children?: ReactNode;
  className?: string;
};

export function AnimatedOrb({
  size = 280,
  variant = "brand",
  intensity = 1,
  alive = true,
  children,
  className = "",
}: Props) {
  const v = VARIANTS[variant];

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{ scale: 0.9 + intensity * 0.1 }}
      transition={{ type: "spring", damping: 18, stiffness: 55, mass: 1 }}
    >
      {/* Outer glow halo */}
      <motion.div
        aria-hidden
        className={`absolute inset-0 rounded-full ${alive ? "animate-breathe" : ""}`}
        style={{
          boxShadow: v.glow,
          background: v.core,
          filter: "blur(28px)",
          opacity: 0.35 + intensity * 0.4,
          transform: "scale(1.25)",
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Rotating gradient ring */}
      <div
        aria-hidden
        className={`absolute -inset-3 rounded-full ${alive ? "animate-spin-slow" : ""}`}
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${v.ring} 25%, transparent 55%, ${v.ringSoft} 80%, transparent 100%)`,
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
          opacity: 0.25 + intensity * 0.5,
        }}
      />

      {/* Counter-rotating dashed ring */}
      <div
        aria-hidden
        className="absolute -inset-1 rounded-full"
        style={{
          border: `1px dashed ${v.ring}`,
          opacity: 0.12 + intensity * 0.18,
          animation: alive ? "spin-slow 30s linear infinite reverse" : "none",
        }}
      />

      {/* Glass core */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full border border-white/10"
        style={{
          background: v.core,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        {/* top-left shimmer highlight */}
        <div
          aria-hidden
          className="absolute -left-1/4 -top-1/4 h-2/3 w-2/3 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
            opacity: 0.4 + intensity * 0.3,
          }}
        />
        {/* inner soft glow */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, rgba(255,255,255,0.12) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Morph overlay content */}
      {children ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      ) : null}
    </motion.div>
  );
}
