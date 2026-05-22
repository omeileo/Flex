import { ChangePasswordRequestBody, ChangePasswordResponseBody } from './changePassword.model'

/**
 * Represents the request body for changing a user's password.
 */
export type ChangePasswordRequest = Zod.infer<typeof ChangePasswordRequestBody>

/**
 * Represents the response object returned by the Change Password API.
 */
export type ChangePasswordResponse = Zod.infer<typeof ChangePasswordResponseBody>
