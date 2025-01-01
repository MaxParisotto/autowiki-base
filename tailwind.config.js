/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'elevation-1': 'var(--elevation-1)',
        'elevation-2': 'var(--elevation-2)',
        'elevation-2-hover': 'var(--elevation-2-hover, rgba(255, 255, 255, 0.05))',
        'accent-orange': 'var(--accent-orange)',
        'accent-orange-dark': 'var(--accent-orange-dark, #e65100)',
        'text-primary': 'var(--text-primary)',
        'border-weak': 'var(--border-weak)'
      }
    }
  }
}
