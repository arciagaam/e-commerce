module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('../public/images/hero.png')",
      },
      colors : {
        primary: '#EFE3D9',
        accent: {
          default: '#DF687D',
          light : '#FAEBEE',
          dark : '#3B0C15'
        }
      },
      animation : {
        'toast' : 'toast 3s ease-in-out'
      },
      keyframes : {
        toast : {
          '0%' : {transform: 'translateY(0)'},
          '25%' : {transform: 'translateY(calc(100% + 120px))'},
          '75%' : {transform: 'translateY(calc(100% + 120px))'},
          '100%' : {transform: 'translateY(0)'},
        }
      }
    },
    fontFamily: {
      display: ['Lora', 'serif']
    }
  },
  plugins: [],
}