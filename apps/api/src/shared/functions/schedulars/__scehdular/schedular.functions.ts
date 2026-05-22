import { logger } from '@/app'
import cronstrue from 'cronstrue'

/**
 * Converts a duration string to a cron expression.
 * @function durationToCron
 * @param {string} duration - The duration string (e.g., '5s', '1h', '2d').
 * @returns {string} The corresponding cron expression.
 * @throws {Error} If the duration format is invalid or unsupported.
 */
function durationToCron(duration: string): string {
  const match = duration.match(/^(\d+)(h|d|w|m|s(?:in)?s?)$/)

  if (!match) {
    logger.error(`Invalid duration format: ${duration}. Cannot convert to cron expression.`)
    throw new Error('Invalid duration format')
  } else {
    const [, value, unit] = match
    const numValue = parseInt(value, 10)

    switch (unit) {
      case 's':
        return `*/${numValue} * * * * *`

      case 'h':
        return `0 */${numValue} * * *`

      case 'd':
        return `0 0 */${numValue} * *`

      case 'w':
        return `0 0 * * ${numValue}`

      case 'm':
      case 'min':
      case 'mins': {
        const hours = Math.floor(numValue / 60)
        const minutes = numValue % 60

        if (hours === 0) {
          return `*/${minutes} * * * *`
        } else if (minutes === 0) {
          return `0 */${hours} * * *`
        } else {
          return `${minutes} */${hours} * * *`
        }
      }

      default:
        logger.error(`Unsupported duration unit: ${duration}`)
        throw new Error('Unsupported duration unit')
    }
  }
}

/**
 * Converts a duration string to a cron expression with a human-readable description.
 * @function durationToCronWithDescription
 * @param {string} duration - The duration string.
 * @returns {{cronExpression: string, description: string}} An object containing the cron expression and its description.
 */
export function durationToCronWithDescription(duration: string): {
  cronExpression: string
  description: string
} {
  const cronExpression = durationToCron(duration)
  const description = cronstrue.toString(cronExpression)

  return { cronExpression, description }
}

/**
 * Converts a duration string to milliseconds.
 * @function durationToMilliseconds
 * @param {string} duration - The duration string.
 * @returns {number} The corresponding milliseconds.
 * @throws {Error} If the duration format is invalid or unsupported.
 */
export function durationToMilliseconds(duration: string): number {
  const match = duration.match(/^(\d+)(h|d|w|m|s(?:in)?s?)$/)

  if (!match) {
    logger.error(`Invalid duration format: ${duration}. Cannot convert to milliseconds.`)
    throw new Error('Invalid duration format')
  } else {
    const [, value, unit] = match
    const numValue = parseInt(value, 10)

    switch (unit) {
      case 's':
        return numValue * 1000 // seconds to ms

      case 'h':
        return numValue * 60 * 60 * 1000 // hours to ms

      case 'd':
        return numValue * 24 * 60 * 60 * 1000 // days to ms

      case 'w':
        return numValue * 7 * 24 * 60 * 60 * 1000 // weeks to ms

      case 'm':
      case 'min':
      case 'mins':
        return numValue * 60 * 1000 // minutes to ms

      default:
        logger.error(`Unsupported duration unit: ${duration}`)
        throw new Error('Unsupported duration unit')
    }
  }
}

/**
 * Converts a duration string to seconds.
 * @function durationToSeconds
 * @param {string} duration - The duration string.
 * @returns {number} The corresponding seconds.
 * @throws {Error} If the duration format is invalid or unsupported.
 */
export function durationToSeconds(duration: string): number {
  const match = duration.match(/^(\d+)(h|d|w|m|s(?:in)?s?)$/)

  if (!match) {
    logger.error(`Invalid duration format: ${duration}. Cannot convert to seconds.`)
    throw new Error('Invalid duration format')
  } else {
    const [, value, unit] = match
    const numValue = parseInt(value, 10)

    switch (unit) {
      case 's':
        return numValue // seconds to seconds

      case 'h':
        return numValue * 60 * 60 // hours to seconds

      case 'd':
        return numValue * 24 * 60 * 60 // days to seconds

      case 'w':
        return numValue * 7 * 24 * 60 * 60 // weeks to seconds

      case 'm':
      case 'min':
      case 'mins':
        return numValue * 60 // minutes to seconds

      default:
        logger.error(`Unsupported duration unit: ${duration}`)
        throw new Error('Unsupported duration unit')
    }
  }
}
