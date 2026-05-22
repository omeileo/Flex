import type {
  FitnessProfile,
  FitnessProfileUpsert,
} from '@flex/shared/types/fitnessProfile/fitnessProfile.schemas';
import { SliceActions } from '../../../../shared/types/slice.types';
import { saveProfileActions } from './saveProfile.slice';

export type SaveProfileRequest = Record<string, never>;

export interface SaveProfileState {
  loading: boolean;
  error: string | null;
  success: FitnessProfile | null;
}

export type SaveProfileActionTypes = SliceActions<typeof saveProfileActions>;
