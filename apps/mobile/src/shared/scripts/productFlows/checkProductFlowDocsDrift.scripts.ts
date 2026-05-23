import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '../../../..')

/**
 * Replicates the Budgy-Web-App productFlow drift check, adapted for the
 * React Native screens layout. Add new flow keys + screen-prefix rules + redux
 * segment rules as the app grows.
 */

type FlowKey = 'authentication' | 'home' | 'profile' | 'settings' | 'crossCutting'

const DOC_ALLOW_PREFIXES = [
  'docs/',
  '.claude/skills/checkProductFlowDocs/',
  '.claude/skills/updateProductFlowDocs/',
  '.claude/hooks/',
  '.claude/hooks.json',
  'src/shared/scripts/productFlows/'
]

// Maps screens (file path prefixes under src/screens/) to the flowKeys they belong to.
const SCREEN_PREFIX_RULES: { prefix: string; flowKeys: FlowKey[] }[] = [
  { prefix: 'src/screens/Login/', flowKeys: ['authentication'] },
  { prefix: 'src/screens/SignUp/', flowKeys: ['authentication'] },
  { prefix: 'src/screens/SignUpVerification/', flowKeys: ['authentication'] },
  { prefix: 'src/screens/ForgetPassword/', flowKeys: ['authentication'] },
  {
    prefix: 'src/screens/ResetForgottenPassword/',
    flowKeys: ['authentication']
  },
  { prefix: 'src/screens/ChangePassword/', flowKeys: ['authentication'] },
  { prefix: 'src/screens/SplashScreen/', flowKeys: ['authentication'] },
  { prefix: 'src/screens/Home/', flowKeys: ['home'] },
  { prefix: 'src/screens/Profile/', flowKeys: ['profile'] },
  { prefix: 'src/screens/Settings/', flowKeys: ['settings'] }
]

// Segments matched against paths relative to `src/redux/states/`.
const REDUX_SEGMENT_RULES: { segment: string; flowKeys: FlowKey[] }[] = [
  { segment: 'auth/', flowKeys: ['authentication'] },
  { segment: 'profile/', flowKeys: ['profile'] }
]

const MIN_SUBSTANTIVE_DIFF_LINES = 3

const CROSS_CUTTING_PREFIXES = [
  'src/router/',
  'src/App.tsx',
  'src/networkRequests/apiClient/endpoints.ts',
  'src/networkRequests/apiClient/apiClient.functions.ts'
]

function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, '/')
}

function shouldIgnoreForDriftCheck(relativePath: string): boolean {
  const normalized = normalizePath(relativePath)
  if (/\.tests\.(tsx?|jsx?)$/.test(normalized)) return true
  if (normalized.includes('/__tests__/')) return true
  if (normalized.includes('/__mocks__/')) return true
  if (normalized.startsWith('docs/flows/_template/')) return true

  return false
}

function collectFlowKeysFromPath(relativePath: string, into: Set<FlowKey>): void {
  const normalized = normalizePath(relativePath)
  if (shouldIgnoreForDriftCheck(normalized)) return

  for (const rule of SCREEN_PREFIX_RULES) {
    if (normalized.startsWith(rule.prefix)) {
      rule.flowKeys.forEach((key) => into.add(key))
    }
  }

  const reduxStates = 'src/redux/states/'
  if (normalized.startsWith(reduxStates)) {
    const after = normalized.slice(reduxStates.length)
    for (const rule of REDUX_SEGMENT_RULES) {
      if (after.startsWith(rule.segment)) {
        rule.flowKeys.forEach((key) => into.add(key))
      }
    }
  }

  for (const cross of CROSS_CUTTING_PREFIXES) {
    const isDirectoryPrefix = cross.endsWith('/')
    if (isDirectoryPrefix) {
      if (normalized.startsWith(cross)) into.add('crossCutting')
    } else if (normalized === cross || normalized.startsWith(`${cross}/`)) {
      into.add('crossCutting')
    }
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

const SUBSTANCE_EXEMPT_DOC_PATHS = new Set(['docs/productFlows.overview.md', 'docs/productFlows.changelog.md'])

function isSubstantiveDocChange(docPath: string, mode: 'staged' | 'workingTree'): boolean {
  const normalized = normalizePath(docPath)
  if (SUBSTANCE_EXEMPT_DOC_PATHS.has(normalized)) return true
  if (normalized.startsWith('docs/flows/_template/')) return false

  const numstatCommand =
    mode === 'staged'
      ? `git diff --cached -w --numstat -- ${JSON.stringify(normalized)}`
      : `git diff -w --numstat HEAD -- ${JSON.stringify(normalized)}`

  let numstatOutput = ''
  try {
    numstatOutput = execSync(numstatCommand, {
      cwd: repoRoot,
      encoding: 'utf8'
    })
  } catch {
    return false
  }

  const numstatLine = numstatOutput.split('\n').find(Boolean)
  if (!numstatLine) return false

  const [additionsRaw, deletionsRaw] = numstatLine.split('\t')
  if (additionsRaw === '-' || deletionsRaw === '-') {
    return false
  }

  const additions = Number.parseInt(additionsRaw, 10) || 0
  const deletions = Number.parseInt(deletionsRaw, 10) || 0
  if (additions + deletions < MIN_SUBSTANTIVE_DIFF_LINES) return false

  const patchCommand =
    mode === 'staged'
      ? `git diff --cached -U0 -- ${JSON.stringify(normalized)}`
      : `git diff -U0 HEAD -- ${JSON.stringify(normalized)}`

  let patchOutput = ''
  try {
    patchOutput = execSync(patchCommand, { cwd: repoRoot, encoding: 'utf8' })
  } catch {
    return false
  }

  const changedLines = patchOutput
    .split('\n')
    .filter(
      (line) => (line.startsWith('+') || line.startsWith('-')) && !line.startsWith('+++') && !line.startsWith('---')
    )

  if (changedLines.length === 0) return false

  const onlyLastReviewedBumps = changedLines.every((line) => /^[+-]\s*lastReviewed\s*:/.test(line))
  if (onlyLastReviewedBumps) return false

  return true
}

function isOnlyDocAllowlisted(paths: string[]): boolean {
  if (paths.length === 0) return true

  return paths.every((filePath) => {
    const normalized = normalizePath(filePath)

    return DOC_ALLOW_PREFIXES.some((prefix) => normalized.startsWith(prefix))
  })
}

type CoverageResult = { covered: true } | { covered: false; reason: 'missing' | 'trivial'; flowKey: FlowKey }

function docsCoverFlowKeys(
  stagedPaths: string[],
  requiredKeys: Set<FlowKey>,
  mode: 'staged' | 'workingTree'
): CoverageResult {
  if (requiredKeys.size === 0) return { covered: true }

  const normalizedStaged = stagedPaths.map(normalizePath)

  for (const flowKey of requiredKeys) {
    const candidatePaths: string[] =
      flowKey === 'crossCutting'
        ? normalizedStaged.filter(
            (filePath) =>
              filePath.startsWith('docs/flows/crossCutting/') ||
              filePath === 'docs/productFlows.overview.md' ||
              filePath === 'docs/productFlows.changelog.md'
          )
        : normalizedStaged.filter(
            (filePath) =>
              filePath.startsWith(`docs/flows/${flowKey}/`) ||
              filePath === 'docs/productFlows.changelog.md' ||
              filePath === 'docs/productFlows.overview.md'
          )

    if (candidatePaths.length === 0) {
      return { covered: false, reason: 'missing', flowKey }
    }

    const hasSubstantive = candidatePaths.some((p) => isSubstantiveDocChange(p, mode))
    if (!hasSubstantive) {
      return { covered: false, reason: 'trivial', flowKey }
    }
  }

  return { covered: true }
}

function parseMode(argv: string[]): 'staged' | 'workingTree' {
  if (argv.includes('--working-tree')) return 'workingTree'

  return 'staged'
}

function main(): void {
  if (process.env.flexmobile_SKIP_FLOW_DOC_CHECK === '1') {
    console.log('checkProductFlowDocsDrift: skipped (skip flag set)')
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

  const coveragePaths = mode === 'workingTree' ? triggerPaths : listGitPaths('staged')

  if (isOnlyDocAllowlisted(triggerPaths)) {
    process.exit(0)
  }

  const coverage = docsCoverFlowKeys(coveragePaths, requiredKeys, mode)
  if (coverage.covered === true) {
    process.exit(0)
  }

  const failure = coverage as Extract<CoverageResult, { covered: false }>
  const modeLabel = mode === 'staged' ? 'staged' : 'working tree'
  const trivialHint =
    failure.reason === 'trivial'
      ? `\nDoc changes for '${failure.flowKey}' look trivial (< ${MIN_SUBSTANTIVE_DIFF_LINES} substantive lines, or only a lastReviewed bump). Add real detail or set the skip flag to bypass.\n`
      : ''

  console.error(
    `\ncheckProductFlowDocsDrift: product-flow documentation may be out of date.\n` +
      `Mode: ${modeLabel}\n` +
      `Affected flow keys: ${[...requiredKeys].sort().join(', ')}\n` +
      trivialHint +
      `\nStage updates under docs/flows/{flowKey}/{flowKey}.flow.md (or anywhere under that folder), docs/productFlows.changelog.md or hub (and crossCutting/globalArchitecture.md when routing/global data changes).\n` +
      `Or use Claude skills: checkProductFlowDocs -> updateProductFlowDocs.\n`
  )
  process.exit(1)
}

main()
