import { StatusCodes } from 'http-status-codes'

import {
  APIDateTimeSchema,
  CorrelationIdSchema,
  StatusSchema
} from '../../../../shared/functions/http/response/errorResponse.model'
import { quickErrorResponse } from '../../../../shared/functions/http/response/response.function'
import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Dictionary of Checkout Session errors.
 */
export const customerSessionErrors = {
  maximumCustomerSessionsReached: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Unprocessable Entity',
        'Maximum number of Checkout Sessions reached.',
        [
          {
            field: 'customerSessions',
            issue: 'limitExceeded',
            description: 'You have reached the maximum number of Checkout Sessions allowed.'
          }
        ],
        'You have reached the maximum number of Checkout Sessions allowed, please remove an existing one before adding a new one.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.BadRequest,
      error: zodd.string().openapi({ example: 'Bad Request', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Maximum number of Checkout Sessions reached.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/checkout-sessions/add',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'customerSessions',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'You have reached the maximum number of Checkout Sessions allowed.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'limitExceeded',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'You cannot add more Checkout Sessions.',
        description: 'User-friendly error message'
      })
    })
  }
}
