import { defineConfig } from 'vite'
import { geaPlugin } from '@geajs/vite-plugin'

export default defineConfig(({ mode }) => ({
  // Default production target is GitHub Pages project site.
  // Use `vite build --mode netlify` for Netlify/root deploys.
  base: mode === 'netlify' ? '/' : mode === 'production' ? '/cvgeanetor/' : '/',
  plugins: [geaPlugin()],
}))
