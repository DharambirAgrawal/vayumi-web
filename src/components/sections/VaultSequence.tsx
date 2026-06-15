"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Phone, MessageSquare, MapPin, Search, Bell, Lock } from "lucide-react";
import { AnimatedOrb, type OrbVariant } from "@/components/ui/AnimatedOrb";
import { ParticleField } from "@/components/ui/ParticleField";
import { GlassButton } from "@/components/ui/GlassButton";
import { hero, leak, flip, features, recap } from "@/lib/copy";

type Phase = "open" | "leak" | "vault" | "features" | "recap";

const orbState: Record<Phase, { variant: OrbVariant; intensity: number }> = {
  open: { variant: "brand", intensity: 0.85 },
  leak: { variant: "cold", intensity: 0.35 },
  vault: { variant: "brand", intensity: 1 },
  features: { variant: "brand", intensity: 0.92 },
  recap: { variant: "brand", intensity: 0.7 },
};

/* small glyph emitted "from" the orb per feature */
function FeatureGlyph({ id }: { id: string }) {
  if (id === "voice") {
    return (
      <div className="flex items-end gap-1">
        {[10, 22, 14, 28, 16, 24, 12].map((h, i) => (
          <motion.span
            key={i}
            className="w-1 rounded-full bg-white/90"
            initial={{ height: 6 }}
            animate={{ height: [6, h, 6] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  }
  if (id === "meetings") {
    return (
      <div className="flex flex-col items-center gap-2">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
          REC
        </span>
        <div className="space-y-1">
          {[28, 20, 24].map((w, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full bg-white/70"
              style={{ width: w }}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
            />
          ))}
        </div>
      </div>
    );
  }
  if (id === "reminders") {
    return <Bell className="h-9 w-9 text-white" strokeWidth={1.6} />;
  }
  // toolbox
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {[Phone, MessageSquare, MapPin, Search].map((Icon, i) => (
        <motion.span
          key={i}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/12 backdrop-blur"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
        >
          <Icon className="h-4 w-4 text-white" strokeWidth={1.8} />
        </motion.span>
      ))}
    </div>
  );
}

export function VaultSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [phase, setPhase] = useState<Phase>("open");
  const [feature, setFeature] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    let next: Phase = "open";
    if (p < 0.14) next = "open";
    else if (p < 0.42) next = "leak";
    else if (p < 0.58) next = "vault";
    else if (p < 0.88) next = "features";
    else next = "recap";
    setPhase((prev) => (prev === next ? prev : next));

    if (next === "features") {
      const local = (p - 0.58) / (0.88 - 0.58);
      const idx = Math.min(3, Math.max(0, Math.floor(local * 4)));
      setFeature((prev) => (prev === idx ? prev : idx));
    }
  });

  // continuous (GPU) transforms — no React re-render
  const orbScale = useTransform(scrollYProgress, [0, 0.88, 1], [1, 1, 0.6]);
  const coldWash = useTransform(
    scrollYProgress,
    [0.14, 0.3, 0.42, 0.5],
    [0, 0.55, 0.65, 0]
  );
  const irisScale = useTransform(scrollYProgress, [0.42, 0.56], [1.9, 1.02]);
  const irisOpacity = useTransform(
    scrollYProgress,
    [0.44, 0.52, 0.9, 1],
    [0, 1, 0.45, 0.3]
  );
  const encryptOpacity = useTransform(
    scrollYProgress,
    [0.52, 0.57, 0.66, 0.72],
    [0, 1, 1, 0]
  );

  const cur = orbState[phase];
  const orbVariant: OrbVariant =
    phase === "features" && features[feature].accent === "teal"
      ? "teal"
      : cur.variant;

  if (reduced) {
    return <VaultFallback />;
  }

  return (
    <section ref={ref} id="vault" className="relative h-[520vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* ambient deep-space starfield (depth) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 starfield" />

        {/* cold wash overlay (the leak) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: coldWash,
            background:
              "radial-gradient( circle at 50% 30%, rgba(180,86,106,0.22), transparent 55%), linear-gradient(to top, rgba(20,22,27,0.9), rgba(20,22,27,0.4))",
          }}
        />

        {/* server silhouettes appear during leak */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 flex justify-center gap-3 pt-10"
          style={{ opacity: coldWash }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 w-10 rounded-md border border-cold-accent/30 bg-cold-surface/60"
              style={{ boxShadow: "0 0 24px rgba(180,86,106,0.15)" }}
            >
              <div className="mt-2 space-y-1.5 px-2">
                <span className="block h-0.5 w-full bg-cold-accent/50" />
                <span className="block h-0.5 w-2/3 bg-cold-accent/40" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* The orb + particles + vault */}
        <div className="relative flex items-center justify-center">
          <ParticleField progress={scrollYProgress} />

          {/* vault iris ring */}
          <motion.div
            aria-hidden
            className="absolute rounded-full border-2"
            style={{
              width: 420,
              height: 420,
              borderColor: "var(--brand-primary)",
              scale: irisScale,
              opacity: irisOpacity,
              boxShadow:
                "0 0 60px rgba(130,167,255,0.3), inset 0 0 60px rgba(130,167,255,0.15)",
            }}
          />
          <motion.div
            aria-hidden
            className="absolute rounded-full border border-dashed"
            style={{
              width: 470,
              height: 470,
              borderColor: "var(--brand-tertiary)",
              scale: irisScale,
              opacity: irisOpacity,
            }}
          />

          {/* flash burst at the moment the vault snaps shut */}
          {phase === "vault" && (
            <span
              aria-hidden
              className="absolute h-[320px] w-[320px] rounded-full border-2 border-brand-light"
              style={{ animation: "flash-burst 0.8s ease-out forwards" }}
            />
          )}

          <motion.div style={{ scale: orbScale }}>
            <AnimatedOrb size={300} variant={orbVariant} intensity={cur.intensity}>
              {/* encrypt flash — only during the vault/flip moment */}
              {phase === "vault" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ opacity: encryptOpacity }}
                >
                  <span className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold tracking-widest text-brand-light backdrop-blur">
                    <Lock className="h-3 w-3" /> {flip.lockLabel}
                  </span>
                </motion.div>
              )}

              {/* feature glyph */}
              {phase === "features" && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center justify-center"
                  >
                    <FeatureGlyph id={features[feature].id} />
                  </motion.div>
                </AnimatePresence>
              )}
            </AnimatedOrb>
          </motion.div>
        </div>

        {/* ---- TEXT LAYERS (phase-driven, mount/unmount per scene) ---- */}
        <AnimatePresence>
          {phase === "open" && (
            <motion.div
              key="open"
              variants={SCENE}
              initial="hidden"
              animate="show"
              exit="exit"
              className="pointer-events-none absolute inset-x-0 top-[14%] flex flex-col items-center px-6 text-center"
            >
              {/* legibility scrim so the headline reads over the bright orb */}
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[140%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(5,5,6,0.78) 0%, rgba(5,5,6,0.45) 45%, transparent 72%)",
                }}
              />
              <span className="mb-4 rounded-full border border-glass-border bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-text-secondary">
                {hero.eyebrow}
              </span>
              <h1 className="max-w-4xl whitespace-pre-line font-serif text-[2rem] leading-[1.08] text-text-primary sm:text-6xl md:text-7xl">
                {hero.headline}
              </h1>
              <p className="mt-6 max-w-xl text-sm text-text-secondary sm:text-lg">
                {hero.subhead}
              </p>
              <div className="pointer-events-auto mt-8">
                <GlassButton as="a" href="#waitlist">
                  {hero.cta}
                </GlassButton>
              </div>
            </motion.div>
          )}

          {phase === "leak" && (
            <motion.div
              key="leak"
              variants={SCENE}
              initial="hidden"
              animate="show"
              exit="exit"
              className="pointer-events-none absolute inset-x-0 bottom-[15%] flex flex-col items-center px-6 text-center"
            >
              <h2 className="max-w-3xl whitespace-pre-line font-serif text-3xl leading-tight text-cold-text-strong sm:text-5xl">
                {leak.headline}
              </h2>
              <p className="mt-5 max-w-xl text-sm text-cold-text-strong/85 sm:text-base">
                {leak.sub}
              </p>
            </motion.div>
          )}

          {phase === "vault" && (
            <motion.div
              key="vault"
              variants={SCENE}
              initial="hidden"
              animate="show"
              exit="exit"
              className="pointer-events-none absolute inset-x-0 top-[14%] flex flex-col items-center px-6 text-center"
            >
              <h2 className="max-w-3xl whitespace-pre-line font-serif text-3xl leading-tight sm:text-6xl">
                <span className="text-gradient-brand">{flip.headline}</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm text-text-secondary sm:text-base">
                {flip.sub}
              </p>
            </motion.div>
          )}

          {phase === "features" && (
            <motion.div
              key="features"
              variants={SCENE}
              initial="hidden"
              animate="show"
              exit="exit"
              className="pointer-events-none absolute inset-x-0 top-[13%] flex flex-col items-center px-6 text-center"
            >
              <FeatureText index={feature} />
            </motion.div>
          )}

          {phase === "recap" && (
            <motion.div
              key="recap"
              variants={SCENE}
              initial="hidden"
              animate="show"
              exit="exit"
              className="pointer-events-none absolute inset-x-0 bottom-[16%] flex flex-col items-center px-6 text-center"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-7xl text-gradient-brand sm:text-8xl">
                  {recap.counter}
                </span>
                <span className="max-w-[8rem] text-left text-sm text-text-secondary">
                  {recap.counterLabel}
                </span>
              </div>
              <h2 className="mt-6 font-serif text-3xl text-text-primary sm:text-4xl">
                {recap.headline}
              </h2>
              <p className="mt-3 text-sm text-text-secondary">{recap.sub}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* scroll hint (only on the opening scene) */}
        <AnimatePresence>
          {phase === "open" && (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
            >
              <span className="text-xs uppercase tracking-widest text-text-tertiary">
                {hero.scrollHint}
              </span>
              <div className="mx-auto mt-2 h-8 w-5 rounded-full border border-glass-border">
                <motion.div
                  className="mx-auto mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-primary"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

const SCENE = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -24, transition: { duration: 0.4, ease: "easeIn" } },
} as const;

/* Feature caption that swaps as the orb morphs */
function FeatureText({ index }: { index: number }) {
  const f = features[index];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={f.id}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <span className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-primary">
          {f.kicker}
        </span>
        <h2 className="max-w-2xl font-serif text-3xl leading-tight text-text-primary sm:text-5xl">
          {f.title}
        </h2>
        <p className="mt-5 max-w-lg text-sm text-text-secondary sm:text-base">
          {f.body}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

/* Reduced-motion: a calm, static telling of the same story */
function VaultFallback() {
  return (
    <section id="vault" className="relative px-6 py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-16 text-center">
        <div className="flex flex-col items-center">
          <AnimatedOrb size={220} variant="brand" intensity={1} alive={false} />
          <h1 className="mt-10 whitespace-pre-line font-serif text-5xl leading-tight">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-text-secondary">{hero.subhead}</p>
          <div className="mt-8">
            <GlassButton as="a" href="#waitlist">
              {hero.cta}
            </GlassButton>
          </div>
        </div>

        <div>
          <h2 className="whitespace-pre-line font-serif text-3xl text-gradient-brand">
            {flip.headline}
          </h2>
          <p className="mt-4 text-text-secondary">{flip.sub}</p>
        </div>
      </div>
    </section>
  );
}
