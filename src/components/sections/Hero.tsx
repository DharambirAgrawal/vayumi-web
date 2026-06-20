"use client";

import { motion, type Variants } from "framer-motion";
import { Apple, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PhoneMock } from "@/components/ui/PhoneMock";
import { hero } from "@/lib/copy";

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-32 sm:pt-40">
      <div aria-hidden className="coral-wash pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="paper-grain pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* copy */}
        <div className="max-w-xl">
          <motion.span
            custom={0}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-ink-2 shadow-[var(--shadow-sm)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            custom={1}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="font-display mt-6 text-[3.2rem] leading-[0.98] text-ink sm:text-[4.6rem]"
          >
            The AI that keeps
            <br />
            your <span className="font-display-italic text-coral-press">secrets</span>.
          </motion.h1>

          <motion.p
            custom={2}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-2"
          >
            {hero.subhead}
          </motion.p>

          <motion.div
            custom={3}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button as="a" href="#waitlist">
              {hero.cta}
            </Button>
            <Button as="a" href="#how" variant="ghost">
              See how it works
            </Button>
          </motion.div>

          <motion.div
            custom={4}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mt-7 flex items-center gap-5 text-sm text-ink-3"
          >
            <span className="inline-flex items-center gap-1.5">
              <Apple className="h-4 w-4" /> iOS
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Smartphone className="h-4 w-4" /> Android
            </span>
            <span className="h-3 w-px bg-border-strong" />
            <span>Free to join · no spam</span>
          </motion.div>
        </div>

        {/* product */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <PhoneMock />
        </motion.div>
      </div>
    </section>
  );
}
