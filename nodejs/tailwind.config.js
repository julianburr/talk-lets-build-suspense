/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontWeight: {
        default: "300",
        bold: "700",
      },
      fontFamily: {
        default: ["Poppins", "Open Sans", "sans-serif"],
        brand: ["Bungee", "sans-serif"],
      },
    },
  },
  plugins: [],
}