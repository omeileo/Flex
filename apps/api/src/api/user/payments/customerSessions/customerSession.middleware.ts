import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'

import { IncomingCheckOnboardingInfoRequestBody, IncomingCustomerSessionRequestBody } from './customerSession.model'

/**
 * Validates the incoming API request for the create customerSession endpoint.
 * @param {IncomingCustomerSessionRequestBody} request - The incoming create customerSession request object.
 * @returns {void} - Throws an error if the request is invalid or passes a valid request forward to the controller.
 */
export const createCustomerSessionValidator = validateIncomingApiRequest(IncomingCustomerSessionRequestBody)

/**
 * Validates the incoming API request for the check onboarding info endpoint.
 * @param {IncomingCustomerSessionRequestBody} request - The incoming check onboarding info request object.
 * @returns {void} - Throws an error if the request is invalid or passes a valid request forward to the controller.
 */
export const checkOnboardingInfoValidator = validateIncomingApiRequest(IncomingCheckOnboardingInfoRequestBody)
