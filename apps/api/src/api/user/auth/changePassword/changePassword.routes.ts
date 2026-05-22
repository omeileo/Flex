import { createRoute } from '@/shared/functions/http/routes.functions'

export const ChangePasswordBasePath = '/auth/change-password'

/**
 * Routes for changing the user's password.
 */
export const ChangePasswordRoutes = {
  CHANGE_PASSWORD: createRoute(ChangePasswordBasePath, '')
}
