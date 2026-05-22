import { createRoute } from '@/shared/functions/http/routes.functions'

export const LoginBasePath = '/auth/login'

export const LoginRoutes = {
  LOGIN: createRoute(LoginBasePath, '')
}
