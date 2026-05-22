import { StatusCodes } from 'http-status-codes'

import {
  APIDateTimeSchema,
  CorrelationIdSchema,
  StatusSchema
} from '../../../../shared/functions/http/response/errorResponse.model'
import { quickErrorResponse } from '../../../../shared/functions/http/response/response.function'
import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Dictionary of Offer Request Payment Intents errors.
 */
export const paymentIntentsErrors = {
  maximumpaymentIntentssReached: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'Unprocessable Entity',
        'Maximum number of Offer Request Payment Intentss reached.',
        [
          {
            field: 'paymentIntentss',
            issue: 'limitExceeded',
            description: 'You have reached the maximum number of Offer Request Payment Intentss allowed.'
          }
        ],
        'You have reached the maximum number of Offer Request Payment Intentss allowed, please remove an existing one before adding a new one.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.BadRequest,
      error: zodd.string().openapi({ example: 'Bad Request', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Maximum number of Offer Request Payment Intentss reached.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/payment-intents/offer-requests/add',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'paymentIntentss',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'You have reached the maximum number of Offer Request Payment Intentss allowed.',
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
        example: 'You cannot add more Offer Request Payment Intentss.',
        description: 'User-friendly error message'
      })
    })
  },

  unableToCreatePaymentIntentForHold: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.FAILED_DEPENDENCY,
        'Failed Dependency',
        'Unable to create payment intent for hold.',
        [
          {
            field: 'paymentIntent',
            issue: 'creationFailed',
            description: 'The payment intent for hold could not be created.'
          }
        ],
        'There was an error while processing your payment. Please check your payment method and try again. If the problem persists, please contact support.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.FailedDependency,
      error: zodd.string().openapi({ example: 'Failed Dependency', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'There was an error while processing your payment.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/payment-intents/hold',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'paymentIntent',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'The payment intent for hold could not be created.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'creationFailed',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Unable to create payment intent for hold. Please try again or contact support.',
        description: 'User-friendly error message'
      })
    })
  },

  unableToCreatePaymentIntentForTransfer: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.FAILED_DEPENDENCY,
        'Failed Dependency',
        'Unable to create payment intent for transfer.',
        [
          {
            field: 'paymentIntent',
            issue: 'creationFailed',
            description:
              'The payment intent for transfer could not be created. This may be due to insufficient funds or an issue with the payment method.'
          }
        ],
        'Unable to get payment details for this order. Please try again or contact support.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.FailedDependency,
      error: zodd.string().openapi({ example: 'Failed Dependency', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Unable to create payment intent for transfer.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/payment-intents/transfer',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'paymentIntent',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example:
              'The payment intent for transfer could not be created. This may be due to insufficient funds or an issue with the payment method.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'creationFailed',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example: 'Unable to get payment details for this order. Please try again or contact support.',
        description: 'User-friendly error message'
      })
    })
  },
  itemsFromDifferentCountries: {
    build: () => ({
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      error: 'Items From Different Countries',
      message: 'All items in an order must be from the same country.',
      details: [
        {
          field: 'items',
          description: 'Items must all be from the same country.',
          issue: 'mixed_countries'
        }
      ],
      userFriendlyMessage: 'Please select items from the same country for your order.'
    }),
    schema: zodd.object({
      status: zodd.number().openapi({
        example: StatusCodes.UNPROCESSABLE_ENTITY,
        description: 'HTTP status code'
      }),
      error: zodd.string().openapi({
        example: 'Items From Different Countries',
        description: 'Error type'
      }),
      message: zodd.string().openapi({
        example: 'All items in an order must be from the same country.',
        description: 'Detailed error message'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'items',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example: 'Items must all be from the same country.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'mixed_countries',
            description: 'The issue or error type'
          })
        })
      ),
      userFriendlyMessage: zodd.string().openapi({
        example: 'Please select items from the same country for your order.',
        description: 'User-friendly error message'
      })
    })
  }
}
