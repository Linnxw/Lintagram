export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'inter':['Inter'],
      'poppin':['Poppins'],
      'kaushan':['Kaushan Script']
    },
    extend: {
      colors:{
        primary:'#000000',
        second:'#262626',
        textSecond:'#999999',
        blueSecond:'#002D4A',
        bluePrimary:'#0195F7',
        bgError:'#DC404D',
        textError:'#B42E39'
      }
    },
  },
  plugins: [],
}