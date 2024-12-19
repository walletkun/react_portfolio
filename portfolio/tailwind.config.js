const fluid = require("fluid-tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Primary font for most text
        sans: ["var(--font-jakarta)", "system-ui"],
        // Modern display font for headings
        display: ["var(--font-outfit)", "system-ui"],
        // Accent font for special elements
        accent: ["var(--font-raleway)", "system-ui"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-10px) translateX(10px)" },
          "50%": { transform: "translateY(-20px) translateX(-10px)" },
          "75%": { transform: "translateY(-10px) translateX(-5px)" },
        },
        glow: {
          "0%, 100%": {
            filter: "brightness(1) drop-shadow(0 0 2px rgba(0, 0, 0, 0.1))",
          },
          "50%": {
            filter: "brightness(1.2) drop-shadow(0 0 5px rgba(0, 0, 0, 0.2))",
          },
        },
      },
      animation: {
        float: "float 15s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
