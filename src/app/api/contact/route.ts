import { NextResponse } from "next/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { validateEmail } from "@/lib/email-validation";
import { sendNotification, mailConfigured } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    website?: unknown; // honeypot
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // 1. Honeypot — bots fill hidden fields. Pretend success, send nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 2. Rate limit by IP (5 messages / 15 min).
  const limit = rateLimit(`contact:${clientIp(request)}`, {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many messages — please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  // 3. Basic content checks.
  if (message.length < 2 || message.length > 5000) {
    return NextResponse.json(
      { error: "Please add your email and a short message." },
      { status: 422 }
    );
  }

  // 4. Email checks: format → disposable → MX.
  const check = await validateEmail(email);
  if (!check.ok) {
    return NextResponse.json({ error: check.message }, { status: 422 });
  }

  if (!mailConfigured) {
    console.error("[contact] mail not configured — dropping submission");
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // 5. Deliver to the Vayumi inbox; reply-to the visitor.
  try {
    await sendNotification({
      subject: `New contact${name ? ` from ${name}` : ""}`,
      replyTo: email,
      text: [
        `Name:  ${name || "(not given)"}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { error: "Couldn't send right now. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
