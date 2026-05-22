import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '../../../..')

type FlowKey =
  | 'authentication'
  | 'fitnessProfile'
  | 'trainingPlans'
  | 'exercises'
  | 'workoutSessions'
  | 'payments'
  | 'profileAndSettings'
  | 'crossCutting'

const SYNC_FILE = 'docs/productFlows/apiFlowSync.md'

const DOC_ALLOW_PREFIXES = [
  'docs/',
  '.cursor/skills/checkProductFlowDocs/',
  '.cursor/hooks/',
  '.cursor/hooks.json',
  'src/shared/scripts/productFlows/'
]

const USER_API_FOLDER_TO_FLOW: Record<string, FlowKey[]> = {
  auth: ['authentication'],
  profile: ['profileAndSettings'],
  payments: ['payments']
}

const FLEX_API_FOLDER_TO_FLOW: Record<string, FlowKey[]> = {
  fitnessProfile: ['fitnessProfile'],
  trainingPlans: ['trainingPlans'],
  exercises: ['exercises'],
  workoutSessions: ['workoutSessions']
}

const CROSS_CUTTING_FILES = [
  'src/api/__routes__/registerRoutes.functions.ts',
  'src/api/__routes__/registerFlexRoutes.functions.ts',
  'src/shared/middleware/jwt/jwt.middleware.ts'
]

function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, '/')
}

function shouldIgnoreForDriftCheck(relativePath: string): boolean {
  const normalized = normalizePath(relativePath)
  if (normalized.endsWith('.docs.ts')) return true
  if (/\.test\.ts$/.test(normalized)) return true
  if (normalized.includes('/__tests__/')) return true

  return false
}

function collectFlowKeysFromPath(relativePath: string, into: Set<FlowKey>): void {
  const normalized = normalizePath(relativePath)
  if (shouldIgnoreForDriftCheck(normalized)) return

  const userPrefix = 'src/api/user/'
  if (normalized.startsWith(userPrefix)) {
    const rest = normalized.slice(userPrefix.length)
    const segment = rest.split('/')[0] ?? ''
    const mapped = USER_API_FOLDER_TO_FLOW[segment]
    if (mapped) {
      mapped.forEach((key) => into.add(key))
    }
  }

  const flexPrefix = 'src/api/flex/'
  if (normalized.startsWith(flexPrefix)) {
    const rest = normalized.slice(flexPrefix.length)
    const segment = rest.split('/')[0] ?? ''
    const mapped = FLEX_API_FOLDER_TO_FLOW[segment]
    if (mapped) {
      mapped.forEach((key) => into.add(key))
    }
  }

  for (const crossFile of CROSS_CUTTING_FILES) {
    if (normalized === crossFile) into.add('crossCutting')
  }
}

function listGitPaths(mode: 'staged' | 'workingTree'): string[] {
  const command = mode === 'staged' ? 'git diff --cached --name-only' : 'git diff --name-only HEAD'
  try {
    const output = execSync(command, { cwd: repoRoot, encoding: 'utf8' })

    return output
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
  } catch {
    return []
  }
}

function isOnlyDocAllowlisted(paths: string[]): boolean {
  if (paths.length === 0) return true

  return paths.every((filePath) => {
    const normalized = normalizePath(filePath)

    return DOC_ALLOW_PREFIXES.some((prefix) => normalized.startsWith(prefix))
  })
}

function parseMode(argv: string[]): 'staged' | 'workingTree' {
  if (argv.includes('--working-tree')) return 'workingTree'

  return 'staged'
}

function main(): void {
  if (process.env.FLEX_SKIP_FLOW_DOC_CHECK === '1') {
    // eslint-disable-next-line no-console
    console.log('checkProductFlowApiDrift: skipped (FLEX_SKIP_FLOW_DOC_CHECK=1)')
    process.exit(0)
  }

  const mode = parseMode(process.argv.slice(2))
  const triggerPaths = listGitPaths(mode)
  const requiredKeys = new Set<FlowKey>()
  for (const filePath of triggerPaths) {
    collectFlowKeysFromPath(filePath, requiredKeys)
  }

  if (requiredKeys.size === 0) {
    process.exit(0)
  }

  if (isOnlyDocAllowlisted(triggerPaths)) {
    process.exit(0)
  }

  const coveragePaths = mode === 'workingTree' ? triggerPaths : listGitPaths('staged')
  const syncStaged = coveragePaths.some((filePath) => normalizePath(filePath) === SYNC_FILE)

  if (syncStaged) {
    process.exit(0)
  }

  const modeLabel = mode === 'staged' ? 'staged' : 'working tree'
  // eslint-disable-next-line no-console
  console.error(
    '\ncheckProductFlowApiDrift: user-facing API change detected without product-flow sync record.\n' +
      `Mode: ${modeLabel}\n` +
      `Affected flow keys (approximate): ${[...requiredKeys].sort().join(', ')}\n\n` +
      `Append a row to ${SYNC_FILE} (stage it in the same commit) noting the ticket and mobile flow doc status.\n` +
      'To bypass (sparingly): FLEX_SKIP_FLOW_DOC_CHECK=1\n'
  )
  process.exit(1)
}

main()
