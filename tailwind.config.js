/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Rubik', 'Arial', 'sans-serif'],
    },
  },
  plugins: [
    // function ({ addVariant }) {
    //   addVariant('child', '& > *')
    //   addVariant('child-hover', '& > *:hover')
    // },
  ],
}
