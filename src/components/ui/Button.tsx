"use client";

import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "ghost";

type Props = {
  children: ReactNode;
  variant?: Variant;
  as?: "button" | "a";
  href?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "ref">;

export function Button({
  children,
  variant = "primary",
  as = "button",
  href,
  className = "",
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

  const styles =
    variant === "primary"
      ? "bg-coral-hover text-on-coral shadow-[var(--shadow-coral)] hover:bg-coral-press"
      : "border border-border-strong text-ink hover:border-ink hover:bg-surface-2";

  const content = (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", damping: 16, stiffness: 320 }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
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
