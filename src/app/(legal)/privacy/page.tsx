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
        lastUpdated="June 29, 2026"
        intro={`${site.name} is built around a simple idea: your AI should keep your secrets. This policy explains what information we collect through this website and the app, why we collect it, how it's protected, and exactly what changes if you turn on the optional Cloud mode.`}
      >
        <LegalSection heading="The short version">
          <p>
            On this website, the only personal information we collect is the
            email address you give us when you join the waitlist. We don&rsquo;t
            use cookies, trackers, or third-party analytics on this site, and we
            don&rsquo;t sell, rent, or share your information.
          </p>
          <p>
            In the app, the AI runs <strong>on your device by default</strong>,
            so your conversations stay local. Your voice recordings, meeting
            audio, and scanned photos <strong>never leave your device</strong>,
            even if you turn on Cloud mode. If you sign in, your text records
            (Life trackers, memory, meeting notes, and reminders) sync across
            your devices, encrypted in transit. If you turn on the optional{" "}
            <strong>Cloud mode</strong>, the text of your chats and voice
            commands is sent to our server and a third-party AI provider to
            generate replies. It is never sold and never used to train Vayumi.
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
            runs its AI model on your device. Voice input and meeting audio are
            processed locally and stay on your device, encrypted with AES-256,
            and they are never uploaded. Photos you scan into a tracker are read by
            the on-device AI and the images stay on your device too. If you
            choose to create an account and sign in, your text records sync
            across your devices so you can reach them anywhere. These records
            include Life tracker entries (such as spending, medications, or
            habits you log), meeting notes (transcripts and summaries), and
            reminders. That sync uses the account credentials you provide, is
            encrypted in transit, and is never sold or shared. Stay signed out
            and nothing syncs.
          </p>
        </LegalSection>

        <LegalSection heading="Cloud mode and third-party AI">
          <p>
            Vayumi includes an <strong>optional Cloud mode</strong> for chat and
            voice. It is <strong>off by default</strong>, requires you to be
            signed in, and can be switched on or off at any time in Settings.
            When it is on, and only then, the <strong>text</strong> of your chat
            and voice messages (and the AI&rsquo;s replies) is sent to our
            server over an encrypted connection, authenticated to your account.
            Our server then relays it to a third-party AI provider to generate a
            more capable response. We do not sell this text and do not use it to
            train Vayumi&rsquo;s own models. Third-party providers process it
            only to return a response, under their own terms; we choose
            providers with privacy-respecting policies where available.
          </p>
          <p>
            Cloud mode never changes what stays on your device: your{" "}
            <strong>voice recordings, meeting audio, and scanned photos are
            never uploaded</strong> in any mode. When a photo is involved in
            Cloud mode, the on-device AI first turns it into a text description,
            and only that text is sent, never the image itself. Prefer to keep
            everything local? Leave Cloud mode off and the AI runs entirely on
            your phone.
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
              plan our launch. We may look at aggregate signup counts, never
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
            providers and retained only for as long as we need them, either to
            contact you about Vayumi&rsquo;s launch or until you ask us to
            delete them. Access to this data is limited to the people
            building Vayumi.
          </p>
        </LegalSection>

        <LegalSection heading="Your rights">
          <p>
            You can ask us to access, correct, or delete the information we
            hold about you at any time. Once you have an account, the
            fastest way is to delete it directly from within the app. Open
            Settings, tap your profile, then Delete Account, and that
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
