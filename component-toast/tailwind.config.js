/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'zoom-in': {
          from: { opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)'},
          '50%': {
            opacity: 1
          }
        },
        'zoom-out': {
          from: { opacity: 1 },
          '50%': {
            opacity: 0,
            transform: 'scale3d(0.3, 0.3, 0.3)'
          },
          to: {
            opacity: 0,
          }
        }
      },
      animation: {
        'zoom-enter': 'zoom-in 0.2 ease-in',
        'zoom-leave': 'zoom-out 0.2 ease-out'
      }
    },
  },
  plugins: [],
}