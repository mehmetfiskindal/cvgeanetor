import { defineConfig } from 'vite'
import { geaPlugin } from '@geajs/vite-plugin'

export default defineConfig({
  base: './',
  plugins: [geaPlugin()],
})
