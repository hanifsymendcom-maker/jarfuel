import { useState, useEffect, useCallback } from "react";
import { X, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered && !submitted) {
        const dismissed = sessionStorage.getItem("exitPopupDismissed");
        if (!dismissed) {
          setIsOpen(true);
          setHasTriggered(true);
        }
      }
    },
    [hasTriggered, submitted]
  );

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("exitPopupDismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitted(true);
    toast.success("You're in! Check your email for your free guide.");
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-primary to-accent p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Wait! Don't Leave Empty-Handed</h2>
          <p className="text-white/90">Get our free guide before you go</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Free: "5 High-Protein Breakfast Recipes"
            </h3>
            <p className="text-muted-foreground">
              Quick meals you can make in under 10 minutes. No cooking skills required.
            </p>
          </div>

          {/* What you get */}
          <div className="bg-muted/30 rounded-2xl p-4 mb-6">
            <div className="text-sm font-semibold text-foreground mb-3">What's inside:</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                  1
                </span>
                5 protein-packed breakfast recipes (15-25g each)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                  2
                </span>
                Shopping list & meal prep tips
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                  3
                </span>
                Exclusive early access to JarFuel launch
              </li>
            </ul>
          </div>

          {submitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-primary" />
              </div>
              <p className="text-lg font-semibold text-primary">Check your inbox!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-full px-6 py-6 text-center border-2"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full py-6 text-lg font-bold bg-accent hover:bg-accent/90 text-white"
              >
                Send Me The Free Guide
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          )}

          <p className="text-center text-xs text-muted-foreground mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
