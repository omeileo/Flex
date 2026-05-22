import { Roles } from '@/shared/enums/roles.enum'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { StatusCodes } from 'http-status-codes'

import { createApiResponses, withJWTMiddleware } from '../../../../__openApiDocs__/functions/openAPI.functions'
import { ValidationErrorResponseBody } from '../../../../shared/functions/http/response/errorResponse.model'
import {
  CreateFlightBookingPaymentIntentRequestBody,
  CreateFlightBookingPaymentIntentResponse,
  CreateOfferRequestPaymentIntentRequestBody,
  CreateOfferRequestPaymentIntentResponse
} from './paymentIntents.model'
import { paymentIntentsRoutes } from './paymentIntents.routes'

/**
 * Represents the Open API registry docs for the Payment Intent functionality.
 */
export const paymentIntentsRegistry = new OpenAPIRegistry()

paymentIntentsRegistry.registerPath({
  method: 'post',
  path: paymentIntentsRoutes.CREATE_OFFER_REQUEST_PAYMENT_INTENTS.openApiFullPath,
  tags: ['Payment Intents'],
  ...withJWTMiddleware(),
  parameters: [
    {
      in: 'header',
      name: 'X-User-Role',
      schema: {
        type: 'string',
        enum: Object.values(Roles),
        default: Roles.User
      },
      required: true,
      description: 'The role of the user making the request'
    }
  ],
  request: {
    body: {
      description: 'Create Offer Request Payment Intents Request Body',
      required: true,
      content: {
        'application/json': {
          schema: CreateOfferRequestPaymentIntentRequestBody
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: CreateOfferRequestPaymentIntentResponse,
      description: 'Successfully Created Offer Request Payment Intent.',
      statusCode: StatusCodes.CREATED
    },
    {
      result: ValidationErrorResponseBody,
      description: 'Invalid Offer Request Payment Intents request. Validation Error.',
      statusCode: StatusCodes.BAD_REQUEST
    }
  ])
})

paymentIntentsRegistry.registerPath({
  method: 'post',
  path: paymentIntentsRoutes.CREATE_FLIGHT_BOOKING_PAYMENT_INTENTS.openApiFullPath,
  tags: ['Payment Intents'],
  ...withJWTMiddleware(),
  parameters: [
    {
      in: 'header',
      name: 'X-User-Role',
      schema: {
        type: 'string',
        enum: Object.values(Roles),
        default: Roles.User
      },
      required: true,
      description: 'The role of the user making the request'
    }
  ],
  request: {
    body: {
      description: 'Create Flight Booking Payment Intent Request Body',
      required: true,
      content: {
        'application/json': {
          schema: CreateFlightBookingPaymentIntentRequestBody
        }
      }
    }
  },
  responses: createApiResponses([
    {
      result: CreateFlightBookingPaymentIntentResponse,
      description: 'Successfully Created Flight Booking Payment Intent.',
      statusCode: StatusCodes.CREATED
    },
    {
      result: ValidationErrorResponseBody,
      description: 'Invalid Flight Booking Payment Intent request. Validation Error.',
      statusCode: StatusCodes.BAD_REQUEST
    }
  ])
})
