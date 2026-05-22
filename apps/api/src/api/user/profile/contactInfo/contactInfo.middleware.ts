import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'

import { IncomingUpdateContactInfoRequest } from './contactInfo.model'

/**
 * Validates the incoming API request for the update contactInfo endpoint.
 * @param {IncomingUpdateContactInfoRequest} request - The incoming update contactInfo request object.
 * @returns {void} - Throws an error if the request is invalid or passes a valid request forward to the controller.
 */
export const updateContactInfoRequestValidator = validateIncomingApiRequest(IncomingUpdateContactInfoRequest)
