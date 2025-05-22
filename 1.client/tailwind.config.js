/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      fontFamily: {
        dmSans: ["DM Sans", "sans-serif"],
        rajd: ["Rajdhani", "sans-serif"],
      },
      colors: {
        khaki: {
          DEFAULT: "#ccb69b",
          100: "#2f2518",
          200: "#5e4a31",
          300: "#8d6f49",
          400: "#b3926b",
          500: "#ccb69b",
          600: "#d5c4ae",
          700: "#e0d3c2",
          800: "#eae1d7",
          900: "#f5f0eb",
        },
        customGreen: '#A8DDC0',
        customGreenDark: '#97cbb2',
      },
    },
  },
  plugins: [],
};
