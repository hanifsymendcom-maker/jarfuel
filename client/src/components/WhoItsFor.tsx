import { Briefcase, Dumbbell, Baby, GraduationCap, Clock, Heart } from "lucide-react";

const personas = [
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Busy Professionals",
    description: "Back-to-back meetings start at 8am. No time for breakfast, but you need fuel to focus.",
    painPoint: "\"I skip breakfast or grab something unhealthy\"",
  },
  {
    icon: <Dumbbell className="w-8 h-8" />,
    title: "Fitness Enthusiasts",
    description: "You track your macros. You need protein. But cooking eggs at 6am isn't happening.",
    painPoint: "\"I can't hit my protein goals easily\"",
  },
  {
    icon: <Baby className="w-8 h-8" />,
    title: "Busy Parents",
    description: "Mornings are chaos. Kids need to be fed, dressed, and out the door. You come last.",
    painPoint: "\"I eat my kids' leftovers or nothing\"",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Students & Learners",
    description: "Late nights studying mean groggy mornings. Brain food is critical for focus.",
    painPoint: "\"I survive on coffee until lunch\"",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Early Commuters",
    description: "You're on the train by 7am. There's no time to sit down, let alone cook.",
    painPoint: "\"I eat on the go - usually junk\"",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Health-Conscious Eaters",
    description: "You care about what goes into your body. Clean ingredients matter.",
    painPoint: "\"Fast breakfast = processed garbage\"",
  },
];

export default function WhoItsFor() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Is JarFuel For You?</h2>
          <p className="text-xl text-muted-foreground">
            If any of these sound familiar, you're going to love this.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {personas.map((persona, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                {persona.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{persona.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {persona.description}
              </p>
              <div className="bg-muted/50 rounded-xl p-4 border-l-4 border-accent">
                <p className="text-sm italic text-muted-foreground">{persona.painPoint}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-block bg-primary/5 rounded-2xl p-8 max-w-2xl">
            <p className="text-xl font-semibold text-foreground mb-2">
              Sound like you? You're not alone.
            </p>
            <p className="text-muted-foreground">
              Join 147+ people who are done with the breakfast struggle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
