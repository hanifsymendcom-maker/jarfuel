import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Share2, Check, Mail } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// UTM-based headline configurations
const headlineConfig: Record<string, { headline: string; subtext: string }> = {
  "busy-mom": {
    headline: "The Breakfast Hack for Busy Moms",
    subtext: "21g protein, zero prep, ready when your kids finally let you eat.",
  },
  "gym-bro": {
    headline: "21g Protein. Zero Prep. Gym Fuel.",
    subtext: "Skip the shake. Grab a jar. Hit your macros before you hit the gym.",
  },
  "wfh": {
    headline: "Your WFH Morning Just Got Easier",
    subtext: "From bed to desk in minutes. 21g protein, 245 cal, zero kitchen time.",
  },
  "9to5": {
    headline: "Commute-Proof Breakfast",
    subtext: "Grab it. Eat it anywhere. 21g protein to fuel your workday.",
  },
  "fitness": {
    headline: "Clean Protein. Zero Effort.",
    subtext: "245 calories, 21g protein, delivered fresh. Your macros, handled.",
  },
  "tiktok": {
    headline: "That $5 Breakfast Jar Everyone's Talking About",
    subtext: "21g protein, 245 cal, delivered fresh. Join 147+ people who ditched meal prep.",
  },
  "instagram": {
    headline: "The Breakfast That Broke Instagram",
    subtext: "Aesthetically delicious. Nutritionally perfect. $5/day delivered.",
  },
  default: {
    headline: "Breakfast That Actually Works for Busy People",
    subtext: "21g protein, 245 calories, delivered fresh to your door for just $5/day. The grab-and-go breakfast jar that fuels your morning without the prep.",
  },
};

function getUTMContent(): string {
  if (typeof window === "undefined") return "default";
  const params = new URLSearchParams(window.location.search);
  return params.get("utm_content") || params.get("ref") || "default";
}

export default function Hero() {
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(147);
  const [submitted, setSubmitted] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [utmContent, setUtmContent] = useState("default");
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setUtmContent(getUTMContent());
    trackEvent("hero_view", { utm_content: getUTMContent() });
  }, []);

  const content = headlineConfig[utmContent] || headlineConfig.default;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setCount((prev) => prev + 1);
    setSubmitted(true);
    setShowShareOptions(true);
    toast.success("You're on the list! Welcome to the JarFuel family.");
    trackEvent("signup", { location: "hero", utm_content: utmContent });
    setEmail("");
  };

  const handleShare = async () => {
    const shareData = {
      title: "JarFuel - $5 Protein Breakfast",
      text: "Just signed up for $5/day protein breakfast jars 🔥 21g protein, zero prep!",
      url: window.location.origin + "?ref=share",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        trackEvent("share", { method: "native", location: "hero" });
        toast.success("Thanks for sharing!");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        trackEvent("share", { method: "clipboard", location: "hero" });
        toast.success("Link copied! Share it with friends.");
      }
    } catch {
      // User cancelled or error
    }
  };

  const handleGoogleSignup = () => {
    // Placeholder for Google OAuth - show toast for now
    toast.info("Google signup coming soon! Use email for now.");
    trackEvent("signup_attempt", { method: "google", location: "hero" });
  };

  return (
    <section
      id="waitlist"
      className="relative min-h-screen flex items-center pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-gradient-to-br from-background to-green-50"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[80%] h-[150%] rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Mobile Product Image - NOW VISIBLE! */}
        <div className="lg:hidden flex justify-center mb-8">
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
              {/* Video with image fallback */}
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/images/hero-jar.jpg"
                className={`w-full h-full object-cover ${videoLoaded ? "opacity-100" : "opacity-0"}`}
                onLoadedData={() => setVideoLoaded(true)}
              >
                <source src="/videos/hero-jar.mp4" type="video/mp4" />
              </video>
              {!videoLoaded && (
                <img
                  src="/images/hero-jar.jpg"
                  alt="JarFuel Breakfast Jar"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl -z-10" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-block bg-accent text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse-slow shadow-lg shadow-accent/20">
              🚀 Now Accepting Early Access Signups
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6 text-foreground">
              {content.headline.includes("Actually Works") ? (
                <>
                  Breakfast That <span className="text-primary">Actually Works</span> for Busy People
                </>
              ) : (
                <span className="text-primary">{content.headline}</span>
              )}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              {content.subtext}
            </p>

            <div className="flex flex-wrap gap-6 md:gap-8 mb-8 md:mb-10 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-primary">21g</div>
                <div className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  Protein
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-primary">245</div>
                <div className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  Calories
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-primary">$5</div>
                <div className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  Per Day
                </div>
              </div>
            </div>

            {!submitted ? (
              <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                {/* Email Form */}
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-full px-6 py-6 text-lg border-2 focus-visible:ring-primary flex-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-full px-6 md:px-8 py-6 text-lg font-bold shadow-xl shadow-accent/20 hover:shadow-accent/40 transition-all hover:-translate-y-1 bg-accent hover:bg-accent/90 text-white border-none whitespace-nowrap"
                  >
                    Get Early Access
                  </Button>
                </form>

                {/* One-tap signup options */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-sm text-muted-foreground">or sign up with</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <div className="flex gap-3 justify-center lg:justify-start">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full px-6 py-5 flex-1 sm:flex-none"
                    onClick={handleGoogleSignup}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full px-6 py-5 flex-1 sm:flex-none"
                    onClick={() => {
                      const input = document.querySelector('input[type="email"]') as HTMLInputElement;
                      input?.focus();
                    }}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            ) : (
              /* Post-signup share section */
              <div className="max-w-md mx-auto lg:mx-0 space-y-4">
                <div className="bg-green-100 border-2 border-green-300 rounded-2xl p-6 text-center">
                  <div className="flex items-center justify-center gap-2 text-green-700 font-bold text-lg mb-2">
                    <Check className="w-6 h-6" />
                    You're on the list!
                  </div>
                  <p className="text-green-600 text-sm mb-4">
                    Share with friends and you'll both get priority access
                  </p>
                  <Button
                    onClick={handleShare}
                    className="rounded-full px-8 py-5 font-bold bg-primary hover:bg-primary/90 text-white"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share & Get Priority Access
                  </Button>
                </div>
              </div>
            )}

            <p className="text-sm text-muted-foreground mt-6 text-center lg:text-left">
              🔥 <strong className="text-primary">{count}</strong> people already signed up.{" "}
              <strong>{250 - count} spots</strong> left for launch pricing!
            </p>
          </div>

          {/* Desktop Product Image/Video */}
          <div className="relative hidden lg:block h-[600px] w-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[400px] h-[500px] animate-float">
                {/* Main Jar Image/Video */}
                <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/50">
                  {/* Video with image fallback */}
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/images/hero-jar.jpg"
                    className={`w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
                    onLoadedData={() => setVideoLoaded(true)}
                  >
                    <source src="/videos/hero-jar.mp4" type="video/mp4" />
                  </video>
                  {!videoLoaded && (
                    <img
                      src="/images/hero-jar.jpg"
                      alt="JarFuel Breakfast Jar"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}

                  {/* Floating Label Card */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl w-[80%] text-center border border-white/50">
                    <h3 className="text-xl font-bold text-primary mb-1">JarFuel</h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Protein Coffee & Chia Pudding
                    </p>
                  </div>
                </div>

                {/* Decorative elements around jar */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
