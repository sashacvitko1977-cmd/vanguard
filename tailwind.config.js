/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        podium: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        hero: '0.3em',
      },
      boxShadow: {
        neon: '0 0 24px rgba(255, 255, 255, 0.18), 0 0 48px rgba(124, 58, 237, 0.12)',
        'neon-sm': '0 0 16px rgba(255, 255, 255, 0.12)',
      },
    },
  },
  plugins: [],
}