/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ed8',
        'primary-foreground': '#ffffff', // Replace with your desired color (e.g., Tailwind's indigo-500)
        background: '#1D4ed8', // Replace with your desired background color
        ring: '#93C5FD' // Add additional colors as needed
      }
    }
  },
  plugins: []
};
