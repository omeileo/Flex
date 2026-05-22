import { createRoute } from '@/shared/functions/http/routes.functions'

export const SignUpBasePath = '/auth/sign-up'

/**
 * Routes for user sign up.
 */
export const SignUpRoutes = {
  /**
   * Signup/Register new user route.
   */
  Register: createRoute(SignUpBasePath, '')
}
