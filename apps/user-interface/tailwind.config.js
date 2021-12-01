const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const colors = require('tailwindcss/colors')

module.exports = {
  purge: createGlobPatternsForDependencies(__dirname),
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'cgray': colors.trueGray
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};