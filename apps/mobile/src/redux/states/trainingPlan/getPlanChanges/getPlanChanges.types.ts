import type { ProgressionChange } from '@flex/shared/functions/progression/progression.types'
import { SliceActions } from '../../../../shared/types/slice.types'
import { getPlanChangesActions } from './getPlanChanges.slice'

export interface GetPlanChangesRequest extends Record<string, never> {}

export interface GetPlanChangesState {
  loading: boolean
  error: string | null
  success: ProgressionChange[] | null
}

export type GetPlanChangesActionTypes = SliceActions<typeof getPlanChangesActions>
