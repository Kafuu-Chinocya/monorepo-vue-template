import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' as const
        }
      }
    },
    plugins: [vue(), vueJsx()],
    build: { sourcemap: true }
  }
})
