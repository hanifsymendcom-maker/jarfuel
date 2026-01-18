import { Star, Instagram, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Jessica M.",
      role: "Marketing Director",
      location: "Austin, TX",
      image: "JM",
      rating: 5,
      text: "I've tried every breakfast hack out there. Soylent made me feel like a robot. Meal prep took my entire Sunday. JarFuel is the first thing that actually fits my life. 21g of protein in 30 seconds? Yes please.",
      highlight: "Actually fits my life"
    },
    {
      name: "David K.",
      role: "Software Engineer",
      location: "Seattle, WA",
      image: "DK",
      rating: 5,
      text: "As someone who tracks macros religiously, JarFuel is a dream. Perfect protein-to-calorie ratio, clean ingredients I can actually pronounce, and I'm not starving by 10am anymore.",
      highlight: "Perfect protein-to-calorie ratio"
    },
    {
      name: "Sarah L.",
      role: "Startup Founder",
      location: "San Francisco, CA",
      image: "SL",
      rating: 5,
      text: "I was spending $12/day at Starbucks for something with half the protein and twice the sugar. JarFuel costs less, tastes better, and I have more energy for my 6am calls.",
      highlight: "More energy for 6am calls"
    },
    {
      name: "Marcus T.",
      role: "Fitness Coach",
      location: "Denver, CO",
      image: "MT",
      rating: 5,
      text: "I recommend JarFuel to all my clients who struggle with morning nutrition. The collagen and omega-3s are bonuses most people overlook. This is what functional food should be.",
      highlight: "What functional food should be"
    }
  ];

  const instagramPosts = [
    { handle: "@fitfounder_jess", caption: "My new morning essential arrived" },
    { handle: "@healthydevlife", caption: "When your breakfast has better macros than lunch" },
    { handle: "@morninggrind.co", caption: "JarFuel > sad desk breakfast" },
    { handle: "@wellnesswarrior", caption: "Found my new pre-workout breakfast" }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Star className="w-4 h-4 fill-current" />
            Beta Tester Reviews
          </div>
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            What Early Testers Are Saying
          </h2>
          <p className="text-xl text-muted-foreground">
            Real feedback from our beta testing program
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-3xl p-8 border border-border/50 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">
                "{testimonial.text}"
              </p>

              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                "{testimonial.highlight}"
              </div>
            </div>
          ))}
        </div>

        {/* Instagram-style Social Proof */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Instagram className="w-4 h-4" />
              Join the Community
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Tag us @JarFuel for a chance to be featured
            </h3>
            <p className="text-white/80">
              Featured founders get a free month of JarFuel
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramPosts.map((post, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-xl flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
                <p className="font-bold text-white text-sm">{post.handle}</p>
                <p className="text-xs text-white/70 mt-1">"{post.caption}"</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-white/80 text-sm">
              #JarFuel #BreakfastHack #MorningFuel #ProteinBreakfast
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
