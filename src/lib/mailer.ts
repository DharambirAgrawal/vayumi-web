/* ============================================================================
   Server-side mailer — sends through the Vayumi Gmail over SMTP using an App
   Password. Reads creds from env (GMAIL_USER / GMAIL_APP_PASSWORD); these are
   NOT NEXT_PUBLIC, so they never reach the browser. Importing nodemailer keeps
   this module server-only by construction.
   ========================================================================== */
import nodemailer, { type Transporter } from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

export const mailConfigured = Boolean(GMAIL_USER && GMAIL_APP_PASSWORD);

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    throw new Error(
      "Mail not configured: set GMAIL_USER and GMAIL_APP_PASSWORD in your environment."
    );
  }
  transporter ??= nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });
  return transporter;
}

/**
 * Send a notification to the Vayumi inbox (from → self), with `replyTo` set to
 * the visitor so hitting "Reply" in Gmail goes straight to them.
 */
export async function sendNotification(opts: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const t = getTransporter();
  await t.sendMail({
    from: `"Vayumi" <${GMAIL_USER}>`,
    to: GMAIL_USER,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
  });
}
