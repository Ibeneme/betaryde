/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Parkinsans'", "sans-serif"],
        body: ["'General Sans'", "sans-serif"],
      },
      colors: {
        brand: {
          start: "#6D28D9",
          mid: "#7C3AED",
          end: "#5B21B6",
        },
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(124, 58, 237, 0.45)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(90deg, #6D28D9 0%, #7C3AED 50%, #5B21B6 100%)",
      },
    },
  },
  plugins: [],
};
