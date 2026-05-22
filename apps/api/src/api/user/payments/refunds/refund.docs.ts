import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import { createApiResponses, withJWTMiddleware } from '../../../../__openApiDocs__/functions/openAPI.functions'
import { ValidationErrorResponseBody } from '../../../../shared/functions/http/response/errorResponse.model'
import { refundErrors } from './refund.dictionary'
import { RequestOfferRefundResponseBody, requestOfferRefundRequestBody } from './refund.model'
import { refundRoutes } from './refund.routes'

/**
 * Represents the Open API registry docs for the refund functionality.
 */
export const refundRegistry = new OpenAPIRegistry()

refundRegistry.registerPath({
  method: 'post',
  path: refundRoutes.REQUEST_OFFER_REFUND.openApiFullPath,
  tags: ['refund'],
  ...withJWTMiddleware(),

  request: {
    body: {
      description: 'Offer request refund request body',
      required: true,
      content: {
        'application/json': {
          schema: requestOfferRefundRequestBody
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: RequestOfferRefundResponseBody,
      description: 'Successfully requested refund.',
      statusCode: StatusCodes.OK
    },
    {
      result: ValidationErrorResponseBody,
      description: 'Invalid refund request. Validation Error.',
      statusCode: StatusCodes.BAD_REQUEST
    },
    {
      result: refundErrors.unableToCreateRefund.schema,
      description: 'Unable to create refund.',
      statusCode: StatusCodes.FAILED_DEPENDENCY
    }
  ])
})
