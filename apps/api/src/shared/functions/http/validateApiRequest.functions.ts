import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ZodError, ZodSchema } from 'zod'

import { errorResponse } from './response/response.function'
import { ErrorResponse } from './response/response.types'

/**
 * Validates an incoming API request against a given schema.
 *
 * Main Purpose: Filter out invalid requests before they reach the controller, avoid unnecessary processing, null or undefined values, and other related issues.
 *
 * If the request data is valid, the next middleware function is called.
 * If the request data is invalid, an error response is sent.
 * @param schema - The schema to validate the request against.
 * @returns A middleware function that performs the validation.
 */
export const validateIncomingApiRequest =
  (schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, query: req.query, params: req.params })
      next()
    } catch (err) {
      const message = 'Invalid Input Data'

      const errors: ErrorResponse['details'] = (err as ZodError).errors?.map((error) => {
        return {
          // remove first body element from path ([ 'body', 'firstName' ])
          field: error.path.slice(1)[0] as string,
          issue: error.code,
          description: error.message.replace('String', `The ${error.path[1]}`)
        }
      })
      errorResponse(
        res,
        req.originalUrl,
        StatusCodes.BAD_REQUEST,
        'Bad Request',
        message,
        errors,
        'Please fill out the required fields correctly.'
      )
    }
  }
