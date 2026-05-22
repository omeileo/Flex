import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'

import { IncomingUpdatePersonalInfoRequest } from './personalInfo.model'

/**
 * Validates the incoming API request for the update personalInfo endpoint.
 * @param {IncomingUpdatePersonalInfoRequest} request - The incoming update personalInfo request object.
 * @returns {void} - Throws an error if the request is invalid or passes a valid request forward to the controller.
 */
export const updatePersonalInfoRequestValidator = validateIncomingApiRequest(IncomingUpdatePersonalInfoRequest)
