import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Readable } from 'node:stream'

import handler from './dist/server/entry-server.js'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
const distDir = join(rootDir, 'dist')
const port = Number(process.env.PORT || 3000)
const host = process.env.HOST || '0.0.0.0'

let indexHtml
try {
  indexHtml = await readFile(join(distDir, 'index.html'), 'utf8')
} catch {
  console.error('[server] dist/index.html not found. Run "npm run build:ssr" first.')
  process.exit(1)
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json'
}

const hopByHopHeaders = new Set([
  'connection',
  'keep-alive',
  'transfer-encoding',
  'upgrade',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'trailers'
])

async function serveStatic(pathname, res) {
  const relative = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, '')
  const filePath = join(distDir, relative)
  if (!filePath.startsWith(distDir + sep) && filePath !== distDir) return false

  let fileStat
  try {
    fileStat = await stat(filePath)
  } catch {
    return false
  }
  if (!fileStat.isFile()) return false

  const data = await readFile(filePath)
  res.writeHead(200, {
    'content-type': mimeTypes[extname(filePath).toLowerCase()] || 'application/octet-stream',
    'content-length': data.length,
    'cache-control': pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache'
  })
  res.end(data)
  return true
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)

    if (
      url.pathname.startsWith('/assets/') ||
      url.pathname === '/favicon.ico' ||
      /\.[a-zA-Z0-9]+$/.test(url.pathname)
    ) {
      const served = await serveStatic(url.pathname, res)
      if (served) return
    }

    const headers = {}
    for (const [key, value] of Object.entries(req.headers)) {
      if (!hopByHopHeaders.has(key.toLowerCase())) headers[key] = value
    }

    const request = new Request(url.href, {
      method: req.method,
      headers,
      body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req,
      duplex: 'half'
    })

    const response = await handler(request, { indexHtml })

    const responseHeaders = {}
    response.headers.forEach((value, key) => {
      if (!hopByHopHeaders.has(key.toLowerCase())) responseHeaders[key] = value
    })

    res.writeHead(response.status, responseHeaders)

    if (!response.body) {
      res.end()
      return
    }
    Readable.fromWeb(response.body).pipe(res)
  } catch (error) {
    console.error('[server] Request failed:', error)
    if (!res.headersSent) res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' })
    res.end('Internal Server Error')
  }
})

server.listen(port, host, () => {
  console.log(`[server] cvgeanetor SSR listening on http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`)
})
