import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What exactly is in each jar?",
    answer:
      "Each JarFuel jar contains overnight oats made with rolled oats, chia seeds, ground flaxseed, whey protein isolate, collagen peptides, cold brew coffee concentrate, unsweetened almond milk, and a touch of natural vanilla. No artificial sweeteners, colors, or preservatives. Full ingredient list and nutrition facts available on our website.",
  },
  {
    question: "How long do the jars stay fresh?",
    answer:
      "JarFuel jars are delivered fresh and stay good in your refrigerator for 5-7 days. We deliver on Sundays so your weekday breakfasts are always at peak freshness. Each jar has a 'best by' date printed on the lid.",
  },
  {
    question: "What if I have food allergies?",
    answer:
      "Our current formula contains dairy (whey protein, collagen) and tree nuts (almond milk). We're working on vegan and allergen-free options for future launch. If you have specific allergies, please email us at hello@jarfuel.com before ordering.",
  },
  {
    question: "Where do you deliver?",
    answer:
      "We're launching in the San Francisco Bay Area first (SF, Oakland, Berkeley, San Jose, and surrounding cities). Enter your email to join the waitlist - we'll notify you when we expand to your area. Planning to expand to LA, NYC, and Seattle within 6 months of launch.",
  },
  {
    question: "Can I skip a week or cancel?",
    answer:
      "Absolutely! There are no contracts or commitments. Skip any week with 48 hours notice through your dashboard. Cancel anytime with one click - no phone calls, no guilt trips. We're confident you'll love JarFuel, so we don't need to lock you in.",
  },
  {
    question: "What happens to the glass jars?",
    answer:
      "We use returnable glass jars as part of our zero-waste mission. Simply leave your empty jars outside your door on delivery day - we'll pick them up, sanitize them, and refill them. You'll never be charged for jars as long as you return them.",
  },
  {
    question: "Is $5/jar really worth it?",
    answer:
      "Consider what you're getting: 21g protein (equivalent to 3 eggs), 2,400mg omega-3s, 9g collagen, clean caffeine, and 30 seconds of 'prep time'. Compare that to a $7 Starbucks latte + $4 protein bar, or the time cost of making breakfast. Most members tell us they save both money AND time.",
  },
  {
    question: "What if I don't like it?",
    answer:
      "We offer a 100% satisfaction guarantee on your first week. If you don't love JarFuel, we'll refund your entire first order - no questions asked. We're that confident you'll become a regular.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            Common Questions
          </div>
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Everything You Need to Know
          </h2>
          <p className="text-xl text-muted-foreground">
            Got questions? We've got answers. Still curious? Email us at hello@jarfuel.com
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-2xl border border-border/50 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-6 text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
