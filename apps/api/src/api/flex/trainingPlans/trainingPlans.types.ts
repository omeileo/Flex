import type { ProgressionChange } from '@flex/shared/functions/progression/progression.types'
import type { GeneratePlanRequest, TrainingPlan } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'

export type GenerateTrainingPlanRequest = GeneratePlanRequest

export type TrainingPlanParams = {
  id: string
}

export type PlanChangeLogEntry = ProgressionChange & {
  id: string
  createdAt: string
}

export type PersistedTrainingPlan = TrainingPlan
