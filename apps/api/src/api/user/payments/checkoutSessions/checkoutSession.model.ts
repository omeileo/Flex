import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Represents the request body for updating Checkout Session information.
 *
 * This is used to validate the incoming request to the "Update Checkout Session" endpoint.
 */

export const createCheckoutSessionRequestBody = zodd.object({})

/**
 * Represents the incoming request object for creating a Checkout Session.
 *
 * This is used to validate the incoming request to the "Create Checkout Session" endpoint.
 */
export const IncomingCheckoutSessionRequestBody = zodd.object({
  body: createCheckoutSessionRequestBody
})

/**
 * Represents the response body for the "Create Checkout Session" endpoint.
 *
 * This is returned when the Checkout Session creation is successful.
 */
export const CreateCheckoutSessionResponseBody = zodd
  .object({
    message: zodd.string().openapi({
      example: 'Checkout session created successfully',
      description: 'Success message'
    })
  })
  .openapi({
    description: 'Success response',
    example: { message: 'Checkout session created successfully' }
  })
