import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useReferral } from "@/contexts/ReferralContext";
import { toast } from "sonner";
import { X, Gift, Copy, Check, ChevronUp, ChevronDown } from "lucide-react";

export default function ReferralBanner() {
  const { stats, isSignedUp, getReferralLink, trackShare } = useReferral();
  const [dismissed, setDismissed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Don't show if not signed up or dismissed
  if (!isSignedUp || !stats || dismissed) return null;

  const referralLink = getReferralLink();
  const freeWeeks = stats.freeWeeksEarned;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      trackShare();
      toast.success("Link copied! Share it with friends.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  if (collapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setCollapsed(false)}
          className="rounded-full w-14 h-14 bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/30 animate-pulse-slow"
        >
          <Gift className="w-6 h-6" />
        </Button>
        {freeWeeks > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
            {freeWeeks}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-0 md:bottom-4 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold">Earn Free JarFuel!</h4>
                <p className="text-sm text-white/80">
                  {freeWeeks > 0
                    ? `${freeWeeks} week${freeWeeks > 1 ? "s" : ""} earned so far`
                    : "Share & earn 1 week per friend"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed(true)}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDismissed(true)}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm font-mono truncate border border-border"
            />
            <Button
              onClick={handleCopy}
              size="sm"
              className="rounded-lg bg-accent hover:bg-accent/90 text-white px-4"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {stats.signups} friend{stats.signups !== 1 ? "s" : ""} joined
            </span>
            <span className="font-semibold text-primary">
              {freeWeeks} week{freeWeeks !== 1 ? "s" : ""} free
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
