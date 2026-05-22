import { createRoute } from '@/shared/functions/http/routes.functions'

export const ForgetPasswordBasePath = '/auth/forget-password'

export const ForgetPasswordRoutes = {
  Send_Reset_Email: createRoute(ForgetPasswordBasePath, ''),
  Reset_Password: createRoute(ForgetPasswordBasePath, '/reset')
}
