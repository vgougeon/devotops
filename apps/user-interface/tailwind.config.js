const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [
    'apps/user-interface/src/**/*.{js,jsx,ts,tsx}',
    createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};