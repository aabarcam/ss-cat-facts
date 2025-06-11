// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    // ... your project files, eg.:
    // './index.html',
    // './src/**/*.{vue,js,ts,jsx,tsx}',
    './vueform.config.js', // or where `vueform.config.js` is located. Change `.js` to `.ts` if required.
    './node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
    './node_modules/@vueform/vueform/themes/tailwind/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('@vueform/vueform/tailwind'),
  ]
}