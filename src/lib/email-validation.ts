/* ============================================================================
   Server-side email validation. Three gates, cheapest first:
     1. format  — basic shape
     2. disposable — reject known temp/throwaway inboxes (~120k domains)
     3. mx — the domain must actually be able to receive mail
   Imports `dns` + a CJS list, so this never bundles into client code.
   ========================================================================== */
import { promises as dns } from "node:dns";
import disposableEmailDomains from "disposable-email-domains";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DISPOSABLE = new Set(
  (disposableEmailDomains as string[]).map((d) => d.toLowerCase())
);

export function emailDomain(email: string): string {
  return email.split("@")[1]?.toLowerCase() ?? "";
}

/** Race a DNS lookup against a timeout so a slow resolver can't hang the request. */
function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("dns-timeout")), ms)
    ),
  ]);
}

async function domainCanReceiveMail(domain: string): Promise<boolean> {
  try {
    const records = await withTimeout(dns.resolveMx(domain), 3000);
    return records.length > 0 && records.some((r) => r.exchange);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code;
    // Definitive "no such domain / no mail records" → reject.
    if (code === "ENOTFOUND" || code === "ENODATA" || code === "NXDOMAIN") {
      return false;
    }
    // Transient (timeout, network) → fail open so real users aren't blocked.
    return true;
  }
}

export type EmailCheck =
  | { ok: true }
  | { ok: false; reason: "format" | "disposable" | "mx"; message: string };

export async function validateEmail(raw: string): Promise<EmailCheck> {
  const email = raw.trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return {
      ok: false,
      reason: "format",
      message: "Please enter a valid email address.",
    };
  }

  if (DISPOSABLE.has(emailDomain(email))) {
    return {
      ok: false,
      reason: "disposable",
      message:
        "Please use a permanent email — temporary or disposable inboxes aren't accepted.",
    };
  }

  if (!(await domainCanReceiveMail(emailDomain(email)))) {
    return {
      ok: false,
      reason: "mx",
      message: "That email's domain can't receive mail. Please check it.",
    };
  }

  return { ok: true };
}
