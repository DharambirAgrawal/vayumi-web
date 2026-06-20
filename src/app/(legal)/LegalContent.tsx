import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  title: string;
  lastUpdated: string;
  intro: string;
  children: ReactNode;
};

export function LegalContent({ title, lastUpdated, intro, children }: Props) {
  return (
    <main className="relative flex-1 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-coral-press transition-colors hover:text-coral-hover"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>

        <div className="mt-10 flex items-center gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-border bg-surface shadow-[var(--shadow-sm)]">
            <Image
              src="/brand/vayumi-mark.png"
              alt="Vayumi"
              width={30}
              height={30}
              className="h-[30px] w-[30px] object-contain"
            />
          </span>
          <div>
            <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
              {title}
            </h1>
            <p className="mt-1 text-xs font-medium uppercase tracking-widest text-ink-3">
              Last updated {lastUpdated}
            </p>
          </div>
        </div>

        <p className="mt-8 text-base leading-relaxed text-ink-2">{intro}</p>

        <div className="mt-4 divide-y divide-border">{children}</div>
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
      <h2 className="font-display text-2xl text-ink">{heading}</h2>
      <div className="mt-3 space-y-4 text-sm leading-relaxed text-ink-2 sm:text-base [&_a]:font-medium [&_a]:text-coral-press [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors [&_a:hover]:text-coral-hover [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
