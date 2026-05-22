import { commonValidations } from '../../../../shared/functions/commonValidation.functions'
import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Represents the request body for user sign up.
 *
 * This is used to by the incoming request model to validate the incoming request to the sign up endpoint.
 */
export const SignupRequestBody = zodd.object({
  /**
   * The first name of the user.
   */
  firstName: zodd.string().min(2).openapi({ example: 'Juleen', description: 'First name of the user' }),

  /**
   * The last name of the user.
   */
  lastName: zodd.string().min(2).openapi({ example: 'Shoppe', description: 'Last name of the user' }),

  /**
   * The email of the user.
   */
  email: zodd.string().email().openapi({
    example: 'no-reply@appshop.biz',
    description: 'Email of the user'
  }),

  /**
   * The password of the user.
   */
  password: commonValidations.password.openapi({
    example: 'Password1##',
    description: 'Password of the user'
  }),

  /**
   * Indicates whether the user wants to receive notifications about deals and discounts.
   */
  wantsDealsAndDiscounts: zodd.boolean().default(false).openapi({
    default: false,
    description: 'Receive notifications about deals and discounts.',
    example: true
  })
})

/**
 * Represents the incoming signup request object.
 *
 * This is used to validate the incoming request to the sign up endpoint.
 */
export const IncommingSignupRequest = zodd.object({
  body: SignupRequestBody
})

const UserStatusSchema = zodd.object({
  id: zodd.number().openapi({
    example: 2,
    description: 'Status ID'
  }),
  type_id: zodd.number().openapi({
    example: 1,
    description: 'Type ID of the status'
  }),
  name: zodd.string().openapi({
    example: 'unverified',
    description: 'Name of the status'
  }),
  description: zodd.string().openapi({
    example: 'User account has not been verified by email',
    description: 'Description of the status'
  }),
  display_name: zodd.string().openapi({
    example: 'Unverified',
    description: 'Display name of the status'
  })
})

const UserDataSchema = zodd.object({
  id: zodd.number().openapi({
    example: 83,
    description: 'User ID'
  }),
  email: zodd.string().email().openapi({
    example: 'no-reply@appshop.biz',
    description: 'User email address'
  }),
  status: UserStatusSchema
})

/**
 * Represents the schema for user data.
 *
 * This is returned when a user signs up successfully.
 */

export const SignupResponseBody = UserDataSchema
