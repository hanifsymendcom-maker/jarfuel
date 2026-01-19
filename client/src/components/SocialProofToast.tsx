import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Sample data for social proof notifications
const signupNotifications = [
  { name: "Sarah", city: "Austin", time: "2 min ago" },
  { name: "Mike", city: "NYC", time: "5 min ago" },
  { name: "Jessica", city: "LA", time: "8 min ago" },
  { name: "David", city: "Chicago", time: "12 min ago" },
  { name: "Emma", city: "Seattle", time: "15 min ago" },
  { name: "James", city: "Denver", time: "18 min ago" },
  { name: "Olivia", city: "Miami", time: "22 min ago" },
  { name: "Noah", city: "Boston", time: "25 min ago" },
  { name: "Sophia", city: "Portland", time: "28 min ago" },
  { name: "Liam", city: "Phoenix", time: "32 min ago" },
  { name: "Ava", city: "San Diego", time: "35 min ago" },
  { name: "William", city: "Dallas", time: "38 min ago" },
];

interface Notification {
  name: string;
  city: string;
  time: string;
}

interface SocialProofToastProps {
  enabled?: boolean;
  intervalMs?: number;
  initialDelayMs?: number;
}

export default function SocialProofToast({
  enabled = true,
  intervalMs = 15000,
  initialDelayMs = 8000,
}: SocialProofToastProps) {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [notificationIndex, setNotificationIndex] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    // Show first notification after initial delay
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, initialDelayMs);

    return () => clearTimeout(initialTimeout);
  }, [enabled, initialDelayMs]);

  useEffect(() => {
    if (!enabled || !currentNotification) return;

    // Set up interval for subsequent notifications
    const interval = setInterval(() => {
      showNotification();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [enabled, currentNotification, intervalMs]);

  const showNotification = () => {
    // Get next notification
    const notification = signupNotifications[notificationIndex % signupNotifications.length];
    setCurrentNotification(notification);
    setNotificationIndex((prev) => prev + 1);

    // Show notification
    setIsVisible(true);

    // Hide after 4 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  };

  if (!enabled || !currentNotification) return null;

  return (
    <div
      className={cn(
        "fixed bottom-20 lg:bottom-6 left-4 z-40",
        "transform transition-all duration-500 ease-out",
        isVisible
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0 pointer-events-none"
      )}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-border/50 p-4 max-w-[280px]">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {currentNotification.name[0]}
          </div>

          {/* Content */}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {currentNotification.name} from {currentNotification.city}
            </p>
            <p className="text-xs text-muted-foreground">
              just joined the waitlist
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              {currentNotification.time}
            </p>
          </div>

          {/* Verified badge */}
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
