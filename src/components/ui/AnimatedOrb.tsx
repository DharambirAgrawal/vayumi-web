"use client";

import { motion, useReducedMotion } from "framer-motion";
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

// A liquid blob never settles on a perfect circle — it idles between a
// handful of soft, asymmetric border-radius shapes.
const BLOB_SHAPES = [
  "48% 52% 53% 47% / 50% 49% 51% 50%",
  "53% 47% 48% 52% / 47% 53% 49% 51%",
  "50% 50% 47% 53% / 53% 47% 50% 50%",
  "48% 52% 53% 47% / 50% 49% 51% 50%",
];

type Props = {
  size?: number;
  variant?: OrbVariant;
  /** 0 = dim/dormant, 1 = fully alive */
  intensity?: number;
  /** ambient breathing/morphing (idle hero state) */
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
  const reduced = useReducedMotion();
  const animated = alive && !reduced;

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{ scale: 0.92 + intensity * 0.08 }}
      transition={{ type: "spring", damping: 18, stiffness: 55, mass: 1 }}
    >
      {/* Atmospheric halo — large, very soft, dissolves into the page
          instead of leaving a hard disc edge. */}
      <div
        aria-hidden
        className={`absolute inset-0 rounded-full ${alive ? "animate-breathe" : ""}`}
        style={{
          background: v.core,
          filter: "blur(54px)",
          opacity: 0.26 + intensity * 0.3,
          transform: "scale(1.7)",
        }}
      />

      {/* Liquid glass body — a softly morphing blob, not a static circle */}
      <motion.div
        aria-hidden
        className="absolute inset-0 overflow-hidden rounded-full border border-white/10"
        style={{
          background: v.core,
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
          boxShadow: `inset 0 1px 1px rgba(255,255,255,0.16), inset 0 -18px 36px rgba(0,0,0,0.32), ${v.glow}`,
        }}
        animate={animated ? { borderRadius: BLOB_SHAPES } : undefined}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Internal swirl — a slow, contained current of light, like liquid
            moving inside glass rather than a ring orbiting it. */}
        <div
          aria-hidden
          className={`absolute -inset-1/3 ${alive ? "animate-spin-slow" : ""}`}
          style={{
            background: `conic-gradient(from 120deg, transparent 0%, color-mix(in srgb, ${v.ringSoft} 35%, transparent) 30%, transparent 55%, color-mix(in srgb, ${v.ring} 30%, transparent) 85%, transparent 100%)`,
            opacity: 0.45 + intensity * 0.3,
          }}
        />

        {/* Specular sheen — a drifting highlight, like light catching the
            curve of glass, rather than a fixed glossy-sphere blob. */}
        <motion.div
          aria-hidden
          className="absolute h-2/5 w-2/5 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 72%)",
            filter: "blur(10px)",
            top: "8%",
            left: "12%",
            opacity: 0.5 + intensity * 0.3,
          }}
          animate={animated ? { x: [0, 16, -6, 0], y: [0, 10, -8, 0] } : {}}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Fine grain — breaks up the gradient so the surface reads as
            material, not a flat digital render. */}
        <div aria-hidden className="grain-overlay absolute inset-0" />
      </motion.div>

      {/* Morph overlay content */}
      {children ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      ) : null}
    </motion.div>
  );
}
