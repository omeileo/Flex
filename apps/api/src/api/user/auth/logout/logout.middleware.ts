import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'

import { IncommingLogoutRequest } from './logout.model'

/**
 * Validates the incoming API request for the logout endpoint.
 * @param {IncommingLogoutRequest} request - The incoming logout request object.
 * @returns {void} - Throws an error if the request is invalid or a valid request is passed forward to the controller.
 */
export const logoutRequestValidator = validateIncomingApiRequest(IncommingLogoutRequest)
