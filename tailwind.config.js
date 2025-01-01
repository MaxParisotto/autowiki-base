/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/*.{css,scss}",
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.{js,vue,ts}",
    "./src/pages/**/*.{js,vue,ts}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'elevation-1': 'var(--elevation-1)',
        'elevation-2': 'var(--elevation-2)',
        'elevation-2-hover': 'var(--elevation-2-hover)',
        'elevation-3': 'var(--elevation-3, rgba(0,0,0,0.8))',
        'accent-orange': 'var(--accent-orange)',
        'accent-orange-dark': 'var(--accent-orange-dark)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'border-weak': 'var(--border-weak)',
        'error-text': 'var(--error-text, rgb(185,28,28))'
      },
      boxShadow: {
        'floating': '0 4px 12px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.shadow-floating': {
          'box-shadow': '0 4px 12px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.05)',
        }
      })
    }
  ]
}
