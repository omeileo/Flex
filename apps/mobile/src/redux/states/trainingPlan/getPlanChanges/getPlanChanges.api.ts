import type { ProgressionChange } from '@flex/shared/functions/progression/progression.types'
import { getFlexApi } from '../../../../networkRequests/flexApi/flexApi.functions'

export const getPlanChangesApi = async (planId: number): Promise<ProgressionChange[]> => {
  return getFlexApi().getPlanChanges(planId) as Promise<ProgressionChange[]>
}

export default getPlanChangesApi
