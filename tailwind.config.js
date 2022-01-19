/* eslint-disable global-require */

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ['Amatic SC'],
        sans: ['Courier Prime', 'sans-serif'],
      },
      colors: {
        'creepz-purple-dark': '#0f2347',
        'creepz-purple': '#be80ff',
        'creepz-green-dark': '#0b302b',
        'creepz-green-light': '#8dff1f',
        'creepz-green': '#73ff425c',
        'creepz-border': '#ffffff17',
        'creepz-border-dark': '#101820',
        'creepz-red': '#fa4b28',
      },
    },
  },
  plugins: [],
};
/* eslint-enable global-require */
