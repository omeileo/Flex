import {
  ForgetPasswordRequestBody,
  ForgetPasswordResponseBody,
  ResetPasswordRequestBody,
  ResetPasswordResponseBody
} from './forgetPassword.model'

/**
 * Represents the request body for the forget password API.
 */
export type ForgetPasswordRequest = Zod.infer<typeof ForgetPasswordRequestBody>

/**
 * Represents the response object returned by the forget password API.
 */
export type ForgetPasswordResponse = Zod.infer<typeof ForgetPasswordResponseBody>

/**
 * Represents the request body for the reset password API.
 */
export type ResetPasswordRequest = Zod.infer<typeof ResetPasswordRequestBody>

/**
 * Represents the response object returned by the reset password API.
 */
export type ResetPasswordResponse = Zod.infer<typeof ResetPasswordResponseBody>
