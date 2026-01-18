import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Users, Share2, CheckCircle2, ArrowRight } from "lucide-react";

export default function Challenge() {
  const challengeDays = [
    {
      day: 1,
      title: "Rise & Fuel",
      task: "Replace your usual breakfast with JarFuel. Notice your energy at 10am.",
      sharePrompt: "Day 1 of #JarFuel5Day - replacing my [old breakfast] with actual nutrition"
    },
    {
      day: 2,
      title: "Track the Difference",
      task: "Log how you feel mid-morning. No crash? That's the protein working.",
      sharePrompt: "Day 2: No 10am crash for the first time in months #JarFuel5Day"
    },
    {
      day: 3,
      title: "Hump Day Hustle",
      task: "Time your morning routine. How much time did JarFuel save you?",
      sharePrompt: "Day 3: Saved [X] minutes this morning. That's [X] hours/year #JarFuel5Day"
    },
    {
      day: 4,
      title: "Share Your Stack",
      task: "Post your JarFuel setup. Morning view, desk setup, or on-the-go.",
      sharePrompt: "Day 4: My morning setup is now complete #JarFuel5Day @JarFuel"
    },
    {
      day: 5,
      title: "The Verdict",
      task: "Compare your week to last week. Energy, focus, time saved.",
      sharePrompt: "Day 5: Final verdict on #JarFuel5Day - [your honest review]"
    }
  ];

  const rewards = [
    { threshold: "Complete all 5 days", reward: "JarFuel Challenge Badge", icon: Trophy },
    { threshold: "Share 3+ posts", reward: "Free week of JarFuel", icon: Share2 },
    { threshold: "Refer 3 friends", reward: "Founding Member status", icon: Users }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary/80 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Trophy className="w-4 h-4" />
            Limited Time Challenge
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The JarFuel 5-Day Challenge
          </h2>
          <p className="text-xl text-white/80">
            Transform your mornings in just 5 days. Share your journey. Win rewards.
          </p>
        </div>

        {/* Challenge Timeline */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid gap-4">
            {challengeDays.map((day, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center font-extrabold text-lg shrink-0 group-hover:scale-110 transition-transform">
                    {day.day}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-lg">{day.title}</h4>
                      <Calendar className="w-4 h-4 text-white/50" />
                    </div>
                    <p className="text-white/80 mb-3">{day.task}</p>
                    <div className="bg-white/10 rounded-xl p-3 text-sm text-white/70 italic">
                      Share: "{day.sharePrompt}"
                    </div>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-white/30 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Challenge Rewards</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {rewards.map((reward, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-2xl flex items-center justify-center">
                  <reward.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm text-white/70 mb-2">{reward.threshold}</p>
                <p className="font-bold">{reward.reward}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="rounded-full px-10 py-7 text-lg font-bold bg-accent hover:bg-accent/90 text-white shadow-xl shadow-accent/30 hover:shadow-accent/50 transition-all hover:-translate-y-1"
          >
            Join the Challenge
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-white/60 text-sm mt-4">
            Next challenge starts Monday • 847 people joined
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-white/80">#JarFuel5Day</span>
            <span className="text-white/50">•</span>
            <span className="text-white/80">#MorningChallenge</span>
            <span className="text-white/50">•</span>
            <span className="text-white/80">#BreakfastHack</span>
          </div>
        </div>
      </div>
    </section>
  );
}
