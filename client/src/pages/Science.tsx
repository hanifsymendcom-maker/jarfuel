import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Microscope,
  Beaker,
  Moon,
  BookOpen,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Brain,
  Heart,
  Dumbbell,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ingredients,
  synergyEffects,
  overnightSoakingBenefits,
  type Ingredient,
} from "@/lib/ingredientData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categoryIcons: Record<string, React.ReactNode> = {
  protein: <Dumbbell className="w-5 h-5" />,
  fiber: <Leaf className="w-5 h-5" />,
  omega3: <Heart className="w-5 h-5" />,
  functional: <Brain className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  protein: "from-blue-500 to-indigo-600",
  fiber: "from-green-500 to-emerald-600",
  omega3: "from-amber-500 to-orange-600",
  functional: "from-purple-500 to-violet-600",
};

const categoryLabels: Record<string, string> = {
  protein: "Protein",
  fiber: "Fiber & Prebiotics",
  omega3: "Omega-3s",
  functional: "Functional",
};

function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  return (
    <Link href={`/science/${ingredient.id}`}>
      <div className="group bg-white rounded-3xl border border-border/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        {/* Header with gradient */}
        <div
          className={`bg-gradient-to-br ${categoryColors[ingredient.category]} p-6 text-white`}
        >
          <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-3">
            {categoryIcons[ingredient.category]}
            <span>{categoryLabels[ingredient.category]}</span>
          </div>
          <h3 className="text-2xl font-bold mb-1">{ingredient.name}</h3>
          <p className="text-white/80 text-sm">{ingredient.tagline}</p>
        </div>

        {/* Hero stat */}
        <div className="p-6 border-b border-border/30">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-primary">
              {ingredient.heroStat.value}
            </span>
            <span className="text-muted-foreground font-medium">
              {ingredient.heroStat.label}
            </span>
          </div>
        </div>

        {/* Benefits preview */}
        <div className="p-6">
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {ingredient.overview}
          </p>
          <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
            <span>Explore the science</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function SynergyCard({
  synergy,
}: {
  synergy: (typeof synergyEffects)[0];
}) {
  const relatedIngredients = synergy.ingredients
    .map((id) => ingredients.find((i) => i.id === id || id === "omega3"))
    .filter(Boolean);

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border border-border/30">
      <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-wider mb-4">
        <Sparkles className="w-4 h-4" />
        Synergy Effect
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-4">
        {synergy.title}
      </h3>
      <p className="text-muted-foreground mb-6">{synergy.description}</p>

      {/* Ingredients involved */}
      <div className="flex flex-wrap gap-2 mb-6">
        {relatedIngredients.map((ing) =>
          ing ? (
            <span
              key={ing.id}
              className="bg-white px-3 py-1 rounded-full text-sm font-medium border border-border/50"
            >
              {ing.name}
            </span>
          ) : null
        )}
      </div>

      {/* Mechanism */}
      <div className="bg-white/50 rounded-2xl p-4 border border-border/30">
        <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
          How It Works
        </div>
        <p className="text-sm text-muted-foreground">{synergy.mechanism}</p>
      </div>

      {synergy.citation && (
        <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
          <BookOpen className="w-3 h-3" />
          {synergy.citation}
        </p>
      )}
    </div>
  );
}

export default function Science() {
  const [activeTab, setActiveTab] = useState<
    "ingredients" | "synergies" | "process"
  >("ingredients");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-bold text-primary border border-border/50 shadow-sm mb-6">
            <Microscope className="w-4 h-4" />
            Science-Led Nutrition
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 max-w-4xl mx-auto leading-tight">
            The Research Behind{" "}
            <span className="text-primary">Every Ingredient</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            JarFuel isn't just another breakfast product. It's a carefully
            formulated combination of research-backed ingredients designed to
            work together for maximum benefit.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-border/50">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium">Peer-Reviewed Research</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-border/50">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm font-medium">Transparent Formulation</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-border/50">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-sm font-medium">Synergistic Design</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-border/30">
        <div className="container mx-auto">
          <div className="flex gap-1 p-2">
            {[
              { id: "ingredients", label: "Ingredients", icon: Beaker },
              { id: "synergies", label: "Synergy Science", icon: Sparkles },
              { id: "process", label: "Overnight Process", icon: Moon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <main className="py-16">
        <div className="container mx-auto">
          {/* Ingredients Tab */}
          {activeTab === "ingredients" && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Ingredient Deep Dives
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Click on any ingredient to explore the full research behind
                  its benefits, nutritional profile, and how it synergizes with
                  other JarFuel components.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ingredients.map((ingredient) => (
                  <IngredientCard key={ingredient.id} ingredient={ingredient} />
                ))}
              </div>
            </div>
          )}

          {/* Synergies Tab */}
          {activeTab === "synergies" && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  The Power of Combination
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  JarFuel's ingredients were chosen not just for their
                  individual benefits, but for how they amplify each other's
                  effects. Here's the science of synergy.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {synergyEffects.map((synergy) => (
                  <SynergyCard key={synergy.id} synergy={synergy} />
                ))}
              </div>
            </div>
          )}

          {/* Process Tab */}
          {activeTab === "process" && (
            <div>
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Moon className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {overnightSoakingBenefits.title}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {overnightSoakingBenefits.subtitle}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 mb-12 border border-border/30">
                  <p className="text-lg text-foreground leading-relaxed">
                    {overnightSoakingBenefits.introduction}
                  </p>
                </div>

                <div className="space-y-6">
                  {overnightSoakingBenefits.processes.map((process, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 border border-border/30 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                          <span className="text-xl font-bold text-primary">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {process.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {process.description}
                          </p>
                          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="font-semibold text-accent">
                              {process.impact}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Source: {overnightSoakingBenefits.citation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience the Science
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join the waitlist and be among the first to try JarFuel's
            scientifically optimized breakfast formula.
          </p>
          <Link href="/#waitlist">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-bold bg-white text-primary hover:bg-white/90 shadow-xl"
            >
              Join the Waitlist
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
