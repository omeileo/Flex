import { createRoute } from '@/shared/functions/http/routes.functions'

export const ExercisesBasePath = '/exercises'

export const ExercisesRoutes = {
  LIST: createRoute(ExercisesBasePath, '')
}
