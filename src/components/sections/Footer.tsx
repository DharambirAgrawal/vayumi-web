import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { footer } from "@/lib/copy";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-2">
            {footer.tagline}
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-ink-3">
            Product
          </span>
          {footer.links.product.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-2 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <nav className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-ink-3">
            Legal
          </span>
          {footer.links.legal.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-ink-2 transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-ink-3">
            Get in touch
          </span>
          <Link
            href="/contact"
            className="group inline-flex w-fit items-center gap-1.5 text-sm font-medium text-coral-press transition-colors hover:text-coral-hover"
          >
            Contact us
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <p className="mt-1 text-sm leading-relaxed text-ink-2">
            Questions, feedback, or press — send a message and we read everything.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-3">{footer.copyright}</p>
        <p className="text-xs text-ink-3">
          Built for iOS &amp; Android · On-device by design
        </p>
      </div>
    </footer>
  );
}
