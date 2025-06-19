/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        particleFloat: {
          '0%, 100%': {
            transform: 'translateY(0px) translateX(0px) scale(1)',
            opacity: '0.3',
          },
          '33%': {
            transform: 'translateY(-30px) translateX(20px) scale(1.1)',
            opacity: '0.6',
          },
          '66%': {
            transform: 'translateY(-60px) translateX(-10px) scale(0.9)',
            opacity: '0.4',
          },
        },
      },
      animation: {
        gradientShift: 'gradientShift 8s ease infinite',
        particleFloat: 'particleFloat 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
