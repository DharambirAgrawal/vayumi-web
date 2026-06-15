"use client";

import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "glass";

type Props = {
  children: ReactNode;
  variant?: Variant;
  as?: "button" | "a";
  href?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "ref">;

export function GlassButton({
  children,
  variant = "primary",
  as = "button",
  href,
  className = "",
  ...rest
}: Props) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base";

  const styles =
    variant === "primary"
      ? "text-white border border-white/15 shadow-[var(--glow-brand-soft)]"
      : "text-text-primary glass hover:border-glass-border-strong";

  const inlineStyle =
    variant === "primary"
      ? { background: "var(--gradient-brand)" }
      : undefined;

  const content = (
    <motion.span
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", damping: 14, stiffness: 220 }}
      className={`${base} ${styles} ${className}`}
      style={inlineStyle}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span
            className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              animation: "shimmer-sweep 3.5s ease-in-out infinite",
            }}
          />
        </span>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </motion.span>
  );

  if (as === "a") {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button type="button" className="inline-block" {...rest}>
      {content}
    </button>
  );
}
