import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ include: [/\.(vue|md)$/] }),
  ],
  build: {
    rollupOptions: {
      external: [
        'vue',
        /^@idux\/components/,
      ]
    }
  },
  server: { hmr: true },
})
