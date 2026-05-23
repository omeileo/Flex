import fs from 'fs'
import path from 'path'

/**
 * Scaffolds a shared RN component (or a sub-component nested under a screen).
 * Mirrors Budgy-Web-App's generateComponent script, adapted for RN (StyleSheet).
 *
 * Usage:
 *   node ./src/shared/scripts/react/generateComponent.scripts.ts <ComponentName> [parentScreen]
 *
 * Example:
 *   node ./src/shared/scripts/react/generateComponent.scripts.ts PrimaryButton
 *   node ./src/shared/scripts/react/generateComponent.scripts.ts PostCard PostsList
 */

const args = process.argv.slice(2)
const [componentName, parentScreen] = args

if (!componentName) {
  console.error('Usage: generateComponent <ComponentName> [parentScreen]')
  process.exit(1)
}

if (!/^[A-Z][A-Za-z0-9]*$/.test(componentName)) {
  console.error(`ComponentName must be PascalCase (got '${componentName}').`)
  process.exit(1)
}

const projectRoot = process.cwd()

const findExistingScreen = (input: string): string | undefined => {
  const screensDir = path.join(projectRoot, 'src/screens')
  if (!fs.existsSync(screensDir)) return undefined

  const screens = fs.readdirSync(screensDir)
  const regex = new RegExp(`^${input}$`, 'i')

  return screens.find((screen) => regex.test(screen))
}

let targetPath: string
if (parentScreen) {
  const existingScreen = findExistingScreen(parentScreen)
  if (!existingScreen) {
    console.error(`Parent screen '${parentScreen}' not found under src/screens/.`)
    process.exit(1)
  }
  targetPath = path.join(projectRoot, 'src/screens', existingScreen, 'components', componentName)
} else {
  targetPath = path.join(projectRoot, 'src/shared/components', componentName)
}

const createFile = (filePath: string, content: string) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  if (fs.existsSync(filePath)) {
    console.log(`skip (exists) ${path.relative(projectRoot, filePath)}`)

    return
  }
  fs.writeFileSync(filePath, content, 'utf8')
  console.log(`create ${path.relative(projectRoot, filePath)}`)
}

createFile(
  path.join(targetPath, `${componentName}.component.tsx`),
  `import React from 'react'
import { View } from 'react-native'

import styles from './${componentName}.styles'
import { ${componentName}Props } from './${componentName}.types'

const ${componentName} = (_props: ${componentName}Props) => {
  return <View style={ styles.container } />
}

export default ${componentName}
`
)

createFile(
  path.join(targetPath, `${componentName}.styles.ts`),
  `import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {}
})

export default styles
`
)

createFile(
  path.join(targetPath, `${componentName}.types.ts`),
  `export interface ${componentName}Props {
  // TODO: define component props
}
`
)

createFile(
  path.join(targetPath, `${componentName}.tests.tsx`),
  `import React from 'react'
import { render } from '@testing-library/react-native'

import ${componentName} from './${componentName}.component'

describe('${componentName}', () => {
  it('renders without crashing', () => {
    render(<${componentName} />)
  })
})
`
)

console.log(`\n${componentName} scaffolded at ${path.relative(projectRoot, targetPath)}/`)
