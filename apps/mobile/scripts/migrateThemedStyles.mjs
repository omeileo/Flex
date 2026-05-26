import fs from 'node:fs'
import path from 'node:path'

const mobileRoot = path.resolve('apps/mobile/src')

const skipStyleFiles = new Set([
  path.join(mobileRoot, 'shared/components/Snackbar/Snackbar.styles.ts'),
  path.join(mobileRoot, 'shared/styles/appDefault.styles.ts')
])

const walk = (dir, acc = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      walk(fullPath, acc)
    } else if (entry.name.endsWith('.styles.ts') && !skipStyleFiles.has(fullPath)) {
      acc.push(fullPath)
    }
  }

  return acc
}

const toPascalCase = (value) =>
  value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

const migrateStyleFile = (stylePath) => {
  const source = fs.readFileSync(stylePath, 'utf8')

  if (source.includes('export const create') && source.includes('Styles = (colors: ThemeColors)')) {
    const baseName = path.basename(stylePath, '.styles.ts')

    return {
      stylePath,
      factoryName: `create${toPascalCase(baseName)}Styles`,
      baseName
    }
  }

  if (!source.includes('export default StyleSheet.create')) {
    return null
  }

  const baseName = path.basename(stylePath, '.styles.ts')
  const factoryName = `create${toPascalCase(baseName)}Styles`
  let next = source

  if (!next.includes('ThemeColors')) {
    next = next.replace(
      "import { StyleSheet } from 'react-native'\n",
      "import { StyleSheet } from 'react-native'\n\nimport { ThemeColors } from '@shared/context/ThemeProvider/ThemeProvider.types'\n"
    )
  }

  next = next.replace(/import \{([^}]+)\} from '@shared\/styles\/StyleConstants'/, (_match, imports) => {
    const tokens = imports
      .split(',')
      .map((token) => token.trim())
      .filter((token) => token && token !== 'colors' && token !== 'elevation')

    const needsElevation = source.includes('elevation.')

    if (tokens.length === 0 && needsElevation) {
      return "import { getElevation } from '@shared/styles/StyleConstants'"
    }

    if (needsElevation && !tokens.includes('getElevation')) {
      return `import { ${[...tokens, 'getElevation'].join(', ')} } from '@shared/styles/StyleConstants'`
    }

    if (tokens.length === 0) {
      return ''
    }

    return `import { ${tokens.join(', ')} } from '@shared/styles/StyleConstants'`
  })

  next = next.replace(
    /export const accentBarByStatus: Record<ConditionStatus, string> = \{([\s\S]*?)\}/,
    'export const getAccentBarByStatus = (colors: ThemeColors): Record<ConditionStatus, string> => ({$1})'
  )

  const usesElevation = next.includes('elevation.')
  const factoryPrefix = usesElevation
    ? `export const ${factoryName} = (colors: ThemeColors) => {
  const elevation = getElevation(colors.shadowColor)

  return StyleSheet.create({`
    : `export const ${factoryName} = (colors: ThemeColors) =>
  StyleSheet.create({`

  next = next.replace('export default StyleSheet.create({', factoryPrefix)

  if (usesElevation) {
    next = `${next.trimEnd()}\n  })\n}\n`
  } else {
    next = `${next.trimEnd()})\n`
  }

  fs.writeFileSync(stylePath, next)

  return { stylePath, factoryName, baseName }
}

const ensureImport = (source, importLine) => {
  if (source.includes(importLine)) {
    return source
  }

  const reactNativeImport = source.match(/^import .+ from 'react-native'\n/m)

  if (reactNativeImport) {
    return source.replace(reactNativeImport[0], `${reactNativeImport[0]}\n${importLine}\n`)
  }

  return `${importLine}\n${source}`
}

const migrateComponentFile = (stylePath, factoryName, baseName) => {
  const dir = path.dirname(stylePath)
  const candidates = [`${baseName}.component.tsx`, `${baseName}.tsx`]
  const componentPath = candidates.map((name) => path.join(dir, name)).find((candidate) => fs.existsSync(candidate))

  if (!componentPath) {
    return
  }

  let source = fs.readFileSync(componentPath, 'utf8')
  const relativeStyleImport = `./${baseName}.styles`

  if (!source.includes(`from '${relativeStyleImport}'`) && !source.includes(`from "${relativeStyleImport}"`)) {
    return
  }

  if (source.includes(`useThemedStyles(${factoryName})`)) {
    source = source.replace(/\n {2}const colors = useThemeColors\(\)\n/, '\n')
    source = source.replace(
      "import { useThemeColors } from '@shared/hooks/useThemeColors/useThemeColors.hooks'\n\n",
      ''
    )

    if (source.includes('colors.') && !source.includes('useThemeColors')) {
      source = ensureImport(
        source,
        "import { useThemeColors } from '@shared/hooks/useThemeColors/useThemeColors.hooks'"
      )
      source = source.replace(
        /const ([A-Z][A-Za-z0-9_]*) = \(([\s\S]*?)\) => \{\n/,
        (match, name, params) => `const ${name} = (${params}) => {\n  const colors = useThemeColors()\n`
      )
    }

    fs.writeFileSync(componentPath, source)

    return
  }

  source = source.replace(
    /import styles from '\.\/[^']+\.styles'\n/,
    `import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'\n\nimport { ${factoryName} } from './${baseName}.styles'\n`
  )

  const usesColorsInComponent = /\bcolors\./.test(source)

  if (usesColorsInComponent) {
    source = source.replace(
      /import \{ colors \} from '@shared\/styles\/StyleConstants'\n\n?/,
      "import { useThemeColors } from '@shared/hooks/useThemeColors/useThemeColors.hooks'\n\n"
    )
    source = ensureImport(source, "import { useThemeColors } from '@shared/hooks/useThemeColors/useThemeColors.hooks'")
  }

  source = ensureImport(source, "import { useThemedStyles } from '@shared/hooks/useThemedStyles/useThemedStyles.hooks'")
  source = ensureImport(source, `import { ${factoryName} } from './${baseName}.styles'`)

  const injectStylesHook = (bodyPrefix) => {
    const colorsLine = usesColorsInComponent ? '  const colors = useThemeColors()\n' : ''

    return `${bodyPrefix}\n${colorsLine}  const styles = useThemedStyles(${factoryName})\n`
  }

  if (/const ([A-Z][A-Za-z0-9_]*) = \(([\s\S]*?)\) => \([\s\S]*?\n\)/.test(source)) {
    source = source.replace(
      /const ([A-Z][A-Za-z0-9_]*) = \(([\s\S]*?)\) => \(/,
      (match, name, params) => `${injectStylesHook(`const ${name} = (${params}) => {`).trimEnd()}\n\n  return (`
    )
    source = source.replace(/\n\)\n\nexport default/, '\n  )\n}\n\nexport default')
  } else {
    source = source.replace(/const ([A-Z][A-Za-z0-9_]*) = \(([\s\S]*?)\) => \{/, (match, name, params) =>
      injectStylesHook(`const ${name} = (${params}) => {`).trimEnd()
    )
  }

  fs.writeFileSync(componentPath, source)
}

const styleFiles = walk(mobileRoot)
const migrated = []

for (const stylePath of styleFiles) {
  const result = migrateStyleFile(stylePath)

  if (result) {
    migrateComponentFile(result.stylePath, result.factoryName, result.baseName)
    migrated.push(result.factoryName)
  }
}

console.log(`Processed ${migrated.length} style modules`)
