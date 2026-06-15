import type { Variants, Transition } from "framer-motion";

/* Spring "feel" ported from the Vayumi app (liquid-glass physics) */
export const spring = {
  breathe: { type: "spring", damping: 18, stiffness: 55, mass: 1 } as Transition,
  bounce: { type: "spring", damping: 12, stiffness: 180, mass: 0.8 } as Transition,
  gel: { type: "spring", damping: 15, stiffness: 120, mass: 0.85 } as Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/* Default viewport config for scroll reveals */
export const inView = { once: true, amount: 0.3 } as const;
