"use client";

import { motion } from "framer-motion";
import {
  Mic,
  AudioLines,
  BellRing,
  Phone,
  MessageSquare,
  MapPin,
  Search,
  Check,
} from "lucide-react";
import { features } from "@/lib/copy";

export function FeatureGrid() {
  return (
    <section id="features" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Everything it does</span>
          <h2 className="font-display mt-4 text-4xl text-ink sm:text-5xl">
            One assistant, entirely on your phone
          </h2>
          <p className="mt-4 text-ink-2">
            Powerful enough to replace the cloud assistant you use today — without
            the trade-off of handing over your life to a server.
          </p>
        </header>

        <div className="mt-20 space-y-20 sm:space-y-28">
          {features.map((f, i) => (
            <FeatureRow key={f.id} feature={f} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({
  feature,
  flip,
}: {
  feature: (typeof features)[number];
  flip: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={flip ? "lg:order-2" : ""}
      >
        <span className="eyebrow">{feature.kicker}</span>
        <h3 className="font-display mt-3 text-3xl text-ink sm:text-[2.5rem] sm:leading-[1.05]">
          {feature.title}
        </h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-2">
          {feature.body}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={flip ? "lg:order-1" : ""}
      >
        <FeatureVisual id={feature.id} />
      </motion.div>
    </div>
  );
}

function VisualShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface p-8 shadow-[var(--shadow-md)]">
      <div aria-hidden className="coral-wash pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative">{children}</div>
    </div>
  );
}

function FeatureVisual({ id }: { id: string }) {
  if (id === "voice") {
    return (
      <VisualShell>
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-coral text-on-coral shadow-[var(--shadow-coral)]">
            <Mic className="h-6 w-6" />
          </span>
          <div className="flex h-14 flex-1 items-center gap-[5px]">
            {[0.4, 0.8, 0.5, 1, 0.7, 0.45, 0.9, 0.6, 0.85, 0.5, 0.7, 0.4].map(
              (h, i) => (
                <motion.span
                  key={i}
                  className="w-[5px] origin-center rounded-full bg-coral/70"
                  style={{ height: `${h * 100}%` }}
                  animate={{ scaleY: [0.35, 1, 0.35] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.07,
                    ease: "easeInOut",
                  }}
                />
              )
            )}
          </div>
        </div>
        <p className="mt-6 font-display text-2xl text-ink">“Hey Vayumi…”</p>
      </VisualShell>
    );
  }

  if (id === "meetings") {
    return (
      <VisualShell>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
            <AudioLines className="h-5 w-5 text-coral-press" />
            Team sync · 32:18
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-coral-subtle px-2.5 py-1 text-[11px] font-medium text-coral-press">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-coral" />
            Summarized
          </span>
        </div>
        <ul className="mt-5 space-y-2.5">
          {[
            "Ship beta to waitlist by Friday",
            "Dharambir to finalize pricing",
            "Follow up with design partner",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-[15px] text-ink-2">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-coral/15 text-coral-press">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </VisualShell>
    );
  }

  if (id === "reminders") {
    return (
      <VisualShell>
        <div className="space-y-3">
          {[
            { t: "Call mom", s: "Today · 6:00 PM" },
            { t: "Pick up prescription", s: "Tomorrow · 9:00 AM" },
          ].map((r, i) => (
            <div
              key={r.t}
              className="flex items-center gap-3 rounded-2xl border border-border bg-paper px-4 py-3.5"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-coral/15 text-coral-press">
                <BellRing className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[15px] font-medium text-ink">{r.t}</p>
                <p className="text-xs text-ink-3">{r.s}</p>
              </div>
              {i === 0 && (
                <span className="ml-auto text-[11px] font-medium text-coral-press">
                  Set by voice
                </span>
              )}
            </div>
          ))}
        </div>
      </VisualShell>
    );
  }

  // toolbox
  return (
    <VisualShell>
      <div className="grid grid-cols-2 gap-3">
        {[
          { Icon: Phone, label: "Call" },
          { Icon: MessageSquare, label: "Text" },
          { Icon: MapPin, label: "Navigate" },
          { Icon: Search, label: "Search" },
        ].map(({ Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-border bg-paper px-4 py-3.5"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-coral/15 text-coral-press">
              <Icon className="h-4 w-4" />
            </span>
            <span className="text-[15px] font-medium text-ink">{label}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-ink-3">
        Every real-world action waits for your okay.
      </p>
    </VisualShell>
  );
}
