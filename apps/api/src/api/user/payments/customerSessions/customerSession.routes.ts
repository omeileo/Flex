import { createRoute } from '@/shared/functions/http/routes.functions'

export const customerSessionBasePath = '/payments/customer-sessions'

export const customerSessionRoutes = {
  CREATE_CUSTOMER_SESSION: createRoute(customerSessionBasePath, '/create'),
  CREATE_CUSTOMER_ACCOUNT_SESSION: createRoute(customerSessionBasePath, '/account/create'),
  CHECK_ONBOARDING_INFO: createRoute(customerSessionBasePath, '/account/check-onboarding-info')
}
