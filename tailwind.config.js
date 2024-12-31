import headlessui from '@headlessui/tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'canvas': 'var(--bg-canvas)',
        'elevation': {
          1: 'var(--bg-elevation-1)',
          2: 'var(--bg-elevation-2)',
          3: 'var(--bg-elevation-3)',
        },
        'accent': {
          orange: 'var(--accent-orange)',
          'orange-dark': 'var(--accent-orange-dark)',
        },
        'border-weak': 'rgba(0, 0, 0, 0.1)',
        'elevation-2': '#ffffff',
        'info-text': 'var(--info-text)',
        'success-text': 'var(--success-text)',
        'warning-text': 'var(--warning-text)',
        'error-text': 'var(--error-text)',
      },
      opacity: {
        '10': '0.1',
        '20': '0.2',
      },
      boxShadow: {
        'subtle': 'var(--shadow-subtle)',
        'elevated': 'var(--shadow-elevated)',
        'floating': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'slide-up': 'slideUp 0.2s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'fade-out': 'fadeOut 0.2s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      textColor: {
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
      },
      ringOffsetColor: {
        'bg-canvas': 'var(--bg-canvas)',
      },
      borderColor: {
        'border-weak': 'var(--border-weak)',
        'border-medium': 'var(--border-medium)',
        'border-strong': 'var(--border-strong)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@headlessui/tailwindcss'),
    function({ addBase }) {
      addBase({
        'html': { backgroundColor: 'var(--bg-canvas)' },
        'html.dark': {
          backgroundColor: 'var(--bg-canvas)',
          color: 'var(--text-primary)',
        }
      })
    }
  ],
}
