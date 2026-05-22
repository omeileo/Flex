import crypto from 'crypto'

/**
 * Used for API responses.
 * Used to generate a correlation ID for tracing.
 *
 * Generates a correlation ID using crypto.randomBytes.
 * @returns {string} The generated correlation ID.
 */
export const trace = {
  generateCorrelationId: function () {
    return crypto.randomBytes(32).toString('hex')
  },

  logMessage: {
    success: (...args: (string | unknown)[]) =>
      console.log('\x1b[32m%s\x1b[0m', args.map((arg) => `\x1b[32m${arg}\x1b[0m`).join(' ')), // Green

    warning: (...args: (string | unknown)[]) =>
      console.log('\x1b[33m%s\x1b[0m', args.map((arg) => `\x1b[33m${arg}\x1b[0m`).join(' ')), // Yellow

    info: (...args: (string | unknown)[]) =>
      console.log('\x1b[34m%s\x1b[0m', args.map((arg) => `\x1b[34m${arg}\x1b[0m`).join(' ')), // Blue

    error: (...args: (string | unknown)[]) =>
      console.log('\x1b[31m%s\x1b[0m', args.map((arg) => `\x1b[31m${arg}\x1b[0m`).join(' ')) // Red
  }
}
