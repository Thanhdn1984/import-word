import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Tự động phát hiện môi trường Replit
const isReplit = process.env.REPL_ID || process.env.REPLIT_DEPLOYMENT;

console.log('[Vite Config] REPL_ID:', process.env.REPL_ID);
console.log('[Vite Config] isReplit:', isReplit);

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    // LUÔN dùng allowedHosts: 'all' để tránh lỗi trên Replit
    allowedHosts: 'all',
    hmr: isReplit ? {
      clientPort: 443,
    } : true,
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
