/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'primary-violet': '#B3C4FF',
        'primary-blue': '#083A88',
        'primary-yellow': '#FFF9AD',
        'custom-mint': '#BFFFB9',
        'custom-blue': '#B3C4FF',
        'custom-purple': '#AD90DC',
        'custom-peach': '#F9BBBB',
      },
      fontFamily: {
        "inter": ["Inter", "sans-serif"],
        "abeezee": ["ABeeZee", "sans-serif"],
        "philosopher": ["Philosopher", "sans-serif"]
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
