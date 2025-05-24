/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'clo': '#6FE6FC'
      },
      width: {
        '50': '50px',
        '60': '60px',
        '90': '90px',
        '100': '100px',
        '150': '150px',
      }
    },
  },
  plugins: [],
}