---
name: run-vayumi-web
description: Build, run, screenshot, and smoke-test the Vayumi marketing website (vayumi-web — Next.js 16 + Tailwind v4 + Framer Motion landing page). Use when asked to run, start, build, preview, screenshot, verify, or test the Vayumi web/landing/marketing site, or to confirm a UI change renders.
---

# Run vayumi-web

The Vayumi marketing site: a Next.js 16 (App Router, Turbopack) + Tailwind v4 +
Framer Motion landing page. The hero is a long scroll-driven "vault" animation,
so a static `npm run dev` window tells you little — drive it with the committed
driver instead.

**Driver:** `.claude/skills/run-vayumi-web/driver.mjs` — it auto-starts
`npm run dev` if nothing is serving, drives the page with system Chrome via
`puppeteer-core`, and kills the server on exit. Screenshots land in
`.claude/skills/run-vayumi-web/out/`.

All paths below are relative to the `vayumi-web/` project root.

## Prerequisites

- Node 18+ (verified on v25.6.1) and npm.
- Google Chrome (the driver uses it headless). Verified at the macOS path
  `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. On another
  machine, set `CHROME_PATH=/path/to/chrome` (e.g. `/usr/bin/google-chrome`).

## Setup

```bash
npm install
```

This installs app deps **and** `puppeteer-core` (already a devDependency, used
only by the driver).

## Run (agent path) — use this

One self-contained command runs everything (CSS sanity check + waitlist API
smoke + full scene capture):

```bash
node .claude/skills/run-vayumi-web/driver.mjs all
```

Individual tasks:

```bash
# Verify Tailwind actually compiled (catches the "page renders unstyled" bug)
node .claude/skills/run-vayumi-web/driver.mjs csscheck

# Smoke the waitlist route: expects 200 (valid email) + 422 (invalid)
node .claude/skills/run-vayumi-web/driver.mjs api

# Capture the whole scroll story + sections to out/
node .claude/skills/run-vayumi-web/driver.mjs scenes

# One screenshot (default: homepage hero)
node .claude/skills/run-vayumi-web/driver.mjs shot http://localhost:3000 hero
```

`scenes` writes `01-hero`, `02-leak`, `03-flip`, `04-feature`, `05-recap`,
`section-{how,features,waitlist,faq}`, and `mobile-hero` PNGs to
`.claude/skills/run-vayumi-web/out/`. **Open the PNGs and look at them** — a
blank/unstyled shot means something broke (start with `csscheck`).

The driver reuses an already-running server if one is up; otherwise it spawns
and tears down its own. Override the URL/port with `BASE_URL` or `PORT`.

## Run (human path)

```bash
npm run dev
```

Opens at http://localhost:3000. Useful to scroll manually; headless it tells you
nothing, so prefer the driver. Stop with Ctrl-C.

## Build / verify

```bash
npm run build      # production build + TypeScript typecheck (10 routes)
npx eslint src     # lint (flat config; exit 0 = clean)
```

## Gotchas (battle scars)

- **Unstyled page = missing `postcss.config.mjs`.** If the site renders as plain
  text with blue underlined links, Tailwind didn't compile: the
  `@tailwindcss/postcss` plugin never ran. The culprit is a deleted/broken
  `postcss.config.mjs` in the project root — `next build` still "succeeds" while
  emitting no utilities. `driver.mjs csscheck` detects this. Never
  `rm *.mjs` in the root — `postcss.config.mjs` and `eslint.config.mjs` live
  there.
- **This is Next.js 16, not your training data.** `vayumi-web/AGENTS.md` says so.
  Read `node_modules/next/dist/docs/` before changing framework wiring.
- **ESLint uses flat config.** `eslint.config.mjs` spreads
  `eslint-config-next/core-web-vitals` and `/typescript` arrays directly. Do
  NOT wrap them in `FlatCompat` — that throws "Converting circular structure to
  JSON".
- **Framer-motion + SSR float mismatch.** Motion serializes `style` transforms
  at full precision on the server but rounds on the client → hydration warnings.
  `ParticleField` avoids this by rounding params and rendering only after
  hydration (`useSyncExternalStore`). Don't SSR computed motion transforms.
- **Vault scene text is phase-driven, not scroll-opacity-driven.** Per-scene
  opacity via `useTransform(scrollYProgress,…)` did not bind reliably across the
  component's frequent re-renders (scenes overlapped). Scene text mounts/unmounts
  via `AnimatePresence` on a discrete `phase`. The orb/particles/iris continuous
  transforms work fine. Keep scene text phase-based.
- **The hero is one pinned ~520vh section (`#vault`).** To screenshot a specific
  scene you scroll within it by *progress fraction*, not by section offset — see
  the `vault(p)` helper in `driver.mjs`.

## Troubleshooting

- `Chrome not found — set CHROME_PATH` → export `CHROME_PATH` to your browser
  binary.
- `dev server did not become ready in 60s` → port 3000 busy with a broken
  process. `pkill -f "next dev"` and retry, or set `PORT=3001`.
- Stale/unstyled output after a config change → `rm -rf .next` then rerun
  (Turbopack dev can serve a stale chunk).
