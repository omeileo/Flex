import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'

import { IncomingCheckoutSessionRequestBody } from './checkoutSession.model'

/**
 * Validates the incoming API request for the create checkoutSession endpoint.
 * @param {IncomingCheckoutSessionRequestBody} request - The incoming create checkoutSession request object.
 * @returns {void} - Throws an error if the request is invalid or passes a valid request forward to the controller.
 */
export const createCheckoutSessionValidator = validateIncomingApiRequest(IncomingCheckoutSessionRequestBody)
