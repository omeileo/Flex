import type { TrainingPlan } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'
import { SliceActions } from '../../../../shared/types/slice.types'
import { getActivePlanActions } from './getActivePlan.slice'

export interface GetActivePlanRequest extends Record<string, never> {}

export interface GetActivePlanState {
  loading: boolean
  error: string | null
  notFound: boolean
  success: TrainingPlan | null
}

export type GetActivePlanActionTypes = SliceActions<typeof getActivePlanActions>
