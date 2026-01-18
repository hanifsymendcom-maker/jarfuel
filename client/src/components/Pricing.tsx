import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useWaitlist } from "@/contexts/WaitlistContext";

export default function Pricing() {
  const [email, setEmail] = useState("");
  const { currentUser, join, isLoading } = useWaitlist();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const success = await join(email, "pricing");
    if (success) {
      setSubmitted(true);
      toast.success("Added to the waitlist! We'll be in touch.");
      setEmail("");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const isSubmitted = submitted || !!currentUser;

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Simple Pricing</h2>
          <p className="text-xl text-muted-foreground">
            No hidden fees. No commitments. Real food, real value.
          </p>
        </div>

        <div className="max-w-lg mx-auto bg-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl relative overflow-hidden border border-border/50 hover:-translate-y-2 transition-transform duration-500">
          <div className="absolute top-8 -right-12 bg-accent text-white py-2 px-12 rotate-45 font-bold text-sm shadow-md">
            LAUNCH SPECIAL
          </div>
          
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Weekday Warrior Plan</h3>
            <p className="text-muted-foreground">5 jars delivered weekly</p>
          </div>
          
          <div className="text-center mb-4">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-6xl font-extrabold text-primary">$25</span>
              <span className="text-xl text-muted-foreground font-medium">/week</span>
            </div>
            <p className="text-muted-foreground mt-2 font-medium">That's just $5 per breakfast!</p>
          </div>
          
          <div className="space-y-4 mb-10">
            {[
              "5 fresh protein jars (M-F)",
              "Free Sunday delivery",
              "Returnable glass jars (eco-friendly)",
              "Skip weeks anytime",
              "Cancel anytime, no fees"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground/80 font-medium">{feature}</span>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="email"
              placeholder="Your email"
              className="rounded-full px-6 py-6 text-center border-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitted || isLoading}
            />
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full py-6 text-lg font-bold bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20"
              disabled={isSubmitted || isLoading}
            >
              {isLoading ? "Joining..." : isSubmitted ? "You're on the list!" : "Join Waitlist"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
