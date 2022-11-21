/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        corben: ['"Corben"', "sans-serif"],
        zeyada: ['"Zeyada"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
