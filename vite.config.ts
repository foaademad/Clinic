import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'https://clinic-gules-theta.vercel.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
