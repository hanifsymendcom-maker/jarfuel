import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ShieldCheck, RefreshCcw, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Pricing() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitted(true);
    toast.success("Added to the waitlist! We'll be in touch.");
    setEmail("");
  };

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

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-2">Weekday Warrior Plan</h3>
            <p className="text-muted-foreground">5 jars delivered weekly</p>
          </div>

          <div className="text-center mb-2">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-6xl font-extrabold text-primary">$25</span>
              <span className="text-xl text-muted-foreground font-medium">/week</span>
            </div>
          </div>

          {/* Cost Anchoring - Recommendation #5 */}
          <div className="bg-secondary/50 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-center gap-3 text-sm">
              <div className="text-center">
                <span className="text-2xl font-bold text-primary">$5</span>
                <span className="text-muted-foreground">/day</span>
              </div>
              <span className="text-muted-foreground font-medium">vs</span>
              <div className="text-center">
                <span className="text-2xl font-bold text-muted-foreground line-through">$8.50</span>
                <span className="text-muted-foreground">/day</span>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Starbucks Protein Box: $8.50 • JarFuel: <strong className="text-primary">$5</strong>
            </p>
            <p className="text-center text-xs text-primary font-bold mt-1">
              Save $17.50/week ($910/year!)
            </p>
          </div>

          <div className="space-y-4 mb-8">
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

          {/* Risk Reversal Guarantee - Recommendation #6 */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-6 h-6 text-green-600" />
              <span className="font-bold text-green-800">100% Happiness Guarantee</span>
            </div>
            <p className="text-sm text-green-700">
              Try your first week risk-free. If you don't love it, we'll refund your order completely. No questions asked.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="email"
              placeholder="Your email"
              className="rounded-full px-6 py-6 text-center border-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={submitted}
            />
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full py-6 text-lg font-bold bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20"
              disabled={submitted}
            >
              {submitted ? "You're on the list!" : "Join Waitlist - It's Free"}
            </Button>
          </form>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border/30">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <RefreshCcw className="w-4 h-4" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Heart className="w-4 h-4" />
              <span>Love It Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
