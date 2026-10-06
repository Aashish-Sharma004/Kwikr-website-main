/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f5f7f5',
          100: '#e1e4df',
          200: '#c1cad3',
          300: '#a0b1c2',
          400: '#809bb2',
          500: '#617d96',
          600: '#43607a',
          700: '#30455a',
          800: '#1d2a3c',
          900: '#0b131e',
        },
        primary: {
          DEFAULT: '#43607a',
          light: '#617d96',
          dark: '#30455a',
          50: '#f5f7f5',
        },
        secondary: {
          DEFAULT: '#f5a623',
          light: '#fbbf24',
          dark: '#d97706',
        },
        orange: {
          DEFAULT: '#f97316',
          light: '#fb923c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.12)',
        'green': '0 4px 20px rgba(67, 96, 122, 0.25)',
      },
    },
  },
  plugins: [],
}
module.exports = config
