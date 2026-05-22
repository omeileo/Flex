import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'

import { IncommingSignupRequest } from './signUp.model'

/**
 * Validates the incoming API request for the sign up endpoint.
 * @param {IncommingSignupRequest} request - The incoming sign up request object.
 * @returns {void} - Throws an error if the request is invalid or a valid request is passed forward to the controller.
 */
export const signUpRequestValidator = validateIncomingApiRequest(IncommingSignupRequest)
