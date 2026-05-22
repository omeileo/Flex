import { StatusCodes } from 'http-status-codes'

import {
  APIDateTimeSchema,
  CorrelationIdSchema,
  StatusSchema
} from '../../../../shared/functions/http/response/errorResponse.model'
import { quickErrorResponse } from '../../../../shared/functions/http/response/response.function'
import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Dictionary of Payment Methods errors.
 */
export const paymentMethodsErrors = {
  maximumPaymentMethodssReached: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Unprocessable Entity',
        'Maximum number of Payment Methodss reached.',
        [
          {
            field: 'paymentMethodss',
            issue: 'limitExceeded',
            description: 'You have reached the maximum number of Payment Methodss allowed.'
          }
        ],
        'You have reached the maximum number of Payment Methodss allowed, please remove an existing one before adding a new one.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.BadRequest,
      error: zodd.string().openapi({ example: 'Bad Request', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Maximum number of Payment Methodss reached.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/payment-methods/add',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'paymentMethodss',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'You have reached the maximum number of Payment Methodss allowed.',
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
        example: 'You cannot add more Payment Methodss.',
        description: 'User-friendly error message'
      })
    })
  }
}
