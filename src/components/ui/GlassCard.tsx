import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  strong?: boolean;
};

export function GlassCard({ children, className = "", strong = false }: Props) {
  return (
    <div
      className={`rounded-3xl ${strong ? "glass-card" : "glass"} ${className}`}
    >
      {children}
    </div>
  );
}
