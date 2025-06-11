const FluidType = require('tailwindcss-fluid-type')

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "**/*.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cream': 'rgb(var(--color-cream) / 1)',
        'cream-70': 'rgb(var(--color-cream) / 0.7)',
        'black': 'rgb(var(--color-black) / 1)',
        'black-70': 'rgb(var(--color-black) / 0.7)',
      },
      fontFamily: {
        'dm-serif': ['DM Serif Display', 'serif']
      }
    },
    fluidType: {
      settings: {
        fontSizeMin: 1.125,
        fontSizeMax: 1.25,
        ratioMin: 1.125,
        ratioMax: 1.2,
        screenMin: 20,
        screenMax: 96,
        unit: 'rem',
        prefix: ''
      },
      values: {
        'xs': [-2, 1.6],
        'sm': [-1, 1.6],
        'base': [0, 1.6],
        'lg': [1, 1.6],
        'xl': [2, 1.2],
        '2xl': [3, 1.2],
        '3xl': [4, 1.2],
        '4xl': [5, 1.1],
        '5xl': [6, 1.1],
        '6xl': [7, 1.1],
        '7xl': [8, 1],
        '8xl': [9, 1],
        '9xl': [10, 1],
      }
    },
    fill: ({ theme }) => ({
      cream: theme('colors.cream'),
      black: theme('colors.black'),
    }),
  },
  plugins: [FluidType],
}
