export default function Nutrition() {
  const stats = [
    { value: "21g", label: "Protein" },
    { value: "245", label: "Calories" },
    { value: "5g", label: "Fiber" },
    { value: "<2g", label: "Sugar" },
    { value: "2.4g", label: "Omega-3" },
    { value: "65mg", label: "Caffeine" }
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">What's Inside Every Jar</h2>
          <p className="text-xl text-primary-foreground/80">
            Clean ingredients, maximum nutrition, no artificial anything.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
        
        <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="/images/ingredients-flatlay.jpg"
            alt="Healthy Ingredients Flatlay"
            className="w-full h-64 md:h-80 object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
