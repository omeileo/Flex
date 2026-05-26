import fs from 'node:fs'
import path from 'node:path'

const mobileRoot = path.resolve('apps/mobile/src')

const walk = (dir, acc = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      walk(fullPath, acc)
    } else if (entry.name.endsWith('.styles.ts')) {
      acc.push(fullPath)
    }
  }

  return acc
}

let fixed = 0

for (const filePath of walk(mobileRoot)) {
  let source = fs.readFileSync(filePath, 'utf8')

  if (!source.includes('create') || !source.includes('Styles = (colors: ThemeColors)')) {
    continue
  }

  const original = source

  if (source.includes('const elevation = getElevation')) {
    source = source.replace(/\n\}\)\n\s*\}\)\n\}/, '\n  })\n}')
  }

  source = source.replace(/\}\)\s*\)\s*$/, '})')

  if (source !== original) {
    fs.writeFileSync(filePath, source)
    fixed += 1
  }
}

console.log(`Fixed ${fixed} style files`)
