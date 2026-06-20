import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ContactForm } from "@/components/sections/ContactForm";
import { contact, site } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${site.name} team.`,
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="relative flex-1 px-6 py-28 sm:py-36">
        <div aria-hidden className="coral-wash pointer-events-none absolute inset-0 -z-10" />

        <div className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-coral-press transition-colors hover:text-coral-hover"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>

          <div className="mt-10 flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-border bg-surface shadow-[var(--shadow-sm)]">
              <Image
                src="/brand/vayumi-mark.png"
                alt="Vayumi"
                width={30}
                height={30}
                className="h-[30px] w-[30px] object-contain"
              />
            </span>
            <div>
              <span className="eyebrow">{contact.eyebrow}</span>
              <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
                {contact.heading}
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-2">
            {contact.sub}
          </p>

          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
