import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.tsx'),
      // entry: path.resolve(__dirname, 'src/App.tsx'),
      name: 'usc401s24_mapping-components',
      fileName: (format) => `usc401s24_mapping-components.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React'
        }
      }
    },
    outDir: "dist"
  },
  plugins: [react()],
})
