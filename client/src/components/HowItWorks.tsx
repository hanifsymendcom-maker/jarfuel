export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Subscribe",
      description: "Choose your 5-day weekday plan. Pause or cancel anytime."
    },
    {
      number: 2,
      title: "We Deliver",
      description: "Fresh jars delivered to your door Sunday night, ready for the week."
    },
    {
      number: 3,
      title: "Grab & Go",
      description: "Shake, open, enjoy. Return empty jars next week (we'll pick them up)."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">How It Works</h2>
          <p className="text-xl text-muted-foreground">
            Breakfast on autopilot.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative z-10">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-border -z-10" />
          
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="w-24 h-24 bg-accent text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-8 shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300 border-4 border-white">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 rounded-[3rem] overflow-hidden shadow-2xl max-w-5xl mx-auto">
          <img
            src="/images/lifestyle-grab.jpg"
            alt="Grab and Go Lifestyle"
            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
