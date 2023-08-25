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
        "main-stroke": "#272E37",
        "footer-text": "#D5D4CA",
        "green-button": "#238636",
        "purple": "#733EC7",
        "blue": "#2876DE",
        "green-text": "#72B01D",
        "brown": "#FFA28B",
        "grey": "#747473",
      },
      boxShadow: {
        'purple': '0px 0px 20px 12px rgba(115, 62, 199, 1);',
      },
    },
  },
  plugins: [],
}
