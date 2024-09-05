import { defineConfig } from 'vite'
import { resolve, } from 'node:path';

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000
  },
  resolve: {
    alias: {
      '@root': resolve(__dirname, './'),
      '@ioc': resolve(__dirname, './src/ioc'),
      '@apps': resolve(__dirname, './src/apps/'),
      '@pcu': resolve(__dirname, './src/apps/PCU'),
      '@landing': resolve(__dirname, './src/apps/Landing'),
      '@assets': resolve(__dirname, './src/assets'),
      '@Shared': resolve(__dirname, './src/apps/Shared'),
      '@types': resolve(__dirname, './src/apps/Shared/types'),
      '@theme': resolve(__dirname, './src/apps/Shared/Theme'),
      '@Layout': resolve(__dirname, './src/apps/Shared/Layout'),
      '@Components': resolve(__dirname, './src/apps/Shared/Components'),
    },
  },
});
