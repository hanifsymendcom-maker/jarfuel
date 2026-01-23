import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useReferral } from "@/contexts/ReferralContext";
import { toast } from "sonner";
import {
  Copy,
  Check,
  Gift,
  Users,
  Trophy,
  ArrowRight,
  Sparkles,
  Twitter,
  MessageCircle,
  Mail,
  Share2,
} from "lucide-react";

export default function ReferralSection() {
  const { stats, isSignedUp, getReferralLink, trackShare } = useReferral();
  const [copied, setCopied] = useState(false);

  const referralLink = isSignedUp ? getReferralLink() : "";

  const handleCopy = async () => {
    if (!isSignedUp) {
      toast.error("Sign up first to get your referral link!");
      // Scroll to hero section
      document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      trackShare();
      toast.success("Link copied! Share it with friends.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy. Please try again.");
    }
  };

  const shareMessage = encodeURIComponent(
    `I just signed up for JarFuel - protein-packed breakfast jars for just $5/day! Use my link to join the waitlist: ${referralLink}`
  );

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareMessage}`,
    whatsapp: `https://wa.me/?text=${shareMessage}`,
    email: `mailto:?subject=${encodeURIComponent(
      "You NEED to try JarFuel!"
    )}&body=${shareMessage}`,
    sms: `sms:?body=${shareMessage}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    if (!isSignedUp) {
      toast.error("Sign up first to get your referral link!");
      document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    trackShare();
    window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
  };

  const rewards = [
    {
      icon: Gift,
      count: 1,
      reward: "1 Week Free",
      description: "Share with 1 friend who subscribes",
    },
    {
      icon: Trophy,
      count: 3,
      reward: "1 Month Free",
      description: "Refer 3 friends for a full month",
    },
    {
      icon: Sparkles,
      count: 5,
      reward: "VIP Status",
      description: "Unlock priority support & early features",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Gift className="w-4 h-4" />
            Referral Program
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Share the Love,{" "}
            <span className="text-primary">Get Free Weeks</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            For every friend that subscribes using your link, you get 1 week of
            JarFuel completely FREE. No limits on how many weeks you can earn!
          </p>
        </div>

        {/* Rewards Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          {rewards.map((tier, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-lg border border-border/50 hover:-translate-y-2 transition-transform duration-300 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                <tier.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-accent mb-1">
                {tier.count}
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                friend{tier.count > 1 ? "s" : ""}
              </div>
              <div className="text-xl font-bold text-foreground mb-2">
                {tier.reward}
              </div>
              <p className="text-sm text-muted-foreground">{tier.description}</p>
            </div>
          ))}
        </div>

        {/* Main CTA Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-border/50">
          {isSignedUp && stats ? (
            <>
              {/* Signed up state - show referral stats and link */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-secondary/50 rounded-2xl p-5 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Users className="w-6 h-6 text-primary" />
                    <span className="text-4xl font-bold text-primary">
                      {stats.signups}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Friends Joined
                  </p>
                </div>
                <div className="bg-accent/10 rounded-2xl p-5 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Gift className="w-6 h-6 text-accent" />
                    <span className="text-4xl font-bold text-accent">
                      {stats.freeWeeksEarned}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Free Weeks Earned
                  </p>
                </div>
              </div>

              {/* Referral Link */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-foreground mb-2 block text-center">
                  Your unique referral link:
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    readOnly
                    value={referralLink}
                    className="flex-1 bg-muted rounded-xl px-5 py-4 text-sm border border-border font-mono truncate"
                  />
                  <Button
                    onClick={handleCopy}
                    size="lg"
                    className="rounded-xl px-6 bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20"
                  >
                    {copied ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="grid grid-cols-4 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleShare("twitter")}
                  className="rounded-xl py-5 flex-col gap-1 h-auto hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2] transition-all group"
                >
                  <Twitter className="w-5 h-5 group-hover:text-[#1DA1F2]" />
                  <span className="text-xs text-muted-foreground group-hover:text-[#1DA1F2]">
                    Twitter
                  </span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare("whatsapp")}
                  className="rounded-xl py-5 flex-col gap-1 h-auto hover:bg-[#25D366]/10 hover:border-[#25D366] transition-all group"
                >
                  <MessageCircle className="w-5 h-5 group-hover:text-[#25D366]" />
                  <span className="text-xs text-muted-foreground group-hover:text-[#25D366]">
                    WhatsApp
                  </span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare("email")}
                  className="rounded-xl py-5 flex-col gap-1 h-auto hover:bg-primary/10 hover:border-primary transition-all group"
                >
                  <Mail className="w-5 h-5 group-hover:text-primary" />
                  <span className="text-xs text-muted-foreground group-hover:text-primary">
                    Email
                  </span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare("sms")}
                  className="rounded-xl py-5 flex-col gap-1 h-auto hover:bg-accent/10 hover:border-accent transition-all group"
                >
                  <Share2 className="w-5 h-5 group-hover:text-accent" />
                  <span className="text-xs text-muted-foreground group-hover:text-accent">
                    SMS
                  </span>
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Not signed up yet - prompt to sign up */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                  <Gift className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Ready to Start Earning?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join the waitlist to get your unique referral link and start
                  earning free weeks!
                </p>
                <Button
                  size="lg"
                  onClick={() =>
                    document
                      .getElementById("waitlist")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="rounded-full px-8 py-6 text-lg font-bold bg-accent hover:bg-accent/90 text-white shadow-xl shadow-accent/20 hover:shadow-accent/40 transition-all hover:-translate-y-1"
                >
                  Join Waitlist to Get Your Link
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Social Proof */}
        <div className="text-center mt-10">
          <p className="text-muted-foreground">
            <span className="font-semibold text-primary">127</span> referrals made
            this week!
          </p>
        </div>
      </div>
    </section>
  );
}
