import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Cambiado para Netlify (no '/LIA-SML/')
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ayuda con problemas de MIME type
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // Asegura extensiones correctas en archivos
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
})