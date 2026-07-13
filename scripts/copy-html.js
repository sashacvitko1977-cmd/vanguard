import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const src = join('dist', 'index.html')
const dest = 'vanguard.html'

if (!existsSync(src)) {
  console.error('dist/index.html not found — run vite build first')
  process.exit(1)
}

let html = readFileSync(src, 'utf8')

// Находим единственный inline <script> в <head>
const scriptStart = html.search(/<script[^>]*>/i)
if (scriptStart === -1) {
  console.error('Script tag not found in dist/index.html')
  process.exit(1)
}

const scriptEnd = html.indexOf('</script>', scriptStart)
if (scriptEnd === -1) {
  console.error('Closing script tag not found')
  process.exit(1)
}

let scriptTag = html.slice(scriptStart, scriptEnd + '</script>'.length)
scriptTag = scriptTag
  .replace(/\s*type="module"/gi, '')
  .replace(/\s*crossorigin/gi, '')

// Удаляем скрипт из head
html = html.slice(0, scriptStart) + html.slice(scriptEnd + '</script>'.length)

// Вставляем скрипт перед закрывающим </body> (после #root)
const bodyClose = html.lastIndexOf('</body>')
if (bodyClose === -1) {
  console.error('</body> not found')
  process.exit(1)
}

html =
  html.slice(0, bodyClose).trimEnd() +
  '\n    ' +
  scriptTag +
  '\n  ' +
  html.slice(bodyClose)

writeFileSync(dest, html)

// Sanity check
const rootCount = (html.match(/id="root"/g) || []).length
const bodyCount = (html.match(/<\/body>/gi) || []).length
if (rootCount !== 1 || bodyCount !== 1) {
  console.error(`Invalid HTML: root=${rootCount}, body=${bodyCount}`)
  process.exit(1)
}

console.log(`Ready: ${dest} — откройте двойным кликом`)