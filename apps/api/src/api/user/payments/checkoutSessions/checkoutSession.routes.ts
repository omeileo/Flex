import { createRoute } from '@/shared/functions/http/routes.functions'

export const checkoutSessionBasePath = '/payments/checkout-sessions'

export const checkoutSessionRoutes = {
  CREATE: createRoute(checkoutSessionBasePath, '/create')
}
