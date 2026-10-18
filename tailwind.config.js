/** @type {import('tailwindcss').Config} */
module.exports = {
  // HTML is generated from src/, so scan the templates and scripts rather than the output.
  content: ['./src/**/*.{js,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Inter Fallback', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
