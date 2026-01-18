import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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

        <Button 
          onClick={() => scrollToSection("waitlist")}
          className="rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          Join Waitlist
        </Button>
      </div>
    </nav>
  );
}
