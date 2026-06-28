"use client";

import { motion } from "framer-motion";
import { recap, flip } from "@/lib/copy";

export function PrivacyPledge() {
  return (
    <section className="px-6 py-10">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[var(--radius-xl)] bg-ink-900 px-8 py-20 text-on-dark sm:px-16 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-coral/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-sand/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-coral"
          >
            The whole point
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display mt-5 text-4xl leading-[1.05] sm:text-6xl"
          >
            Your voice &amp; audio
            <br />
            never leave. <span className="font-display-italic text-coral">Ever.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-on-dark-2"
          >
            {flip.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-14 flex flex-col items-center"
          >
            <span className="font-display text-[6rem] leading-none text-coral sm:text-[8rem]">
              {recap.counter}
            </span>
            <span className="mt-2 text-sm uppercase tracking-[0.18em] text-on-dark-2">
              {recap.counterLabel}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
