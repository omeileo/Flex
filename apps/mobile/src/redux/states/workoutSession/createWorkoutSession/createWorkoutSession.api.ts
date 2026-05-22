import type { WorkoutSessionCreate } from '@flex/shared/types/workoutSession/workoutSession.schemas';
import { getFlexApi } from '../../../../networkRequests/flexApi/flexApi.functions';

export const createWorkoutSessionApi = async (
  request: WorkoutSessionCreate,
): Promise<Record<string, unknown>> => {
  return getFlexApi().createWorkoutSession(request) as Promise<
    Record<string, unknown>
  >;
};

export default createWorkoutSessionApi;
