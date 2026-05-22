import { StatusCodes } from 'http-status-codes'

import {
  APIDateTimeSchema,
  CorrelationIdSchema,
  StatusSchema
} from '../../../../shared/functions/http/response/errorResponse.model'
import { quickErrorResponse } from '../../../../shared/functions/http/response/response.function'
import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Dictionary of login errors.
 */
export const logoutErrors = {
  missingToken: {
    /**
     * Builds the error response for missing token.
     *
     * @returns The error response object.
     */
    build: () => {
      return quickErrorResponse(
        StatusCodes.BAD_REQUEST,
        'Bad Request',
        'Invalid input data: token is required.',
        [
          {
            field: 'token',
            description: 'The token field must be provided and cannot be empty.',
            issue: 'required'
          }
        ],
        'Please provide a valid token to logout.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.BadRequest,
      error: zodd.string().openapi({ example: 'Bad Request', description: 'Error Title' }),
      message: zodd.string().openapi({
        example: 'Invalid input data: token is required.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/logout',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'token',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The token field must be provided and cannot be empty.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'required',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Please provide a valid token to logout.',
        description: 'User-friendly error message'
      })
    })
  },

  invalidToken: {
    /**
     * Builds the error response for invalid or expired token.
     *
     * @returns The error response object.
     */
    build: () => {
      return quickErrorResponse(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'Invalid or expired token.',
        [
          {
            field: 'token',
            description: 'The provided token is invalid or has expired.',
            issue: 'invalid'
          }
        ],
        'The token you provided is invalid or has expired. Please log in again.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Unauthorized,
      error: zodd.string().openapi({ example: 'Unauthorized', description: 'Error Title' }),
      message: zodd.string().openapi({
        example: 'Invalid or expired token.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/logout',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'token',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The provided token is invalid or has expired.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'invalid',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'The token you provided is invalid or has expired. Please log in again.',
        description: 'User-friendly error message'
      })
    })
  }
}
