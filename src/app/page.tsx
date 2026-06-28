import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { LifeShowcase } from "@/components/sections/LifeShowcase";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PrivacyPledge } from "@/components/sections/PrivacyPledge";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <LifeShowcase />
        <FeatureGrid />
        <PrivacyPledge />
        <HowItWorks />
        <WaitlistSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
