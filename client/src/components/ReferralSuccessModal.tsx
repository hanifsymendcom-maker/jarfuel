import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useReferral } from "@/contexts/ReferralContext";
import { toast } from "sonner";
import {
  Copy,
  Check,
  PartyPopper,
  Gift,
  Twitter,
  Mail,
  MessageCircle,
  Share2,
  Zap,
} from "lucide-react";

interface ReferralSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ReferralSuccessModal({
  open,
  onClose,
}: ReferralSuccessModalProps) {
  const { stats, getReferralLink, trackShare, checkReferralCode } = useReferral();
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const wasReferred = checkReferralCode() !== null;

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!stats) return null;

  const referralLink = getReferralLink();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      trackShare();
      toast.success("Link copied! Now share it with your friends.");
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

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden border-none">
        {/* Confetti Background Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full animate-bounce"
                style={{
                  backgroundColor: i % 2 === 0 ? "#F4A261" : "#2D5A27",
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}px`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Header */}
        <div className="bg-gradient-to-br from-primary via-primary to-accent p-8 text-white text-center relative">
          <div className="absolute top-4 right-4">
            <PartyPopper className="w-8 h-8 text-white/30 animate-pulse" />
          </div>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4 backdrop-blur-sm">
            <PartyPopper className="w-10 h-10 text-white" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-white mb-2">
              You're In!
            </DialogTitle>
          </DialogHeader>
          <p className="text-white/90 text-lg">
            Welcome to the JarFuel family
          </p>
          {wasReferred && (
            <div className="mt-4 bg-white/20 rounded-full px-4 py-2 inline-flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">
                You joined with a friend's link!
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Value Proposition */}
          <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-5 mb-6 border border-accent/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">
                  Share & Earn Free Weeks!
                </h4>
                <p className="text-sm text-muted-foreground">
                  For every friend that subscribes using your link, you get{" "}
                  <span className="font-bold text-primary">
                    1 week of JarFuel FREE
                  </span>
                  . No limits!
                </p>
              </div>
            </div>
          </div>

          {/* Referral Link */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Your unique referral link:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm border border-border font-mono truncate"
              />
              <Button
                onClick={handleCopy}
                className="rounded-xl px-5 bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Share Buttons */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3 text-center">
              Share with friends:
            </p>
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
          </div>

          {/* Skip Button */}
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full mt-6 text-muted-foreground hover:text-foreground"
          >
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
