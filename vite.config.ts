import { copyFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

function spaFallback(): Plugin {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      copyFileSync(
        fileURLToPath(new URL('./dist/index.html', import.meta.url)),
        fileURLToPath(new URL('./dist/404.html', import.meta.url)),
      )
    },
  }
}

export default defineConfig({
  plugins: [vue(), spaFallback()],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
