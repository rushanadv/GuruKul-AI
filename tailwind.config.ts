import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#050706",
          900: "#070909",
          850: "#090D0C",
          800: "#0C1110",
        },
        emerald: {
          primary: "#39F5B5",
          soft: "#1BBF8A",
          dim: "rgba(57, 245, 181, 0.12)",
          glow: "rgba(57, 245, 181, 0.35)",
        },
        starlight: {
          pure: "#F4F7F5",
          muted: "rgba(244, 247, 245, 0.55)",
          dim: "rgba(244, 247, 245, 0.32)",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.045em",
        tight: "-0.02em",
        monoWide: "0.15em",
      },
      boxShadow: {
        "glow-emerald": "0 0 25px -3px rgba(57, 245, 181, 0.45), 0 0 10px -2px rgba(57, 245, 181, 0.3)",
        "glow-emerald-lg": "0 0 45px -5px rgba(57, 245, 181, 0.5), 0 0 20px -2px rgba(57, 245, 181, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
