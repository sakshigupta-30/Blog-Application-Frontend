import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// SPA Fallback Plugin for client-side routing
const spaFallbackPlugin: Plugin = {
  name: 'spa-fallback',
  apply: 'serve',
  configResolved(config: any) {
    // Get the middlewares list
    return config;
  },
  configureServer(server: any) {
    return () => {
      server.middlewares.use((req: any, res: any, next: any) => {
        // Allow all /api requests to pass through
        if (req.url?.startsWith('/api')) {
          return next();
        }

        // For all other GET requests without file extensions, rewrite to /index.html
        if (req.method === 'GET' && !req.url?.includes('.')) {
          req.url = '/index.html';
        }

        next();
      });
    };
  },
};

export default defineConfig({
  plugins: [react(), spaFallbackPlugin],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: (import.meta as any).env?.VITE_API_URL ? ((import.meta as any).env.VITE_API_URL.replace(/\/api\/?$/, '') as string) : 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
    },
  },
})
