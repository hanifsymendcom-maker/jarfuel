import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Users, Trophy, Zap, Copy, Check, Twitter, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useWaitlist } from "@/contexts/WaitlistContext";

export default function ReferralProgram() {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const { currentUser, join, getReferralLink, isLoading } = useWaitlist();

  const isRegistered = !!currentUser;
  const referralCode = currentUser?.referral_code || "";
  const position = currentUser?.position || 0;
  const referrals = currentUser?.referral_count || 0;

  const rewards = [
    {
      icon: <Zap className="w-5 h-5" />,
      referrals: 1,
      reward: "Jump 10 spots in line",
      color: "bg-blue-500",
    },
    {
      icon: <Gift className="w-5 h-5" />,
      referrals: 3,
      reward: "First week FREE",
      color: "bg-purple-500",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      referrals: 5,
      reward: "Founding Member ($20/week forever)",
      color: "bg-amber-500",
    },
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const success = await join(email, "referral");
    if (success) {
      toast.success("You're in! Share your link to move up the list.");
      setEmail("");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const referralLink = getReferralLink() || `${window.location.origin}?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      "Just joined the @JarFuel waitlist! $5 protein breakfast delivered daily. Use my link to skip the line:"
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(referralLink)}`, "_blank");
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out JarFuel - $5 protein breakfast delivered! Join with my link and skip the line: ${referralLink}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary to-accent text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Users className="w-4 h-4" />
            Referral Program
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skip the Line. Get Rewards.
          </h2>
          <p className="text-xl text-white/80">
            Share JarFuel with friends and unlock exclusive perks
          </p>
        </div>

        {/* Rewards Tiers */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {rewards.map((tier, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 ${
                referrals >= tier.referrals ? "ring-2 ring-white" : ""
              }`}
            >
              <div
                className={`w-12 h-12 ${tier.color} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                {tier.icon}
              </div>
              <div className="text-3xl font-bold mb-1">{tier.referrals}</div>
              <div className="text-sm text-white/70 mb-3">
                {tier.referrals === 1 ? "Referral" : "Referrals"}
              </div>
              <div className="font-semibold">{tier.reward}</div>
            </div>
          ))}
        </div>

        {/* Registration / Share Section */}
        <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 text-foreground shadow-2xl">
          {!isRegistered ? (
            <>
              <h3 className="text-xl font-bold text-center mb-6">
                Get Your Unique Referral Link
              </h3>
              <form onSubmit={handleRegister} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full px-6 py-6 text-center border-2"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full py-6 text-lg font-bold bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Getting Link..." : "Get My Referral Link"}
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Position Card */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 mb-6 text-center">
                <div className="text-sm text-muted-foreground mb-1">Your position</div>
                <div className="text-4xl font-bold text-primary">#{position}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {referrals} referrals • {position > 50 ? position - 50 : 0} spots to VIP
                </div>
              </div>

              {/* Referral Link */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-muted-foreground block mb-2">
                  Your unique link
                </label>
                <div className="flex gap-2">
                  <Input
                    value={referralLink}
                    readOnly
                    className="rounded-full bg-muted text-sm"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="rounded-full px-4"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={shareOnTwitter}
                  className="rounded-full bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Share on X
                </Button>
                <Button
                  onClick={shareOnWhatsApp}
                  className="rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
