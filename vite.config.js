import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const isReplit = !!process.env.REPLIT_DEV_DOMAIN;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // To exclude specific polyfills, add them to this list.
      exclude: [
        'fs', // Excludes the 'fs' polyfill.
      ],
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: 'all',
    hmr: isReplit ? {
      protocol: 'wss',
      host: process.env.REPLIT_DEV_DOMAIN,
      clientPort: 443,
    } : true,
    open: false,
  },
  define: {
    'process.env': {}
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
