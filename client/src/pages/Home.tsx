import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Progress from "@/components/Progress";
import Benefits from "@/components/Benefits";
import SocialProof from "@/components/SocialProof";
import Nutrition from "@/components/Nutrition";
import Comparison from "@/components/Comparison";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import SocialProofToast from "@/components/SocialProofToast";
import { initScrollTracking, initTimeTracking, trackEvent } from "@/lib/analytics";

export default function Home() {
  const [signupCount, setSignupCount] = useState(147);

  useEffect(() => {
    // Track page view with UTM params
    trackEvent("page_view", { page: "home" });

    // Initialize scroll and time tracking
    const cleanupScroll = initScrollTracking();
    const cleanupTime = initTimeTracking();

    // Listen for signup events to update count across components
    const handleSignup = () => {
      setSignupCount((prev) => prev + 1);
    };

    window.addEventListener("jarfuel:signup", handleSignup);

    return () => {
      cleanupScroll();
      cleanupTime();
      window.removeEventListener("jarfuel:signup", handleSignup);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Progress />
        <Benefits />
        <SocialProof />
        <Nutrition />
        <Comparison />
        <HowItWorks />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />

      {/* Social proof toast notifications */}
      <SocialProofToast enabled={true} intervalMs={18000} initialDelayMs={10000} />

      {/* Sticky mobile CTA - appears after scrolling past hero */}
      <StickyMobileCTA signupCount={signupCount} />
    </div>
  );
}
