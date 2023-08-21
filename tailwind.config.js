/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "main-background": "#0D1117",
        "header-background": "#010409",
        "header-underline": "#F78166",
        "header-text": "#FFF",
        "button-background": "#238636",
        "light-background": "#161B22",
        "light-light-background": "#21262D",
        "footer-text": "#D5D4CA",
        "green": "#238636"
      }
    },
  },
  plugins: [],
}
