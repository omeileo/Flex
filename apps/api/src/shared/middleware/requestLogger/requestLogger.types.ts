import { Request, Response } from 'express'

/**
 * Represents the log levels for request logging.
 */
export enum LogLevel {
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
  Trace = 'trace',
  Silent = 'silent'
}

/**
 * Represents the custom properties used by the request logger middleware.
 */
export type PinoCustomProps = {
  request: Request
  response: Response
  error: Error
  responseBody: unknown
}
