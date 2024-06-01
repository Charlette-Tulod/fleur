/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      gridTemplateColumns: {
        '30/70': '28% 70%',
      },
    },
    colors: {
      rose: '#ffe4e6',
      darkerrose: '#fda4af',
      brown: '#754328',
      lightrose: '#fff1f2',
      cwhite: '#ffffff',
      red: '#ef4444',
    },
  },
  plugins: [],
};
