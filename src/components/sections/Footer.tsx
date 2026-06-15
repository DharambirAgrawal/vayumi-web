import { Logo } from "@/components/ui/Logo";
import { footer, site } from "@/lib/copy";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-glass-border px-6 py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[280px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-orb)" }}
      />

      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-text-tertiary">
            {footer.tagline}
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Product
          </span>
          {footer.links.product.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <nav className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Legal
          </span>
          {footer.links.legal.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Get in touch
          </span>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            {site.email}
          </a>
          <p className="mt-1 text-sm leading-relaxed text-text-tertiary">
            Questions, feedback, or press — we read everything.
          </p>
        </div>
      </div>

      <div className="glass mx-auto mt-12 flex max-w-6xl flex-col gap-2 rounded-2xl px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-text-tertiary">{footer.copyright}</p>
        <p className="text-xs text-text-tertiary">
          Built for iOS &amp; Android · On-device by design
        </p>
      </div>
    </footer>
  );
}
