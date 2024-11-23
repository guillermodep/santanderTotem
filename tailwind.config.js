/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        santander: {
          red: '#EC0000',
          'dark-red': '#D10000',
          'light-red': '#FFF5F5',
          'warm-gray': '#FEF6F6',
          'soft-red': '#FFF1F1',
          'bg-primary': '#FFF9F9',
          'bg-secondary': '#FFF0F0'
        }
      },
      spacing: {
        '18': '4.5rem',
      },
      fontSize: {
        '2.5xl': '1.75rem',
      }
    },
  },
  plugins: [],
};