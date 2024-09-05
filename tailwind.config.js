import palette from './src/palette';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  important: 'body',
  corePlugins: {
    preflight: true,
  },
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        ...palette,
      },
      fontFamily: {
        'gta': '"BankGothic", sans-serif',
        'gta-2': '"Pricedown Bl", sans-serif',
        'raleway': '"Raleway", sans-serif',
        'lobster': '"Lobster", sans-serif',
        'montserrat-alternates': '"Montserrat Alternates", sans-serif',
        'montserrat': '"Montserrat", sans-serif',
        'poppins': '"Poppins", sans-serif',
        'platypi': '"Platypi", serif',
      },
      fontWeight: {
        inherit: 'inherit',
      },
      animation: {
        progress: 'progress 1s infinite linear',
      },
      keyframes: {
        progress: {
          '0%': { transform: ' translateX(0) scaleX(0)' },
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(0.5)' },
        },
      },
      transformOrigin: {
        'left-right': '0% 50%',
      },
      textStroke: {
        stroke: '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black'
      }
    },
  },
  plugins: [],
}

