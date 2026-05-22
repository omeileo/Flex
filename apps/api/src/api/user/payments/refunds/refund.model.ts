import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Represents the request body for requesting an offer refund.
 *
 * This is used to validate the incoming request to the "Request offer refund" endpoint.
 */
export const requestOfferRefundRequestBody = zodd.object({
  offerRequestId: zodd.string().openapi({
    example: '1',
    description: 'The identifier for the offer request'
  })
})

/**
 * Represents the incoming request object for requesting an offer refund.
 *
 * This is used to validate the incoming request to the "Request offer refund" endpoint.
 */
export const IncomingRequestOfferRefundRequest = zodd.object({
  body: requestOfferRefundRequestBody
})

/**
 * Represents the response body for the "Request offer refund" endpoint.
 *
 * This is returned when the request offer refund request is successful.
 */
export const RequestOfferRefundResponseBody = zodd.object({})

/**
 * Represents the request body for requesting a flight booking refund.
 *
 * This is used to validate the incoming request to the "Request flight booking refund" endpoint.
 */
export const requestFlightBookingRefundRequestBody = zodd.object({
  flight: zodd.string().openapi({
    example: '1',
    description: 'The identifier for the offer request'
  })
})

/**
 * Represents the incoming request object for requesting a flight booking refund.
 *
 * This is used to validate the incoming request to the "Request flight booking refund" endpoint.
 */
export const IncomingRequestFlightBookingRefundRequest = zodd.object({
  body: requestFlightBookingRefundRequestBody
})

/**
 * Represents the response body for the "Request flight booking refund" endpoint.
 *
 * This is returned when the request flight booking refund request is successful.
 */
export const RequestFlightBookingRefundResponseBody = zodd.object({})
