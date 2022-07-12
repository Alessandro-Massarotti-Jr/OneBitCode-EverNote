/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors:{
        custom:{
          400:'#694ed8',
          600:'#6600cc',
        }
      }
    },
  },
  plugins: [],
}
