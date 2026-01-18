import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Microscope, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-extrabold text-primary tracking-tight">
            Jar<span className="text-accent">Fuel</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/science">
            <a className="flex items-center gap-2 text-muted-foreground hover:text-primary font-medium transition-colors">
              <Microscope className="w-4 h-4" />
              Science
            </a>
          </Link>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-muted-foreground hover:text-primary font-medium transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="text-muted-foreground hover:text-primary font-medium transition-colors"
          >
            Pricing
          </button>
          <Button
            onClick={() => scrollToSection("waitlist")}
            className="rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Join Waitlist
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50 p-6 space-y-4">
          <Link href="/science">
            <a
              className="flex items-center gap-2 text-foreground font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Microscope className="w-4 h-4" />
              Science
            </a>
          </Link>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="block text-foreground font-medium py-2 w-full text-left"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="block text-foreground font-medium py-2 w-full text-left"
          >
            Pricing
          </button>
          <Button
            onClick={() => scrollToSection("waitlist")}
            className="w-full rounded-full font-semibold"
          >
            Join Waitlist
          </Button>
        </div>
      )}
    </nav>
  );
}
