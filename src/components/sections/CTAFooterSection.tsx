import React from "react";
import {
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  ArrowRight,
} from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { useScrollReveal } from "../ui/useScrollReveal";

const FOOTER_LINKS = {
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#careers" },
    { label: "Press", href: "#press" },
    { label: "Become a Partner", href: "#partner" },
  ],
  Services: [
    { label: "Daily Rides", href: "#rides" },
    { label: "Delivery Service", href: "#delivery" },
    { label: "Corporate", href: "#corporate" },
    { label: "Pricing", href: "#pricing" },
  ],
  Contact: [
    { label: "support@betaryde.com", href: "mailto:support@betaryde.com" },
    { label: "+1 (800) 555-0192", href: "tel:+18005550192" },
    { label: "San Francisco, CA", href: "#" },
  ],
} as const;

const SOCIALS = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
] as const;

/**
 * CTAFooterSection
 * Final conversion CTA banner + full site footer.
 * Fully theme-aware (light + dark).
 */
const CTAFooterSection: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="partner"
      ref={sectionRef}
      className="relative pt-16 pb-12 md:pt-24 md:pb-16 bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ========== CTA Banner ========== */}
        <Card
          data-reveal
          hoverLift={false}
          className="
            relative overflow-hidden text-center
            py-16 md:py-20 px-6 md:px-12
            rounded-3xl
            bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800
            dark:from-violet-700 dark:via-violet-800 dark:to-indigo-950
            border border-violet-500/20 dark:border-violet-500/10
            shadow-xl shadow-violet-900/20
          "
        >
          {/* Ambient glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-white/10 blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-indigo-400/20 blur-[80px]"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              Ready for better rides?
            </h2>

            <p className="mt-5 text-base md:text-lg text-violet-100/90 leading-relaxed">
              Join thousands of riders who’ve already switched to safer,
              smarter, and more comfortable transportation.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Button variant="secondary" size="lg">
                Download the App
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="!border-white/30 !text-white hover:!bg-white/10 hover:!border-white/50"
              >
                Become a Partner
                <ArrowRight size={16} className="ml-1.5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* ========== Footer ========== */}
        <footer
          data-reveal
          className="mt-20 md:mt-28 grid gap-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#top"
              className="inline-flex items-baseline text-xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              Beta
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500">
                Ryde
              </span>
            </a>

            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 max-w-[240px] leading-relaxed">
              Transportation reimagined for comfort, safety, and simplicity.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="
                    h-10 w-10 flex items-center justify-center rounded-xl
                    border border-slate-200 dark:border-white/10
                    bg-slate-50 dark:bg-white/5
                    text-slate-500 dark:text-slate-400
                    hover:text-violet-600 dark:hover:text-violet-400
                    hover:border-violet-300 dark:hover:border-violet-500/40
                    hover:bg-violet-50 dark:hover:bg-violet-500/10
                    transition-all duration-200
                  "
                >
                  <Icon size={17} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-900 dark:text-white">
                {heading}
              </h4>
              <ul className="mt-5 space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </footer>

        {/* Bottom bar */}
        <div
          data-reveal
          className="
            mt-16 pt-8
            border-t border-slate-200 dark:border-white/10
            flex flex-col sm:flex-row items-center justify-between gap-4
          "
        >
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} BetaRyde, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              className="text-xs text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-xs text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAFooterSection;
