import { CreateCheckoutSessionResponseBody, createCheckoutSessionRequestBody } from './checkoutSession.model'

/**
 * Represents the request body for creating a Checkout Session.
 */
export type CreateCheckoutSessionRequest = Zod.infer<typeof createCheckoutSessionRequestBody>

/**
 * Represents the response object returned by the Create Checkout Session API.
 */
export type CreateCheckoutSessionResponse = Zod.infer<typeof CreateCheckoutSessionResponseBody>
