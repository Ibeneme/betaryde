import React from "react";
import { MessageSquareOff } from "lucide-react";
import Card from "../ui/Card";
import { useScrollReveal } from "../ui/useScrollReveal";

/**
 * TestimonialsSection
 * Renders an empty state today. Designed to be swapped for a real
 * testimonial grid later without touching any other section.
 */
const TestimonialsSection: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div data-reveal className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-300">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            What Customers are saying
          </h2>
        </div>

        <Card
          data-reveal
          hoverLift={false}
          className="
            mt-14 mx-auto max-w-xl flex flex-col items-center text-center py-16
            bg-slate-50 dark:bg-white/[0.03]
            border border-slate-200 dark:border-white/10
          "
        >
          <div className="
            h-14 w-14 rounded-2xl
            bg-slate-100 dark:bg-white/5
            border border-slate-200 dark:border-white/10
            flex items-center justify-center
          ">
            <MessageSquareOff
              size={26}
              className="text-slate-400 dark:text-white/40"
            />
          </div>
          <p className="mt-6 text-base text-slate-500 dark:text-white/50">
            No testimonials available at the moment.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default TestimonialsSection;