"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { faq } from "@/lib/copy";
import { fadeUp, inView, staggerContainer } from "@/lib/motion";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-6 py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="mx-auto max-w-3xl"
      >
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
            Questions
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            The privacy you&rsquo;d expect to ask about.
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass-card overflow-hidden rounded-2xl"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-text-primary">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-brand-primary"
                  >
                    <Plus className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-text-secondary">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
