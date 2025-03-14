import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vue({
      // Enable Vue SFC support
      include: [/\.vue$/],
      // Custom element support
      template: {
        compilerOptions: {
          // Treat all tags with a dash as custom elements
          isCustomElement: tag => tag.includes('-')
        }
      }
    })
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});