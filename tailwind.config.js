/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        doctorLight: '#e0f7fa', // Light Blue
        doctorDark: '#00796b',  // Dark Blue-Green
        doctorWhite: '#f5f5f5', // Soft White
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}