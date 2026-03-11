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
          50: "#eef5ff",
          100: "#d9e8ff",
          200: "#bcd7ff",
          300: "#8bbbff",
          400: "#5799ff",
          500: "#2f78ff",
          600: "#1f5de5",
          700: "#1c4ac9",
          800: "#1d3ea2",
          900: "#1d377f",
        },
        sunrise: {
          50: "#fff5ef",
          100: "#ffe7d7",
          200: "#ffd0b0",
          300: "#ffb07d",
          400: "#ff8e4c",
          500: "#ff7125",
          600: "#f25510",
          700: "#c9400f",
          800: "#a03514",
          900: "#822f15",
        },
        meadow: {
          50: "#edfff7",
          100: "#d4ffed",
          200: "#adf7d7",
          300: "#74eab9",
          400: "#39d297",
          500: "#16b97f",
          600: "#0d9566",
          700: "#0d7654",
          800: "#105e45",
          900: "#104d3a",
        },
        berry: {
          50: "#fff1fb",
          100: "#ffe4f8",
          200: "#ffc8f1",
          300: "#ff9ee4",
          400: "#ff68d1",
          500: "#f63bb8",
          600: "#de1d98",
          700: "#ba1779",
          800: "#981661",
          900: "#7d1852",
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
