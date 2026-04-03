import { defineConfig } from 'vite'
import { geaSSR } from '@geajs/ssr/vite'
import { geaPlugin } from '@geajs/vite-plugin'

export default defineConfig(({ mode }) => {
  const useSSR = mode === 'ssr'

  return {
    base: '/',
    plugins: [geaPlugin(), ...(useSSR ? [geaSSR({ serverEntry: './src/entry-server.ts' })] : [])],
  }
})
