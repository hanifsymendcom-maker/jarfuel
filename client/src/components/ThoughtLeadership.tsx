import { Link } from "wouter";
import {
  ArrowRight,
  Microscope,
  Sparkles,
  BookOpen,
  Beaker,
  Heart,
  Brain,
  Dumbbell,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ingredients, synergyEffects } from "@/lib/ingredientData";

const highlightedIngredients = ingredients.slice(0, 3);
const highlightedSynergy = synergyEffects[0];

export default function ThoughtLeadership() {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-bold text-primary border border-border/50 shadow-sm mb-6">
            <Microscope className="w-4 h-4" />
            Science-Led Nutrition
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6">
            Every Ingredient, <span className="text-primary">Research-Backed</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            JarFuel isn't guesswork. It's a carefully formulated combination of
            six functional ingredients, each selected for their proven benefits
            and how they amplify each other.
          </p>
        </div>

        {/* Ingredient Preview Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {highlightedIngredients.map((ingredient) => {
            const categoryColors: Record<string, string> = {
              protein: "from-blue-500 to-indigo-600",
              fiber: "from-green-500 to-emerald-600",
              omega3: "from-amber-500 to-orange-600",
              functional: "from-purple-500 to-violet-600",
            };
            const categoryIcons: Record<string, React.ReactNode> = {
              protein: <Dumbbell className="w-5 h-5" />,
              fiber: <Leaf className="w-5 h-5" />,
              omega3: <Heart className="w-5 h-5" />,
              functional: <Brain className="w-5 h-5" />,
            };

            return (
              <Link key={ingredient.id} href={`/science/${ingredient.id}`}>
                <div className="group bg-white rounded-3xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                  <div
                    className={`bg-gradient-to-br ${categoryColors[ingredient.category]} p-6 text-white`}
                  >
                    <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-2">
                      {categoryIcons[ingredient.category]}
                    </div>
                    <h3 className="text-xl font-bold">{ingredient.name}</h3>
                    <p className="text-white/80 text-sm">{ingredient.tagline}</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-extrabold text-primary">
                        {ingredient.heroStat.value}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {ingredient.heroStat.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {ingredient.benefits[0].description}
                    </p>
                    <div className="flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Synergy Highlight */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 border border-border/30 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4" />
                Featured Synergy
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {highlightedSynergy.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {highlightedSynergy.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {highlightedSynergy.ingredients.map((id) => {
                  const ing = ingredients.find((i) => i.id === id);
                  return ing ? (
                    <span
                      key={id}
                      className="bg-white px-4 py-2 rounded-full text-sm font-medium border border-border/50 shadow-sm"
                    >
                      {ing.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border/30 shadow-lg">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-3">
                <Beaker className="w-4 h-4" />
                How It Works
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {highlightedSynergy.mechanism}
              </p>
              {highlightedSynergy.citation && (
                <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border/30 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {highlightedSynergy.citation}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/science">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <Microscope className="w-5 h-5 mr-2" />
              Explore All Ingredients
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Deep dive into the peer-reviewed research behind JarFuel
          </p>
        </div>
      </div>
    </section>
  );
}
