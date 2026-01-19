import { Star, Quote, Play } from "lucide-react";

// Testimonial data - would come from CMS/API in production
const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Working Mom",
    location: "Austin, TX",
    avatar: "S",
    rating: 5,
    quote: "Game changer for my mornings! I used to skip breakfast or grab something unhealthy. Now I just grab my jar and go.",
    highlight: "Game changer",
    platform: "tiktok" as const,
  },
  {
    id: 2,
    name: "Mike R.",
    role: "Software Engineer",
    location: "San Francisco, CA",
    avatar: "M",
    rating: 5,
    quote: "Finally hit my protein goals without spending 20 min making breakfast. The coffee flavor is incredible.",
    highlight: "hit my protein goals",
    platform: "instagram" as const,
  },
  {
    id: 3,
    name: "Jessica L.",
    role: "Fitness Coach",
    location: "NYC",
    avatar: "J",
    rating: 5,
    quote: "I recommend JarFuel to all my clients. Clean ingredients, perfect macros, and it actually tastes good.",
    highlight: "recommend to all my clients",
    platform: "tiktok" as const,
  },
];

const stats = [
  { value: "4.9", label: "Average Rating", icon: Star },
  { value: "147+", label: "Early Adopters", icon: null },
  { value: "50K+", label: "TikTok Views", icon: Play },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

function PlatformBadge({ platform }: { platform: "tiktok" | "instagram" }) {
  if (platform === "tiktok") {
    return (
      <div className="inline-flex items-center gap-1 px-2 py-1 bg-black text-white rounded-full text-xs font-medium">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
        TikTok
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-medium">
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
      Instagram
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-primary" />
            What Early Adopters Are Saying
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real People, Real Results
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of busy professionals who've already transformed their mornings
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                {stat.icon && <stat.icon className="w-5 h-5 text-accent fill-accent" />}
                <span className="text-3xl md:text-4xl font-extrabold text-primary">
                  {stat.value}
                </span>
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <PlatformBadge platform={testimonial.platform} />
              </div>

              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="absolute -top-2 -left-1 w-6 h-6 text-primary/20" />
                <p className="text-muted-foreground pl-4 leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Location */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-2">
            Want to be featured? Join the waitlist and share your experience!
          </p>
          <a
            href="#waitlist"
            className="text-primary font-semibold hover:underline"
          >
            Get Early Access →
          </a>
        </div>
      </div>
    </section>
  );
}
