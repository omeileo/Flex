import { StatusCodes } from 'http-status-codes'

import {
  APIDateTimeSchema,
  CorrelationIdSchema,
  StatusSchema
} from '../../../../shared/functions/http/response/errorResponse.model'
import { quickErrorResponse } from '../../../../shared/functions/http/response/response.function'
import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Dictionary of refund errors.
 */
export const refundErrors = {
  unableToCreateRefund: {
    build: () => {
      return quickErrorResponse(
        StatusCodes.FAILED_DEPENDENCY,
        'Failed Dependency',
        'Unable to create refund.',
        [
          {
            field: 'refund',
            issue: 'creationFailed',
            description:
              'The refund could not be created. This may be due to insufficient funds or an issue with the payment method.'
          }
        ],
        'Unable to process your refund request. Please try again or contact support.'
      )
    },

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.FailedDependency,
      error: zodd.string().openapi({ example: 'Failed Dependency', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'Unable to create refund.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/refunds',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'refund',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example:
              'The refund could not be created. This may be due to insufficient funds or an issue with the payment method.',
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
        example: 'Unable to process your refund request. Please try again or contact support.',
        description: 'User-friendly error message'
      })
    })
  },

  noEligiblePaymentsFound: {
    build: (recordId: number, recordType: string) =>
      quickErrorResponse(
        StatusCodes.BAD_REQUEST,
        'Bad Request',
        `No eligible payments found for ${recordType}: ${recordId}.`,
        [
          {
            field: 'payment',
            issue: 'noEligiblePayments',
            description: `No eligible payments were found for this ${recordType} (${recordId}). The payment may have already been refunded or cancelled.`
          }
        ],
        `No eligible payments found for this ${recordType}. Please contact support if you believe this is an error.`
      ),

    schema: zodd.object({
      timestamp: APIDateTimeSchema,
      status: StatusSchema.BadRequest,
      error: zodd.string().openapi({ example: 'Bad Request', description: 'Error' }),
      message: zodd.string().openapi({
        example: 'No eligible payments found for flight booking.',
        description: 'Error Message'
      }),
      path: zodd.string().openapi({
        example: '/payments/refunds',
        description: 'The path of the request.'
      }),
      details: zodd.array(
        zodd.object({
          field: zodd.string().openapi({
            example: 'payment',
            description: 'The field related to the error'
          }),
          description: zodd.string().openapi({
            example:
              'No eligible payments were found for this flight booking. The payment may have already been refunded or cancelled.',
            description: 'Detailed description of the error'
          }),
          issue: zodd.string().openapi({
            example: 'noEligiblePayments',
            description: 'The issue or error type'
          })
        })
      ),
      correlationId: CorrelationIdSchema,
      userFriendlyMessage: zodd.string().openapi({
        example:
          'No eligible payments found for this flight booking. Please contact support if you believe this is an error.',
        description: 'User-friendly error message'
      })
    })
  }
}
