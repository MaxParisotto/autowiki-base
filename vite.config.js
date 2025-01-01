import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['mysql2', 'redis'] // Exclude server-only dependencies
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.js')
      }
    },
    commonjsOptions: {
      exclude: ['mysql2', 'redis'] // Also exclude from bundling
    }
  }
})
