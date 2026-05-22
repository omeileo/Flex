import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Represents the request body for forget password.
 *
 * This is used to validate the incoming request to the forget password endpoint.
 */
export const ForgetPasswordRequestBody = zodd.object({
  email: zodd.string().email().openapi({
    example: 'no-reply@appshop.biz',
    description: 'The email address of the user requesting password reset.'
  })
})

/**
 * Represents the incoming forget password request object.
 *
 * This is used to validate the incoming request to the forget password endpoint.
 */
export const IncommingForgetPasswordRequest = zodd.object({
  body: ForgetPasswordRequestBody
})

/**
 * Represents the response body for forget password.
 *
 * This is returned when a password reset request is successful.
 */
export const ForgetPasswordResponseBody = zodd.object({}).openapi({ description: 'Empty object', example: {} })

/**
 * Represents the request body for reset password.
 *
 * This is used to validate the incoming request to the reset password endpoint.
 */
export const ResetPasswordRequestBody = zodd.object({
  resetToken: zodd.string().min(32).openapi({
    example: '48a1d25a36497e9cc232b277917686fd2c0429af970a7edf1c90cdf0af360597',
    description: "The reset token sent to the user's email address"
  }),
  newPassword: zodd.string().min(8).openapi({})
})

/**
 * Represents the incoming reset password request object.
 *
 * This is used to validate the incoming request to the reset password endpoint.
 */
export const IncommingResetPasswordRequest = zodd.object({
  body: ResetPasswordRequestBody
})

/**
 * Represents the response body for reset password.
 *
 * This is returned when a password reset request is successful.
 */
export const ResetPasswordResponseBody = zodd.object({}).openapi({ description: 'Empty object', example: {} })
