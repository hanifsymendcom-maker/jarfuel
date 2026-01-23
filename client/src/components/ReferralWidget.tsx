import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useReferral } from "@/contexts/ReferralContext";
import { toast } from "sonner";
import {
  Copy,
  Check,
  Share2,
  Gift,
  Users,
  Sparkles,
  Twitter,
  Mail,
  MessageCircle,
} from "lucide-react";

interface ReferralWidgetProps {
  variant?: "inline" | "modal" | "compact";
  className?: string;
}

export default function ReferralWidget({
  variant = "inline",
  className = "",
}: ReferralWidgetProps) {
  const { stats, getReferralLink, trackShare } = useReferral();
  const [copied, setCopied] = useState(false);

  if (!stats) return null;

  const referralLink = getReferralLink();
  const freeWeeks = stats.freeWeeksEarned;
  const signups = stats.signups;

  // Milestone progress (3 referrals = 1 month free!)
  const milestoneTarget = 3;
  const progressPercent = Math.min((signups / milestoneTarget) * 100, 100);

  const handleCopy = async () => {
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
    `I just signed up for JarFuel - protein-packed breakfast jars for just $5/day! Use my link to join the waitlist and we both get perks: ${referralLink}`
  );

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareMessage}`,
    whatsapp: `https://wa.me/?text=${shareMessage}`,
    email: `mailto:?subject=${encodeURIComponent(
      "You NEED to try JarFuel breakfast jars!"
    )}&body=${shareMessage}`,
    sms: `sms:?body=${shareMessage}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    trackShare();
    window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
  };

  if (variant === "compact") {
    return (
      <div
        className={`bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 ${className}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Gift className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">
                Earn free weeks!
              </p>
              <p className="text-xs text-muted-foreground">
                {freeWeeks > 0
                  ? `${freeWeeks} week${freeWeeks > 1 ? "s" : ""} earned`
                  : "Share to earn"}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={handleCopy}
            className="rounded-full bg-accent hover:bg-accent/90 text-white"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-border/50 ${className}`}
    >
      {/* Header with celebration */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/70 mb-4 shadow-lg shadow-accent/20">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Share the Love, Get Free Weeks!
        </h3>
        <p className="text-muted-foreground">
          For every friend that subscribes, you get{" "}
          <span className="font-bold text-primary">1 week of JarFuel FREE</span>
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-secondary/50 rounded-2xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-3xl font-bold text-primary">{signups}</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            Friends Joined
          </p>
        </div>
        <div className="bg-accent/10 rounded-2xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Gift className="w-5 h-5 text-accent" />
            <span className="text-3xl font-bold text-accent">{freeWeeks}</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            Free Weeks Earned
          </p>
        </div>
      </div>

      {/* Milestone Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            Milestone: 3 referrals = 1 Month FREE!
          </span>
          <span className="text-sm font-bold text-primary">
            {signups}/{milestoneTarget}
          </span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {signups >= milestoneTarget && (
          <p className="text-sm text-accent font-semibold mt-2 text-center">
            You unlocked 1 month FREE!
          </p>
        )}
      </div>

      {/* Referral Link Box */}
      <div className="bg-muted rounded-2xl p-4 mb-6">
        <label className="text-sm font-medium text-foreground mb-2 block">
          Your unique referral link:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 bg-white rounded-xl px-4 py-3 text-sm border border-border font-mono truncate"
          />
          <Button
            onClick={handleCopy}
            className="rounded-xl px-4 bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
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
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground text-center">
          Share via:
        </p>
        <div className="grid grid-cols-4 gap-3">
          <Button
            variant="outline"
            onClick={() => handleShare("twitter")}
            className="rounded-xl py-6 hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2] hover:text-[#1DA1F2] transition-all"
          >
            <Twitter className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleShare("whatsapp")}
            className="rounded-xl py-6 hover:bg-[#25D366]/10 hover:border-[#25D366] hover:text-[#25D366] transition-all"
          >
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleShare("email")}
            className="rounded-xl py-6 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all"
          >
            <Mail className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleShare("sms")}
            className="rounded-xl py-6 hover:bg-accent/10 hover:border-accent hover:text-accent transition-all"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Pro tip */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Pro tip:</span> Friends
          who sign up using your link also get priority access to launch pricing!
        </p>
      </div>
    </div>
  );
}
