import type { TrainingPlan } from '@flex/shared/types/trainingPlan/trainingPlan.schemas';
import { getFlexApi } from '../../../../networkRequests/flexApi/flexApi.functions';

export const getActivePlanApi = async (): Promise<TrainingPlan> => {
  return getFlexApi().getActiveTrainingPlan() as Promise<TrainingPlan>;
};

export default getActivePlanApi;
