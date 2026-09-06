import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Check,
  ArrowRight,
  Zap,
  Crown,
  Shield,
  LucideIcon,
} from "lucide-react";
import Button from "../ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Plan {
  icon: LucideIcon;
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  ctaText: string;
  badge?: string;
  featured?: boolean;
}

const PLANS: Plan[] = [
  {
    icon: Zap,
    name: "Daily",
    price: "$9",
    cadence: "/ day",
    description:
      "For occasional riders who want flexibility and quick on-demand transit.",
    features: [
      "Unlimited standard rides",
      "Standard support",
      "Cancel anytime",
      "Real-time vehicle tracking",
    ],
    ctaText: "Choose Daily",
  },
  {
    icon: Crown,
    name: "Weekly",
    price: "$49",
    cadence: "/ week",
    description:
      "Our most popular plan for regular commuters who want priority support.",
    features: [
      "Unlimited standard + premium rides",
      "Priority driver matching",
      "24/7 priority support",
      "Free cancellations",
    ],
    ctaText: "Choose Weekly",
    badge: "Most popular",
    featured: true,
  },
  {
    icon: Shield,
    name: "Monthly",
    price: "$169",
    cadence: "/ month",
    description:
      "Best value for daily riders, corporate users, and frequent travelers.",
    features: [
      "Everything in Weekly",
      "Dedicated account manager",
      "Corporate invoicing options",
      "Exclusive partner discounts",
    ],
    ctaText: "Choose Monthly",
    badge: "Best value",
  },
];

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-plan]", { opacity: 0, y: 24 });
      gsap.to("[data-plan]", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Simple plans, no surprises
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-600 dark:text-white/60 leading-relaxed">
            Choose the plan that fits how often you ride. Upgrade, downgrade, or
            cancel whenever you like.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid gap-6 lg:grid-cols-3 items-stretch">
          {PLANS.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                data-plan
                className={`
                  relative flex flex-col rounded-3xl p-8 md:p-9
                  border transition-shadow duration-300
                  ${
                    plan.featured
                      ? "bg-slate-900 dark:bg-white border-slate-900 dark:border-white shadow-xl shadow-slate-900/10 lg:-translate-y-3"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 hover:shadow-lg hover:shadow-slate-900/5"
                  }
                `}
              >
                {plan.badge && (
                  <span
                    className={`
                      absolute -top-3 left-8 rounded-full px-3 py-1 text-xs font-semibold
                      ${
                        plan.featured
                          ? "bg-violet-500 text-white"
                          : "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      }
                    `}
                  >
                    {plan.badge}
                  </span>
                )}

                {/* Icon + name */}
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      h-11 w-11 rounded-xl flex items-center justify-center
                      ${
                        plan.featured
                          ? "bg-white/10 text-white dark:bg-slate-900/10 dark:text-slate-900"
                          : "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300"
                      }
                    `}
                  >
                    <Icon size={20} strokeWidth={1.9} />
                  </div>
                  <h3
                    className={`text-xl font-semibold tracking-tight ${
                      plan.featured
                        ? "text-white dark:text-slate-900"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {plan.name}
                  </h3>
                </div>

                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    plan.featured
                      ? "text-slate-300 dark:text-slate-600"
                      : "text-slate-600 dark:text-white/60"
                  }`}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold tracking-tight ${
                      plan.featured
                        ? "text-white dark:text-slate-900"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      plan.featured
                        ? "text-slate-400 dark:text-slate-500"
                        : "text-slate-500 dark:text-white/50"
                    }`}
                  >
                    {plan.cadence}
                  </span>
                </div>

                <div
                  className={`mt-6 h-px w-full ${
                    plan.featured
                      ? "bg-white/10 dark:bg-slate-900/10"
                      : "bg-slate-100 dark:bg-white/10"
                  }`}
                />

                {/* Features */}
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className={`
                          mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full
                          ${
                            plan.featured
                              ? "bg-white/10 text-white dark:bg-slate-900/10 dark:text-slate-900"
                              : "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300"
                          }
                        `}
                      >
                        <Check size={11} strokeWidth={2.8} />
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          plan.featured
                            ? "text-slate-200 dark:text-slate-700"
                            : "text-slate-700 dark:text-white/75"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  <Button
                    variant="primary"
                    size="md"
                    className={`
                      w-full flex items-center justify-center gap-2 group !rounded-xl
                      ${
                        plan.featured
                          ? "!bg-violet-500 !text-white hover:!bg-violet-400"
                          :  "!bg-violet-500 !text-white hover:!bg-violet-400"
                      }
                    `}
                  >
                    {plan.ctaText}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
