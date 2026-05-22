import type { GeneratePlanRequest, TrainingPlan } from '@flex/shared/types/trainingPlan/trainingPlan.schemas'
import { getFlexApi } from '../../../../networkRequests/flexApi/flexApi.functions'

export const generatePlanApi = async (request: GeneratePlanRequest | void): Promise<TrainingPlan> => {
  return getFlexApi().generateTrainingPlan(request ?? {}) as Promise<TrainingPlan>
}

export default generatePlanApi
