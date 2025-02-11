import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
      '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  },
  server: {
    port: 3000,
    proxy: {
      // with RegEx: http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
      '^/api/.*': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => {
          console.log(path)
          const p = path.replace(/^\/api/, "")
          console.log(p)
          return p
        }
      },
    },
  },
})
