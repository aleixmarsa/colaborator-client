/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'labColor': {
          dark:'#1f8b44',
          DEFAULT: '#28b75a',
          400: "#28b75a80"
        },
      },
    },

  },
  plugins: [],
}
