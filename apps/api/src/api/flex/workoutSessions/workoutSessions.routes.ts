import { createRoute } from '@/shared/functions/http/routes.functions'

export const WorkoutSessionsBasePath = '/workout-sessions'

export const WorkoutSessionsRoutes = {
  CREATE: createRoute(WorkoutSessionsBasePath, ''),
  COMPLETE: createRoute(WorkoutSessionsBasePath, '/:id/complete'),
  PROGRESS: createRoute(WorkoutSessionsBasePath, '/progress')
}
