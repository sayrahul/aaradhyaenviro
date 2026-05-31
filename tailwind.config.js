/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './services/**/*.html',
    './assets/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#f97316',
          red: '#dc2626'
        }
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
      }
    },
  },
  plugins: [],
  // Safelist important dynamic classes
  safelist: [
    'translate-x-0',
    'translate-x-full',
    '-translate-y-2',
    'opacity-0',
    'opacity-100',
    'invisible',
    'visible'
  ]
}
