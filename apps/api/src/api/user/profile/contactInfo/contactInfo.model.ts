import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Represents the request body for updating contact information.
 *
 * This is used to validate the incoming request to the "Update Contact Info" endpoint.
 */
export const UpdateContactInfoRequestBody = zodd.object({
  mobileNumber: zodd
    .string()
    .min(10)
    .max(15)
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid mobile number format')
    .openapi({
      example: '+12345678901',
      description: "The user's updated mobile number"
    }),
  email: zodd.string().email().openapi({
    example: 'no-reply@appshop.biz',
    description: "The user's updated email address"
  })
})

/**
 * Represents the incoming request object for updating contact information.
 *
 * This is used to validate the incoming request to the "Update Contact Info" endpoint.
 */
export const IncomingUpdateContactInfoRequest = zodd.object({
  body: UpdateContactInfoRequestBody
})

/**
 * Represents the response body for the "Update Contact Info" endpoint.
 *
 * This is returned when the contact information update is successful.
 */
export const UpdateContactInfoResponseBody = zodd.object({}).openapi({ description: 'Empty object', example: {} })
