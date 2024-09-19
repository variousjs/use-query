import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: './dist',
    rollupOptions: {
      external: ["react", "react-router-dom"],
      output: {
        exports: 'named',
      },
    },
    minify: false,
    lib: {
      entry: './src/use-query/index.ts',
      formats: ['cjs', 'es'],
      fileName: 'index',
    },
  },
})
