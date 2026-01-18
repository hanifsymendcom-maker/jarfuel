import { MapPin, Milk, Fish, Wheat } from "lucide-react";

export default function Sourcing() {
  const ingredients = [
    {
      icon: Milk,
      name: "Grass-Fed Whey",
      source: "New Zealand",
      description: "From pasture-raised cows, cold-processed to preserve nutrients",
      color: "bg-green-500"
    },
    {
      icon: Fish,
      name: "Marine Collagen",
      source: "Wild-Caught, North Atlantic",
      description: "Sustainably sourced from wild cod, not farmed fish",
      color: "bg-blue-500"
    },
    {
      icon: Wheat,
      name: "Organic Chia & Flax",
      source: "Bolivia & Canada",
      description: "Certified organic, non-GMO, direct from family farms",
      color: "bg-amber-500"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
            <MapPin className="w-4 h-4" />
            Sourced Right
          </div>
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            We Know Where Every Ingredient Comes From
          </h2>
          <p className="text-xl text-muted-foreground">
            Transparency isn't a buzzword for us. It's how we build trust.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {ingredients.map((item, index) => (
            <div
              key={index}
              className="bg-background rounded-3xl p-8 border border-border/50 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl group"
            >
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{item.name}</h3>
              <div className="flex items-center gap-2 text-primary font-medium text-sm mb-3">
                <MapPin className="w-4 h-4" />
                {item.source}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-secondary/30 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Our Supply Chain Promise
              </h3>
              <ul className="space-y-3">
                {[
                  "Direct relationships with farms & suppliers",
                  "No middlemen markup - savings passed to you",
                  "Full traceability from source to jar",
                  "Regular facility audits & quality checks"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <div className="inline-block bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-5xl font-extrabold text-primary mb-2">100%</div>
                <div className="text-sm font-medium text-muted-foreground">Ingredient Traceability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
