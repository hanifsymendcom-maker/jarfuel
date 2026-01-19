import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Share2, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        return prev;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitted(true);
    toast.success("Spot reserved! Welcome aboard.");
    trackEvent("signup", { location: "final_cta" });

    // Dispatch event for signup count sync
    window.dispatchEvent(new CustomEvent("jarfuel:signup"));
    setEmail("");
  };

  const handleShare = async () => {
    const shareData = {
      title: "JarFuel - $5 Protein Breakfast",
      text: "Just reserved my spot for $5/day protein breakfast jars! 21g protein, zero prep.",
      url: window.location.origin + "?ref=share",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        trackEvent("share", { method: "native", location: "final_cta" });
        toast.success("Thanks for sharing!");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        trackEvent("share", { method: "clipboard", location: "final_cta" });
        toast.success("Link copied! Share it with friends.");
      }
    } catch {
      // User cancelled or error
    }
  };

  return (
    <section className="py-24 bg-foreground text-background text-center relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent blur-[100px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Ready to Fix Your Mornings?
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Join the waitlist now. First 250 subscribers get founding member pricing locked in
          forever.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-16"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-full px-6 py-6 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent focus-visible:border-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-bold bg-accent hover:bg-accent/90 text-white border-none shadow-lg shadow-accent/20"
            >
              Reserve My Spot
            </Button>
          </form>
        ) : (
          <div className="max-w-md mx-auto mb-16 space-y-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex items-center justify-center gap-2 text-white font-bold text-lg mb-3">
                <Check className="w-6 h-6" />
                Spot Reserved!
              </div>
              <p className="text-white/70 text-sm mb-4">
                Share with friends and you'll both get priority access
              </p>
              <Button
                onClick={handleShare}
                className="rounded-full px-8 py-5 font-bold bg-white text-foreground hover:bg-white/90"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share & Get Priority Access
              </Button>
            </div>
          </div>
        )}

        <div className="inline-block bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10">
          <div className="text-sm font-medium text-white/70 mb-4 uppercase tracking-widest">
            Founding member pricing ends in
          </div>
          <div className="flex gap-8 justify-center">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">
                {timeLeft.days.toString().padStart(2, "0")}
              </div>
              <div className="text-xs text-white/60 uppercase">Days</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">
                {timeLeft.hours.toString().padStart(2, "0")}
              </div>
              <div className="text-xs text-white/60 uppercase">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </div>
              <div className="text-xs text-white/60 uppercase">Minutes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
