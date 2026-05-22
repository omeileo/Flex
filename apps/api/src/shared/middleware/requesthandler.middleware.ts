import { NextFunction, Request, Response } from 'express'

import appContextMiddleware from './appContext/appContext.middleware'
import jwtMiddleware, { authPathsOnly } from './jwt/jwt.middleware'

/**
 * Main Purpose: Pass Application Errors to the Error Handling Middleware, without it errors will not be displayed and the application may crash when an error is thrown.
 *
 * Purpose: Middleware function that wraps an asynchronous request handler function.
 * It catches any errors thrown by the handler and passes them to the next middleware.
 *
 * This middleware function also integrates other middlewares in a specific order:
 * 1. `authPathsOnly(jwtMiddleware)`: This middleware ensures that JWT authentication is applied only to specific paths.
 * 2. `appContextMiddleware`: This middleware sets up the application context for the request. (Sets the currect user from the jwt token)
 * 3. `validator` (optional): If provided, this middleware validates the request.
 * 4. `request`: The main request handler function that processes the request.
 *
 * @param validator - Optional middleware function for request validation.
 * @param request - Main request handler function from the controller.
 * @returns A middleware function that catches errors thrown by the request handler and passes them to the next middleware so they can be processed by the error handling middleware.
 */

type RequestToHandle = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const requestHandler =
  (validator: RequestToHandle | null, request: RequestToHandle) =>
  (req: Request, res: Response, next: NextFunction) => {
    // Apply JWT middleware to specific paths
    authPathsOnly(jwtMiddleware)(req, res, (err) => {
      if (err) {
        return next(err)
      }

      // Set up application context for the request
      appContextMiddleware(req, res, (err) => {
        if (err) {
          return next(err)
        }

        // If a validator is provided, validate the request
        if (validator) {
          validator(req, res, (err) => {
            if (err) {
              return next(err)
            }

            // Process the main request handler and catch any errors
            request(req, res, next).catch((err) => next(err))
          })
        } else {
          // If no validator is provided, directly process the main request handler and catch any errors
          request(req, res, next).catch((err) => next(err))
        }
      })
    })
  }
