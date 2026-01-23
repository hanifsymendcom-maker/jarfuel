import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Progress from "@/components/Progress";
import Benefits from "@/components/Benefits";
import Nutrition from "@/components/Nutrition";
import Comparison from "@/components/Comparison";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import ReferralSection from "@/components/ReferralSection";
import ReferralBanner from "@/components/ReferralBanner";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Progress />
        <Benefits />
        <Nutrition />
        <Comparison />
        <HowItWorks />
        <Pricing />
        <ReferralSection />
        <FinalCTA />
      </main>
      <Footer />
      <ReferralBanner />
    </div>
  );
}
