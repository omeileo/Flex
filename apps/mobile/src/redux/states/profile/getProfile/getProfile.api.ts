import type { FitnessProfile } from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas';
import { getFlexApi } from '../../../../networkRequests/flexApi/flexApi.functions';

export const getProfileApi = async (): Promise<FitnessProfile> => {
  return getFlexApi().getFitnessProfile() as Promise<FitnessProfile>;
};

export default getProfileApi;
