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
        brand: {
          50: "#f0f8fb",
          100: "#dbeaf4",
          200: "#bce1f4",
          300: "#8ed1eb",
          400: "#5abce0",
          500: "#3194c1",
          600: "#26779e",
          700: "#1f5f7f",
          800: "#1a506a",
          900: "#174258",
        },
        sunrise: {
          50: "#fff5ef",
          100: "#fde3d6",
          200: "#facbb5",
          300: "#f7ad8d",
          400: "#f48c61",
          500: "#f0713b",
          600: "#e05a22",
          700: "#ba4213",
          800: "#943615",
          900: "#792e15",
        },
        meadow: {
          50: "#f8faf3",
          100: "#eff4e3",
          200: "#dee9c9",
          300: "#c6d8a4",
          400: "#afc290",
          500: "#9db33e",
          600: "#7a8e2e",
          700: "#5d6d25",
          800: "#4a5722",
          900: "#3f4a21",
        },
        berry: {
          50: "#fcf6fd",
          100: "#f6ebf9",
          200: "#eed6f3",
          300: "#e1b7e9",
          400: "#cd8cd8",
          500: "#994cac",
          600: "#843d96",
          700: "#6c327a",
          800: "#5a2a65",
          900: "#4a2552",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(12, 29, 70, 0.15)",
        glow: "0 18px 50px rgba(168, 85, 247, 0.18)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(0, -18px, 0) scale(1.03)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.65" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        drift: "drift 10s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
