import { validateIncomingApiRequest } from '../../../../shared/functions/http/validateApiRequest.functions'
import { IncommingForgetPasswordRequest, IncommingResetPasswordRequest } from './forgetPassword.model'

/**
 * Validates the incoming API request for the forget password endpoint.
 * @param {IncomingForgetPasswordRequest} request - The incoming forget password request object.
 * @returns {void} - Throws an error if the request is invalid or passes a valid request forward to the controller.
 */
export const forgetPasswordRequestValidator = validateIncomingApiRequest(IncommingForgetPasswordRequest)

/**
 * Validates the incoming reset password request.
 *
 * @param {IncommingResetPasswordRequest} request - The incoming reset password request object.
 * @returns {void}
 */
export const resetPasswordRequestValidator = validateIncomingApiRequest(IncommingResetPasswordRequest)
