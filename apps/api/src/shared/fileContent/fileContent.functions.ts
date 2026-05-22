import { logger } from '@/app'
import { readFileSync } from 'fs'

/**
 * Reads the content of a file and returns it as a string.
 * @param filePath - The path to the file to read.
 * @returns The content of the file as a string.
 * @throws An error if the file cannot be read.
 */
export const getFileContent = (filePath: string): string => {
  try {
    const fullPath = filePath
    const content = readFileSync(fullPath, 'utf-8')

    return content
  } catch (error) {
    logger.error(`Error reading file content from ${filePath}: ${error}`)
    throw error
  }
}
