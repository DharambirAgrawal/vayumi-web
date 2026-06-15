import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LegalContent, LegalSection } from "../LegalContent";
import { site } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of ${site.name} and this website.`,
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <LegalContent
        title="Terms of Service"
        lastUpdated="June 14, 2026"
        intro={`These terms cover your use of this website and, once available, the ${site.name} app and waitlist. By using either, you agree to the terms below. We've tried to keep them as short and plain as the rest of ${site.name}.`}
      >
        <LegalSection heading="Using this website">
          <p>
            You&rsquo;re welcome to browse this site and join the waitlist. In
            return, please don&rsquo;t misuse it — that includes attempting to
            disrupt the site, scraping it at scale, or submitting the waitlist
            form with information that isn&rsquo;t yours.
          </p>
        </LegalSection>

        <LegalSection heading="The waitlist and early access">
          <p>
            Joining the waitlist reserves you a place in line for early access
            to Vayumi — it&rsquo;s not a purchase, subscription, or
            guarantee. We&rsquo;ll do our best to honor the launch timeline and
            pricing we communicate, but Vayumi is still in development
            and both may change before launch.
          </p>
        </LegalSection>

        <LegalSection heading="Intellectual property">
          <p>
            The Vayumi name, logo, and the content of this website
            (including its text, design, and the &ldquo;vault&rdquo; visuals)
            belong to Vayumi and may not be copied or reused without
            permission. Any feedback or ideas you share with us about
            Vayumi may be used by us without obligation to you.
          </p>
        </LegalSection>

        <LegalSection heading="No warranty">
          <p>
            This website and any pre-release materials about Vayumi are
            provided &ldquo;as is,&rdquo; without warranties of any kind. We
            make no promises that the site will be error-free, uninterrupted,
            or that Vayumi will be available on any particular timeline.
          </p>
        </LegalSection>

        <LegalSection heading="Limitation of liability">
          <p>
            To the fullest extent permitted by law, Vayumi won&rsquo;t be
            liable for any indirect, incidental, or consequential damages
            arising from your use of this website or participation in the
            waitlist.
          </p>
        </LegalSection>

        <LegalSection heading="Changes to these terms">
          <p>
            We may update these terms as Vayumi moves toward launch,
            particularly to add terms covering the app itself. We&rsquo;ll
            update the &ldquo;last updated&rdquo; date above whenever we do, and
            material changes will be communicated to waitlist members by
            email.
          </p>
        </LegalSection>

        <LegalSection heading="Contact us">
          <p>
            Questions about these terms? Email us at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </LegalSection>
      </LegalContent>
      <Footer />
    </>
  );
}
