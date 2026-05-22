import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Represents the request body for updating Payment Methods information.
 *
 * This is used to validate the incoming request to the "Update Payment Methods" endpoint.
 */

export const paymentMethodRequestBody = zodd.object({})

export const paymentMethodQueryParam = zodd.object({})

/**
 * Represents the incoming request object for updating Payment Methods information.
 *
 * This is used to validate the incoming request to the "Update Payment Methods" endpoint.
 */
export const IncomingPaymentMethodRequestBody = zodd.object({
  body: paymentMethodRequestBody
})

/**
 * Represents the incoming request object for updating Payment Methods information.
 *
 * This is used to validate the incoming request to the "Update Payment Methods" endpoint.
 * This object includes the Payment Methods ID in the request parameters.
 */
export const IncomingUpdatePaymentMethodRequest = zodd.object({
  body: paymentMethodRequestBody,
  query: paymentMethodQueryParam
})

/**
 * Represents the response body for the "Update Payment Methods" endpoint.
 *
 * This is returned when the Payment Methods update is successful.
 */
export const AddPaymentMethodResponseBody = paymentMethodRequestBody

/**
 * Represents the response body for the "Update Payment Methods" endpoint.
 *
 * This is returned when the Payment Methods update is successful.
 */
export const UpdatePaymentMethodResponseBody = zodd
  .object({
    message: zodd.string().openapi({
      example: 'Payment Methods updated successfully',
      description: 'Success message'
    })
  })
  .openapi({
    description: 'Success response',
    example: { message: 'Payment Methods updated successfully' }
  })
