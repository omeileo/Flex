import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'

import { IncomingChangePasswordRequest } from './changePassword.model'

/**
 * Validates the incoming API request for the changePassword endpoint.
 * @param {IncomingChangePasswordRequest} request - The incoming changePassword request object.
 * @returns {void} - Throws an error if the request is invalid or passes a valid request forward to the controller.
 */
export const changePasswordRequestValidator = validateIncomingApiRequest(IncomingChangePasswordRequest)
