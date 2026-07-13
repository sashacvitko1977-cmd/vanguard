const http = require('http')
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const PORT = 5500
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.mp4': 'video/mp4',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
}

function serveFile(file, req, res) {
  const stat = fs.statSync(file)
  const ext = path.extname(file).toLowerCase()
  const range = req.headers.range

  if (range && ext === '.mp4') {
    const m = /bytes=(\d+)-(\d*)/.exec(range)
    if (m) {
      const start = Number(m[1])
      const end = m[2] ? Number(m[2]) : stat.size - 1
      if (start < stat.size) {
        res.writeHead(206, {
          'Content-Type': 'video/mp4',
          'Content-Length': end - start + 1,
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Accept-Ranges': 'bytes',
        })
        return fs.createReadStream(file, { start, end }).pipe(res)
      }
    }
  }

  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Content-Length': stat.size,
    'Accept-Ranges': 'bytes',
  })
  fs.createReadStream(file).pipe(res)
}

http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0])
  const rel = urlPath === '/' ? '/vanguard.html' : urlPath
  const file = path.normalize(path.join(ROOT, rel))

  if (!file.startsWith(ROOT)) {
    res.writeHead(403)
    return res.end('Forbidden')
  }

  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404)
      return res.end('Not found')
    }
    serveFile(file, req, res)
  })
}).listen(PORT, '127.0.0.1', () => {
  console.log(`VANGUARD -> http://localhost:${PORT}/vanguard.html`)
}).on('error', (err) => {
  console.error('Server error:', err.message)
  process.exit(1)
})