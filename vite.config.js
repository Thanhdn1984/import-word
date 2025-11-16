import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Tự động phát hiện môi trường Replit
const isReplit = process.env.REPL_ID || process.env.REPLIT_DEPLOYMENT;

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    // Chỉ dùng allowedHosts và port 443 trên Replit
    ...(isReplit ? {
      allowedHosts: ['all'],
      hmr: {
        clientPort: 443,
      },
    } : {
      // Local: Không cần config đặc biệt
      hmr: true,
    }),
    // Không tự động mở browser (tránh nhầm lẫn với Electron)
    open: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
  },
});
