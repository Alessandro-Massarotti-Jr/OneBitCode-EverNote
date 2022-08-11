/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors:{
        custom:{
          400:'#694ed8',
          600:'#6600cc',
        },
        darkFade:{
          500:'rgba(0,0,0,0.5)',
          700:'rgba(0,0,0,0.7)'
        }
      }
    },
  },
  plugins: [],
}
