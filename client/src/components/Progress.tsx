import { useEffect, useState } from "react";
import { useWaitlist } from "@/contexts/WaitlistContext";

export default function Progress() {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const { count, goal, progress, isLoading } = useWaitlist();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 500);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <section className="py-12 bg-white border-b border-border/40">
      <div className="container mx-auto max-w-2xl text-center">
        <p className="mb-3 font-bold text-lg text-foreground">
          Help us reach {goal} signups to launch! 🎯
        </p>

        <div className="h-8 w-full bg-secondary rounded-full overflow-hidden mb-3 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-2000 ease-out flex items-center justify-end pr-4 text-white font-bold text-sm shadow-lg"
            style={{ width: `${animatedProgress}%` }}
          >
            {animatedProgress > 10 && `${animatedProgress}%`}
          </div>
        </div>

        <div className="flex justify-between text-sm font-medium text-muted-foreground px-2">
          <span className={isLoading ? "animate-pulse" : ""}>
            {count} signed up
          </span>
          <span>Goal: {goal}</span>
        </div>
      </div>
    </section>
  );
}
