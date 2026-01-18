import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useWaitlist } from "@/contexts/WaitlistContext";
import ProductVariantSelector from "./ProductVariantSelector";

// Target date: End of February 2026
const TARGET_DATE = new Date('2026-02-28T23:59:59');

function calculateTimeLeft() {
  const now = new Date();
  const difference = TARGET_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
  const { hasSubmitted, submitEmail } = useWaitlist();

  useEffect(() => {
    // Update every second for real-time countdown
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    const result = await submitEmail(email);
    setIsSubmitting(false);

    if (result.success) {
      toast.success("Spot reserved! Welcome aboard.");
      setEmail("");
    } else {
      toast.error(result.error || "Something went wrong. Please try again.");
    }
  };

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <section className="py-24 bg-foreground text-background text-center relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent blur-[100px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Fix Your Mornings?</h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Join the waitlist now. First 250 subscribers get founding member pricing locked in forever.
        </p>

        {/* Product Variant Selector - Dark Theme */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <ProductVariantSelector compact className="[&_button]:bg-white/10 [&_button]:border-white/20 [&_button]:text-white [&_button:hover]:bg-white/20" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-16">
          <Input
            type="email"
            placeholder="Enter your email"
            className="rounded-full px-6 py-6 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent focus-visible:border-accent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={hasSubmitted || isSubmitting}
          />
          <Button
            type="submit"
            size="lg"
            className="rounded-full px-8 py-6 text-lg font-bold bg-accent hover:bg-accent/90 text-white border-none shadow-lg shadow-accent/20"
            disabled={hasSubmitted || isSubmitting}
          >
            {isSubmitting ? "Reserving..." : hasSubmitted ? "Reserved!" : "Join Waitlist"}
          </Button>
        </form>

        <div className="inline-block bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10">
          <div className="text-sm font-medium text-white/70 mb-4 uppercase tracking-widest">
            {isExpired ? "Launch pricing has ended!" : "Founding member pricing ends"}
          </div>
          <div className="flex gap-4 md:gap-8 justify-center">
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-extrabold text-white mb-1 tabular-nums">
                {timeLeft.days.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-white/60 uppercase">Days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-extrabold text-white mb-1 tabular-nums">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-white/60 uppercase">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-extrabold text-white mb-1 tabular-nums">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-white/60 uppercase">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-extrabold text-white mb-1 tabular-nums">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-white/60 uppercase">Seconds</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
