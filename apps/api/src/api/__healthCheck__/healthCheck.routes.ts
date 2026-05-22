import { createRoute } from '@/shared/functions/http/routes.functions'

export const HealthCheckBasePath = '/health-check'

export const HealthCheckRoutes = {
  basic: createRoute(HealthCheckBasePath, '/basic')
}
