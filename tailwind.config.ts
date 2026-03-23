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
          50: "#f4eaff",
          100: "#ead9ff",
          200: "#d7b8ff",
          300: "#be8dff",
          400: "#9a67e8",
          500: "#694cd0",
          600: "#573ab6",
          700: "#482f93",
          800: "#3b2675",
          900: "#341f60",
        },
        sunrise: {
          50: "#fff8dd",
          100: "#fff0b8",
          200: "#fde58b",
          300: "#f9d963",
          400: "#f4ce45",
          500: "#deb22d",
          600: "#be9222",
          700: "#99721e",
          800: "#7b5a1d",
          900: "#664b1b",
        },
        meadow: {
          50: "#f6e8ff",
          100: "#eedcff",
          200: "#e1c3ff",
          300: "#d2a7ff",
          400: "#bd86ff",
          500: "#a266f3",
          600: "#8750cf",
          700: "#6f41aa",
          800: "#5b3688",
          900: "#4a2d6c",
        },
        berry: {
          50: "#f2ebff",
          100: "#e6dbff",
          200: "#ccb7ff",
          300: "#b08eff",
          400: "#8f67de",
          500: "#7247bd",
          600: "#5f389f",
          700: "#4d2e80",
          800: "#412768",
          900: "#36224f",
        },
        cream: "#fff9ef",
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
