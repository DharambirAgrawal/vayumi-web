"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Check, ArrowRight } from "lucide-react";
import { waitlist } from "@/lib/copy";
import { fadeUp, inView, staggerContainer } from "@/lib/motion";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Status = "idle" | "loading" | "success" | "error";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setMessage(waitlist.errorEmail);
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
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
    <section
      id="waitlist"
      className="relative overflow-hidden px-6 py-32 sm:py-40"
    >
      {/* vault-door glow spilling out */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "var(--gradient-orb)" }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <motion.span
          variants={fadeUp}
          className="mb-5 rounded-full border border-glass-border bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-primary"
        >
          {waitlist.eyebrow}
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="font-serif text-4xl leading-tight sm:text-6xl"
        >
          {waitlist.headline}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-lg text-base text-text-secondary sm:text-lg"
        >
          {waitlist.sub}
        </motion.p>

        <motion.form
          variants={fadeUp}
          onSubmit={onSubmit}
          className="mt-10 w-full max-w-md"
        >
          {status === "success" ? (
            <div className="glass flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium text-success">
              <Check className="h-5 w-5" />
              {message}
            </div>
          ) : (
            <div className="glass flex items-center gap-2 rounded-full p-1.5">
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
                className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="group inline-flex shrink-0 items-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                style={{ background: "var(--gradient-brand)" }}
              >
                {status === "loading" ? waitlist.ctaPending : waitlist.cta}
                {status !== "loading" && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            </div>
          )}

          {status === "error" && (
            <p className="mt-3 text-sm text-error">{message}</p>
          )}
          {status !== "success" && (
            <p className="mt-4 text-xs text-text-tertiary">
              {waitlist.privacyNote}
            </p>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
}
