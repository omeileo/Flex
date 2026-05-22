import type { ProgressionChange } from '@flex/shared/functions/progression/progression.types'
import { getFlexApi } from '../../../../networkRequests/flexApi/flexApi.functions'

export const getPlanChangesApi = async (): Promise<ProgressionChange[]> => {
  return getFlexApi().getPlanChanges() as Promise<ProgressionChange[]>
}

export default getPlanChangesApi
