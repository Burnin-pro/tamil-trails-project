export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#D97706',
        'brand-secondary': '#047857',
        'brand-accent': '#BE123C',
        'brand-dark': '#1F2937',
        'brand-light': '#F3F4F6'
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
