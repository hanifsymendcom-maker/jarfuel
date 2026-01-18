import { useWaitlist } from "@/contexts/WaitlistContext";
import { cn } from "@/lib/utils";
import { Coffee, CoffeeIcon } from "lucide-react";

interface ProductVariantSelectorProps {
  compact?: boolean;
  className?: string;
}

export default function ProductVariantSelector({ compact = false, className }: ProductVariantSelectorProps) {
  const { selectedFlavor, withCoffee, setSelectedFlavor, setWithCoffee } = useWaitlist();

  if (compact) {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        <div className="flex rounded-full border border-border/50 overflow-hidden text-sm">
          <button
            type="button"
            onClick={() => setSelectedFlavor('vanilla')}
            className={cn(
              "px-3 py-1.5 transition-all font-medium",
              selectedFlavor === 'vanilla'
                ? "bg-primary text-white"
                : "bg-white hover:bg-muted/50 text-muted-foreground"
            )}
          >
            Vanilla
          </button>
          <button
            type="button"
            onClick={() => setSelectedFlavor('chocolate')}
            className={cn(
              "px-3 py-1.5 transition-all font-medium",
              selectedFlavor === 'chocolate'
                ? "bg-primary text-white"
                : "bg-white hover:bg-muted/50 text-muted-foreground"
            )}
          >
            Chocolate
          </button>
        </div>
        <button
          type="button"
          onClick={() => setWithCoffee(!withCoffee)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
            withCoffee
              ? "bg-accent/10 border-accent text-accent"
              : "bg-white border-border/50 text-muted-foreground hover:bg-muted/50"
          )}
        >
          <Coffee className="w-3.5 h-3.5" />
          {withCoffee ? "+ Coffee" : "No Coffee"}
        </button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Choose Your Flavor</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSelectedFlavor('vanilla')}
            className={cn(
              "p-4 rounded-xl border-2 transition-all text-center",
              selectedFlavor === 'vanilla'
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border/50 hover:border-primary/50 hover:bg-muted/30"
            )}
          >
            <div className="text-2xl mb-1">🍦</div>
            <div className={cn(
              "font-bold",
              selectedFlavor === 'vanilla' ? "text-primary" : "text-foreground"
            )}>
              Vanilla
            </div>
            <div className="text-xs text-muted-foreground">Classic & Smooth</div>
          </button>
          <button
            type="button"
            onClick={() => setSelectedFlavor('chocolate')}
            className={cn(
              "p-4 rounded-xl border-2 transition-all text-center",
              selectedFlavor === 'chocolate'
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border/50 hover:border-primary/50 hover:bg-muted/30"
            )}
          >
            <div className="text-2xl mb-1">🍫</div>
            <div className={cn(
              "font-bold",
              selectedFlavor === 'chocolate' ? "text-primary" : "text-foreground"
            )}>
              Chocolate
            </div>
            <div className="text-xs text-muted-foreground">Rich & Indulgent</div>
          </button>
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Add Coffee?</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setWithCoffee(true)}
            className={cn(
              "p-4 rounded-xl border-2 transition-all flex items-center gap-3",
              withCoffee
                ? "border-accent bg-accent/5 shadow-md"
                : "border-border/50 hover:border-accent/50 hover:bg-muted/30"
            )}
          >
            <Coffee className={cn("w-6 h-6", withCoffee ? "text-accent" : "text-muted-foreground")} />
            <div className="text-left">
              <div className={cn(
                "font-bold",
                withCoffee ? "text-accent" : "text-foreground"
              )}>
                With Coffee
              </div>
              <div className="text-xs text-muted-foreground">Extra energy boost</div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setWithCoffee(false)}
            className={cn(
              "p-4 rounded-xl border-2 transition-all flex items-center gap-3",
              !withCoffee
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border/50 hover:border-primary/50 hover:bg-muted/30"
            )}
          >
            <CoffeeIcon className={cn("w-6 h-6 opacity-40", !withCoffee ? "text-primary" : "text-muted-foreground")} />
            <div className="text-left">
              <div className={cn(
                "font-bold",
                !withCoffee ? "text-primary" : "text-foreground"
              )}>
                Without Coffee
              </div>
              <div className="text-xs text-muted-foreground">Caffeine-free</div>
            </div>
          </button>
        </div>
      </div>

      <div className="text-center p-3 rounded-lg bg-muted/30 border border-border/50">
        <span className="text-sm text-muted-foreground">Your selection: </span>
        <span className="font-bold text-primary">
          {selectedFlavor.charAt(0).toUpperCase() + selectedFlavor.slice(1)} {withCoffee ? '+ Coffee' : '(No Coffee)'}
        </span>
      </div>
    </div>
  );
}
