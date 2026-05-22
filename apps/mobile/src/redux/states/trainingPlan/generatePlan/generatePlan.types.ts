import type { GeneratePlanRequest, TrainingPlan } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'
import { SliceActions } from '../../../../shared/types/slice.types'
import { generatePlanActions } from './generatePlan.slice'

export interface GeneratePlanRequest extends Record<string, never> {}

export interface GeneratePlanState {
  loading: boolean
  error: string | null
  success: TrainingPlan | null
}

export type GeneratePlanActionTypes = SliceActions<typeof generatePlanActions>
