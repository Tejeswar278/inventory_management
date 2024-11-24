/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c3e50',
        secondary: '#d8e2e5',
        accent: '#f26522',
        btnbckg: '#ecf0f1',
        btntext: '#2c3e50',
        sidebckg: '#34495e',
        sidenavtext: '#ecf0f1',
        sidenavactivetext: '#e74c3c'
    }
    },
  },
  plugins: [],
}

