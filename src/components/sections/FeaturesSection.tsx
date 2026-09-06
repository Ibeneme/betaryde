import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "../ui/useScrollReveal";
import features_a from "../../assets/images/features_a.png";
import features_b from "../../assets/images/features_b.png";


interface BentoCard {
  tag: string;
  title: string;
  description: string;
  image: string;
  accentColor?: string;
  textColor?: string;
  tagBg?: string;
  tagColor?: string;
  descriptionColor?: string;
}

const BENTO_CARDS: BentoCard[] = [
  {
    tag: "Advantage 01",
    title: "Enhanced Safety",
    description:
      "Every driver is background-checked and every trip is tracked in real time, so you always ride with confidence.",
    image: features_b,
  },
  {
    tag: "Advantage 02",
    title: "Intelligent Scheduling",
    description:
      "Smart matching predicts demand and routes drivers to you faster, cutting wait times during peak hours.",
    image: features_a,
    accentColor: "bg-[#7C3AED] dark:bg-[#7C3AED]",
    textColor: "text-white",
    tagBg: "bg-black/10",
    tagColor: "text-white",
    descriptionColor: "text-white",
  },
  {
    tag: "Advantage 03",
    title: "Seamless Payments",
    description:
      "Cashless, secure, and instant. Save multiple methods and split fares without ever touching your wallet.",
    image:
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGF5bWVudHN8ZW58MHx8MHx8fDA%3D",
  },
];

/**
 * FeaturesSection / BentoGridSection
 * Styled to match the modern 3-card asymmetric layout layout with your content.
 * Fully supports light & dark mode theme observance without custom font helper classes.
 */
const FeaturesSection: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white dark:bg-[#0B0511] transition-colors duration-500 font-['Parkinsans',sans-serif]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div data-reveal className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300">
            Why BetaRyde
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            The BetaRyde Advantage
          </h2>
          <p className="mt-4 text-gray-600 dark:text-zinc-300/80 text-base md:text-lg leading-relaxed">
            Built from the ground up to make every ride feel effortless, secure,
            and unmistakably premium.
          </p>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {BENTO_CARDS.map((card) => {
            const isHighlighted = Boolean(card.accentColor);

            return (
              <div key={card.tag} data-reveal className="h-full flex">
                <div
                  className={`relative w-full rounded-[2.5rem] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${
                    isHighlighted
                      ? `${card.accentColor} shadow-lime-500/10`
                      : "bg-gray-50/90 dark:bg-zinc-900/50 border border-gray-200/80 dark:border-white/10 shadow-violet-500/5 dark:shadow-black/40 backdrop-blur-xl"
                  }`}
                >
                  <div>
                    {/* Top content: Tag + Arrow action badge */}
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`inline-flex items-center text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-full uppercase ${
                          isHighlighted
                            ? `${card.tagBg} ${card.tagColor}`
                            : "bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300"
                        }`}
                      >
                        {card.tag}
                      </span>

                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                          isHighlighted
                            ? "bg-zinc-900 text-white"
                            : "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200/60 dark:border-white/10 shadow-sm"
                        }`}
                      >
                        <ArrowUpRight size={18} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`mt-6 text-xl sm:text-2xl font-bold tracking-tight leading-snug ${
                        isHighlighted
                          ? card.textColor
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {card.title}
                    </h3>

                    {/* Description Text */}
                    <p
                      className={`mt-3 text-sm md:text-base leading-relaxed ${
                        isHighlighted
                          ? card.descriptionColor || "text-white"
                          : "text-gray-600 dark:text-zinc-400"
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Image Container */}
                  <div className="mt-8 relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden shadow-md">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      draggable={false}
                    />
                    {/* Inner image overlay shade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
