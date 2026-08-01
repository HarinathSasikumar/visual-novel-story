/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'Georgia', 'serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'lora': ['Lora', 'Georgia', 'serif'],
        'eb-garamond': ['"EB Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        cream: {
          50: '#FEFCF8',
          100: '#FAF6EF',
          200: '#F5EDD9',
          300: '#EDE0C4',
          400: '#DEC89A',
          500: '#C9A86C',
        },
        charcoal: {
          800: '#1A1814',
          900: '#0D0B07',
          950: '#070604',
        },
        gold: {
          300: '#F5D98B',
          400: '#E8C252',
          500: '#D4A017',
          600: '#B8861A',
        },
        sepia: {
          100: '#F4ECD8',
          200: '#E8D5B7',
          300: '#D4B896',
          400: '#B89A75',
          500: '#8B6E4E',
          600: '#5C4433',
          700: '#3D2B1F',
          800: '#2A1B12',
          900: '#1A0F08',
        },
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out forwards',
        'fade-in-slow': 'fadeIn 3s ease-in-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'leaf-fall': 'leafFall 8s linear infinite',
        'rain-fall': 'rainFall 0.8s linear infinite',
        'snow-fall': 'snowFall 5s linear infinite',
        'particle-drift': 'particleDrift 10s ease-in-out infinite',
        'page-turn': 'pageTurn 0.8s ease-in-out forwards',
        'book-open': 'bookOpen 1.5s ease-in-out forwards',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'golden-glow': 'goldenGlow 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        leafFall: {
          '0%': { transform: 'translateY(-100px) rotate(0deg)', opacity: '0.8' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
        },
        rainFall: {
          '0%': { transform: 'translateY(-20px)', opacity: '0.6' },
          '100%': { transform: 'translateY(100vh)', opacity: '0.2' },
        },
        snowFall: {
          '0%': { transform: 'translateY(-20px) translateX(0px)', opacity: '0.8' },
          '50%': { transform: 'translateY(50vh) translateX(30px)', opacity: '0.6' },
          '100%': { transform: 'translateY(100vh) translateX(-30px)', opacity: '0' },
        },
        particleDrift: {
          '0%': { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: '0.5' },
          '33%': { transform: 'translateY(-30px) translateX(20px) rotate(120deg)', opacity: '0.8' },
          '66%': { transform: 'translateY(-15px) translateX(-15px) rotate(240deg)', opacity: '0.6' },
          '100%': { transform: 'translateY(0) translateX(0) rotate(360deg)', opacity: '0.5' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        goldenGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 160, 23, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 160, 23, 0.5)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'warm': '0 4px 24px rgba(139, 90, 43, 0.15)',
        'warm-lg': '0 8px 48px rgba(139, 90, 43, 0.2)',
        'gold': '0 0 30px rgba(212, 160, 23, 0.3)',
        'inner-warm': 'inset 0 2px 16px rgba(139, 90, 43, 0.1)',
        'page': '4px 0 24px rgba(0,0,0,0.15), -4px 0 24px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}
