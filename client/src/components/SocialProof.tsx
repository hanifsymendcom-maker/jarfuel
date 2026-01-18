import { useEffect, useState } from "react";
import { Star, Shield, Truck, Leaf } from "lucide-react";

interface SocialProofProps {
  currentCount?: number;
  targetCount?: number;
}

export default function SocialProof({ currentCount = 147, targetCount = 250 }: SocialProofProps) {
  const [animatedCount, setAnimatedCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const duration = 2000;
    const steps = 60;
    const increment = currentCount / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= currentCount) {
        setAnimatedCount(currentCount);
        clearInterval(timer);
      } else {
        setAnimatedCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [currentCount]);

  const percentFilled = (currentCount / targetCount) * 100;

  const trustBadges = [
    { icon: <Shield className="w-5 h-5" />, label: "100% Money Back" },
    { icon: <Truck className="w-5 h-5" />, label: "Free Delivery" },
    { icon: <Leaf className="w-5 h-5" />, label: "All Natural" },
    { icon: <Star className="w-5 h-5" />, label: "5-Star Rated" },
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-y border-border/30">
      <div className="container mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Waitlist Counter */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-border/50">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-primary">{animatedCount}</span>
                  <span className="text-muted-foreground font-medium">people on the waitlist</span>
                </div>
                <div className="text-sm text-accent font-semibold">
                  Only {targetCount - currentCount} founding member spots left!
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner border border-border/30">
              <div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentFilled}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>0</span>
              <span className="font-semibold text-primary">
                {Math.round(percentFilled)}% to launch
              </span>
              <span>{targetCount}</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary border border-border/30">
                  {badge.icon}
                </div>
                <span className="font-medium text-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
