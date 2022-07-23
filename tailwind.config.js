/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/buttons/Button.js"

  ],
  theme: {
    extend: {
      colors:{
        'labColor': {
          dark:'#1f8b44',
          DEFAULT: '#28b75a',
          400: "#28b75a80"
        },
        'mainColor': {
          DEFAULT: '#029102'
        },
        'buttonColor': {
          'DEFAULT': '#005a00'
        },
        'buttonHoverColor': {
          'DEFAULT': '#8aa38a'
        }
        

      },
      minHeight: {
        '42px': '42px',
       }
    },

  },
  plugins: [],

  // safelist: [
  //   "hover:bg-lime-700"
  //   ]
}
