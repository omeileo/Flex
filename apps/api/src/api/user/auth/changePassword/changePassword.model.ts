import { commonValidations } from '../../../../shared/functions/commonValidation.functions'
import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Represents the request body for the ChangePassword endpoint.
 *
 * This is used to validate the incoming request to the ChangePassword endpoint.
 */
export const ChangePasswordRequestBody = zodd.object({
  currentPassword: commonValidations.password.openapi({
    example: 'oldPassword123',
    description: "The user's current password"
  }),
  newPassword: commonValidations.password.openapi({
    example: 'newPassword456',
    description: "The user's new password"
  }),
  confirmNewPassword: commonValidations.password.openapi({
    example: 'newPassword456',
    description: "The user's new password confirmation"
  })
})

/**
 * Represents the incoming ChangePassword request object.
 *
 * This is used to validate the incoming request to the ChangePassword endpoint.
 */
export const IncomingChangePasswordRequest = zodd.object({
  body: ChangePasswordRequestBody
})

/**
 * Represents the response body for the ChangePassword endpoint.
 *
 * This is returned when the password change is successful.
 */
export const ChangePasswordResponseBody = zodd.object({}).openapi({ description: 'Empty object', example: {} })
