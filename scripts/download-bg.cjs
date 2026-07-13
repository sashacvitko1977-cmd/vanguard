const https = require('https')
const fs = require('fs')
const path = require('path')

const OUT = path.join(__dirname, '..', 'assets', 'bg-mixkit.mp4')
const URLS = [
  'https://assets.mixkit.co/videos/preview/33692/33692-large.mp4',
  'https://assets.mixkit.co/videos/33692/33692-720.mp4',
]

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  Referer: 'https://mixkit.co/free-stock-video/pregnant-woman-holding-small-baby-shoes-top-shot-33692/',
}

function safeUnlink(file) {
  try { if (fs.existsSync(file)) fs.unlinkSync(file) } catch (_) {}
}

function download(url, attempt = 1) {
  return new Promise((resolve, reject) => {
    safeUnlink(OUT)
    const file = fs.createWriteStream(OUT)

    const req = https.get(url, { headers: HEADERS }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        safeUnlink(OUT)
        return resolve(download(res.headers.location, attempt))
      }
      if (res.statusCode !== 200) {
        file.close()
        safeUnlink(OUT)
        return reject(new Error(`HTTP ${res.statusCode}`))
      }

      const total = Number(res.headers['content-length'] || 0)
      let received = 0

      res.on('data', (chunk) => {
        received += chunk.length
        if (total && received % (256 * 1024) < chunk.length) {
          process.stdout.write(`\r${Math.round((received / total) * 100)}%`)
        }
      })

      res.pipe(file)
      file.on('finish', () => {
        file.close(() => {
          const size = fs.statSync(OUT).size
          if (total && size < total * 0.9) {
            safeUnlink(OUT)
            if (attempt < 12) return resolve(download(url, attempt + 1))
            return reject(new Error(`Incomplete: ${size}/${total}`))
          }
          console.log(`\nSaved ${size} bytes`)
          resolve(size)
        })
      })
    })

    req.setTimeout(120000, () => {
      req.destroy()
      file.close()
      safeUnlink(OUT)
      if (attempt < 12) return resolve(download(url, attempt + 1))
      reject(new Error('Timeout'))
    })

    req.on('error', (err) => {
      file.close()
      safeUnlink(OUT)
      if (attempt < 12) return resolve(download(url, attempt + 1))
      reject(err)
    })
  })
}

;(async () => {
  for (const url of URLS) {
    try {
      console.log('Trying', url)
      await download(url)
      process.exit(0)
    } catch (err) {
      console.error('Failed:', err.message)
    }
  }
  process.exit(1)
})()