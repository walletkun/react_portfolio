import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
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
        sans: ["var(--font-jakarta)", "system-ui"],
        display: ["var(--font-outfit)", "system-ui"],
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
  plugins: [tailwindAnimate],
};
