"use client";

import { motion } from "framer-motion";
import { howItWorks } from "@/lib/copy";

export function HowItWorks() {
  return (
    <section id="how" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow">{howItWorks.eyebrow}</span>
            <h2 className="font-display mt-4 text-4xl text-ink sm:text-5xl">
              {howItWorks.heading}
            </h2>
            <p className="mt-4 max-w-sm text-ink-2">{howItWorks.sub}</p>
          </div>

          <ol className="relative">
            <span
              aria-hidden
              className="absolute left-[27px] top-3 bottom-3 w-px bg-border"
            />
            {howItWorks.steps.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                <span className="font-display relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-border bg-surface text-xl text-coral-press shadow-[var(--shadow-sm)]">
                  {step.n}
                </span>
                <div className="pt-2">
                  <h3 className="font-display text-2xl text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-ink-2">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
