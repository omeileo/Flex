import { logger } from '@/app'
import { randomBytes } from 'crypto'

/**
 * Generates a custom ID with a prefix and a random string.
 * @example 'cus_A1B2-C3D4-E5F6-G7H8'
 * @example 'A1B2-C3D4-E5F6-G7H8'
 * @param prefix - The prefix to add to the ID
 * @returns The generated ID
 */
export function generateCustomId(prefix?: string): string {
  try {
    // Generate 16 characters for 4 groups of 4
    const randomString = randomBytes(20)
      .toString('base64')
      .replace(/[^A-Za-z0-9]/g, '')
      .toUpperCase()
      .slice(0, 16)

    // Insert hyphens after every 4 characters
    const formattedString = `${randomString.slice(0, 4)}-${randomString.slice(4, 8)}-${randomString.slice(8, 12)}-${randomString.slice(12, 16)}`

    const prefixString = prefix ? `${prefix.toLowerCase().slice(0, 10)}_` : ''

    return `${prefixString}${formattedString}`
  } catch (error) {
    logger.error(`Error generating custom ID: ${error}`)
    throw error
  }
}

/**
 * Strips the prefix from a custom ID that was generated with a prefix from TABLE_ID_PREFIXES
 * @example stripPrefixFromId('cus_lmt_A1B2-C3D4-E5F6-G7H8') returns 'A1B2-C3D4-E5F6-G7H8'
 * @param id - The ID to strip the prefix from
 * @returns The ID without the prefix
 */
export function stripPrefixFromId(id: string): string {
  try {
    // Find last underscore that separates prefix from random string
    const lastUnderscoreIndex = id.lastIndexOf('_')

    // If no underscore found, return original id
    if (lastUnderscoreIndex === -1) {
      return id
    }

    // Return everything after the last underscore
    return id.substring(lastUnderscoreIndex + 1)
  } catch (error) {
    logger.error(`Error stripping prefix from ID: ${error}`)
    throw error
  }
}
