import type {
  FitnessProfile,
  FitnessProfileUpsert,
} from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas';
import { getFlexApi } from '../../../../networkRequests/flexApi/flexApi.functions';

export const saveProfileApi = async (
  request: FitnessProfileUpsert,
): Promise<FitnessProfile> => {
  return getFlexApi().upsertFitnessProfile(request) as Promise<FitnessProfile>;
};

export default saveProfileApi;
