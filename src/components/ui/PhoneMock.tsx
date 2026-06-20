"use client";

import { motion } from "framer-motion";
import { Lock, Mic } from "lucide-react";

/* A built-in-HTML phone running the Vayumi app — warm near-black screen with
   coral accents, matching the app icon. Concrete product imagery instead of an
   abstract orb. */
export function PhoneMock() {
  return (
    <div className="relative mx-auto w-[270px] sm:w-[300px]">
      {/* soft coral floor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 bottom-2 -z-10 h-40 rounded-full bg-coral/25 blur-3xl"
      />

      <motion.div
        className="animate-float-soft rounded-[2.6rem] border border-ink-700 bg-ink-900 p-2.5 shadow-[var(--shadow-lg)]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative overflow-hidden rounded-[2.1rem] bg-ink-900 px-5 pb-6 pt-4">
          {/* status row */}
          <div className="flex items-center justify-between text-[11px] font-medium text-on-dark-2">
            <span>9:41</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-ink-700 px-2 py-0.5 text-[10px] tracking-wide text-on-dark-2">
              <Lock className="h-3 w-3 text-coral" />
              On-device
            </span>
          </div>

          {/* conversation */}
          <div className="mt-6 space-y-3">
            <Bubble side="user">Hey Vayumi, summarize my 3pm meeting.</Bubble>
            <Bubble side="ai">
              Done. 4 decisions, 3 action items — all kept on your phone,
              encrypted.
            </Bubble>
            <div className="flex flex-wrap gap-1.5 pl-1">
              {["Send recap", "Set reminder", "Share notes"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-ink-700 bg-ink-800 px-2.5 py-1 text-[10px] text-on-dark-2"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* listening dock */}
          <div className="mt-7 flex items-center gap-3 rounded-2xl border border-ink-700 bg-ink-800 px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-coral text-on-coral">
              <Mic className="h-4 w-4" />
            </span>
            <Equalizer />
            <span className="ml-auto text-[10px] uppercase tracking-widest text-on-dark-2">
              Listening
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Bubble({
  side,
  children,
}: {
  side: "user" | "ai";
  children: React.ReactNode;
}) {
  const isUser = side === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${
          isUser
            ? "rounded-br-md bg-coral text-on-coral"
            : "rounded-bl-md border border-ink-700 bg-ink-800 text-on-dark"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Equalizer() {
  const bars = [0.5, 0.9, 0.6, 1, 0.7, 0.45, 0.8];
  return (
    <div className="flex h-6 items-center gap-[3px]">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] origin-bottom rounded-full bg-coral"
          style={{ height: `${h * 100}%` }}
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.09,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
