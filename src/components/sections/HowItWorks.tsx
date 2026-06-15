"use client";

import { motion } from "framer-motion";
import { Mic, Sparkles, ShieldCheck } from "lucide-react";
import { howItWorks } from "@/lib/copy";
import { fadeUp, inView, staggerContainer } from "@/lib/motion";

const ICONS = [Mic, Sparkles, ShieldCheck];

export function HowItWorks() {
  return (
    <section id="how" className="relative px-6 py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="mx-auto max-w-5xl"
      >
        <motion.div variants={fadeUp} className="mx-auto mb-20 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
            {howItWorks.eyebrow}
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            {howItWorks.heading}
          </h2>
          <p className="mt-4 text-text-secondary">{howItWorks.sub}</p>
        </motion.div>

        <div className="relative grid gap-14 md:grid-cols-3 md:gap-8">
          {/* connecting line that draws in (desktop) */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, ease: "easeInOut", delay: 0.25 }}
            className="absolute left-[18%] right-[18%] top-9 hidden h-px origin-left md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--brand-tertiary), var(--brand-primary), transparent)",
              opacity: 0.5,
            }}
          />

          {howItWorks.steps.map((step, i) => {
            const Icon = ICONS[i] ?? Mic;
            return (
              <motion.div
                key={step.n}
                variants={fadeUp}
                className="relative flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -3 }}
                  transition={{ type: "spring", stiffness: 220, damping: 14 }}
                  className="relative mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full glass"
                  style={{ boxShadow: "0 0 30px rgba(130,167,255,0.18)" }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "conic-gradient(from 140deg, transparent, rgba(130,167,255,0.6), transparent 60%)",
                      WebkitMask:
                        "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
                      mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
                    }}
                  />
                  <Icon className="h-7 w-7 text-brand-primary" strokeWidth={1.6} />
                </motion.div>

                <span className="mb-2 font-serif text-sm tracking-widest text-brand-primary">
                  {step.n}
                </span>
                <h3 className="font-serif text-2xl text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
                  {step.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
