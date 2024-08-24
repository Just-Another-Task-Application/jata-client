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
        primary: {
          '50': '#f4f9fb',
          '100': '#e8f1f6',
          '200': '#cce3eb',
          '300': '#88c0d0', // main
          '400': '#6cb2c4',
          '500': '#4a98ad',
          '600': '#387c91',
          '700': '#2e6376',
          '800': '#295563',
          '900': '#274753',
          '950': '#1a2e37',
        },
        dark: {
          '50': '#f6f7f9',
          '100': '#eceef2',
          '200': '#d5dae2',
          '300': '#b0bac9',
          '400': '#8494ac',
          '500': '#657792',
          '600': '#505f79',
          '700': '#424d62',
          '800': '#394253',
          '900': '#2e3440', // main
          '950': '#22262f',
        }
      },
      fontFamily: {
        'raleway': '"Raleway", sans-serif',
        'lobster': '"Lobster", sans-serif',
        'montserrat-alternates': '"Montserrat Alternates", sans-serif',
        'montserrat': '"Montserrat", sans-serif',
        'poppins': '"Poppins", sans-serif',
        'platypi': '"Platypi", serif',
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
      }
    },
  },
  plugins: [],
}

