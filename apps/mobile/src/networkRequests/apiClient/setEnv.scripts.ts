import { execSync } from 'child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'

const args = process.argv.slice(2)
const targetEnv = args[0]

if (!targetEnv) {
  console.error('Please provide the target environment as a parameter (e.g., development, staging, production, local).')
  process.exit(1)
}

const validEnvironments = ['local', 'development', 'staging', 'production', 'mock']

if (!validEnvironments.includes(targetEnv)) {
  console.error(`Invalid environment. Provide one of: ${validEnvironments.join(', ')}.`)
  process.exit(1)
}

const envDirectory = path.resolve(process.cwd(), 'src/networkRequests/environmentVariables')
const sourceFile = path.join(envDirectory, `${targetEnv}.json`)
const targetFile = path.join(envDirectory, 'env.json')

try {
  const content = readFileSync(sourceFile, 'utf-8')
  writeFileSync(targetFile, content, 'utf-8')
  console.log(`Successfully copied ${sourceFile} to ${targetFile}`)

  const androidAssetsDir = path.resolve(process.cwd(), 'android/app/src/main/assets')
  mkdirSync(androidAssetsDir, { recursive: true })
  execSync('npm run copy-env-file-to-android', { stdio: 'inherit' })
} catch (error) {
  console.error(`Error copying env file: ${error instanceof Error ? error.message : error}`)
  process.exit(1)
}
