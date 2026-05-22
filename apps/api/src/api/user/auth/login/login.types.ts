import { LoginRequestBody, LoginResponseBody } from './login.model'

/**
 * Represents the request body for signing up a user.
 */
export type LoginRequest = Zod.infer<typeof LoginRequestBody>

/**
 * Represents the response object returned by the signup API.
 */
export type LoginResponse = Zod.infer<typeof LoginResponseBody>

/**
 * Represents the payload of the JWT token currently only containing the user's id.
 */
export interface JwtPayload {
  userId: number
}

/**
 * Interface representing the details of a user fetched for authentication purposes.
 * This includes the user's email, status, unique identifier, and password hash.
 *
 * @interface LoginUser
 * @property {string} email - The email address of the user.
 * @property {Object} status - An object representing the status of the user, which includes:
 *  - {number} id - The unique identifier of the status.
 *  - {number} type_id - The type identifier of the status, useful for categorizing statuses.
 *  - {string} name - The name of the status, indicating the current state of the user (e.g., 'active', 'locked').
 *  - {string | null} description - An optional description of the status.
 *  - {string | null} display_name - An optional human-readable name for the status.
 * @property {number} id - The unique identifier of the user.
 * @property {string} password_hash - The hashed password of the user, used for authentication.
 */
export interface LoginUser {
  email: string
  status: {
    id: number
    type_id: number
    name: string
    description: string | null
    display_name: string | null
  }
  id: number
  password_hash: string
}
