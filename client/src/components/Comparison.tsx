import { cn } from "@/lib/utils";
import { Check, X, Minus } from "lucide-react";

interface ComparisonRow {
  name: string;
  protein: string;
  calories: string;
  fiber: string;
  sugar: string;
  satiety: string; // Hours of feeling full & energetic
  cost: string;
  highlight?: boolean;
}

export default function Comparison() {
  const rows: ComparisonRow[] = [
    {
      name: "JarFuel",
      protein: "21g",
      calories: "245",
      fiber: "8g",
      sugar: "6g",
      satiety: "4-5 hrs",
      cost: "$5.00",
      highlight: true
    },
    {
      name: "Starbucks Protein Box",
      protein: "19g",
      calories: "470",
      fiber: "3g",
      sugar: "18g",
      satiety: "2-3 hrs",
      cost: "$8.95"
    },
    {
      name: "Soylent Drink",
      protein: "20g",
      calories: "400",
      fiber: "3g",
      sugar: "9g",
      satiety: "2-3 hrs",
      cost: "$3.50"
    },
    {
      name: "RXBAR + Coffee",
      protein: "12g",
      calories: "210",
      fiber: "5g",
      sugar: "12g",
      satiety: "1-2 hrs",
      cost: "$6.00"
    },
    {
      name: "Greek Yogurt + Granola",
      protein: "15g",
      calories: "350",
      fiber: "2g",
      sugar: "22g",
      satiety: "2-3 hrs",
      cost: "$4.00"
    },
    {
      name: "Egg McMuffin + Hash Brown",
      protein: "17g",
      calories: "600",
      fiber: "2g",
      sugar: "5g",
      satiety: "2-3 hrs",
      cost: "$5.99"
    },
  ];

  const columns = [
    { key: "name", label: "Option", mobileLabel: null },
    { key: "protein", label: "Protein", mobileLabel: "Protein" },
    { key: "calories", label: "Calories", mobileLabel: "Calories" },
    { key: "fiber", label: "Fiber", mobileLabel: "Fiber" },
    { key: "sugar", label: "Sugar", mobileLabel: "Sugar" },
    { key: "satiety", label: "Feel Full", mobileLabel: "Feel Full" },
    { key: "cost", label: "Daily Cost", mobileLabel: "Cost" },
  ];

  // Helper to render cell value with quality indicator
  const renderCellValue = (row: ComparisonRow, key: string) => {
    const value = row[key as keyof ComparisonRow];

    // For satiety, show visual indicator
    if (key === "satiety") {
      const isGood = value === "4-5 hrs";
      return (
        <div className="flex items-center justify-center gap-1">
          <span>{value}</span>
          {row.highlight && <Check className="w-4 h-4 text-green-600" />}
        </div>
      );
    }

    // For sugar, lower is better
    if (key === "sugar") {
      const sugarNum = parseInt(value as string);
      const isLow = sugarNum <= 6;
      const isMedium = sugarNum > 6 && sugarNum <= 12;
      return (
        <span className={cn(
          row.highlight ? "" : isLow ? "text-green-600" : isMedium ? "text-yellow-600" : "text-red-500"
        )}>
          {value}
        </span>
      );
    }

    // For fiber, higher is better
    if (key === "fiber") {
      const fiberNum = parseInt(value as string);
      const isHigh = fiberNum >= 8;
      return (
        <span className={cn(
          row.highlight ? "" : isHigh ? "text-green-600" : ""
        )}>
          {value}
        </span>
      );
    }

    // For calories, lower is better for same protein
    if (key === "calories") {
      const calNum = parseInt(value as string);
      const isLow = calNum <= 250;
      return (
        <span className={cn(
          row.highlight ? "" : isLow ? "text-green-600" : calNum > 400 ? "text-red-500" : ""
        )}>
          {value}
        </span>
      );
    }

    return value;
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">How We Compare</h2>
          <p className="text-xl text-muted-foreground mb-2">
            Other "healthy" breakfast options don't come close.
          </p>
          <p className="text-sm text-muted-foreground">
            Comparing protein, fiber, sugar, calories, satiety, and value.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="max-w-6xl mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden border border-border/50 hidden md:block">
          <div className="grid grid-cols-7 bg-foreground text-background p-5 font-bold text-sm">
            {columns.map(col => (
              <div key={col.key} className={cn(col.key === "name" ? "col-span-1 text-left" : "text-center")}>
                {col.label}
              </div>
            ))}
          </div>

          {rows.map((row, index) => (
            <div
              key={index}
              className={cn(
                "grid grid-cols-7 p-5 border-b border-border/50 items-center hover:bg-muted/30 transition-colors",
                row.highlight ? "bg-primary/5" : ""
              )}
            >
              <div className={cn("font-bold", row.highlight ? "text-primary text-lg" : "text-foreground")}>
                {row.name}
                {row.highlight && <span className="ml-2 text-xs bg-accent text-white px-2 py-0.5 rounded-full">BEST</span>}
              </div>
              <div className={cn("text-center font-medium", row.highlight ? "text-primary font-bold" : "text-muted-foreground")}>
                {renderCellValue(row, "protein")}
              </div>
              <div className={cn("text-center font-medium", row.highlight ? "text-primary font-bold" : "text-muted-foreground")}>
                {renderCellValue(row, "calories")}
              </div>
              <div className={cn("text-center font-medium", row.highlight ? "text-primary font-bold" : "text-muted-foreground")}>
                {renderCellValue(row, "fiber")}
              </div>
              <div className={cn("text-center font-medium", row.highlight ? "text-primary font-bold" : "text-muted-foreground")}>
                {renderCellValue(row, "sugar")}
              </div>
              <div className={cn("text-center font-medium", row.highlight ? "text-primary font-bold" : "text-muted-foreground")}>
                {renderCellValue(row, "satiety")}
              </div>
              <div className={cn("text-center font-medium", row.highlight ? "text-primary font-bold" : "text-muted-foreground")}>
                {renderCellValue(row, "cost")}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl p-5 border shadow-lg",
                row.highlight ? "bg-primary/5 border-primary/20" : "bg-white border-border/50"
              )}
            >
              <div className={cn("font-bold text-lg mb-4 flex items-center gap-2", row.highlight ? "text-primary" : "text-foreground")}>
                {row.name}
                {row.highlight && <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">BEST</span>}
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase mb-1">Protein</div>
                  <div className={cn("font-bold", row.highlight ? "text-primary" : "")}>{row.protein}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase mb-1">Calories</div>
                  <div className={cn("font-bold", row.highlight ? "text-primary" : "")}>{row.calories}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase mb-1">Fiber</div>
                  <div className={cn("font-bold", row.highlight ? "text-primary" : "")}>{row.fiber}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase mb-1">Sugar</div>
                  <div className={cn("font-bold", row.highlight ? "text-primary" : "")}>{row.sugar}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase mb-1">Feel Full</div>
                  <div className={cn("font-bold", row.highlight ? "text-primary" : "")}>{row.satiety}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase mb-1">Cost</div>
                  <div className={cn("font-bold", row.highlight ? "text-primary" : "")}>{row.cost}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-primary">Feel Full:</strong> Estimated hours of sustained energy and satiety based on protein, fiber, and glycemic index.
          </p>
        </div>
      </div>
    </section>
  );
}
