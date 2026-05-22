import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'

import { IncomingRequestOfferRefundRequest } from './refund.model'

/**
 * Validates the incoming API request for the request offer refund endpoint.
 * @param {IncomingRequestOfferRefundRequest} request - The incoming request offer refund request object.
 * @returns {void} - Throws an error if the request is invalid or passes a valid request forward to the controller.
 */
export const requestOfferRefundValidator = validateIncomingApiRequest(IncomingRequestOfferRefundRequest)
