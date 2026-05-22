import { env } from '@/shared/functions/envConfig'
import { randomUUID } from 'crypto'
import { Request, RequestHandler, Response } from 'express'
import { IncomingMessage, ServerResponse } from 'http'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { LevelWithSilent } from 'pino'
import { CustomAttributeKeys, Options, pinoHttp } from 'pino-http'

import { LogLevel, PinoCustomProps } from './requestLogger.types'

/**
 * Middleware function that logs incoming requests using Pino logger.
 *
 * @param options - Optional configuration options for the logger.
 * @returns An array of RequestHandler middleware functions.
 */
const requestLogger = (options?: Options): RequestHandler[] => {
  const pinoOptions: Options = {
    enabled: env.NODE_ENV === 'production',
    customProps: customProps as unknown as Options['customProps'],
    redact: [],
    genReqId,
    customLogLevel,
    customSuccessMessage,
    customReceivedMessage: (req) => `request received: ${req.method}`,
    customErrorMessage: (_req, res) => `request errored with status code: ${res.statusCode}`,
    customAttributeKeys,
    ...options
  }

  return [responseBodyMiddleware, pinoHttp(pinoOptions)]
}

const customAttributeKeys: CustomAttributeKeys = {
  req: 'request',
  res: 'response',
  err: 'error',
  responseTime: 'timeTaken'
}

const customProps = (req: Request, res: Response): PinoCustomProps => ({
  request: req,
  response: res,
  error: res.locals.err,
  responseBody: res.locals.responseBody
})

const responseBodyMiddleware: RequestHandler = (_req, res, next) => {
  const isNotProduction = env.NODE_ENV !== 'production'

  if (isNotProduction) {
    const originalSend = res.send

    res.send = function (content) {
      res.locals.responseBody = content
      res.send = originalSend

      return originalSend.call(res, content)
    }
  }

  next()
}

const customLogLevel = (_req: IncomingMessage, res: ServerResponse<IncomingMessage>, err?: Error): LevelWithSilent => {
  if (err || res.statusCode >= StatusCodes.INTERNAL_SERVER_ERROR) return LogLevel.Error

  if (res.statusCode >= StatusCodes.BAD_REQUEST) return LogLevel.Warn

  if (res.statusCode >= StatusCodes.MULTIPLE_CHOICES) return LogLevel.Silent

  return LogLevel.Info
}

const customSuccessMessage = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  if (res.statusCode === StatusCodes.NOT_FOUND) return getReasonPhrase(StatusCodes.NOT_FOUND)

  return `${req.method} completed`
}

const genReqId = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const existingID = req.id ?? req.headers['x-request-id']
  const id = randomUUID()

  if (existingID) {
    return existingID
  } else {
    res.setHeader('X-Request-Id', id)

    return id
  }
}

export default requestLogger()
