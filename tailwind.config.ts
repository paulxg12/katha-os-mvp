import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: "#FDF7F0",
          card: "#FFFBF5",
          border: "#F0E6D8",
          dark: "#EADCC9",
        },
        ochre: {
          DEFAULT: "#944403",
          dark: "#753400",
          light: "#FFB68B",
          container: "#B35C1E",
          fixed: "#FFDBC9",
        },
        indigo: {
          brand: "#4E5D8C",
          dark: "#445281",
          light: "#B9C7FD",
          fixed: "#DBE1FF",
        },
        terracotta: {
          DEFAULT: "#9B3D2A",
          container: "#BB543F",
          light: "#FFB4A5",
        },
        saffron: "#E08A00",
        turmeric: "#F59E0B",
        charcoal: {
          DEFAULT: "#001F29",
          muted: "#554339",
          dark: "#00141C",
        },
      },
      fontFamily: {
        serif: ["Helvetica", "Helvetica Neue", "Arial", "sans-serif"],
        sans: ["Helvetica", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["Helvetica", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        organic: "0 10px 30px -10px rgba(78, 93, 140, 0.12)",
        "organic-lg": "0 16px 40px -12px rgba(78, 93, 140, 0.18)",
        tactile: "inset 0 2px 4px rgba(0,0,0,0.06), 0 10px 25px -5px rgba(78, 93, 140, 0.1)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "glow-pulse": "glow-pulse 1.5s ease-in-out infinite",
        "count-up": "count-up 2s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(148, 68, 3, 0.6)",
          },
          "50%": {
            boxShadow: "0 0 0 18px rgba(148, 68, 3, 0)",
          },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "60%": { opacity: "1", transform: "scale(1.1)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
export default config
