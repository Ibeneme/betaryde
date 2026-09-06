# BetaRyde Landing Page

Production-ready, mobile-first landing page built with React + Vite +
TypeScript + Tailwind CSS + GSAP.

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/
    sections/       # 7 standalone, exportable page sections
      Navbar.tsx
      HeroSection.tsx
      FeaturesSection.tsx
      ServicesSection.tsx
      PricingSection.tsx
      TestimonialsSection.tsx
      CTAFooterSection.tsx
    ui/             # Shared, reusable primitives
      Button.tsx
      Card.tsx
      useScrollReveal.ts
  pages/
    Home.tsx        # Composes all 7 sections
  index.css
  main.tsx
```

## Notes

- Every section is self-contained: it owns its copy, its layout, and its
  GSAP timeline (either via the shared `useScrollReveal` hook or a custom
  `gsap.context` block, as in `HeroSection` and `PricingSection`). No
  section depends on another to render or animate correctly.
- Fonts: **Space Grotesk** for headings, **General Sans** for body text,
  loaded via Google Fonts / Fontshare in `index.html` with a system-font
  fallback in `index.css`.
- Colors: primary gradient `#6D28D9 → #7C3AED → #5B21B6`, applied via
  Tailwind's arbitrary-value gradient utilities and a `brand-gradient`
  background-image token in `tailwind.config.js`.
- No custom CSS files — all styling is Tailwind utility classes.
# betaryde
