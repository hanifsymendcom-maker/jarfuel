import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import ReferralModal from "./ReferralModal";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(147);
  const [submitted, setSubmitted] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [memberNumber, setMemberNumber] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const newCount = count + 1;
    setCount(newCount);
    setMemberNumber(newCount);
    setSubmitted(true);
    toast.success("You're on the list! Welcome to the JarFuel family.");

    // Show referral modal after a short delay
    setTimeout(() => {
      setShowReferralModal(true);
    }, 1000);
  };

  const spotsLeft = 250 - count;

  return (
    <>
      <section id="waitlist" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-br from-background to-green-50">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[80%] h-[150%] rounded-full bg-accent/5 blur-[100px]" />
          <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[80px]" />
        </div>

        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="max-w-2xl">
            <div className="inline-block bg-accent text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse-slow shadow-lg shadow-accent/20">
              Only {spotsLeft} Founding Member Spots Left
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 text-foreground">
              Breakfast That <span className="text-primary">Actually Works</span> for Busy People
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
              21g protein, 245 calories, delivered fresh to your door for just $5/day. The grab-and-go breakfast jar that fuels your morning without the prep.
            </p>

            <div className="flex flex-wrap gap-8 mb-10">
              <div className="text-center">
                <div className="text-4xl font-extrabold text-primary">21g</div>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-extrabold text-primary">245</div>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Calories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-extrabold text-primary">$5</div>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Per Day</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-4 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-full px-6 py-6 text-lg border-2 focus-visible:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={submitted}
              />
              <Button
                type="submit"
                size="lg"
                className="rounded-full px-8 py-6 text-lg font-bold shadow-xl shadow-accent/20 hover:shadow-accent/40 transition-all hover:-translate-y-1 bg-accent hover:bg-accent/90 text-white border-none"
                disabled={submitted}
              >
                {submitted ? "You're In!" : "Get Early Access"}
              </Button>
            </form>

            {/* Risk Reversal Mini-Badge */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>100% Happiness Guarantee • Cancel anytime</span>
            </div>

            <p className="text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <strong className="text-primary">{count}</strong> people already signed up.
              </span>
              {" "}
              <strong className="text-accent">{spotsLeft} spots</strong> left for founding member pricing!
            </p>
          </div>

          <div className="relative hidden lg:block h-[600px] w-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[400px] h-[500px] animate-float">
                {/* Main Jar Image */}
                <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/50">
                  <img
                    src="/images/hero-jar.jpg"
                    alt="JarFuel Breakfast Jar"
                    className="w-full h-full object-cover"
                  />

                  {/* Floating Label Card */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl w-[80%] text-center border border-white/50">
                    <h3 className="text-xl font-bold text-primary mb-1">JarFuel</h3>
                    <p className="text-sm text-muted-foreground font-medium">Protein Coffee & Chia Pudding</p>
                  </div>
                </div>

                {/* Decorative elements around jar */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Modal - Recommendations #7 & #8 */}
      <ReferralModal
        isOpen={showReferralModal}
        onClose={() => setShowReferralModal(false)}
        memberNumber={memberNumber}
        email={email || "member@example.com"}
      />
    </>
  );
}
