import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    port : 8000,
  },
  build: {
    chunkSizeWarningLimit: 1000 // Increase from 500 KB to 1000 KB
  },
  optimizeDeps: {
    exclude: [],
  },
});
