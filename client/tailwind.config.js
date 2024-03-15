/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '1.5rem',
          xl: '6rem',
        },
      },
      colors: {
        brand: '#FF8000',
        blue: '#1574F5',
        green: {
          DEFAULT: '#205A6D',
          dark: '#0A3847',
        },
        grey: {
          DEFAULT: '#F8F5F2',
          dark: '#D7D7D7',
        },
      },
      boxShadow: {
        DEFAULT:
          '0px 1px 8px 0px #1D21371F, 0px 3px 4px 0px #1D213724, 0px 3px 3px 0px #1D21371F',
      },
    },
  },
  plugins: [],
}
