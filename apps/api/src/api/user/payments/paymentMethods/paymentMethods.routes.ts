import { createRoute } from '@/shared/functions/http/routes.functions'

export const paymentMethodsBasePath = '/payments/payment-methods'

export const paymentMethodsRoutes = {
  LOG_UPDATE: createRoute(paymentMethodsBasePath, '/log-update')
}
