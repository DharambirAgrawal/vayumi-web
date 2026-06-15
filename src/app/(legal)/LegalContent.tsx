import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnimatedOrb } from "@/components/ui/AnimatedOrb";

type Props = {
  title: string;
  lastUpdated: string;
  intro: string;
  children: ReactNode;
};

export function LegalContent({ title, lastUpdated, intro, children }: Props) {
  return (
    <main className="relative flex-1 px-6 py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid" />

      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition-colors hover:text-brand-light"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>

        <div className="mt-10 flex items-center gap-5">
          <AnimatedOrb size={56} variant="brand" intensity={0.7} alive={false} />
          <div>
            <h1 className="font-serif text-4xl leading-tight text-text-primary sm:text-5xl">
              {title}
            </h1>
            <p className="mt-1 text-xs font-medium uppercase tracking-widest text-text-tertiary">
              Last updated {lastUpdated}
            </p>
          </div>
        </div>

        <p className="mt-8 text-base leading-relaxed text-text-secondary">
          {intro}
        </p>

        <div className="mt-4 divide-y divide-glass-border">{children}</div>
      </div>
    </main>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="py-8 first:pt-8">
      <h2 className="font-serif text-2xl text-text-primary">{heading}</h2>
      <div className="mt-3 space-y-4 text-sm leading-relaxed text-text-secondary sm:text-base [&_a]:text-brand-primary [&_a]:transition-colors [&_a:hover]:text-brand-light [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-text-primary [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
