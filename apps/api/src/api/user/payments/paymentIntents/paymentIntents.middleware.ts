import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'

import {
  IncomingExternalFlightBookingPaymentIntentRequestBody,
  IncomingFlightBookingPaymentIntentRequestBody,
  IncomingOfferRequestPaymentIntentRequestBody
} from './paymentIntents.model'

/**
 * Validates the incoming API request for the create offer request paymentIntents endpoint.
 * @param {IncomingOfferRequestPaymentIntentRequestBody} request - The incoming create offer request paymentIntents request object.
 * @returns {void} - Throws an error if the request is invalid or passes a valid request forward to the controller.
 */
export const createOfferRequestPaymentIntentsValidator = validateIncomingApiRequest(
  IncomingOfferRequestPaymentIntentRequestBody
)

/**
 * Validates the incoming API request for the create flight booking paymentIntents endpoint.
 * @param {IncomingOfferRequestPaymentIntentRequestBody} request - The incoming create offer request paymentIntents request object.
 * @returns {void} - Throws an error if the request is invalid or passes a valid request forward to the controller.
 */
export const createFlightBookingPaymentIntentsValidator = validateIncomingApiRequest(
  IncomingFlightBookingPaymentIntentRequestBody
)

/**
 * Validates the incoming API request for the create external flight booking paymentIntents endpoint.
 * @param {IncomingOfferRequestPaymentIntentRequestBody} request - The incoming create offer request paymentIntents request object.
 * @returns {void} - Throws an error if the request is invalid or passes a valid request forward to the controller.
 */
export const createExternalFlightBookingPaymentIntentsValidator = validateIncomingApiRequest(
  IncomingExternalFlightBookingPaymentIntentRequestBody
)
