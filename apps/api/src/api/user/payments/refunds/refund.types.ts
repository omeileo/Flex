import { RequestOfferRefundResponseBody, requestOfferRefundRequestBody } from './refund.model'

/**
 * Represents the request body for requesting a refund.
 */
export type RequestOfferRefundRequestBody = Zod.infer<typeof requestOfferRefundRequestBody>

/**
 * Represents the response object returned by the request refund API.
 */
export type RequestOfferRefundResponse = Zod.infer<typeof RequestOfferRefundResponseBody>

export type FlightBookingRefundMetadata = {
  userId: string
  flightBookingId: string
  airlineFee: string
  refundAmount: string
}

export type FlightBookingChargebackMetadata = {
  userId: string
  paymentData: string
  flightBookingId: string
  airlineFee: string
  stripeFee: string
  totalTransferAmount: string
}

export type OfferRequestRefundMetadata = {
  userId: string
  offerRequestId: string
  isPartialRefund: string
  refundAmount: string
}
