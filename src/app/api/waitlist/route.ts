import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: unknown;
  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  const normalized = email.trim().toLowerCase();

  // TODO: persist to a database / email-marketing service.
  // Stubbed for now — the form contract won't change when storage is added:
  // just implement persistence here (e.g. Supabase insert or Resend contact).
  console.log(`[waitlist] new signup: ${normalized}`);

  return NextResponse.json({ ok: true }, { status: 200 });
}
