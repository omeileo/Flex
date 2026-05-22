import { logger } from '@/app'
import { globalErrors } from '@/shared/dictionary/errors.dictionary'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { errorResponse } from './response/response.function'

export const validateWebhookWithBearerToken =
  (expectedAccessToken: string) => async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Validating webhook with bearer token')

    try {
      const authHeader = req.headers.authorization

      logger.info(`authHeader: ${authHeader}`)

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw globalErrors.missingToken.build()
      }

      const providedAccessToken = authHeader.split(' ')[1]

      if (providedAccessToken !== expectedAccessToken) {
        throw globalErrors.invalidToken.build()
      }

      next()
    } catch (error) {
      logger.error(`Error validating webhook with bearer token: ${error}`)

      errorResponse(
        res,
        req.originalUrl,
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        (error as Error).message,
        [],
        'Please provide a valid access token.'
      )
    }
  }
