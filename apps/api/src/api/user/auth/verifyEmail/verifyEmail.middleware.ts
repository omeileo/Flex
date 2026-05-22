import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'

import { IncommingVerifyEmailRequest, IncommingVerifyEmailResendRequest } from './verifyEmail.model'

/**
 * Validates the incoming API request for verifying email.
 * @param {IncommingVerifyEmailRequest} request - The incoming verify email request object.
 * @returns {void}
 */
export const verifyEmailRequestValidator = validateIncomingApiRequest(IncommingVerifyEmailRequest)

export const verifyEmailResendRequestValidator = validateIncomingApiRequest(IncommingVerifyEmailResendRequest)
