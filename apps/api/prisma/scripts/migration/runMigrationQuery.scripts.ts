import { logger } from '../../../src/app'

export async function runMigrationQuery(queryFile: string) {
  try {
    const modulePath = `../../migrationQueries/${queryFile}.query`
    const { default: queryFn } = await import(modulePath)

    logger.info(`Running migration query: ${queryFile}`)
    await queryFn()
    logger.info(`Migration query ${queryFile} completed successfully`)
  } catch (error) {
    logger.error(`Failed to run migration query ${queryFile}: ${error}`)
    process.exit(1)
  }
}

// Handle command line arguments
const [, , file] = process.argv

if (!file) {
  logger.error('Please specify a query file with --file=filename')
  process.exit(1)
}

runMigrationQuery(file.replace('--file=', ''))
