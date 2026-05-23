import type { FitnessProfileUpsert } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas'
import { configureRequest } from '@network/apiClient/apiClient.functions'
import urls from '@network/apiClient/endpoints'

import { SaveProfileErrorResponse, SaveProfileSuccessResponse } from './saveProfile.types'

export const saveProfileApi = async (request: FitnessProfileUpsert): Promise<SaveProfileSuccessResponse> => {
  const response = await configureRequest({
    url: urls.fitnessProfile.upsertProfile,
    method: 'PUT',
    data: request
  })

  if (response.status >= 200 && response.status < 300) {
    return response as SaveProfileSuccessResponse
  } else {
    throw response as SaveProfileErrorResponse
  }
}

export default saveProfileApi
