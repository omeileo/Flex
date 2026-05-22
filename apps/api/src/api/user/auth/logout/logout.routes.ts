import { createRoute } from '@/shared/functions/http/routes.functions'

export const LogoutBasePath = '/auth/logout'

export const LogoutRoutes = {
  LOGOUT: createRoute(LogoutBasePath, '')
}
