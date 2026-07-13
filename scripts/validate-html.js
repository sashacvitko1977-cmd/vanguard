import { readFileSync } from 'node:fs'

const h = readFileSync('vanguard.html', 'utf8')
const rootIdx = h.indexOf('id="root"')
const scriptIdx = h.indexOf('<script', rootIdx)

console.log('root count:', (h.match(/id="root"/g) || []).length)
console.log('body count:', (h.match(/<\/body>/gi) || []).length)
console.log('script after root:', scriptIdx > rootIdx)
console.log('has type=module:', /type="module"/i.test(h))