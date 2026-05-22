import { status } from '@prisma/client'
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
export const changePasswordErrors = {
  missingRequiredFields: {
    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.BadRequest,
      error: zodd.string().openapi({ example: 'Bad Request', description: 'Error Title' }),
      message: zodd.string().openapi({
        example: 'Invalid input data: currentPassword is required.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/reset-password',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'currentPassword',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The currentPassword must contain at least 3 character(s)',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'too_small',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Please provide your current password to reset it.',
        description: 'User-friendly error message'
      })
    })
  },

  invalidAuthenticationCredentials: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'Invalid current password.',
        [
          {
            field: 'currentPassword',
            description: 'The provided current password is incorrect.',
            issue: 'invalid'
          }
        ],
        'The current password you provided is incorrect. Please try again.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Unauthorized,
      error: zodd.string().openapi({ example: 'Unauthorized', description: 'Error Title' }),
      message: zodd.string().openapi({
        example: 'Invalid current password.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/reset-password',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'currentPassword',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The provided current password is incorrect.',
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
        example: 'The current password you provided is incorrect. Please try again.',
        description: 'User-friendly error message'
      })
    })
  },

  forbiddenActionAttempt: {
    build: ({ name }: status) => {
      return quickErrorResponse(
        StatusCodes.FORBIDDEN,
        'Forbidden',
        'Password reset attempt forbidden.',
        [
          {
            field: 'change_password',
            description: `Password reset attempts are currently restricted for the provided credentials for user with status: ${name}.`,
            issue: 'forbidden'
          }
        ],
        `Password reset attempts are restricted for this account, status is ${name}.`
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Forbidden,
      error: zodd.string().openapi({ example: 'Forbidden', description: 'Error Title' }),
      message: zodd.string().openapi({
        example: 'Password reset attempt forbidden.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/reset-password',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'currentPassword',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'Password reset attempts are currently restricted for the provided credentials.',
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
        example: 'Password reset attempts are restricted for this account.',
        description: 'User-friendly error message'
      })
    })
  },

  passwordMismatch: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Unprocessable Entity',
        'New password and confirmation password do not match.',
        [
          {
            field: 'confirmPassword',
            description: 'The confirmation password does not match the new password.',
            issue: 'mismatch'
          }
        ],
        'Please ensure the new password and confirmation password match.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.UnprocessableEntity,
      error: zodd.string().openapi({
        example: 'Unprocessable Entity',
        description: 'Error Title'
      }),
      message: zodd.string().openapi({
        example: 'New password and confirmation password do not match.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/change-password',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'confirmPassword',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The confirmation password does not match the new password.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'mismatch',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Please ensure the new password and confirmation password match.',
        description: 'User-friendly error message'
      })
    })
  },

  passwordSameAsOld: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.CONFLICT,
        'Conflict',
        'New password cannot be the same as the old password.',
        [
          {
            field: 'newPassword',
            description: 'The new password is the same as the old password.',
            issue: 'same_as_old'
          }
        ],
        'Your new password must be different from your old password.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Conflict,
      error: zodd.string().openapi({ example: 'Conflict', description: 'Error Title' }),
      message: zodd.string().openapi({
        example: 'New password cannot be the same as the old password.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/change-password',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'newPassword',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The new password is the same as the old password.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'same_as_old',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Your new password must be different from your old password.',
        description: 'User-friendly error message'
      })
    })
  }
}
