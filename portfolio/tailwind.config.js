import fluid, {extract} from "fluid-tailwind"

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
    },
  },
  plugins: [require("tailwindcss-animate")],
};
