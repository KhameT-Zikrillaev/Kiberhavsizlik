/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      screens:{
        p320: '320px',
        p480:'480px',
        p768:'768px',
        p992:'992px',
        p1024:'1024px',
        p1200:'1200px',
        p1440:'1440px',    
      }, 
    },
  },
  plugins: [],
};