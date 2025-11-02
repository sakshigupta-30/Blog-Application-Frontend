import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: (import.meta as any).env?.VITE_API_URL ? ((import.meta as any).env.VITE_API_URL.replace(/\/api\/?$/, '') as string) : 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    // Add SPA fallback middleware
    middlewareMode: false,
    middlewares: [
      (req, res, next) => {
        // Allow all /api requests to pass through
        if (req.url?.startsWith('/api')) {
          return next();
        }
        
        // For all other non-file requests, serve index.html
        // This allows client-side routing to handle the path
        if (!req.url?.includes('.') && req.method === 'GET') {
          req.url = '/index.html';
        }
        next();
      },
    ],
  },
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
    },
  },
})
