import { useState, useEffect } from "react";
import { X, BookOpen, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useWaitlist } from "@/contexts/WaitlistContext";

export default function LeadMagnet() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { count, currentUser, join, isLoading } = useWaitlist();

  const isSubmitted = submitted || !!currentUser;
  // count already has minimum enforced by WaitlistContext
  const displayCount = count;

  useEffect(() => {
    // Don't show if already on waitlist
    if (currentUser) return;

    // Show popup after 15 seconds if not dismissed
    const dismissed = sessionStorage.getItem("leadMagnetDismissed");
    const alreadySubmitted = sessionStorage.getItem("leadMagnetSubmitted");

    if (!dismissed && !alreadySubmitted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("leadMagnetDismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const success = await join(email, "lead_magnet");
    if (success) {
      setSubmitted(true);
      sessionStorage.setItem("leadMagnetSubmitted", "true");
      toast.success("Guide sent! Check your inbox.");
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  const benefits = [
    "5 high-protein recipes (15-25g each)",
    "Complete shopping list included",
    "Meal prep tips for busy mornings",
    "Bonus: JarFuel early access",
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors z-10"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Image/Icon Header */}
        <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-8 text-center border-b border-border/30">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 border border-border/30">
            <BookOpen className="w-10 h-10 text-primary" />
          </div>
          <div className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            FREE DOWNLOAD
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            5 Protein Breakfast Recipes
          </h2>
          <p className="text-muted-foreground mt-2">
            Quick meals for busy mornings
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">You're all set!</h3>
              <p className="text-muted-foreground">
                Check your inbox for the free guide.
              </p>
            </div>
          ) : (
            <>
              {/* Benefits list */}
              <ul className="space-y-3 mb-6">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full px-5 py-6 border-2"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full py-6 font-bold bg-accent hover:bg-accent/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Get Free Guide"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              <p className="text-center text-xs text-muted-foreground mt-4">
                Join {displayCount}+ others. No spam, unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
