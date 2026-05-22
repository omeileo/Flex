import type { GeneratePlanRequest, TrainingPlan } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'
import type { ProgressionChange } from '@flex/shared/functions/progression/progression.types'

export type GenerateTrainingPlanRequest = GeneratePlanRequest

export type TrainingPlanParams = {
  id: string
}

export type PlanChangeLogEntry = ProgressionChange & {
  id: number
  createdAt: string
}

export type PersistedTrainingPlan = TrainingPlan
