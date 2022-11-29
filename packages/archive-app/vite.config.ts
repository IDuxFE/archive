import { defineConfig } from 'vite'
import vue  from '@vitejs/plugin-vue'
import pkg from './package.json'

const external = [...Object.keys(pkg.dependencies), 'vue', 'vue-router', /^@idux/, /^virtual\:archive/]

export default defineConfig({
  plugins: [vue()],

  build: {
    emptyOutDir: false,
    outDir: 'dist',
    lib: {
      entry: '',
      formats: ['es'],
    },
    rollupOptions: {
      external,

      input: ['./index.ts'],

      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
        // preserveModules: true,
        // preserveModulesRoot: 'src/app',
      },
      treeshake: true,
      preserveEntrySignatures: 'strict',
    },
    cssCodeSplit: false,
    minify: false,
  },
})