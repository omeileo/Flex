import {
  VerifyEmailRequestBody,
  VerifyEmailResendRequestBody,
  VerifyEmailWithCodeAndEmailRequestBody,
  VerifyEmailWithCodeRequestBody,
  VerifyEmailWithTokenRequestBody
} from './verifyEmail.model'

/**
 * Represents the request object for verifying an email.
 */
export type VerifyEmailRequest = Zod.infer<typeof VerifyEmailRequestBody>

export type VerifyEmailWithTokenRequest = Zod.infer<typeof VerifyEmailWithTokenRequestBody>

export type VerifyEmailWithCodeAndEmailRequest = Zod.infer<typeof VerifyEmailWithCodeAndEmailRequestBody>

export type VerifyEmailWithCodeRequest = Zod.infer<typeof VerifyEmailWithCodeRequestBody>

/**
 * Represents the request object for resending a verification email.
 */
export type VerifyEmailResendRequest = Zod.infer<typeof VerifyEmailResendRequestBody>
