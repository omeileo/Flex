import { LogoutRequestBody, LogoutResponseBody } from './logout.model'

/**
 * Represents the request body for loging out a user.
 */
export type LogoutRequest = Zod.infer<typeof LogoutRequestBody>

/**
 * Represents the response object returned by the logout API.
 */
export type LogoutResponse = Zod.infer<typeof LogoutResponseBody>
