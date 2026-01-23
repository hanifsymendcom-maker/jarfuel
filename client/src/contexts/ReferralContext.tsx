import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { nanoid } from "nanoid";

interface ReferralStats {
  referralCode: string;
  referredBy: string | null;
  signups: number;
  freeWeeksEarned: number;
  shareCount: number;
}

interface ReferralContextType {
  stats: ReferralStats | null;
  isSignedUp: boolean;
  email: string | null;
  generateReferralCode: (email: string) => void;
  trackShare: () => void;
  trackSignup: () => void;
  getReferralLink: () => string;
  checkReferralCode: () => string | null;
}

const ReferralContext = createContext<ReferralContextType | null>(null);

const STORAGE_KEY = "jarfuel_referral";
const REF_PARAM = "ref";

export function ReferralProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setStats(data.stats);
        setIsSignedUp(data.isSignedUp);
        setEmail(data.email);
      } catch (e) {
        console.error("Failed to parse referral data:", e);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (stats || isSignedUp) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ stats, isSignedUp, email })
      );
    }
  }, [stats, isSignedUp, email]);

  // Check URL for referral code on mount
  const checkReferralCode = (): string | null => {
    const params = new URLSearchParams(window.location.search);
    return params.get(REF_PARAM);
  };

  // Generate a unique referral code when user signs up
  const generateReferralCode = (userEmail: string) => {
    const referredBy = checkReferralCode();
    const referralCode = nanoid(8);

    const newStats: ReferralStats = {
      referralCode,
      referredBy,
      signups: 0,
      freeWeeksEarned: 0,
      shareCount: 0,
    };

    setStats(newStats);
    setIsSignedUp(true);
    setEmail(userEmail);

    // If referred by someone, we'd normally update their stats via API
    // For now, we'll track it locally for demonstration
    if (referredBy) {
      // In a real implementation, this would be an API call to credit the referrer
      console.log(`New signup referred by: ${referredBy}`);
    }
  };

  // Track when user shares their link
  const trackShare = () => {
    if (stats) {
      setStats({
        ...stats,
        shareCount: stats.shareCount + 1,
      });
    }
  };

  // Simulate tracking a successful referral signup
  const trackSignup = () => {
    if (stats) {
      const newSignups = stats.signups + 1;
      setStats({
        ...stats,
        signups: newSignups,
        freeWeeksEarned: newSignups, // 1 week per signup
      });
    }
  };

  // Get the full referral link
  const getReferralLink = (): string => {
    if (!stats?.referralCode) return window.location.origin;
    return `${window.location.origin}?ref=${stats.referralCode}`;
  };

  return (
    <ReferralContext.Provider
      value={{
        stats,
        isSignedUp,
        email,
        generateReferralCode,
        trackShare,
        trackSignup,
        getReferralLink,
        checkReferralCode,
      }}
    >
      {children}
    </ReferralContext.Provider>
  );
}

export function useReferral() {
  const context = useContext(ReferralContext);
  if (!context) {
    throw new Error("useReferral must be used within a ReferralProvider");
  }
  return context;
}
