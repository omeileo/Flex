import fs from 'fs'
import path from 'path'

/**
 * Scaffolds a new screen under src/screens/<ScreenName>/ and wires it into the
 * router (routes.dictionary.tsx + router.ts).
 *
 * Usage:
 *   node ./src/shared/scripts/react/generateScreen.scripts.ts <ScreenName>
 */

const args = process.argv.slice(2)
const [screenName] = args

if (!screenName) {
  console.error('Usage: generateScreen <ScreenName>')
  process.exit(1)
}

if (!/^[A-Z][A-Za-z0-9]*$/.test(screenName)) {
  console.error(`ScreenName must be PascalCase (got '${screenName}').`)
  process.exit(1)
}

const projectRoot = process.cwd()
const screenDir = path.join(projectRoot, 'src/screens', screenName)

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
  path.join(screenDir, `${screenName}.container.tsx`),
  `import React from 'react'

import ${screenName}Component from './${screenName}.component'

const ${screenName}Container = () => {
  return <${screenName}Component />
}

export default ${screenName}Container
`
)

createFile(
  path.join(screenDir, `${screenName}.component.tsx`),
  `import React from 'react'
import { Text, View } from 'react-native'

import styles from './${screenName}.styles'
import { ${screenName}ComponentProps } from './${screenName}.types'

const ${screenName}Component = (_props: ${screenName}ComponentProps) => {
  return (
    <View style={ styles.container }>
      <Text>${screenName}</Text>
    </View>
  )
}

export default ${screenName}Component
`
)

createFile(
  path.join(screenDir, `${screenName}.styles.ts`),
  `import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: { flex: 1 }
})

export default styles
`
)

createFile(
  path.join(screenDir, `${screenName}.types.ts`),
  `export interface ${screenName}ComponentProps {
  // TODO: define props
}
`
)

createFile(
  path.join(screenDir, `${screenName}.tests.tsx`),
  `import React from 'react'
import { render } from '@testing-library/react-native'

import ${screenName}Component from './${screenName}.component'

describe('${screenName}Component', () => {
  it('renders', () => {
    render(<${screenName}Component />)
  })
})
`
)

const dictionaryPath = path.join(projectRoot, 'src/router/routes.dictionary.tsx')
const dictionaryContent = fs.readFileSync(dictionaryPath, 'utf8')
const lowerKey = screenName.charAt(0).toLowerCase() + screenName.slice(1)

if (!dictionaryContent.includes(`${lowerKey}: {`)) {
  const importLine = `import ${screenName} from '../screens/${screenName}/${screenName}.container'\n`
  const entry = `\n  ${lowerKey}: {\n    name: '${screenName}',\n    path: '${screenName}',\n    isAuthenticationRequired: false,\n    component: ${screenName}\n  },`

  let updated = dictionaryContent
  if (!updated.includes(importLine)) {
    updated = updated.replace(/((?:import .* from '.*'\n)+)/, `$1${importLine}`)
  }
  updated = updated.replace(/const routes = \{/, `const routes = {${entry}`)
  fs.writeFileSync(dictionaryPath, updated, 'utf8')
  console.log(`routes.dictionary.tsx updated with ${lowerKey}`)
}

const routerPath = path.join(projectRoot, 'src/router/router.ts')
const routerContent = fs.readFileSync(routerPath, 'utf8')
if (!routerContent.includes(`routes.${lowerKey}`)) {
  const updated = routerContent.replace(/router\.generateRoutes\(\[/, `router.generateRoutes([\n  routes.${lowerKey},`)
  fs.writeFileSync(routerPath, updated, 'utf8')
  console.log(`router.ts wired with routes.${lowerKey}`)
}

console.log(`\n${screenName} scaffolded at src/screens/${screenName}/`)
