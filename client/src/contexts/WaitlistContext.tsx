import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { WaitlistEntry } from "@/lib/database.types";
import {
  joinWaitlist,
  getWaitlistCount,
  getCurrentUser,
  subscribeToWaitlist,
  getReferralFromUrl,
  getReferralUrl,
} from "@/lib/waitlist";

interface WaitlistContextType {
  count: number;
  currentUser: WaitlistEntry | null;
  isLoading: boolean;
  error: string | null;
  referralCode: string | null;
  join: (email: string, source?: string) => Promise<boolean>;
  getReferralLink: () => string;
  refreshCount: () => Promise<void>;
}

const WaitlistContext = createContext<WaitlistContextType | null>(null);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  // Minimum display count for social proof (never show less than this)
  const MIN_DISPLAY_COUNT = 147;

  const [count, setCount] = useState(MIN_DISPLAY_COUNT);
  const [currentUser, setCurrentUser] = useState<WaitlistEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [referralFromUrl, setReferralFromUrl] = useState<string | null>(null);

  // Initialize
  useEffect(() => {
    const init = async () => {
      try {
        // Get referral code from URL
        const refCode = getReferralFromUrl();
        if (refCode) {
          setReferralFromUrl(refCode);
        }

        // Get current user from local storage
        const user = getCurrentUser();
        if (user) {
          setCurrentUser(user);
        }

        // Get initial count (always show at least MIN_DISPLAY_COUNT)
        const initialCount = await getWaitlistCount();
        setCount(Math.max(initialCount, MIN_DISPLAY_COUNT));
      } catch (err) {
        console.error("Error initializing waitlist:", err);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToWaitlist((newCount) => {
      setCount(Math.max(newCount, MIN_DISPLAY_COUNT));
    });

    return unsubscribe;
  }, []);

  const refreshCount = useCallback(async () => {
    const newCount = await getWaitlistCount();
    setCount(Math.max(newCount, MIN_DISPLAY_COUNT));
  }, []);

  const join = useCallback(
    async (email: string, source?: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await joinWaitlist(
          email,
          referralFromUrl,
          source || "website"
        );

        if (result.success && result.data) {
          setCurrentUser(result.data);
          await refreshCount();
          return true;
        } else {
          setError(result.error || "Failed to join waitlist");
          return false;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [referralFromUrl, refreshCount]
  );

  const getReferralLink = useCallback((): string => {
    if (currentUser?.referral_code) {
      return getReferralUrl(currentUser.referral_code);
    }
    return "";
  }, [currentUser]);

  return (
    <WaitlistContext.Provider
      value={{
        count,
        currentUser,
        isLoading,
        error,
        referralCode: referralFromUrl,
        join,
        getReferralLink,
        refreshCount,
      }}
    >
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error("useWaitlist must be used within a WaitlistProvider");
  }
  return context;
}
