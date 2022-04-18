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
        'creepz-purple-dark1': '#0f2347',
        'creepz-purple1': '#be80ff',
        'creepz-green-dark': '#0b302b',
        'creepz-green-light': '#8dff1f',
        'creepz-green1': '#73ff425c',
        'creepz-border': '#ffffff17',
        'creepz-border-dark': '#101820',
        'creepz-red': '#fa4b28',
        'creepz-purple': '#2e1556',
        'creepz-purple-darker': '#101820',
        'creepz-purple-dark': '#261736',
        'creepz-purple-light': '#452b6e',
        'creepz-purple-lighter': '#604a83',
        'creepz-purple-gray': '#675d72',
        'creepz-green': '#76e663',
        'creepz-blue': '#64f7f6',
        'creepz-blue-dark': '#24e4e4',
        'creepz-pink': '#f763c6',
        'creepz-pink-dark': '#df23a0',
      },
    },
  },
  plugins: [],
};
/* eslint-enable global-require */
