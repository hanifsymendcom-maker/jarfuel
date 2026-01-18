import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp, X } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/useMobile";
import { useWaitlist } from "@/contexts/WaitlistContext";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const isMobile = useIsMobile();
  const { count, currentUser, join, isLoading } = useWaitlist();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      // Show after scrolling past hero section (roughly 500px)
      const shouldShow = window.scrollY > 500;
      setIsVisible(shouldShow && !isDismissed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const success = await join(email, "sticky_mobile");
    if (success) {
      setSubmitted(true);
      toast.success("You're on the list!");
      setEmail("");
      setTimeout(() => {
        setIsExpanded(false);
      }, 2000);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const isSubmitted = submitted || !!currentUser;
  // count already has minimum enforced by WaitlistContext
  const displayCount = count;

  const scrollToTop = () => {
    const heroSection = document.getElementById("waitlist");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Only show on mobile or when screen is narrow
  if (!isVisible || !isMobile) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Collapsed State */}
      {!isExpanded && (
        <div className="bg-foreground text-background p-4 shadow-2xl border-t border-white/10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="text-sm font-bold">Join {displayCount}+ on the waitlist</div>
              <div className="text-xs text-white/70">Lock in founding member pricing</div>
            </div>
            <Button
              onClick={() => setIsExpanded(true)}
              className="rounded-full px-6 bg-accent hover:bg-accent/90 text-white font-bold shadow-lg"
            >
              {isSubmitted ? "You're In!" : "Join Now"}
            </Button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-2 text-white/50 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Expanded State */}
      {isExpanded && (
        <div className="bg-white p-6 shadow-2xl border-t border-border rounded-t-3xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-foreground">Get Early Access</h3>
              <p className="text-sm text-muted-foreground">Only {Math.max(250 - displayCount, 0)} founding spots left</p>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 -mt-2 -mr-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>

          {isSubmitted ? (
            <div className="text-center py-2">
              <p className="text-primary font-semibold">Welcome to JarFuel!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full flex-1"
                required
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="rounded-full px-6 bg-accent hover:bg-accent/90 text-white font-bold"
                disabled={isLoading}
              >
                {isLoading ? "..." : "Join"}
              </Button>
            </form>
          )}
        </div>
      )}

      {/* Scroll to top button (always visible) */}
      <button
        onClick={scrollToTop}
        className="absolute -top-12 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors border border-border"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
}
