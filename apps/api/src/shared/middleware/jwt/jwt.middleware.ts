import { logger } from '@/app'
import express, { NextFunction, Request, Response } from 'express'
import micromatch from 'micromatch'

import { globalErrors } from '../../dictionary/errors.dictionary'
import { env } from '../../functions/envConfig'
import { getJwtTokenFromRequest } from '../../functions/http/request.functions'
import { blacklistedTokensRepository } from '../../repository/blacklistedTokens.repository'
import { jwtService } from './jwt.functions'

const excludedPaths = [
  '*',
  '/',
  '/auth/verify-email*',
  '/auth/verify-email/resend*',
  '/favicon*',
  '/swagger*',
  '/auth/login*',
  '/auth/sign-up*',
  '/auth/forget-password*',
  '/auth/forget-password*/**/*',
  '/flights/search*',
  '/flights/search/next*',
  '/flights/search/fare*',
  '/flights/places/countries-and-cities*',
  '/flights/places**',
  '/flights/booking/view*',
  '/flights/booking/webhooks/airline-initiated-changes*',
  '/flights/itineraries/view?id=**',
  '/supported-loyalty-program/view-all**',
  '/items/details*',
  '/items/updates*',
  '/offers/item-requests/external-tracking-details/update-tracking-details*',
  '/offers/offer-requests/view-all*',
  '/offers/offer-requests/view-all*'
].map((path) => `${env.APP_BASE_PATH}${path}`)

/**
 * Middleware function that applies the provided middleware only to specific paths.
 * If the request path is one of the excluded paths, the next middleware is called without applying the JWT middleware.
 * Otherwise, the JWT middleware is applied.
 *
 * @param middleware - The middleware function to be applied.
 * @returns A function that acts as the middleware and applies the provided middleware based on the request path.
 */
export function authPathsOnly(middleware: express.RequestHandler) {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (micromatch.some(req.originalUrl, excludedPaths)) {
      // Attempt to decode the token and set the app context
      try {
        const token = getJwtTokenFromRequest(req)

        if (token) {
          const userPayload = jwtService.verifyToken(token)
          req.userPayload = userPayload
        } else {
          req.userPayload = undefined
        }
      } catch (error) {
        logger.error('Error verifying token', { error })
        req.userPayload = undefined
      }

      return next()
    }

    // Apply JWT middleware for non-excluded paths
    return middleware(req, res, next)
  }
}

/**
 * Middleware function to handle JWT authentication.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 * @returns A Promise that resolves to void.
 */
const jwtMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = getJwtTokenFromRequest(req)

    if (!token) {
      throw globalErrors.missingToken.build()
    }

    const blacklistedToken = await blacklistedTokensRepository.getBlacklistedToken(token)

    if (blacklistedToken) {
      throw globalErrors.invalidToken.build()
    }

    const userPayload = jwtService.verifyToken(token)

    req.userPayload = userPayload

    next()
  } catch (err) {
    next(err)
  }
}

export default jwtMiddleware
