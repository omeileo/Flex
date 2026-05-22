import {
  APIDateTimeSchema,
  CorrelationIdSchema,
  StatusSchema
} from '@/shared/functions/http/response/errorResponse.model'
import { zodd } from '@/shared/functions/zod.functions'
import { StatusCodes } from 'http-status-codes'

import { quickErrorResponse } from '../../../../shared/functions/http/response/response.function'

/**
 * Dictionary of error messages related to email verification.
 */
export const verifyEmailErrors = {
  /**
   * Error message for when the verification token is expired or invalid.
   * @returns The error response object.
   */
  tokenExpiredOrInvalid: {
    build: () =>
      quickErrorResponse(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'Invalid or expired verification code.',
        [
          {
            field: 'verificationCode',
            description: 'The provided verification code is invalid or has expired.',
            issue: 'invalid'
          }
        ],
        'The verification code you provided is invalid or has expired. Please request a new one.'
      ),
    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Unauthorized,
      error: zodd.string().openapi({ example: 'Unauthorized' }),
      message: zodd.string().openapi({
        example: 'Invalid or expired verification code.',
        description: 'Error Message'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'verificationCode',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The provided verification code is invalid or has expired.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'invalid',
            description: 'The issue'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'The verification code you provided is invalid or has expired. Please request a new one.',
        description: 'User-friendly error message'
      })
    })
  },

  /**
   * Error message for when the user is already verified.
   * @returns The error response object.
   */
  userAlreadyVerified: {
    build: () =>
      quickErrorResponse(
        StatusCodes.FORBIDDEN,
        'Forbidden',
        'Account is already verified.',
        [
          {
            field: 'email',
            description: 'The account associated with this email is already verified.',
            issue: 'already_verified'
          }
        ],
        'Your account is already verified. You can log in now.'
      ),
    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Forbidden,
      error: zodd.string().openapi({ example: 'Forbidden' }),
      message: zodd.string().openapi({
        example: 'Account is already verified.',
        description: 'Error Message'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'email',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The account associated with this email is already verified.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'already_verified',
            description: 'The issue'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Your account is already verified. You can log in now.',
        description: 'User-friendly error message'
      })
    })
  }
}
