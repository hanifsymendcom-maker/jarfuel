import { cn } from "@/lib/utils";

export default function Comparison() {
  const rows = [
    { name: "JarFuel", protein: "21g", calories: "245", cost: "$5.00", highlight: true },
    { name: "Starbucks Protein Box", protein: "19g", calories: "470", cost: "$8.95", highlight: false },
    { name: "Soylent Drink", protein: "20g", calories: "400", cost: "$3.50", highlight: false },
    { name: "RXBAR + Coffee", protein: "12g", calories: "210", cost: "$6.00", highlight: false },
    { name: "Greek Yogurt + Granola", protein: "15g", calories: "350", cost: "$4.00", highlight: false },
    { name: "Egg McMuffin + Hash Brown", protein: "17g", calories: "600", cost: "$5.99", highlight: false },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">How We Compare</h2>
          <p className="text-xl text-muted-foreground">
            Other "healthy" breakfast options don't come close.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden border border-border/50">
          <div className="grid grid-cols-4 bg-foreground text-background p-6 font-bold text-lg">
            <div className="col-span-1">Option</div>
            <div className="text-center">Protein</div>
            <div className="text-center">Calories</div>
            <div className="text-center">Daily Cost</div>
          </div>
          
          {rows.map((row, index) => (
            <div 
              key={index}
              className={cn(
                "grid grid-cols-1 md:grid-cols-4 p-6 border-b border-border/50 items-center hover:bg-muted/30 transition-colors",
                row.highlight ? "bg-primary/5" : ""
              )}
            >
              <div className={cn("font-bold md:col-span-1 mb-2 md:mb-0", row.highlight ? "text-primary text-xl" : "text-foreground")}>
                {row.name}
              </div>
              <div className={cn("text-center font-medium", row.highlight ? "text-primary font-bold text-lg" : "text-muted-foreground")}>
                <span className="md:hidden text-xs uppercase mr-2 text-muted-foreground">Protein:</span>
                {row.protein}
              </div>
              <div className={cn("text-center font-medium", row.highlight ? "text-primary font-bold text-lg" : "text-muted-foreground")}>
                <span className="md:hidden text-xs uppercase mr-2 text-muted-foreground">Calories:</span>
                {row.calories}
              </div>
              <div className={cn("text-center font-medium", row.highlight ? "text-primary font-bold text-lg" : "text-muted-foreground")}>
                <span className="md:hidden text-xs uppercase mr-2 text-muted-foreground">Cost:</span>
                {row.cost}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
