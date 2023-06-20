import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ include: [/\.(vue|md)$/] }),
  ],
  server: { hmr: true },
  resolve: {
    alias: [
      { find: '@demos', replacement: resolve(__dirname, './demos') }
    ],
  }
})
