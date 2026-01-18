import { Shield, Award, Leaf, FlaskConical, BadgeCheck } from "lucide-react";

export default function Nutrition() {
  const stats = [
    { value: "21g", label: "Protein" },
    { value: "245", label: "Calories" },
    { value: "5g", label: "Fiber" },
    { value: "<2g", label: "Sugar" },
    { value: "2.4g", label: "Omega-3" },
    { value: "65mg", label: "Caffeine" }
  ];

  const certifications = [
    { icon: Shield, label: "GMP Certified", description: "Made in certified facilities" },
    { icon: FlaskConical, label: "Lab Tested", description: "Third-party verified" },
    { icon: Leaf, label: "Non-GMO", description: "Clean ingredients" },
    { icon: Award, label: "NSF Certified", description: "Sport approved" }
  ];

  const dietaryBadges = [
    "Gluten-Free",
    "Keto-Friendly",
    "No Added Sugar",
    "Soy-Free",
    "Low Glycemic"
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">What's Inside Every Jar</h2>
          <p className="text-xl text-primary-foreground/80">
            Clean ingredients, maximum nutrition, no artificial anything.
          </p>
        </div>

        {/* Dietary Compatibility Badges - Recommendation #3 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {dietaryBadges.map((badge, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-white border border-white/30 flex items-center gap-2"
            >
              <BadgeCheck className="w-4 h-4" />
              {badge}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:bg-white/20 transition-colors"
            >
              <div className="text-4xl lg:text-3xl xl:text-4xl font-extrabold mb-2 text-white">{stat.value}</div>
              <div className="text-sm font-bold uppercase tracking-wider text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Third-Party Certifications - Recommendation #1 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-16 border border-white/10">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">Trusted & Verified</h3>
            <p className="text-primary-foreground/70 text-sm">Every batch tested. Every claim validated.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <cert.icon className="w-8 h-8 text-white" />
                </div>
                <div className="font-bold text-white text-sm">{cert.label}</div>
                <div className="text-xs text-primary-foreground/60">{cert.description}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="text-sm text-white/80 underline underline-offset-4 hover:text-white transition-colors">
              View Lab Results →
            </button>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="/images/ingredients-flatlay.jpg"
            alt="Healthy Ingredients Flatlay"
            className="w-full h-64 md:h-80 object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
          />
        </div>
      </div>
    </section>
  );
}
