import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  plugins: [
    createVuePlugin({
      include: [/\.vue$/, /\.md$/],
      vueTemplateOptions: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      }
    }),
  ],
  build: {
    rollupOptions: {
      external: ['vue', /^@idux\/components/],
    },
  },
  server: { hmr: true },
})
