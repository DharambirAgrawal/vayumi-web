"use client";

import { motion } from "framer-motion";
import { Cpu, Lock, WifiOff, ShieldOff } from "lucide-react";
import { trustBadges } from "@/lib/copy";

const ICONS = [Cpu, Lock, WifiOff, ShieldOff];

export function TrustStrip() {
  return (
    <section className="px-6">
      <div className="mx-auto max-w-6xl border-y border-border py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-16">
          {trustBadges.map((badge, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.li
                key={badge}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-center gap-2.5 text-sm font-medium text-ink-2"
              >
                <Icon className="h-4 w-4 text-coral-press" strokeWidth={1.8} />
                {badge}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
