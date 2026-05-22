import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Represents the request body for user logout.
 *
 * This is used to by the incoming request model to validate the incoming request to the logout endpoint.
 */
export const LogoutRequestBody = zodd.object({}).openapi({ description: 'Empty object', example: {} })

/**
 * Represents the incoming logout request object.
 *
 * This is used to validate the incoming logout to the logout endpoint.
 */
export const IncommingLogoutRequest = zodd.object({
  body: LogoutRequestBody
})

/**
 * Represents the schema for user data.
 *
 * This is returned when a user logs out successfully.
 */

export const LogoutResponseBody = zodd.object({}).openapi({ description: 'Empty object', example: {} })
