/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0c78fd',
        primaryDark: '#0358c1',
        primaryDarkLight: '#272727',
        lightGray: '#f5f5f5',
        textColor: '#0D0E10',
        lightText: '#c5c5c5',
        bgColor: '#f9f9f9'
      }
    },
  },
  plugins: [],
}
