/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primaryBg: '#F4F7FC', 
      whiteText: '#000000',  
    },
    fontSize : {
      'header': '32px'
    }
  },
  plugins: [],
}

