import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'

import { IncomingUpdateUserFirebaseUserIdRequestBody } from './profile.model'

/**
 * Validates the incoming API request for the update user Firebase user ID endpoint.
 * @param {IncomingUpdateUserFirebaseUserIdRequestBody} request - The incoming update Firebase user ID request object.
 * @returns {void} - Throws an error if the request is invalid or passes a valid request forward to the controller.
 */
export const updateUserFirebaseUserIdRequestValidator = validateIncomingApiRequest(
  IncomingUpdateUserFirebaseUserIdRequestBody
)
