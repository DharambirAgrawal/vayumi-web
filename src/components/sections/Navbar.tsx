"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { GlassButton } from "@/components/ui/GlassButton";
import { nav } from "@/lib/copy";

export function Navbar() {
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = lastY.current;
    const goingDown = y > prev;
    const delta = Math.abs(y - prev);

    // Hide while scrolling down through the page (stays out of the cinematic);
    // reveal the moment the user scrolls up or returns near the top.
    if (delta > 6) {
      setHidden(goingDown && y > 140);
    }
    setScrolled(y > 80);
    lastY.current = y;
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 transition-all duration-500 ${
          scrolled
            ? "mt-3 rounded-full border border-glass-border bg-bg-secondary/60 backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="shrink-0">
          <GlassButton
            as="a"
            href="#waitlist"
            variant="glass"
            className="!px-4 !py-2.5 !text-xs sm:!px-5 sm:!text-sm"
          >
            {nav.cta}
          </GlassButton>
        </div>
      </div>
    </motion.header>
  );
}
