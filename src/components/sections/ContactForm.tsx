"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { contact } from "@/lib/copy";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Status = "idle" | "loading" | "success" | "error";

const FIELD =
  "rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-3 shadow-[var(--shadow-sm)] focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/30";
const LABEL = "text-xs font-medium uppercase tracking-widest text-ink-3";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    if (!EMAIL_RE.test(email.trim()) || message.trim().length < 2) {
      setStatus("error");
      setFeedback(contact.errorValidation);
      return;
    }

    const website =
      (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)
        ?.value ?? "";

    setStatus("loading");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          website,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || contact.errorGeneric);
      }
      setStatus("success");
      setFeedback(contact.success);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : contact.errorGeneric);
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-border bg-surface px-6 py-6 text-sm font-medium text-success shadow-[var(--shadow-sm)]">
        <Check className="h-5 w-5 shrink-0" />
        {feedback}
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-border bg-surface-2 p-6 shadow-[var(--shadow-md)] sm:p-8"
    >
      {/* honeypot — hidden from people, tempting to bots; submissions that fill
          it are silently dropped server-side */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={LABEL}>Name</span>
          <input
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={contact.fields.name}
            className={FIELD}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={LABEL}>Email</span>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder={contact.fields.email}
            aria-label="Email address"
            required
            className={FIELD}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={LABEL}>Message</span>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={contact.fields.message}
          aria-label="Message"
          required
          rows={5}
          className={`${FIELD} resize-y`}
        />
      </label>

      {status === "error" && <p className="text-sm text-danger">{feedback}</p>}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-3">{contact.privacyNote}</p>
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-coral-hover px-6 py-3 text-sm font-semibold text-on-coral shadow-[var(--shadow-coral)] transition-colors hover:bg-coral-press disabled:opacity-60"
        >
          {status === "loading" ? contact.ctaPending : contact.cta}
          {status !== "loading" && (
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </button>
      </div>
    </motion.form>
  );
}
