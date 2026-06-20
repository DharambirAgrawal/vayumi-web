/* ============================================================================
   Tiny in-memory, per-key fixed-window rate limiter. Keyed by client IP.

   Good enough for a contact form / waitlist on a single instance. It resets on
   cold starts and isn't shared across serverless instances — if this ever needs
   to be bulletproof at scale, swap the Map for Upstash Redis (same interface).
   ========================================================================== */

type Bucket = { count: number; reset: number };

const buckets = new Map<string, Bucket>();

export type RateResult =
  | { success: true; remaining: number }
  | { success: false; retryAfter: number };

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): RateResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    // Opportunistic cleanup so the Map can't grow unbounded.
    if (buckets.size > 5000) {
      for (const [k, b] of buckets) if (now > b.reset) buckets.delete(k);
    }
    return { success: true, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return { success: false, retryAfter: Math.ceil((bucket.reset - now) / 1000) };
  }

  bucket.count += 1;
  return { success: true, remaining: limit - bucket.count };
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
