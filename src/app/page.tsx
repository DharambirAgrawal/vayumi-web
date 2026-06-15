import { Navbar } from "@/components/sections/Navbar";
import { VaultSequence } from "@/components/sections/VaultSequence";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top" className="flex-1">
        <VaultSequence />
        <TrustStrip />
        <HowItWorks />
        <FeatureGrid />
        <WaitlistSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
