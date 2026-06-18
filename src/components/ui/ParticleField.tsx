"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useMemo, useSyncExternalStore } from "react";
import { leak } from "@/lib/copy";

/** true only after client hydration, false during SSR — no effect needed */
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/* Deterministic params (no Math.random → no hydration mismatch).
   Particles = the user's data: they orbit the orb, leak away to "the cloud",
   then get pulled back home and locked in. */

const COUNT = 28;
const GOLDEN = 2.399963; // golden angle (rad)

type ParticleParams = {
  orbitX: number;
  orbitY: number;
  expandX: number;
  expandY: number;
  leakX: number;
  leakY: number;
  size: number;
  label?: string;
  labelOrder: number;
};

const r1 = (n: number) => Math.round(n); // integers → no SSR/client float drift

function buildParticles(): ParticleParams[] {
  let labelOrder = 0;
  return Array.from({ length: COUNT }, (_, i) => {
    const angle = i * GOLDEN;
    const radius = 130 + (i % 6) * 26;
    const orbitX = Math.cos(angle) * radius;
    const orbitY = Math.sin(angle) * radius;
    const spread = (((i * 41) % 100) - 50) / 50; // -1..1 deterministic
    const hasLabel = i % 5 === 0;
    const order = labelOrder;
    const label = hasLabel
      ? leak.particleLabels[labelOrder % leak.particleLabels.length]
      : undefined;
    if (hasLabel) labelOrder++;
    return {
      orbitX: r1(orbitX),
      orbitY: r1(orbitY),
      expandX: r1(orbitX * 1.35),
      expandY: r1(orbitY * 1.35),
      leakX: r1(orbitX * 0.3 + spread * 220),
      // kept inside the viewport's upper half — the old -480..-1140 range
      // pushed labeled particles past the sticky container's
      // overflow-hidden edge, clipping their captions.
      leakY: -170 - (i % 7) * 22,
      size: 3 + (i % 4),
      label,
      labelOrder: order,
    };
  });
}

function Particle({
  p,
  progress,
}: {
  p: ParticleParams;
  progress: MotionValue<number>;
}) {
  // orbit (0) → expand (.2) → leak away (.38) → snap home by .42 — fully
  // absorbed right as the "vault" phase (and its headline) takes over, so
  // nothing is still in flight across the text.
  const x = useTransform(progress, [0, 0.2, 0.38, 0.42], [
    p.orbitX,
    p.expandX,
    p.leakX,
    0,
  ]);
  const y = useTransform(progress, [0, 0.2, 0.38, 0.42], [
    p.orbitY,
    p.expandY,
    p.leakY,
    0,
  ]);
  // non-zero at progress 0 so the orbit reads as ambient atmosphere around
  // the resting hero orb, not something that only appears once you scroll
  const opacity = useTransform(
    progress,
    [0, 0.05, 0.36, 0.4, 0.42],
    [0.4, 0.85, 0.95, 0.35, 0]
  );
  const scale = useTransform(progress, [0, 0.36, 0.42], [1, 1.1, 0.2]);

  // brand glow during orbit/leak → snaps to cold during leak peak → home
  const bg = useTransform(
    progress,
    [0, 0.22, 0.38, 0.42],
    [
      "rgba(130,167,255,0.9)",
      "rgba(130,167,255,0.7)",
      "rgba(180,86,106,0.85)",
      "rgba(130,167,255,0.95)",
    ]
  );

  // staggered per label (instead of all six firing in the same window) so
  // captions don't pile up on top of one another mid-flight
  const labelStart = 0.2 + p.labelOrder * 0.014;
  const labelOpacity = useTransform(
    progress,
    [labelStart, labelStart + 0.035, labelStart + 0.09, labelStart + 0.12],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ x, y, opacity }}
    >
      <motion.div
        className="rounded-full"
        style={{
          width: p.size,
          height: p.size,
          marginLeft: -p.size / 2,
          marginTop: -p.size / 2,
          background: bg,
          boxShadow: "0 0 8px currentColor",
          scale,
        }}
      />
      {p.label ? (
        <motion.span
          className="absolute left-3 top-0 whitespace-nowrap text-[11px] font-semibold tracking-wide text-cold-label drop-shadow-[0_1px_4px_rgba(0,0,0,0.65)]"
          style={{ opacity: labelOpacity }}
        >
          {p.label}
        </motion.span>
      ) : null}
    </motion.div>
  );
}

export function ParticleField({
  progress,
  reduced = false,
}: {
  progress: MotionValue<number>;
  reduced?: boolean;
}) {
  const particles = useMemo(() => buildParticles(), []);
  // Client-only: framer-motion serializes transforms at full float precision on
  // the server but rounds them on the client → hydration mismatch. Rendering
  // these decorative transforms only after hydration avoids SSR'ing them.
  const mounted = useMounted();

  if (reduced || !mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {particles.map((p, i) => (
        <Particle key={i} p={p} progress={progress} />
      ))}
    </div>
  );
}
