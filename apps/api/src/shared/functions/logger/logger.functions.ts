import { Logger, pino } from 'pino'

import { sanitizeErrorForLogging, sanitizeObjectForLogging } from './sanitize.functions'

/**
 * Serializes an error object to ensure all properties are captured
 * This works better than Pino's default error serialization
 */
const serializeError = (err: Error): Record<string, unknown> => {
  const result: Record<string, unknown> = {}

  // Copy all enumerable properties
  Object.assign(result, err)

  // Ensure we capture stack and message
  if (err.stack) result.stack = err.stack
  if (err.message) result.message = err.message
  if (err.name) result.name = err.name

  // Handle cause if it exists (Node 16.9.0+)
  if ('cause' in err && err.cause) {
    result.cause = err.cause instanceof Error ? serializeError(err.cause) : err.cause
  }

  return result
}

/**
 * A wrapper around the Pino logger that automatically sanitizes sensitive information.
 */
export class SecureLogger {
  private logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
  }

  /**
   * Sanitizes arguments before logging
   */
  private sanitizeArgs(args: unknown[]): unknown[] {
    return args.map((arg) => {
      if (arg instanceof Error) {
        // First serialize the error to capture all properties, then sanitize
        return sanitizeErrorForLogging(serializeError(arg))
      } else if (arg && typeof arg === 'object') {
        return sanitizeObjectForLogging(arg as Record<string, unknown>)
      } else if (typeof arg === 'string') {
        // Check if the string might be JSON
        try {
          const parsed = JSON.parse(arg)

          if (typeof parsed === 'object') {
            return JSON.stringify(sanitizeObjectForLogging(parsed))
          }
        } catch {
          // Not JSON, return as is
        }
      }

      return arg
    })
  }

  /**
   * Handles stringified objects in template literals
   * This is a common pattern in the codebase: logger.info(`Error`, error)
   */
  private extractAndSanitizeStringifiedObjects(message: string): string {
    // Look for patterns like ${JSON.stringify(obj)} or ${JSON.stringify(obj, null, 2)}
    return message.replace(/\${JSON\.stringify\(.*?\)}/g, () => {
      // We can't actually access the variables in the caller's scope
      // This is a best-effort approach to warn developers about this pattern
      return '${[Object cannot be sanitized when pre-stringified. Please pass objects as separate arguments]}'
    })
  }

  /**
   * Creates a structured log object that combines a message with additional args
   * This ensures all objects are properly included in the log output
   */
  private createStructuredLogObject(msg: string, args: unknown[]): Record<string, unknown> {
    // Start with an object containing the message
    const logObject: Record<string, unknown> = { msg }

    // Process additional arguments
    if (args.length > 0) {
      // If there's just one object argument, merge its properties into the log object
      if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && !(args[0] instanceof Error)) {
        const sanitizedArg = sanitizeObjectForLogging(args[0] as Record<string, unknown>)
        Object.assign(logObject, sanitizedArg)
      } else {
        // For multiple args or non-object args, add them as data fields
        const sanitizedArgs = this.sanitizeArgs(args)

        for (let i = 0; i < sanitizedArgs.length; i++) {
          const arg = sanitizedArgs[i]

          if (arg instanceof Error || (typeof arg === 'object' && arg !== null)) {
            logObject[`data${i + 1}`] = arg
          } else {
            // For primitive types
            logObject[`arg${i + 1}`] = arg
          }
        }
      }
    }

    return logObject
  }

  /**
   * Logs at 'info' level
   */
  info(obj: Record<string, unknown>, msg?: string, ...args: unknown[]): void
  info(obj: unknown, msg?: string, ...args: unknown[]): void
  info(msg: string, ...args: unknown[]): void
  info(objOrMsg: unknown, ...args: unknown[]): void {
    if (typeof objOrMsg === 'string') {
      // Check for and warn about stringified objects in the message
      const processedMsg = this.extractAndSanitizeStringifiedObjects(objOrMsg)

      if (args.length > 0) {
        // Create a structured log object that includes both the message and any additional args
        const logObj = this.createStructuredLogObject(processedMsg, args)
        this.logger.info(logObj)
      } else {
        this.logger.info(processedMsg)
      }
    } else if (objOrMsg instanceof Error) {
      // Handle errors specially to ensure they're properly serialized
      const serializedError = serializeError(objOrMsg)
      const sanitizedError = sanitizeErrorForLogging(serializedError)

      if (args.length > 0 && typeof args[0] === 'string') {
        const [msg, ...restArgs] = args
        const logObj = this.createStructuredLogObject(msg, [sanitizedError, ...restArgs])
        this.logger.info(logObj)
      } else {
        this.logger.info(sanitizedError)
      }
    } else if (objOrMsg && typeof objOrMsg === 'object') {
      const sanitizedObj = sanitizeObjectForLogging(objOrMsg as Record<string, unknown>)

      if (args.length > 0 && typeof args[0] === 'string') {
        const [msg, ...restArgs] = args
        const logObj = this.createStructuredLogObject(msg, [sanitizedObj, ...restArgs])
        this.logger.info(logObj)
      } else {
        this.logger.info(sanitizedObj)
      }
    } else {
      this.logger.info(objOrMsg)
    }
  }

  /**
   * Logs at 'error' level
   */
  error(obj: Record<string, unknown>, msg?: string, ...args: unknown[]): void
  error(obj: unknown, msg?: string, ...args: unknown[]): void
  error(msg: string, ...args: unknown[]): void
  error(objOrMsg: unknown, ...args: unknown[]): void {
    if (typeof objOrMsg === 'string') {
      // Check for and warn about stringified objects in the message
      const processedMsg = this.extractAndSanitizeStringifiedObjects(objOrMsg)

      if (args.length > 0) {
        // Create a structured log object that includes both the message and any additional args
        const logObj = this.createStructuredLogObject(processedMsg, args)
        this.logger.error(logObj)
      } else {
        this.logger.error(processedMsg)
      }
    } else if (objOrMsg instanceof Error) {
      // Handle errors specially to ensure they're properly serialized
      const serializedError = serializeError(objOrMsg)
      const sanitizedError = sanitizeErrorForLogging(serializedError)

      if (args.length > 0 && typeof args[0] === 'string') {
        const [msg, ...restArgs] = args
        const logObj = this.createStructuredLogObject(msg, [sanitizedError, ...restArgs])
        this.logger.error(logObj)
      } else {
        this.logger.error(sanitizedError)
      }
    } else if (objOrMsg && typeof objOrMsg === 'object') {
      const sanitizedObj = sanitizeObjectForLogging(objOrMsg as Record<string, unknown>)

      if (args.length > 0 && typeof args[0] === 'string') {
        const [msg, ...restArgs] = args
        const logObj = this.createStructuredLogObject(msg, [sanitizedObj, ...restArgs])
        this.logger.error(logObj)
      } else {
        this.logger.error(sanitizedObj)
      }
    } else {
      this.logger.error(objOrMsg)
    }
  }

  /**
   * Logs at 'warn' level
   */
  warn(obj: Record<string, unknown>, msg?: string, ...args: unknown[]): void
  warn(obj: unknown, msg?: string, ...args: unknown[]): void
  warn(msg: string, ...args: unknown[]): void
  warn(objOrMsg: unknown, ...args: unknown[]): void {
    if (typeof objOrMsg === 'string') {
      // Check for and warn about stringified objects in the message
      const processedMsg = this.extractAndSanitizeStringifiedObjects(objOrMsg)

      if (args.length > 0) {
        // Create a structured log object that includes both the message and any additional args
        const logObj = this.createStructuredLogObject(processedMsg, args)
        this.logger.warn(logObj)
      } else {
        this.logger.warn(processedMsg)
      }
    } else if (objOrMsg instanceof Error) {
      // Handle errors specially to ensure they're properly serialized
      const serializedError = serializeError(objOrMsg)
      const sanitizedError = sanitizeErrorForLogging(serializedError)

      if (args.length > 0 && typeof args[0] === 'string') {
        const [msg, ...restArgs] = args
        const logObj = this.createStructuredLogObject(msg, [sanitizedError, ...restArgs])
        this.logger.warn(logObj)
      } else {
        this.logger.warn(sanitizedError)
      }
    } else if (objOrMsg && typeof objOrMsg === 'object') {
      const sanitizedObj = sanitizeObjectForLogging(objOrMsg as Record<string, unknown>)

      if (args.length > 0 && typeof args[0] === 'string') {
        const [msg, ...restArgs] = args
        const logObj = this.createStructuredLogObject(msg, [sanitizedObj, ...restArgs])
        this.logger.warn(logObj)
      } else {
        this.logger.warn(sanitizedObj)
      }
    } else {
      this.logger.warn(objOrMsg)
    }
  }

  /**
   * Logs at 'debug' level
   */
  debug(obj: Record<string, unknown>, msg?: string, ...args: unknown[]): void
  debug(obj: unknown, msg?: string, ...args: unknown[]): void
  debug(msg: string, ...args: unknown[]): void
  debug(objOrMsg: unknown, ...args: unknown[]): void {
    if (typeof objOrMsg === 'string') {
      // Check for and warn about stringified objects in the message
      const processedMsg = this.extractAndSanitizeStringifiedObjects(objOrMsg)

      if (args.length > 0) {
        // Create a structured log object that includes both the message and any additional args
        const logObj = this.createStructuredLogObject(processedMsg, args)
        this.logger.debug(logObj)
      } else {
        this.logger.debug(processedMsg)
      }
    } else if (objOrMsg instanceof Error) {
      // Handle errors specially to ensure they're properly serialized
      const serializedError = serializeError(objOrMsg)
      const sanitizedError = sanitizeErrorForLogging(serializedError)

      if (args.length > 0 && typeof args[0] === 'string') {
        const [msg, ...restArgs] = args
        const logObj = this.createStructuredLogObject(msg, [sanitizedError, ...restArgs])
        this.logger.debug(logObj)
      } else {
        this.logger.debug(sanitizedError)
      }
    } else if (objOrMsg && typeof objOrMsg === 'object') {
      const sanitizedObj = sanitizeObjectForLogging(objOrMsg as Record<string, unknown>)

      if (args.length > 0 && typeof args[0] === 'string') {
        const [msg, ...restArgs] = args
        const logObj = this.createStructuredLogObject(msg, [sanitizedObj, ...restArgs])
        this.logger.debug(logObj)
      } else {
        this.logger.debug(sanitizedObj)
      }
    } else {
      this.logger.debug(objOrMsg)
    }
  }

  /**
   * Create a child logger with additional context
   */
  child(bindings: Record<string, unknown>): SecureLogger {
    const childLogger = this.logger.child(sanitizeObjectForLogging(bindings))

    return new SecureLogger(childLogger)
  }
}

/**
 * Creates a new secure logger that automatically sanitizes sensitive information
 */
export const createSecureLogger = (options?: pino.LoggerOptions): SecureLogger => {
  const pinoLogger = pino(options)

  return new SecureLogger(pinoLogger)
}
