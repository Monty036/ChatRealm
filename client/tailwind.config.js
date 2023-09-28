/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', ...defaultTheme.fontFamily.sans],
        'right': ['Righteous', ...defaultTheme.fontFamily.sans],
        'slab':['Roboto Slab',...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}

