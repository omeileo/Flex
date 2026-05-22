import { StatusCodes } from 'http-status-codes'

import {
  APIDateTimeSchema,
  CorrelationIdSchema,
  StatusSchema
} from '../../../../shared/functions/http/response/errorResponse.model'
import { quickErrorResponse } from '../../../../shared/functions/http/response/response.function'
import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Dictionary of forget password errors.
 */
export const forgetPasswordErrors = {
  badRequestMissingFields: {
    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.BadRequest,
      error: zodd.string().openapi({ example: 'Bad Request', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Invalid input data: email is required.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/forget-password',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'email',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The email field must be provided and cannot be empty.',
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
        example: 'Please provide your email to reset your password.',
        description: 'User-friendly error message'
      })
    })
  },

  badRequestInvalidDataFormat: {
    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.BadRequest,
      error: zodd.string().openapi({ example: 'Bad Request', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Invalid input data: email format is incorrect.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/forget-password',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'email',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'Invalid email',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'invalid_string',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Please provide a valid email address to reset your password.',
        description: 'User-friendly error message'
      })
    })
  },

  forbiddenActionAttempt: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.FORBIDDEN,
        'Forbidden',
        'Password reset attempt forbidden.',
        [
          {
            field: 'email',
            issue: 'forbidden',
            description: 'Password reset attempts are currently restricted for the provided email address.'
          }
        ],
        'Password reset attempts are restricted for this email address.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Forbidden,
      error: zodd.string().openapi({ example: 'Forbidden', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Password reset attempt forbidden.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/forget-password',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'email',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'Password reset attempts are currently restricted for the provided email address.',
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
        example: 'Password reset attempts are restricted for this email address.',
        description: 'User-friendly error message'
      })
    })
  },

  emailNotFound: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.NOT_FOUND,
        'Not Found',
        'Email not found.',
        [
          {
            field: 'email',
            issue: 'not_found',
            description: 'No account found with the provided email address.'
          }
        ],
        'No account found with the provided email address.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.NotFound,
      error: zodd.string().openapi({ example: 'Not Found', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Email not found.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/forget-password',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'email',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'No account found with the provided email address.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'not_found',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'No account found with the provided email address.',
        description: 'User-friendly error message'
      })
    })
  },

  invalidPasswordResetToken: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'Invalid or expired password reset token.',
        [
          {
            field: 'resetToken',
            issue: 'invalid',
            description: 'The provided password reset token is invalid or has expired.'
          }
        ],
        'The password reset token you provided is invalid or has expired. Please request a new one.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Unauthorized,
      error: zodd.string().openapi({ example: 'Unauthorized', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Invalid or expired password reset token.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/forget-password/verify',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'resetToken',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The provided password reset token is invalid or has expired.',
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
        example: 'The password reset token you provided is invalid or has expired. Please request a new one.',
        description: 'User-friendly error message'
      })
    })
  },

  forbiddenResetAttempt: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.FORBIDDEN,
        'Forbidden',
        'Password reset attempt forbidden.',
        [
          {
            field: 'resetToken',
            issue: 'forbidden',
            description: 'Password reset attempts are currently restricted for the provided reset token.'
          }
        ],
        'Password reset attempts are restricted for this reset token.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Forbidden,
      error: zodd.string().openapi({ example: 'Forbidden', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Password reset attempt forbidden.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/forget-password/verify',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'resetToken',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'Password reset attempts are currently restricted for the provided reset token.',
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
        example: 'Password reset attempts are restricted for this reset token.',
        description: 'User-friendly error message'
      })
    })
  },

  passwordResetFailed: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        'Failed to reset password.',
        [
          {
            field: 'password',
            issue: 'error',
            description: 'An error occurred while attempting to reset your password.'
          }
        ],
        'We were unable to reset your password. Please try again later.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.InternalServerError,
      error: zodd.string().openapi({ example: 'Internal Server Error', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Failed to reset password.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/auth/forget-password/reset',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'password',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'An error occurred while attempting to reset your password.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'error',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'We were unable to reset your password. Please try again later.',
        description: 'User-friendly error message'
      })
    })
  }
}
