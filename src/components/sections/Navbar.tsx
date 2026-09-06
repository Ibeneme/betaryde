import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Menu,
  X,
  Sun,
  Moon,
//  Sparkles,
  Layers,
  Briefcase,
  Tag,
  MessageSquareQuote,
  Users,
  Download,
 // Car,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const NAV_LINKS = [
  { label: "Features", href: "#features", icon: Layers },
  { label: "Services", href: "#services", icon: Briefcase },
  { label: "Pricing", href: "#pricing", icon: Tag },
  { label: "Testimonials", href: "#testimonials", icon: MessageSquareQuote },
  { label: "Become a Partner", href: "#partner", icon: Users },
];

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 }
      );

      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { y: -10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
            delay: 0.35,
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  // GSAP Mobile Menu Animation handler
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (mobileOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, scaleY: 0.95, transformOrigin: "top" },
        { opacity: 1, scaleY: 1, duration: 0.3, ease: "power3.out" }
      );
    }
  }, [mobileOpen]);

  return (
    <header
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 pt-6 px-4 sm:px-6 lg:px-8 pointer-events-none font-['Parkinsans',sans-serif]"
    >
      {/* Floating Pill Container */}
      <div className="mx-auto max-w-5xl pointer-events-auto bg-white/80 dark:bg-[#0B0511]/85 backdrop-blur-2xl border border-gray-200/90 dark:border-white/15 rounded-full px-5 py-2.5 shadow-2xl shadow-violet-900/10 dark:shadow-black/60 flex items-center justify-between gap-4 transition-all duration-300">
        {/* Logo Section */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-gray-900 dark:text-white pl-2"
        >
          {/* 
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-fuchsia-500 flex items-center justify-center text-white shadow-md shadow-violet-500/25 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <Car size={17} />
          </div> 
          */}
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-violet-900 dark:from-white dark:via-zinc-200 dark:to-violet-300 bg-clip-text text-transparent">
            BetaRyde
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center">
          <ul ref={linksRef} className="flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="px-3.5 py-1.5 text-sm font-medium text-gray-600 dark:text-zinc-300 hover:text-violet-600 dark:hover:text-white hover:bg-violet-50/80 dark:hover:bg-white/10 rounded-full transition-all duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions: Theme Toggle + Dark CTA Button */}
        <div className="hidden lg:flex items-center gap-3 pr-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-yellow-400 transition-all duration-200 hover:rotate-45"
          >
            {theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} className="text-gray-600" />
            )}
          </button>

          {/* Action CTA Button */}
          <a
            href="#download"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-600 dark:bg-white dark:text-gray-900 dark:hover:bg-violet-400 dark:hover:text-white shadow-lg shadow-black/10 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            <span>Download App</span>
          </a>
        </div>

        {/* Mobile Nav Controls */}
        <div className="flex items-center gap-2 lg:hidden pr-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-yellow-400"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Expanded Mobile Menu Drawer */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden mt-3 mx-auto max-w-5xl bg-white/95 dark:bg-[#0B0511]/95 backdrop-blur-2xl border border-gray-200/90 dark:border-white/15 rounded-3xl px-6 py-6 shadow-2xl pointer-events-auto origin-top"
        >
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const IconComponent = link.icon;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3.5 p-3 rounded-2xl text-sm font-medium text-gray-700 dark:text-zinc-200 hover:bg-violet-50 dark:hover:bg-white/10 hover:text-violet-600 dark:hover:text-white transition-all"
                  >
                    <div className="p-2 rounded-xl bg-violet-100/70 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                      <IconComponent size={16} />
                    </div>
                    <span>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 pt-5 border-t border-gray-200/80 dark:border-white/10">
            <a
              href="#download"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-full text-sm font-semibold shadow-lg transition-all hover:bg-violet-600 dark:hover:bg-violet-100"
            >
              <Download size={16} />
              <span>Download App</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
