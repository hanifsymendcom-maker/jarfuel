import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useReferral } from "@/contexts/ReferralContext";
import ReferralSuccessModal from "@/components/ReferralSuccessModal";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 42
  });

  const { generateReferralCode, isSignedUp } = useReferral();

  // Sync submitted state with isSignedUp from context
  useEffect(() => {
    if (isSignedUp) {
      setSubmitted(true);
    }
  }, [isSignedUp]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
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

    // Generate referral code for this user
    generateReferralCode(email);

    setSubmitted(true);
    toast.success("Spot reserved! Welcome aboard.");

    // Show referral modal after a brief delay
    setTimeout(() => {
      setShowReferralModal(true);
    }, 500);

    setEmail("");
  };

  return (
    <section className="py-24 bg-foreground text-background text-center relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent blur-[100px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Fix Your Mornings?</h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Join the waitlist now. First 250 subscribers get founding member pricing locked in forever.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-16">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            className="rounded-full px-6 py-6 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent focus-visible:border-accent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={submitted}
          />
          <Button 
            type="submit" 
            size="lg" 
            className="rounded-full px-8 py-6 text-lg font-bold bg-accent hover:bg-accent/90 text-white border-none shadow-lg shadow-accent/20"
            disabled={submitted}
          >
            {submitted ? "Reserved!" : "Reserve My Spot"}
          </Button>
        </form>
        
        <div className="inline-block bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10">
          <div className="text-sm font-medium text-white/70 mb-4 uppercase tracking-widest">Founding member pricing ends in</div>
          <div className="flex gap-8 justify-center">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">{timeLeft.days.toString().padStart(2, '0')}</div>
              <div className="text-xs text-white/60 uppercase">Days</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-xs text-white/60 uppercase">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-xs text-white/60 uppercase">Minutes</div>
            </div>
          </div>
        </div>

        {/* Referral Teaser */}
        <p className="mt-8 text-white/60 text-sm">
          Plus: Refer friends after signing up and earn <span className="text-accent font-semibold">FREE weeks</span>!
        </p>
      </div>

      {/* Referral Success Modal */}
      <ReferralSuccessModal
        open={showReferralModal}
        onClose={() => setShowReferralModal(false)}
      />
    </section>
  );
}
