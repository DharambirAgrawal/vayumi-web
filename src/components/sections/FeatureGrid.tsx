"use client";

import { motion } from "framer-motion";
import { Mic, AudioLines, BellRing, Wrench } from "lucide-react";
import { features } from "@/lib/copy";
import { GlassCard } from "@/components/ui/GlassCard";
import { fadeUp, inView, staggerContainer } from "@/lib/motion";

const ICONS: Record<string, typeof Mic> = {
  voice: Mic,
  meetings: AudioLines,
  reminders: BellRing,
  toolbox: Wrench,
};

export function FeatureGrid() {
  return (
    <section id="features" className="relative px-6 py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="mx-auto max-w-6xl"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-16">
          <motion.div
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-none lg:sticky lg:top-32 lg:self-start lg:text-left"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
              Everything it does
            </span>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              One assistant. All on your phone.
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((f) => {
              const Icon = ICONS[f.id] ?? Mic;
              const accentColor =
                f.accent === "teal"
                  ? "var(--brand-tertiary)"
                  : "var(--brand-primary)";
              const badgeGradient =
                f.accent === "teal"
                  ? "var(--gradient-badge-teal)"
                  : "var(--gradient-badge-brand)";
              return (
                <motion.div
                  key={f.id}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                >
                  <GlassCard
                    strong
                    className="group h-full p-8 transition-shadow duration-300 hover:shadow-[var(--glow-brand-soft)]"
                  >
                    <div
                      className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10"
                      style={{
                        background: badgeGradient,
                        boxShadow: `0 0 28px ${accentColor}40`,
                      }}
                    >
                      <Icon
                        className="h-7 w-7"
                        style={{ color: accentColor }}
                        strokeWidth={1.7}
                      />
                    </div>
                    <h3 className="font-serif text-2xl text-text-primary">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {f.body}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
