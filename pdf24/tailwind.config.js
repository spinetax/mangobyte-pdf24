/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "neutral-200": "#C1C1C1",
        "neutral-700": "#585858",
        "neutral-800": "#232323",
        "neutral-900": "#000000",

        "primary-200": "#EFF6FF",
        "primary-400": "#73B2FF",
        "primary-500": "#69829E",
        "primary-600": "#327FDE",
        "primary-700": "#69829E",

        "secondary-500": "#F9B66D",
      },
      fontFamily: {
        istok: ["Istok Web", "sans"],
      },
    },
  },
  plugins: [],
};
