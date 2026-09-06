import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Car,
  Package,
  Building2,
  Check,
  LucideIcon,
  ArrowRight,
} from "lucide-react";
import Button from "../ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaText: string;
  badge?: string;
  cardBg: string;
  glow: string;
  iconBg: string;
  iconColor: string;
  checkBg: string;
  checkColor: string;
  textClass: string;
  subtleTextClass: string;
  buttonClass: string;
}

const SERVICES: ServiceItem[] = [
  {
    icon: Car,
    title: "Daily Rides",
    subtitle: "Personalized ride experience",
    description:
      "Customize every aspect of your ride with our preference settings. From temperature control to music selection, your comfort is the priority.",
    features: [
      "On-demand rides, 24/7",
      "Multiple vehicle options",
      "Personalized comfort settings",
      "Integrated safety features",
    ],
    ctaText: "Customize your ride",
    cardBg: "bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700",
    glow: "bg-violet-500/30",
    iconBg: "bg-white/15",
    iconColor: "text-white",
    checkBg: "bg-white/20",
    checkColor: "text-white",
    textClass: "text-white",
    subtleTextClass: "text-violet-100",
    buttonClass: "!bg-white !text-violet-700 hover:!bg-violet-50",
  },
  {
    icon: Package,
    title: "Delivery Service",
    subtitle: "Reliable package delivery",
    description:
      "From small parcels to large packages, our delivery service ensures your items arrive safely and on time, with live tracking the whole way.",
    features: [
      "Same-day delivery options",
      "Live package tracking",
      "Photo verification on drop-off",
      "Secure handling protocols",
    ],
    ctaText: "Send a package",
    badge: "Most popular",
    cardBg: "bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500",
    glow: "bg-orange-500/30",
    iconBg: "bg-white/20",
    iconColor: "text-white",
    checkBg: "bg-white/20",
    checkColor: "text-white",
    textClass: "text-white",
    subtleTextClass: "text-orange-50",
    buttonClass: "!bg-white !text-orange-600 hover:!bg-orange-50",
  },
  {
    icon: Building2,
    title: "Corporate",
    subtitle: "Business transportation solutions",
    description:
      "Custom transportation solutions for businesses from employee commutes to client transportation and full event logistics support.",
    features: [
      "Corporate accounts",
      "Employee shuttle service",
      "Executive transportation",
      "Event logistics support",
    ],
    ctaText: "Talk to sales",
    badge: "Enterprise",
    cardBg: "bg-gradient-to-br from-violet-600 via-purple-700 to-fuchsia-800",
    glow: "bg-purple-500/30",
    iconBg: "bg-white/15",
    iconColor: "text-white",
    checkBg: "bg-white/20",
    checkColor: "text-white",
    textClass: "text-white",
    subtleTextClass: "text-purple-100",
    buttonClass: "!bg-white !text-purple-700 hover:!bg-purple-50",
  },
];

export default function ServicesSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length || !stackRef.current) return;

      // Transform origin so the tilt feels natural (pivots from the bottom)
      cards.forEach((card) => {
        gsap.set(card, { transformOrigin: "50% 100%" });
      });

      // Starting state
      gsap.set(cards[0], {
        yPercent: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        filter: "brightness(1)",
      });
      cards.slice(1).forEach((card) => {
        gsap.set(card, {
          yPercent: 100,
          scale: 1,
          rotate: 0,
          opacity: 1,
          filter: "brightness(1)",
        });
      });

      // Enough scroll distance for every hand-off
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stackRef.current,
          start: "top top",
          end: `+=${(cards.length - 1) * 100}%`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        const segment = i - 1;

        // Outgoing card: scales down + lifts + tilts as it vanishes
        tl.to(
          cards[i - 1],
          {
            scale: 0.9,
            y: -32,
            rotate: -8, // ← tilt as it goes away
            filter: "brightness(0.75)",
            duration: 1,
            ease: "none",
          },
          segment
        );

        // Incoming card rises straight up
        tl.to(
          card,
          {
            yPercent: 0,
            duration: 1,
            ease: "none",
          },
          segment
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      {/* Ambient background wash */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-gradient-to-r from-violet-500/10 via-orange-500/10 to-purple-500/10" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center pt-24 md:pt-32 pb-16 max-w-3xl">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
            Three ways to move,
            <br />
            one team behind them
          </h2>
          <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-white/60 leading-relaxed">
            Whether you're commuting across town, shipping a parcel, or running
            logistics for a whole team BetaRyde has you covered.
          </p>
        </div>

        {/* ========== PINNED STACK ========== */}
        <div
          ref={stackRef}
          className="relative w-full max-w-5xl xl:max-w-6xl h-screen mt-0"
          style={{ perspective: "1400px" }}
        >
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="absolute inset-0 flex items-center justify-center will-change-transform"
                style={{ zIndex: idx + 1 }}
              >
                <div
                  className={`
                    relative w-full ${service.cardBg} ${service.textClass}
                    rounded-[2rem] md:rounded-[2.5rem]
                    shadow-2xl shadow-black/25
                    p-8 md:p-12 lg:p-16
                    min-h-[520px] max-h-[80vh]
                    flex flex-col justify-between
                    overflow-hidden
                  `}
                >
                  {/* Soft interior glow */}
                  <div
                    className={`pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full ${service.glow} blur-3xl opacity-60`}
                  />

                  {/* Top row */}
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-14 w-14 rounded-2xl flex items-center justify-center ${service.iconBg} ${service.iconColor}`}
                      >
                        <Icon size={26} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium ${service.subtleTextClass}`}
                        >
                          {service.subtitle}
                        </p>
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-1">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {service.badge && (
                      <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Description + Features */}
                  <div className="relative mt-10 grid md:grid-cols-2 gap-10">
                    <p className="text-base md:text-lg leading-relaxed opacity-90 max-w-md">
                      {service.description}
                    </p>

                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${service.checkBg} ${service.checkColor}`}
                          >
                            <Check size={12} strokeWidth={2.5} />
                          </span>
                          <span className="text-sm md:text-base font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="relative mt-10 pt-8 border-t border-white/15">
                    <Button
                      variant="secondary"
                      size="lg"
                      className={`flex items-center gap-2 group ${service.buttonClass}`}
                    >
                      {service.ctaText}
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
