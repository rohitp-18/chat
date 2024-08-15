/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      sm: { min: "300px", max: "700px" },
      md: { min: "700px", max: "900px" },
      lg: { min: "900px", max: "1200px" },
      xl: { min: "1200px" },
    },
  },
  plugins: [],
};
