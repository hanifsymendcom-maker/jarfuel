import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { trackCTAClick } from "@/lib/analytics";

interface StickyMobileCTAProps {
  signupCount?: number;
}

export default function StickyMobileCTA({ signupCount = 147 }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (approximately 100vh)
      const scrollThreshold = window.innerHeight * 0.8;
      const shouldShow = window.scrollY > scrollThreshold;

      setHasScrolledPastHero(shouldShow);

      // Add slight delay for smoother appearance
      if (shouldShow && !isVisible) {
        setTimeout(() => setIsVisible(true), 100);
      } else if (!shouldShow) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const scrollToWaitlist = () => {
    trackCTAClick("sticky_mobile", "Get Early Access");
    const element = document.getElementById("waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Only show on mobile/tablet
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 lg:hidden",
        "bg-background/95 backdrop-blur-lg border-t border-border/50",
        "transform transition-all duration-300 ease-out",
        "safe-area-inset-bottom",
        isVisible && hasScrolledPastHero
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Left side - social proof */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex -space-x-2">
            {/* Avatar stack */}
            <div className="w-7 h-7 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-bold text-primary">
              S
            </div>
            <div className="w-7 h-7 rounded-full bg-accent/20 border-2 border-background flex items-center justify-center text-xs font-bold text-accent">
              M
            </div>
            <div className="w-7 h-7 rounded-full bg-green-500/20 border-2 border-background flex items-center justify-center text-xs font-bold text-green-600">
              J
            </div>
          </div>
          <span className="text-sm font-medium text-muted-foreground truncate">
            <span className="text-primary font-bold">{signupCount}</span> joined
          </span>
        </div>

        {/* Right side - CTA button */}
        <Button
          onClick={scrollToWaitlist}
          className="rounded-full px-6 py-5 text-sm font-bold shadow-lg shadow-accent/20 bg-accent hover:bg-accent/90 text-white border-none whitespace-nowrap flex-shrink-0"
        >
          Get Early Access
        </Button>
      </div>
    </div>
  );
}
