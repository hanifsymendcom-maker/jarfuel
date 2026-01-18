import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import WhoItsFor from "@/components/WhoItsFor";
import Benefits from "@/components/Benefits";
import Nutrition from "@/components/Nutrition";
import Comparison from "@/components/Comparison";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import ReferralProgram from "@/components/ReferralProgram";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import LeadMagnet from "@/components/LeadMagnet";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <SocialProof />
        <WhoItsFor />
        <Benefits />
        <Nutrition />
        <Comparison />
        <HowItWorks />
        <Pricing />
        <ReferralProgram />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />

      {/* Conversion optimization overlays */}
      <ExitIntentPopup />
      <StickyMobileCTA />
      <LeadMagnet />
    </div>
  );
}
