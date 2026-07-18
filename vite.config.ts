import { copyFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import type { Plugin } from 'vite'
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
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
  },
})
