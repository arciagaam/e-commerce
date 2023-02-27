module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('../public/images/hero.png')",
      }
    },
    fontFamily: {
      display: ['Lora', 'serif']
    }
  },
  plugins: [],
}