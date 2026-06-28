"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Pill,
  Moon,
  Dumbbell,
  Camera,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { life } from "@/lib/copy";

const TRACKER_ICONS = {
  card: CreditCard,
  pill: Pill,
  moon: Moon,
  dumbbell: Dumbbell,
} as const;

const TONES: Record<string, string> = {
  brand: "bg-coral/15 text-coral-press",
  teal: "bg-[#4FB191]/15 text-[#338a6c]",
  blue: "bg-[#6BA8D8]/15 text-[#3f7cb0]",
  amber: "bg-[#E3B450]/20 text-[#a9821f]",
};

export function LifeShowcase() {
  return (
    <section id="life" className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div
        aria-hidden
        className="coral-wash pointer-events-none absolute inset-0 opacity-50"
      />
      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <span className="eyebrow inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {life.eyebrow}
          </span>
          <h2 className="font-display mt-4 whitespace-pre-line text-4xl text-ink sm:text-5xl">
            {life.headline}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">{life.sub}</p>
        </header>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <LifeVisual />
          </motion.div>

          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {life.pillars.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <h3 className="font-display text-xl text-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-14 flex max-w-xl items-center justify-center gap-2 text-center text-sm text-ink-3">
          <ShieldCheck className="h-4 w-4 shrink-0 text-coral-press" />
          {life.syncNote}
        </p>
      </div>
    </section>
  );
}

function LifeVisual() {
  return (
    <div className="relative rounded-[var(--radius-xl)] border border-border bg-surface p-6 shadow-[var(--shadow-md)] sm:p-8">
      {/* AI logging bubble */}
      <div className="flex justify-end">
        <span className="rounded-2xl rounded-br-md bg-coral px-4 py-2.5 text-[15px] text-on-coral shadow-[var(--shadow-coral)]">
          I spent $40 on groceries
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[13px] text-ink-3">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-coral/15 text-coral-press">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        Logged to Spending · groceries · $40
      </div>

      {/* Trackers */}
      <div className="mt-6 space-y-2.5">
        {life.trackers.map((t) => {
          const Icon = TRACKER_ICONS[t.icon as keyof typeof TRACKER_ICONS];
          return (
            <div
              key={t.name}
              className="flex items-center gap-3 rounded-2xl border border-border bg-paper px-4 py-3"
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                  TONES[t.tone] ?? TONES.brand
                }`}
              >
                {Icon ? <Icon className="h-4 w-4" /> : null}
              </span>
              <span className="text-[15px] font-medium text-ink">{t.name}</span>
              <span className="ml-auto text-[13px] font-medium text-ink-3">
                {t.stat}
              </span>
            </div>
          );
        })}
      </div>

      {/* Camera affordance */}
      <div className="mt-5 flex items-center gap-2 text-[13px] text-ink-3">
        <Camera className="h-4 w-4 text-coral-press" />
        Or snap a receipt — it reads and logs it on-device.
      </div>
    </div>
  );
}
