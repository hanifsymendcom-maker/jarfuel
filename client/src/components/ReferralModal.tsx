import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Copy,
  Twitter,
  Linkedin,
  Mail,
  CheckCircle2,
  Trophy,
  Download,
  X,
  Gift,
  ArrowUp
} from "lucide-react";
import { toast } from "sonner";

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberNumber: number;
  email: string;
}

export default function ReferralModal({ isOpen, onClose, memberNumber, email }: ReferralModalProps) {
  const [copied, setCopied] = useState(false);

  const referralCode = `JARFUEL-${memberNumber.toString().padStart(4, '0')}`;
  const referralLink = `https://jarfuel.co/join?ref=${referralCode}`;
  const spotsAhead = 250 - memberNumber;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `I just joined the JarFuel waitlist - 21g protein breakfast delivered for $5/day. Use my link to skip the line: ${referralLink} #JarFuel`;

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = "Check out JarFuel - finally a breakfast that makes sense";
    const body = `Hey!\n\nI just signed up for JarFuel - it's a protein breakfast jar delivered fresh for just $5/day. 21g protein, 245 calories, grab and go.\n\nUse my referral link to skip ahead in the waitlist: ${referralLink}\n\nTrust me, your mornings will thank you.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const downloadBadge = () => {
    // In production, this would generate/download an actual badge image
    toast.success("Badge downloaded! Share it on your socials.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with confetti-like elements */}
        <div className="bg-gradient-to-br from-primary to-primary/80 p-8 text-center relative overflow-hidden">
          <div className="absolute top-2 left-4 w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="absolute top-6 right-8 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="absolute bottom-4 left-12 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />

          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">You're In!</h2>
            <p className="text-white/80">Welcome to the JarFuel family</p>
          </div>
        </div>

        <div className="p-8">
          {/* Founding Member Card - Recommendation #8 */}
          <div className="bg-gradient-to-br from-foreground to-foreground/90 rounded-2xl p-6 mb-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
            <div className="relative z-10">
              <Trophy className="w-8 h-8 mx-auto mb-3 text-accent" />
              <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Founding Member</p>
              <p className="text-4xl font-extrabold mb-1">#{memberNumber.toString().padStart(3, '0')}</p>
              <p className="text-white/60 text-sm">of 250</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-white/50">{email}</p>
              </div>
            </div>
          </div>

          {/* Download Badge Button */}
          <Button
            onClick={downloadBadge}
            variant="outline"
            className="w-full mb-8 py-6 rounded-full font-bold"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Founding Member Badge
          </Button>

          {/* Skip the Line Section - Recommendation #7 */}
          <div className="bg-accent/10 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <ArrowUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Skip the Line</h3>
                <p className="text-sm text-muted-foreground">Move up 5 spots for each friend who joins</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 mb-4">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Your Referral Link</p>
              <div className="flex items-center gap-2">
                <code className="flex-grow text-sm bg-muted px-3 py-2 rounded-lg truncate">
                  {referralLink}
                </code>
                <Button
                  size="sm"
                  variant={copied ? "default" : "outline"}
                  onClick={copyToClipboard}
                  className="shrink-0"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-1 py-4 h-auto"
                onClick={shareOnTwitter}
              >
                <Twitter className="w-5 h-5" />
                <span className="text-xs">Twitter</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-1 py-4 h-auto"
                onClick={shareOnLinkedIn}
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-xs">LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-1 py-4 h-auto"
                onClick={shareViaEmail}
              >
                <Mail className="w-5 h-5" />
                <span className="text-xs">Email</span>
              </Button>
            </div>
          </div>

          {/* Rewards Preview */}
          <div className="text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              <Gift className="w-4 h-4 text-accent" />
              <span>Refer 5 friends = <strong className="text-foreground">Free first week</strong></span>
            </p>
          </div>

          {/* Current Position */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              You're currently <strong className="text-primary">#{memberNumber}</strong> in line
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {spotsAhead} people ahead of you • Share to move up!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
