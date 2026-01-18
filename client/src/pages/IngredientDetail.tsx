import { Link, useParams } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Sparkles,
  Dumbbell,
  Leaf,
  Heart,
  Brain,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ingredients,
  synergyEffects,
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

export default function IngredientDetail() {
  const { id } = useParams<{ id: string }>();
  const ingredient = ingredients.find((i) => i.id === id);

  if (!ingredient) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Ingredient Not Found</h1>
          <Link href="/science">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Science
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Find related synergies
  const relatedSynergies = synergyEffects.filter((s) =>
    s.ingredients.includes(ingredient.id)
  );

  // Find related ingredients
  const relatedIngredientIds = ingredient.synergies.filter(
    (id) => id !== ingredient.id
  );
  const relatedIngredients = relatedIngredientIds
    .map((id) => ingredients.find((i) => i.id === id))
    .filter(Boolean) as Ingredient[];

  // Get current index for navigation
  const currentIndex = ingredients.findIndex((i) => i.id === id);
  const prevIngredient = ingredients[currentIndex - 1];
  const nextIngredient = ingredients[currentIndex + 1];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section
        className={`pt-32 pb-16 bg-gradient-to-br ${categoryColors[ingredient.category]}`}
      >
        <div className="container mx-auto">
          <Link href="/science">
            <button className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Science</span>
            </button>
          </Link>

          <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-4">
            {categoryIcons[ingredient.category]}
            <span>{categoryLabels[ingredient.category]}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            {ingredient.name}
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl">
            {ingredient.tagline}
          </p>

          {/* Hero stat */}
          <div className="inline-flex items-baseline gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4">
            <span className="text-5xl font-extrabold text-white">
              {ingredient.heroStat.value}
            </span>
            <span className="text-white/80 font-medium">
              {ingredient.heroStat.label}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Overview
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {ingredient.overview}
                </p>
              </section>

              {/* Research Highlight */}
              {ingredient.researchHighlight && (
                <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border border-border/30">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-4">
                    <BookOpen className="w-4 h-4" />
                    Research Highlight
                  </div>
                  <blockquote className="text-lg text-foreground font-medium italic mb-4">
                    "{ingredient.researchHighlight.finding}"
                  </blockquote>
                  <cite className="text-sm text-muted-foreground not-italic">
                    — {ingredient.researchHighlight.source},{" "}
                    {ingredient.researchHighlight.year}
                  </cite>
                </section>
              )}

              {/* Benefits */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Key Benefits
                </h2>
                <div className="space-y-6">
                  {ingredient.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 border border-border/30 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-2">
                            {benefit.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {benefit.description}
                          </p>
                          {benefit.citation && (
                            <p className="text-xs text-primary mt-2 flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              {benefit.citation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Related Synergies */}
              {relatedSynergies.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Synergy Effects
                  </h2>
                  <div className="space-y-6">
                    {relatedSynergies.map((synergy) => (
                      <div
                        key={synergy.id}
                        className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-2xl p-6 border border-border/30"
                      >
                        <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-wider mb-3">
                          <Sparkles className="w-4 h-4" />
                          Synergy
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">
                          {synergy.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {synergy.description}
                        </p>
                        <div className="bg-white/50 rounded-xl p-4">
                          <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                            Mechanism
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {synergy.mechanism}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Nutrition Facts */}
              {ingredient.nutritionPer100g && (
                <div className="bg-white rounded-3xl p-6 border border-border/30 sticky top-24">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Nutrition per 100g
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(ingredient.nutritionPer100g).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center py-2 border-b border-border/30 last:border-0"
                        >
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-semibold text-foreground">
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Related Ingredients */}
              {relatedIngredients.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-border/30">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Works Well With
                  </h3>
                  <div className="space-y-3">
                    {relatedIngredients.map((related) => (
                      <Link key={related.id} href={`/science/${related.id}`}>
                        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 cursor-pointer transition-colors group">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryColors[related.category]} flex items-center justify-center text-white`}
                          >
                            {categoryIcons[related.category]}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-foreground">
                              {related.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {categoryLabels[related.category]}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-16 pt-8 border-t border-border/30">
            {prevIngredient ? (
              <Link href={`/science/${prevIngredient.id}`}>
                <button className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <div className="text-xs uppercase tracking-wider">
                      Previous
                    </div>
                    <div className="font-semibold">{prevIngredient.name}</div>
                  </div>
                </button>
              </Link>
            ) : (
              <div />
            )}

            {nextIngredient ? (
              <Link href={`/science/${nextIngredient.id}`}>
                <button className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-wider">Next</div>
                    <div className="font-semibold">{nextIngredient.name}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience {ingredient.name} in JarFuel
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join the waitlist and be among the first to try our scientifically
            formulated breakfast jar.
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
