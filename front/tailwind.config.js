/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      xs: { min: "300px", max: "650px" },
      sm: { min: "650px", max: "800px" },
      lg: { min: "800px", max: "1200px" },
      xl: { min: "1200px" },
    },
  },
  plugins: [],
};
