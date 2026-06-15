#!/usr/bin/env node
/**
 * Driver for the Vayumi marketing site (Next.js 16 + Tailwind v4 + Framer Motion).
 *
 * It auto-starts `npm run dev` if nothing is already serving the base URL,
 * drives the running app with system Chrome via puppeteer-core, and tears the
 * server down on exit. Tasks:
 *
 *   node driver.mjs csscheck   verify Tailwind actually compiled (catches the
 *                              "page renders unstyled" failure mode)
 *   node driver.mjs api        smoke the /api/waitlist route (200 + 422)
 *   node driver.mjs shot [url] one screenshot (default: homepage hero)
 *   node driver.mjs scenes     screenshot the whole scroll story + sections
 *   node driver.mjs all        csscheck + api + scenes
 *
 * Env: BASE_URL (default http://localhost:3000), PORT (default 3000),
 *      CHROME_PATH (override browser binary).
 * Screenshots land in .claude/skills/run-vayumi-web/out/.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SKILL_DIR = dirname(fileURLToPath(import.meta.url));
const UNIT = resolve(SKILL_DIR, "../../.."); // vayumi-web root
const OUT = resolve(SKILL_DIR, "out");
const PORT = process.env.PORT || "3000";
const BASE = process.env.BASE_URL || `http://localhost:${PORT}`;

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ];
  const hit = candidates.find((c) => existsSync(c));
  if (!hit) throw new Error("Chrome not found — set CHROME_PATH=/path/to/chrome");
  return hit;
}

async function isUp(url) {
  try {
    const c = new AbortController();
    const t = setTimeout(() => c.abort(), 1500);
    const res = await fetch(url, { signal: c.signal });
    clearTimeout(t);
    return res.ok;
  } catch {
    return false;
  }
}

async function ensureServer() {
  if (await isUp(BASE)) {
    console.log(`• reusing server at ${BASE}`);
    return { spawned: false };
  }
  console.log(`• starting "npm run dev" (PORT=${PORT}) …`);
  const child = spawn("npm", ["run", "dev"], {
    cwd: UNIT,
    env: { ...process.env, PORT },
    stdio: "ignore",
    detached: true,
  });
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    if (await isUp(BASE)) {
      console.log(`• server ready at ${BASE}`);
      return { spawned: true, child };
    }
  }
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {}
  throw new Error("dev server did not become ready in 60s");
}

function stopServer(srv) {
  if (srv?.spawned && srv.child?.pid) {
    try {
      process.kill(-srv.child.pid, "SIGTERM");
    } catch {}
  }
}

/* ---- tasks that only need fetch ---- */

async function cssCheck() {
  const html = await (await fetch(BASE)).text();
  const m = html.match(/\/_next\/static\/[^"']*\.css/);
  if (!m) throw new Error("FAIL: no stylesheet linked in HTML");
  const css = await (await fetch(BASE + m[0])).text();
  const hasPreflight = /box-sizing/.test(css);
  const hasUtilities = /\.flex\b/.test(css) || /display:\s*flex/.test(css);
  console.log(`  stylesheet: ${m[0]} (${css.length} bytes)`);
  console.log(`  preflight (box-sizing): ${hasPreflight ? "yes" : "NO"}`);
  console.log(`  utilities (.flex):      ${hasUtilities ? "yes" : "NO"}`);
  if (!hasPreflight || !hasUtilities) {
    throw new Error(
      "FAIL: Tailwind did not compile — usually a missing/broken postcss.config.mjs"
    );
  }
  console.log("  ✓ CSS compiled");
}

async function apiSmoke() {
  const post = (body) =>
    fetch(`${BASE}/api/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  const ok = await post({ email: "driver@example.com" });
  const bad = await post({ email: "not-an-email" });
  console.log(`  valid email   -> ${ok.status} (expect 200)`);
  console.log(`  invalid email -> ${bad.status} (expect 422)`);
  if (ok.status !== 200 || bad.status !== 422) {
    throw new Error("FAIL: /api/waitlist did not behave as expected");
  }
  console.log("  ✓ waitlist API ok");
}

/* ---- tasks that drive the browser ---- */

async function withBrowser(fn) {
  const puppeteer = (await import("puppeteer-core")).default;
  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: "new",
    args: ["--no-sandbox", "--hide-scrollbars"],
  });
  try {
    return await fn(browser);
  } finally {
    await browser.close();
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function shot(url = BASE, name = "hero") {
  await withBrowser(async (browser) => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: "networkidle0" });
    await sleep(1500);
    const out = resolve(OUT, `${name}.png`);
    await page.screenshot({ path: out });
    console.log(`  ✓ ${out}`);
  });
}

async function scenes() {
  await withBrowser(async (browser) => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(BASE, { waitUntil: "networkidle0" });
    await sleep(1200);

    const save = async (n) => {
      const out = resolve(OUT, `${n}.png`);
      await page.screenshot({ path: out });
      console.log(`  ✓ ${out}`);
    };

    await save("01-hero");

    // The "vault" is one pinned section (~520vh). Drive its internal progress.
    const vault = async (p) =>
      page.evaluate((p) => {
        const s = document.getElementById("vault");
        const pinned = s.offsetHeight - window.innerHeight;
        window.scrollTo(0, s.offsetTop + pinned * p);
      }, p);

    for (const [n, p] of [
      ["02-leak", 0.3],
      ["03-flip", 0.52],
      ["04-feature", 0.68],
      ["05-recap", 0.95],
    ]) {
      await vault(p);
      await sleep(1300);
      await save(n);
    }

    for (const id of ["how", "features", "waitlist", "faq"]) {
      await page.evaluate(
        (id) => document.getElementById(id)?.scrollIntoView({ block: "start" }),
        id
      );
      await sleep(1300);
      await save(`section-${id}`);
    }

    // mobile hero
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await page.goto(BASE, { waitUntil: "networkidle0" });
    await sleep(1200);
    await save("mobile-hero");
  });
}

async function main() {
  const task = process.argv[2] || "all";
  mkdirSync(OUT, { recursive: true });
  const srv = await ensureServer();
  try {
    if (task === "csscheck") await cssCheck();
    else if (task === "api") await apiSmoke();
    else if (task === "shot") await shot(process.argv[3], process.argv[4]);
    else if (task === "scenes") await scenes();
    else if (task === "all") {
      await cssCheck();
      await apiSmoke();
      await scenes();
    } else {
      console.error(`unknown task "${task}"`);
      process.exitCode = 2;
    }
  } finally {
    stopServer(srv);
  }
}

main().catch((e) => {
  console.error("✗ " + (e?.message || e));
  process.exitCode = 1;
});
