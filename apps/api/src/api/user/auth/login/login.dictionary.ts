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
export const loginErrors = {
  unauthorized: {
    /**
     * Builds the error response for unauthorized access.
     *
     * @returns The error response object.
     */
    build: () => {
      return quickErrorResponse(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'Invalid username or password.',
        [
          {
            field: 'credentials',
            description: 'The provided username or password is incorrect.',
            issue: 'invalid'
          }
        ],
        'The username or password you provided is incorrect. Please try again.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Unauthorized,
      error: zodd.string().openapi({ example: 'Unauthorized', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Invalid username or password.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: 'auth/login',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'credentials',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The provided username or password is incorrect.',
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
        example: 'The username or password you provided is incorrect. Please try again.',
        description: 'User-friendly error message'
      })
    })
  },

  forbiddenLoginAttempt: {
    /**
     * Builds the error response for forbidden login attempt.
     *
     * Returned when account is in the locked, disabled, or the soft_deleted state.
     *
     * @returns The error response object.
     */
    build: (userStatus: string) => {
      return quickErrorResponse(
        StatusCodes.FORBIDDEN,
        'Forbidden',
        'Login attempt forbidden.',
        [
          {
            field: 'account status',
            description: `Login attempts are currently restricted for the provided username. Account status is ${userStatus}.`,
            issue: `forbidden for ${userStatus} status`
          }
        ],
        `Login attempts are restricted for this username. Account is now ${userStatus}. Reset your password to unlock your account or contact support for assistance.`
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Forbidden,
      error: zodd.string().openapi({ example: 'Forbidden', description: 'Error Title' }),
      message: zodd.string().openapi({
        example: 'Login attempt forbidden.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: 'auth/login',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'username',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'Login attempts are currently restricted for the provided username.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'forbidden',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Login attempts are restricted for this username.',
        description: 'User-friendly error message'
      })
    })
  },
  accountNotVerified: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.FORBIDDEN,
        'Account Not Verified',
        'Your account has not been verified.',
        [
          {
            field: 'account status',
            description: 'The account has not been verified.',
            issue: 'not_verified'
          }
        ],
        'Your account has not been verified. Please check your email for the verification link.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Forbidden,
      error: zodd.string().openapi({
        example: 'Account Not Verified',
        description: 'Error Title'
      }),
      message: zodd.string().openapi({
        example: 'Your account has not been verified.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: 'auth/login',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'account status',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The account has not been verified.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'not_verified',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Your account has not been verified. Please check your email for the verification link.',
        description: 'User-friendly error message'
      })
    })
  }
}
