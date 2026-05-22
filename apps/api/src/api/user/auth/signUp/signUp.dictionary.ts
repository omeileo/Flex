import {
  APIDateTimeSchema,
  CorrelationIdSchema,
  StatusSchema
} from '@/shared/functions/http/response/errorResponse.model'
import { obfuscateSensitiveData } from '@/shared/functions/security/security.functions'
import { zodd } from '@/shared/functions/zod.functions'
import { StatusCodes } from 'http-status-codes'

import { quickErrorResponse } from '../../../../shared/functions/http/response/response.function'

/**
 * Dictionary of signup errors.
 */
export const signupErrors = {
  duplicateEmail: {
    /**
     * Builds the error response for duplicate email.
     *
     * @param emailAddress - The email address that already exists.
     * @returns The error response object.
     */
    build: (emailAddress: string) => {
      return quickErrorResponse(
        StatusCodes.CONFLICT,
        'Email Conflict',
        'Email address already in use.',
        [
          {
            field: 'email',
            description: `A user with this email address (${obfuscateSensitiveData(emailAddress)}) already exists.`,
            issue: 'exists'
          }
        ],
        'An account with this email address already exists.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.Conflict,
      error: zodd.string().openapi({ example: 'Email Conflict', description: 'Error Title' }),
      message: zodd.string().openapi({
        example: 'Email address already in use.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/api/v1/user/auth/sign-up',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'email',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'A user with this email address (xyz@example.com) already exists.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'exists',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'An account with this email address already exists.',
        description: 'User-friendly error message'
      })
    })
  }
}
