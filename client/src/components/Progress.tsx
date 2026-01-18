import { useEffect, useState } from "react";
import { Users, TrendingUp } from "lucide-react";

// Simulated recent signups for social proof
const recentSignups = [
  { name: "Sarah", location: "Austin, TX", time: "2 min ago" },
  { name: "Michael", location: "Denver, CO", time: "5 min ago" },
  { name: "Emily", location: "Seattle, WA", time: "12 min ago" },
  { name: "James", location: "Brooklyn, NY", time: "18 min ago" },
  { name: "Amanda", location: "San Francisco, CA", time: "24 min ago" }
];

export default function Progress() {
  const [progress, setProgress] = useState(0);
  const [currentSignup, setCurrentSignup] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const totalSpots = 250;
  const claimed = 147;
  const spotsLeft = totalSpots - claimed;
  const target = Math.round((claimed / totalSpots) * 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(target);
    }, 500);
    return () => clearTimeout(timer);
  }, [target]);

  // Rotate through recent signups for social proof
  useEffect(() => {
    const showNotificationTimer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);

    const rotateTimer = setInterval(() => {
      setShowNotification(false);
      setTimeout(() => {
        setCurrentSignup((prev) => (prev + 1) % recentSignups.length);
        setShowNotification(true);
      }, 500);
    }, 8000);

    return () => {
      clearTimeout(showNotificationTimer);
      clearInterval(rotateTimer);
    };
  }, []);

  return (
    <section className="py-12 bg-white border-b border-border/40 relative overflow-hidden">
      {/* Live signup notification - Recommendation #4 Social Proof */}
      <div
        className={`fixed bottom-6 left-6 z-50 bg-white rounded-2xl shadow-2xl p-4 border border-border/50 max-w-xs transition-all duration-500 ${
          showNotification ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-bold text-foreground text-sm">
              {recentSignups[currentSignup].name} from {recentSignups[currentSignup].location}
            </p>
            <p className="text-xs text-muted-foreground">
              just joined the waitlist • {recentSignups[currentSignup].time}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl">
        {/* Loss Aversion Framing - Recommendation #4 */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
            <TrendingUp className="w-4 h-4" />
            Filling Fast
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
            Only <span className="text-accent">{spotsLeft}</span> Founding Member Spots Left
          </h3>
          <p className="text-muted-foreground">
            First 250 get locked-in pricing forever. Don't miss out.
          </p>
        </div>

        <div className="h-10 w-full bg-secondary rounded-full overflow-hidden mb-4 shadow-inner relative">
          <div
            className="h-full bg-gradient-to-r from-primary via-primary to-accent transition-all duration-2000 ease-out flex items-center justify-end pr-4 text-white font-bold text-sm shadow-lg relative"
            style={{ width: `${progress}%` }}
          >
            <span className="absolute right-4">{claimed} claimed</span>
          </div>
          {/* Pulsing indicator at the edge */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full animate-pulse shadow-lg"
            style={{ left: `calc(${progress}% - 8px)` }}
          />
        </div>

        <div className="flex justify-between items-center text-sm px-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-medium text-foreground">
              <strong className="text-primary">{claimed}</strong> people joined
            </span>
          </div>
          <span className="font-bold text-accent">
            {spotsLeft} spots remaining
          </span>
        </div>

        {/* Recent activity ticker */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>
            <strong className="text-foreground">{recentSignups[currentSignup].name}</strong> from{" "}
            {recentSignups[currentSignup].location} joined {recentSignups[currentSignup].time}
          </span>
        </div>
      </div>
    </section>
  );
}
