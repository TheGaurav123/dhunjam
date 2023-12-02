/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        white: "#FFFFFF",
        black: "#030303",
        disabled: '#C2C2C2',
        radio: '#6741D9'
      }
    },
  },
  plugins: [],
}