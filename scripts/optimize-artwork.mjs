import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import sharp from 'sharp'

const root = fileURLToPath(new URL('../', import.meta.url))
const output = resolve(root, 'src/assets/generated')
const artwork = [
  ['section 1/SVG/comic 1.svg', 'comic-one.svg'],
  ['section 1/SVG/COMIC 4.svg', 'comic-four.svg'],
  ['section 1/SVG/comic 3.svg', 'comic-three.svg'],
  ['section 2/SVG/city buildings.svg', 'city.svg'],
  ['section 2/SVG/hijabi hacker.svg', 'hacker.svg'],
  ['section 2/SVG/ui.svg', 'ui.svg'],
  ['section 2/SVG/ux.svg', 'ux.svg'],
]

await mkdir(output, { recursive: true })
let totalBefore = 0
let totalAfter = 0
for (const [source, destination] of artwork) {
  const original = await readFile(resolve(root, 'src/assets/images/SVG', source), 'utf8')
  let optimized = original
  // Keep the SVG geometry, vector text, masks and colors; compress only embedded bitmaps.
  for (const match of original.matchAll(/data:image\/(?:png|jpeg|jpg);base64,([A-Za-z0-9+/=\s]+)(?=["'])/g)) {
    const bitmap = Buffer.from(match[1].replace(/\s/g, ''), 'base64')
    const webp = await sharp(bitmap).webp({ quality: 85, alphaQuality: 100, effort: 5 }).toBuffer()
    if (webp.length < bitmap.length) {
      optimized = optimized.replace(match[0], `data:image/webp;base64,${webp.toString('base64')}`)
    }
  }
  await writeFile(resolve(output, destination), optimized)
  totalBefore += Buffer.byteLength(original)
  totalAfter += Buffer.byteLength(optimized)
}
console.log(`Artwork: ${(totalBefore / 1e6).toFixed(2)} MB → ${(totalAfter / 1e6).toFixed(2)} MB`)
