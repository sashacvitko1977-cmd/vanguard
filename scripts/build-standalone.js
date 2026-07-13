import { copyFileSync, existsSync } from 'node:fs'

// vanguard.html — hand-crafted standalone (file:// safe)
// Source of truth is the file in project root
if (!existsSync('vanguard.html')) {
  console.error('vanguard.html not found')
  process.exit(1)
}

console.log('Standalone ready: vanguard.html — open with double-click')
console.log('For Vite dev: npm run dev')