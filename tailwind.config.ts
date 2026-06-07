import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50:  "#EAF2ED",
          100: "#D4E6DA",
          200: "#A8CCBA",
          400: "#4D8463",
          500: "#3D6B4F",
          600: "#345C42",
          700: "#2A4A35",
          800: "#1F3828",
          900: "#1A2E22",
        },
        gold: {
          light: "#F0E4C0",
          DEFAULT: "#C9A44A",
          dark: "#8B6914",
        },
        cream: {
          50:  "#FAFAF7",
          100: "#F5F3EE",
          200: "#F0EDE6",
          300: "#E2DDD4",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
