/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary" : "#fff",
        "blue" : "#3575E2",
        "cherry" : "#ff0056",
        "darkred" : "#8b0000",
        textDecoration: ['active'],
      }
    },
  },
  plugins: [],
}

