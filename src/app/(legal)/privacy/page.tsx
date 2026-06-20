import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LegalContent, LegalSection } from "../LegalContent";
import { site } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <LegalContent
        title="Privacy Policy"
        lastUpdated="June 18, 2026"
        intro={`${site.name} is built around a simple idea: your AI should keep your secrets. This policy explains what little information we collect through this website and the upcoming app, why we collect it, and how it's protected.`}
      >
        <LegalSection heading="The short version">
          <p>
            Today, the only personal information Vayumi collects is the
            email address you give us when you join the waitlist. We don&rsquo;t
            use cookies, trackers, or third-party analytics on this site. We
            don&rsquo;t sell, rent, or share your information with anyone. And
            the Vayumi app is designed so your voice, meetings, and notes
            are processed on your device and never uploaded to our servers.
          </p>
        </LegalSection>

        <LegalSection heading="Information we collect">
          <p>
            <strong>Waitlist sign-ups.</strong>{" "}
            When you submit the waitlist
            form on this website, we collect the email address you provide.
            That&rsquo;s the only information the form asks for, and it&rsquo;s the
            only personal data this website collects.
          </p>
          <p>
            <strong>Website analytics.</strong> This site does not currently
            use cookies, advertising pixels, or third-party analytics
            services. If that ever changes, this policy will be updated
            before any such tool is enabled.
          </p>
          <p>
            <strong>The Vayumi app (when it launches).</strong> Vayumi
            runs its AI model on your device. Voice input, meeting audio and
            transcripts, and notes are processed locally and stay on your
            device, encrypted with AES-256. Lightweight items such as
            reminders may sync across your devices only if you choose to sign
            in — that sync uses the account credentials you provide and
            nothing else.
          </p>
        </LegalSection>

        <LegalSection heading="How we use your information">
          <ul>
            <li>
              To send you updates about Vayumi&rsquo;s launch, early
              access, and pricing.
            </li>
            <li>
              To respond if you contact us directly, for example with a
              support or privacy request.
            </li>
            <li>
              To understand the level of interest in Vayumi so we can
              plan our launch — we may look at aggregate signup counts, never
              individual behavior.
            </li>
          </ul>
          <p>
            We do not use your email address for any purpose beyond the ones
            listed above, and we never sell or rent it to third parties.
          </p>
        </LegalSection>

        <LegalSection heading="How we store and protect your data">
          <p>
            Waitlist email addresses are stored with reputable infrastructure
            providers and retained only for as long as we need them — to
            contact you about Vayumi&rsquo;s launch, or until you ask us to
            delete them. Access to this data is limited to the people
            building Vayumi.
          </p>
        </LegalSection>

        <LegalSection heading="Your rights">
          <p>
            You can ask us to access, correct, or delete the information we
            hold about you at any time. Once you have an account, the
            fastest way is to delete it directly from within the app — open
            Settings, tap your profile, then Delete Account — which
            permanently removes your account and the data tied to it. If you
            no longer have the
            app installed, see our{" "}
            <a href="/delete-account">account deletion page</a> for how to
            request deletion without it. For any other privacy question,
            reach us through our{" "}
            <a href="/contact">contact form</a>{" "}
            and we&rsquo;ll take care of it.
          </p>
        </LegalSection>

        <LegalSection heading="Children's privacy">
          <p>
            Vayumi is not directed at children, and we do not knowingly
            collect personal information from anyone under the age of 13. If
            you believe a child has provided us with personal information,
            please contact us and we&rsquo;ll remove it.
          </p>
        </LegalSection>

        <LegalSection heading="Changes to this policy">
          <p>
            As Vayumi moves from waitlist to launch, this policy will
            grow to cover the app itself in more detail. We&rsquo;ll update the
            &ldquo;last updated&rdquo; date above whenever we make changes, and
            significant changes will be communicated to waitlist members by
            email.
          </p>
        </LegalSection>

        <LegalSection heading="Contact us">
          <p>
            Questions about this policy or your data? Reach us anytime through
            our <a href="/contact">contact form</a>.
          </p>
        </LegalSection>
      </LegalContent>
      <Footer />
    </>
  );
}
