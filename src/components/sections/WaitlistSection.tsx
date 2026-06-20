"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Check, ArrowRight } from "lucide-react";
import { waitlist } from "@/lib/copy";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Status = "idle" | "loading" | "success" | "error";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setMessage(waitlist.errorEmail);
      return;
    }

    const website =
      (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)
        ?.value ?? "";

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), website }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || waitlist.errorGeneric);
      }
      setStatus("success");
      setMessage(waitlist.success);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : waitlist.errorGeneric);
    }
  }

  return (
    <section id="waitlist" className="px-6 py-16 sm:py-24">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[var(--radius-xl)] border border-coral-100 bg-coral-subtle px-8 py-16 text-center sm:px-16 sm:py-20">
        <div aria-hidden className="paper-grain pointer-events-none absolute inset-0" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto flex max-w-xl flex-col items-center"
        >
          <span className="eyebrow">{waitlist.eyebrow}</span>
          <h2 className="font-display mt-4 text-4xl leading-tight text-ink sm:text-5xl">
            {waitlist.headline}
          </h2>
          <p className="mt-4 max-w-md text-ink-2">{waitlist.sub}</p>

          <form onSubmit={onSubmit} className="mt-9 w-full max-w-md">
            {/* honeypot — bots fill it, humans never see it */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />
            {status === "success" ? (
              <div className="flex items-center justify-center gap-2 rounded-full bg-surface px-6 py-4 text-sm font-medium text-success shadow-[var(--shadow-sm)]">
                <Check className="h-5 w-5" />
                {message}
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder={waitlist.placeholder}
                  aria-label="Email address"
                  className="min-w-0 flex-1 rounded-full border border-border bg-surface px-5 py-3.5 text-sm text-ink placeholder:text-ink-3 shadow-[var(--shadow-sm)] focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-coral-hover px-6 py-3.5 text-sm font-semibold text-on-coral shadow-[var(--shadow-coral)] transition-colors hover:bg-coral-press disabled:opacity-60"
                >
                  {status === "loading" ? waitlist.ctaPending : waitlist.cta}
                  {status !== "loading" && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              </div>
            )}

            {status === "error" && (
              <p className="mt-3 text-sm text-danger">{message}</p>
            )}
            {status !== "success" && (
              <p className="mt-4 text-xs text-ink-3">{waitlist.privacyNote}</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
