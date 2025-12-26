/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        nb: {
          black: '#1a1a1a',
          white: '#fafafa',
          yellow: '#fde047',
          'yellow-dark': '#eab308',
          teal: '#2dd4bf',
          'teal-dark': '#14b8a6',
          orange: '#fb923c',
          'orange-dark': '#f97316',
          pink: '#f472b6',
          blue: '#38bdf8',
          green: '#4ade80',
          red: '#f87171',
          gray: '#e5e5e5',
          'gray-dark': '#a3a3a3',
        },
      },
      boxShadow: {
        'nb': '4px 4px 0px 0px #1a1a1a',
        'nb-sm': '2px 2px 0px 0px #1a1a1a',
        'nb-lg': '6px 6px 0px 0px #1a1a1a',
        'nb-hover': '6px 6px 0px 0px #1a1a1a',
        'nb-active': '2px 2px 0px 0px #1a1a1a',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
};
