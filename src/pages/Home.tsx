import React from "react";
import Navbar from "../components/sections/Navbar";
import HeroSection from "../components/sections/HeroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import ServicesSection from "../components/sections/ServicesSection";
import PricingSection from "../components/sections/PricingSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import CTAFooterSection from "../components/sections/CTAFooterSection";

/**
 * Home
 * Composes all 7 standalone sections into the full BetaRyde landing page.
 * Updated to support dynamic theme background toggling.
 */
const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0511] text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTAFooterSection />
    </main>
  );
};

export default Home;
