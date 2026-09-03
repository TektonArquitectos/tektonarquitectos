import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bone:      "#F5F5F0",
        carbon:    "#222222",
        "green-cta":  "#34C759",
        "green-arch": "#1F8F4D",
        gold:      "#C9A86A",
        titanium:  "#6E7175",
      },
      fontFamily: {
        display: ["var(--font-exo2)", "sans-serif"],
        body:    ["var(--font-raleway)", "sans-serif"],
        accent:  ["var(--font-montserrat)", "sans-serif"],
      },
      animation: {
        "ken-burns-1": "kenBurns1 14s ease-in-out infinite alternate",
        "ken-burns-2": "kenBurns2 14s ease-in-out infinite alternate",
        "ken-burns-3": "kenBurns3 14s ease-in-out infinite alternate",
        "pulse-wa": "pulseWa 2.5s ease-in-out infinite",
        "bounce-arrow": "bounceArrow 1.5s ease-in-out infinite",
      },
      keyframes: {
        kenBurns1: { "0%": { transform: "scale(1) translate(0,0)" }, "100%": { transform: "scale(1.12) translate(-2%,-1%)" } },
        kenBurns2: { "0%": { transform: "scale(1.25) translate(0,0)" }, "100%": { transform: "scale(1.05) translate(2%,-2%)" } },
        kenBurns3: { "0%": { transform: "scale(1) translate(1%,0)" }, "100%": { transform: "scale(1.1) translate(-1%,-2%)" } },
        pulseWa:   { "0%,100%": { boxShadow: "0 4px 15px rgba(37,211,102,0.4)" }, "50%": { boxShadow: "0 8px 25px rgba(37,211,102,0.7)", transform: "scale(1.06)" } },
        bounceArrow: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(8px)" } },
      },
    },
  },
  plugins: [],
};
export default config;
