import { SignupRequestBody, SignupResponseBody } from './signUp.model'

/**
 * Represents the request body for signing up a user.
 */
export type SignupRequest = Zod.infer<typeof SignupRequestBody>

/**
 * Represents the response object returned by the signup API.
 */
export type SignupResponse = Zod.infer<typeof SignupResponseBody>
