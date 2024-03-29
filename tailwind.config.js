/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/components/buttons/Button.js"],
  theme: {
    extend: {
      colors: {
        labColor: {
          dark: "#1f8b44",
          DEFAULT: "#28b75a",
          400: "#28b75a80",
        },
        mainColor: {
          DEFAULT: "#265b6a",
        },
        buttonHover: {
          DEFAULT: "#f89235",
        },
        secondaryColor: {
          DEFAULT: "#5b8d9d",
        },
        secondaryLowColor: {
          DEFAULT: "#b0cdd6",
        },
        buttonOrange: {
          DEFAULT: "#f89235",
          low: "#f79b46",
        },
      },
      minHeight: {
        "42px": "42px",
      },
    },
  },
  plugins: [],
};
