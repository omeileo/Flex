import { validateIncomingApiRequest } from '@/shared/functions/http/validateApiRequest.functions'

import { IncomingPaymentMethodRequestBody, IncomingUpdatePaymentMethodRequest } from './paymentMethods.model'

/**
 * Validates the incoming API request for the update paymentMethods endpoint.
 * @param {IncomingPaymentMethodsBody} request - The incoming update paymentMethods request object.
 * @returns {void} - Throws an error if the request is invalid or passes a valid request forward to the controller.
 */
export const paymentMethodsValidator = validateIncomingApiRequest(IncomingPaymentMethodRequestBody)

export const updatePaymentMethodsValidator = validateIncomingApiRequest(IncomingUpdatePaymentMethodRequest)
