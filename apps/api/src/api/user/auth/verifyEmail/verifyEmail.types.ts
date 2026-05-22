import { VerifyEmailRequestBody, VerifyEmailResendRequestBody } from './verifyEmail.model'

/**
 * Represents the request object for verifying an email.
 */
export type VerifyEmailRequest = Zod.infer<typeof VerifyEmailRequestBody>

/**
 * Represents the request object for resending a verification email.
 */
export type VerifyEmailResendRequest = Zod.infer<typeof VerifyEmailResendRequestBody>
