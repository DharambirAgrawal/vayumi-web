import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LegalContent, LegalSection } from "../LegalContent";
import { site } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description: `How to delete your ${site.name} account and data, with or without the app installed.`,
  robots: { index: true, follow: true },
};

export default function DeleteAccountPage() {
  return (
    <>
      <Navbar />
      <LegalContent
        title="Delete Your Account"
        lastUpdated="June 18, 2026"
        intro={`You can delete your ${site.name} account and all the data tied to it at any time. Here's how, whether or not you still have the app installed.`}
      >
        <LegalSection heading="If you have the app installed">
          <p>
            Open Vayumi, go to <strong>Settings</strong>, tap your profile
            card at the top, then tap <strong>Delete account</strong> and
            confirm. This permanently deletes your account and everything
            tied to it — reminders, meeting notes, settings, and any signed-in
            sessions — right away. There is no recovery window, so make sure
            you&rsquo;re ready before confirming.
          </p>
        </LegalSection>

        <LegalSection heading="If you no longer have the app">
          <p>
            Send us a message through our{" "}
            <a href="/contact">contact form</a> using the email address on your
            account, and ask us to delete it. We&rsquo;ll verify it&rsquo;s you
            and confirm once it&rsquo;s done.
          </p>
        </LegalSection>

        <LegalSection heading="What gets deleted">
          <p>
            Deleting your account removes your profile, reminders, meeting
            recordings/transcripts/summaries stored with us, app settings,
            and any signed-in sessions. Voice and meeting audio that only
            ever lived on your device (the default) is removed simply by
            deleting the app.
          </p>
        </LegalSection>

        <LegalSection heading="Questions">
          <p>
            See our <a href="/privacy">Privacy Policy</a> for more on what we
            collect and why, or reach us through our{" "}
            <a href="/contact">contact form</a> with any questions.
          </p>
        </LegalSection>
      </LegalContent>
      <Footer />
    </>
  );
}
