import { Dumbbell, Flame, Zap, Fish, Sparkles, Rocket } from "lucide-react";

const benefits = [
  {
    icon: <Dumbbell className="w-8 h-8 text-white" />,
    title: "21g Complete Protein",
    description: "Whey protein + collagen blend for muscle support and skin/hair/nail benefits. More protein than 3 eggs."
  },
  {
    icon: <Flame className="w-8 h-8 text-white" />,
    title: "Only 245 Calories",
    description: "Low-cal but high-satiety. Chia + flax fiber keeps you full until lunch without the carb crash."
  },
  {
    icon: <Zap className="w-8 h-8 text-white" />,
    title: "Clean Caffeine",
    description: "~65mg caffeine from real coffee. Enough to wake up, not enough to get jittery."
  },
  {
    icon: <Fish className="w-8 h-8 text-white" />,
    title: "Omega-3 Packed",
    description: "2,400mg of plant-based omega-3s from ground flaxseed. Heart and brain fuel."
  },
  {
    icon: <Sparkles className="w-8 h-8 text-white" />,
    title: "Collagen Boost",
    description: "9g of collagen peptides for skin elasticity, joint support, and gut health."
  },
  {
    icon: <Rocket className="w-8 h-8 text-white" />,
    title: "Zero Prep",
    description: "Delivered fresh weekly. Grab from the fridge, shake, and go. 30 seconds max."
  }
];

export default function Benefits() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Why JarFuel?</h2>
          <p className="text-xl text-muted-foreground">
            We solved the morning protein problem that every busy professional faces.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-background p-8 rounded-[2rem] border border-border/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
