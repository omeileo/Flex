import { createRoute } from '@/shared/functions/http/routes.functions'

export const TrainingPlansBasePath = '/training-plans'

export const TrainingPlansRoutes = {
  GENERATE: createRoute(TrainingPlansBasePath, '/generate'),
  ACTIVE: createRoute(TrainingPlansBasePath, '/active'),
  APPLY_WEEKLY_PROGRESSION: createRoute(TrainingPlansBasePath, '/:id/apply-weekly-progression'),
  CHANGES: createRoute(TrainingPlansBasePath, '/:id/changes')
}
