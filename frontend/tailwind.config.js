/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greenCustom: '#4a904f', // Add your custom color
      },
      keyframes: {  
        fadeInScale: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: { 
        fadeInScale: 'fadeInScale 1.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}