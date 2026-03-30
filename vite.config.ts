import { defineConfig } from 'vite'
import { geaPlugin } from '@geajs/vite-plugin'

export default defineConfig({
  // GitHub Pages project site path: https://<user>.github.io/cvgeanetor/
  base: process.env.NODE_ENV === 'production' ? '/cvgeanetor/' : '/',
  plugins: [geaPlugin()],
})
