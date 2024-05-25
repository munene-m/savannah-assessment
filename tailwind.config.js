/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: '#f2b705'
      }
    }
  },
  plugins: [daisyui],
  // plugins: [require("daisyui")],
  daisyui: {
    themes: ['light']
  }
}
