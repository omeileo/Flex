import { createRoute } from '@/shared/functions/http/routes.functions'

export const FitnessProfileBasePath = '/fitness-profile'

export const FitnessProfileRoutes = {
  GET: createRoute(FitnessProfileBasePath, ''),
  UPSERT: createRoute(FitnessProfileBasePath, '')
}
