import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'

import { IncommingLoginRequest } from './login.model'

/**
 * Validates the incoming API request for the login endpoint.
 * @param {IncommingLoginRequest} request - The incoming login request object.
 * @returns {void} - Throws an error if the request is invalid or a valid request is passed forward to the controller.
 */
export const loginRequestValidator = validateIncomingApiRequest(IncommingLoginRequest)
