"use client";

import { motion } from "framer-motion";
import { Cpu, Lock, WifiOff, ShieldOff } from "lucide-react";
import { trustBadges } from "@/lib/copy";
import { inView, staggerContainer, fadeUp } from "@/lib/motion";

const ICONS = [Cpu, Lock, WifiOff, ShieldOff];

export function TrustStrip() {
  return (
    <section className="relative px-6 py-10">
      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12"
      >
        {trustBadges.map((badge, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.li
              key={badge}
              variants={fadeUp}
              className="flex items-center gap-2.5 text-sm font-medium text-text-secondary"
            >
              <Icon className="h-4 w-4 text-brand-primary" strokeWidth={1.8} />
              {badge}
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
