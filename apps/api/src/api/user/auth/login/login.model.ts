import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Represents the request body for user login.
 *
 * This is used to by the incoming request model to validate the incoming request to the login endpoint.
 */
export const LoginRequestBody = zodd.object({
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
  password: zodd.string().min(8).openapi({ example: 'Password1##', description: 'Password of the user' })
})

/**
 * Represents the incoming login request object.
 *
 * This is used to validate the incoming login to the sign up endpoint.
 */
export const IncommingLoginRequest = zodd.object({
  body: LoginRequestBody
})

/**
 * Represents the schema for user data.
 *
 * This is returned when a user signs up successfully.
 */

export const LoginResponseBody = zodd
  .object({
    token: zodd.string().openapi({ example: '1234567890', description: 'Token of the user' }),
    roles: zodd.array(zodd.string().openapi({ example: 'admin', description: 'Role of the user' }))
  })
  .openapi({
    description: 'Login response body',
    example: { token: '1234567890', roles: ['admin', 'user'] }
  })
