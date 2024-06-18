/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary" : "#141414",
        "darkblue" : "#131c2d",
        "cherry" : "#ff0056",
        "darkred" : "#8b0000",
      }
    },
  },
  plugins: [],
}

