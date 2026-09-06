import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Check } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import MAP_IMAGE from "../../assets/images/mapb.png";
import MAP_IMAGE_DARK from "../../assets/images/mapbdark.png";

type CarConfig = {
  id: string;
  d: string;
  duration: number;
  delay: number;
  reverse?: boolean;
};

// Paths carefully matched to the yellow major roads on the generated map
const ROADS: CarConfig[] = [
  {
    id: "north",
    d: "M 200 260 C 195 180, 185 100, 175 20",
    duration: 7.5,
    delay: 0.4,
  },
  {
    id: "northeast",
    d: "M 210 250 C 260 180, 320 120, 380 60",
    duration: 8.2,
    delay: 1.1,
  },
  {
    id: "east",
    d: "M 220 265 C 280 270, 340 290, 400 320",
    duration: 7.8,
    delay: 0.8,
    reverse: true,
  },
  {
    id: "southeast",
    d: "M 215 280 C 270 340, 310 400, 340 480",
    duration: 8.5,
    delay: 1.5,
  },
  {
    id: "southwest",
    d: "M 185 280 C 130 340, 90 400, 40 470",
    duration: 8,
    delay: 0.6,
    reverse: true,
  },
];

const FEATURES = [
  "Verified drivers near you",
  "Real-time GPS tracking",
  "Dispatch in under 5 minutes",
  "24/7 priority support",
];

const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const carRefs = useRef<(SVGGElement | null)[]>([]);
  const glowRefs = useRef<(SVGCircleElement | null)[]>([]);
  const gpsRefs = useRef<(SVGCircleElement | null)[]>([]);

  const pinRef = useRef<SVGGElement>(null);
  const pinPulseRef = useRef<SVGCircleElement>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        full: "(prefers-reduced-motion: no-preference)",
      },
      (ctxCond) => {
        const { reduceMotion } = ctxCond.conditions as {
          reduceMotion: boolean;
        };

        const placeCarAt = (idx: number, progress: number) => {
          const path = pathRefs.current[idx];
          const group = carRefs.current[idx];
          if (!path || !group) return;

          const len = path.getTotalLength();
          const raw = ROADS[idx].reverse ? 1 - progress : progress;
          const p = path.getPointAtLength(raw * len);
          const ahead = path.getPointAtLength(
            Math.min(
              Math.max(raw * len + (ROADS[idx].reverse ? -1.5 : 1.5), 0),
              len
            )
          );
          const angle =
            Math.atan2(ahead.y - p.y, ahead.x - p.x) * (180 / Math.PI) + 90;

          gsap.set(group, {
            attr: { transform: `translate(${p.x} ${p.y}) rotate(${angle})` },
          });
        };

        const ctx = gsap.context(() => {
          // Place cars initially
          ROADS.forEach((_, i) =>
            placeCarAt(i, reduceMotion ? 0.25 + i * 0.12 : 0)
          );

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.fromTo(
            "[data-hero-text]",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.07, delay: 0.08 }
          )
            .fromTo(
              "[data-hero-visual]",
              { opacity: 0, scale: 0.97, y: 14 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.95,
                ease: "power3.out",
              },
              "-=0.5"
            )
            .fromTo(
              carRefs.current,
              { opacity: 0, scale: 0.5 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.45,
                stagger: 0.08,
                ease: "back.out(1.7)",
              },
              "-=0.55"
            )
            .fromTo(
              pinRef.current,
              { y: -48, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.65, ease: "bounce.out" },
              "-=0.25"
            )
            .fromTo(
              cardRef.current,
              { opacity: 0, x: 28, scale: 0.96 },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.75,
                ease: "power3.out",
              },
              "-=0.4"
            );

          // Stat counters
          statRefs.current.forEach((el) => {
            if (!el) return;
            const target = Number(el.dataset.target);
            const suffix = el.dataset.suffix || "";
            const obj = { val: 0 };

            gsap.to(obj, {
              val: target,
              duration: 1.35,
              delay: 1.05,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(obj.val).toLocaleString() + suffix;
              },
            });
          });

          if (reduceMotion) return;

          // Pin bounce
          gsap.to(pinRef.current, {
            y: -6,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.2,
          });

          // Pin pulse
          gsap.fromTo(
            pinPulseRef.current,
            { attr: { r: 5 }, opacity: 0.45 },
            {
              attr: { r: 20 },
              opacity: 0,
              duration: 1.7,
              ease: "power1.out",
              repeat: -1,
              delay: 1.2,
            }
          );

          // Soft glow behind map
          gsap.to(bgGlowRef.current, {
            scale: 1.07,
            opacity: 0.9,
            duration: 6.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });

          // Cars driving
          ROADS.forEach((road, i) => {
            const driveProxy = { progress: 0 };

            gsap.to(driveProxy, {
              progress: 1,
              duration: road.duration,
              ease: "power1.inOut",
              repeat: -1,
              delay: road.delay,
              onUpdate: () => placeCarAt(i, driveProxy.progress),
            });

            // GPS ring
            gsap.to(gpsRefs.current[i], {
              attr: { r: 13 },
              opacity: 0,
              duration: 1.25,
              ease: "power1.out",
              repeat: -1,
              delay: road.delay,
            });

            // Soft glow under car
            gsap.to(glowRefs.current[i], {
              opacity: 0.55,
              scale: 1.25,
              duration: 2.1,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: road.delay,
            });
          });

          // Floating card
          gsap.to(cardRef.current, {
            y: -7,
            duration: 3.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.7,
          });

          // Shimmer on card
          gsap.fromTo(
            shimmerRef.current,
            { xPercent: -150 },
            {
              xPercent: 150,
              duration: 1.7,
              ease: "power2.inOut",
              delay: 2.1,
              repeat: -1,
              repeatDelay: 3.8,
            }
          );
        }, containerRef);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative overflow-hidden pt-16 pb-20 md:pt-32 md:pb-28 bg-white dark:bg-[#0B0511] transition-colors duration-500 font-['Parkinsans',sans-serif]"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-36 left-1/4 h-[30rem] w-[30rem] rounded-full bg-violet-600/10 dark:bg-violet-600/16 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[26rem] w-[26rem] rounded-full bg-indigo-600/6 dark:bg-indigo-600/12 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-[#0B0511] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-[#0B0511] to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-6 z-10 space-y-8">
          <div
            data-hero-text
            className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 dark:border-violet-500/20 bg-violet-50/60 dark:bg-violet-500/10 px-3.5 py-1.5 text-xs font-medium text-violet-700 dark:text-violet-300"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
            </span>
            Now available on iOS & Android
          </div>

          <h1
            data-hero-text
            className="text-4xl sm:text-5xl xl:text-[3.4rem] font-bold leading-[1.12] tracking-tight text-gray-900 dark:text-white"
          >
            The smarter way to{" "}
            <span className="text-[#7C3AED]">book & track</span> every ride.
          </h1>

          <p
            data-hero-text
            className="max-w-lg text-[15px] md:text-base text-gray-600 dark:text-zinc-300/90 leading-relaxed"
          >
            Betaryde connects riders with verified drivers in real time. Faster
            matching, live GPS, and reliable service built for daily commutes
            and late-night trips.
          </p>

          {/* App Store buttons */}
          <div
            data-hero-text
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <a
              href="https://apps.apple.com/app/id6762498768"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-xl bg-gray-900 dark:bg-white px-4 py-2.5 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/10"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 text-white dark:text-gray-900"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left leading-tight">
                <div className="text-[10px] font-medium text-gray-300 dark:text-gray-600">
                  Download on the
                </div>
                <div className="text-[15px] font-semibold text-white dark:text-gray-900 -mt-0.5">
                  App Store
                </div>
              </div>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.betaryde.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-xl bg-gray-900 dark:bg-white px-4 py-2.5 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/10"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-white dark:text-gray-900"
                fill="currentColor"
              >
                <path d="M3.18 23.71c.13.07.28.11.43.11.17 0 .33-.05.48-.15l8.36-4.82-1.95-1.95-7.32 6.81zm.13-21.42C3.14 2.12 3 2.4 3 2.71v18.58c0 .31.14.59.31.72l8.04-8.04L3.31 2.29zM20.5 11.2l-3.17-1.83-2.12 2.12 2.12 2.12 3.17-1.83c.55-.32.55-1.1 0-1.58zM12.45 4.15L4.09.33C3.94.24 3.78.19 3.61.19c-.15 0-.3.04-.43.11l7.32 6.81 1.95-1.96z" />
              </svg>
              <div className="text-left leading-tight">
                <div className="text-[10px] font-medium text-gray-300 dark:text-gray-600">
                  Get it on
                </div>
                <div className="text-[15px] font-semibold text-white dark:text-gray-900 -mt-0.5">
                  Google Play
                </div>
              </div>
            </a>
          </div>

          {/* Feature list */}
          <div
            data-hero-text
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-2"
          >
            {FEATURES.map((text) => (
              <div
                key={text}
                className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-zinc-300"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/15 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400 shrink-0">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — Real Google Map image + running cars */}
        <div
          data-hero-visual
          className="lg:col-span-6 relative w-full flex items-center justify-center min-h-[440px] sm:min-h-[520px]"
        >
          <div className="relative w-full max-w-[400px] h-[460px] sm:h-[520px] flex items-center justify-center">
            {/* Soft glow behind the map */}
            <div
              ref={bgGlowRef}
              className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.14)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.22)_0%,transparent_70%)] opacity-80"
            />

            {/* Map container */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-gray-200/70 dark:border-zinc-800/70 shadow-xl shadow-violet-500/5 dark:shadow-violet-900/25">
              {/* === DYNAMIC THEME MAP IMAGE === */}
              <img
                src={theme === "dark" ? MAP_IMAGE_DARK : MAP_IMAGE}
                alt="Live map of Ikeja"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                draggable={false}
              />

              {/* Overlay SVG for cars + pin (transparent) */}
              <svg
                viewBox="0 0 400 520"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {/* Hidden motion paths */}
                {ROADS.map((road, i) => (
                  <path
                    key={`ref-${road.id}`}
                    ref={(el) => (pathRefs.current[i] = el)}
                    d={road.d}
                    fill="none"
                    stroke="none"
                  />
                ))}

                {/* Destination pin */}
                <g ref={pinRef} transform="translate(200 255)">
                  <circle
                    ref={pinPulseRef}
                    cx="0"
                    cy="0"
                    r="5"
                    fill="#8b5cf6"
                    opacity="0.4"
                  />
                  <path
                    d="M 0 -28 C 11 -28 18 -20 18 -10 C 18 4 0 16 0 16 C 0 16 -18 4 -18 -10 C -18 -20 -11 -28 0 -28 Z"
                    className="fill-violet-600 dark:fill-violet-400"
                  />
                  <circle
                    cx="0"
                    cy="-11"
                    r="6"
                    className="fill-white dark:fill-zinc-900"
                  />
                </g>

                {/* Running cars */}
                {ROADS.map((road, i) => (
                  <g
                    key={`car-${road.id}`}
                    ref={(el) => (carRefs.current[i] = el)}
                  >
                    {/* Soft glow */}
                    <circle
                      ref={(el) => (glowRefs.current[i] = el)}
                      cx="0"
                      cy="0"
                      r="15"
                      fill="#8b5cf6"
                      opacity="0.22"
                    />
                    {/* GPS ring */}
                    <circle
                      ref={(el) => (gpsRefs.current[i] = el)}
                      cx="0"
                      cy="0"
                      r="5.5"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="1.5"
                      opacity="0.55"
                    />
                    {/* Car body */}
                    <rect
                      x="-6"
                      y="-11"
                      width="12"
                      height="20"
                      rx="5"
                      className="fill-white dark:fill-zinc-100 stroke-gray-300/80 dark:stroke-zinc-400"
                      strokeWidth="1"
                    />
                    {/* Windows */}
                    <rect
                      x="-3.5"
                      y="-7"
                      width="7"
                      height="5"
                      rx="1.6"
                      className="fill-zinc-800"
                    />
                    <rect
                      x="-3"
                      y="2.5"
                      width="6"
                      height="3.5"
                      rx="1.2"
                      className="fill-zinc-800"
                    />
                  </g>
                ))}
              </svg>
            </div>

            {/* Floating location card */}
            <div
              ref={cardRef}
              className="absolute -left-3 sm:-left-5 bottom-5 sm:bottom-8 z-20 w-[190px] sm:w-[215px] will-change-transform"
            >
              <div className="relative bg-[#6D28D9] backdrop-blur-xl rounded-2xl p-4 space-y-3.5 border border-gray-100/80 dark:border-zinc-800/80 shadow-lg shadow-violet-500/5 dark:shadow-black/40 overflow-hidden">
                <div className="relative space-y-1.5">
                  <div>
                    <p className="font-semibold text-[13px] text-white leading-tight">
                      Ikeja, Lagos, Nigeria
                    </p>
                    <p className="text-[11px] text-white mt-0.5">
                      234 Brass Avenue
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
