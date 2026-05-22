import type {
  GeneratePlanRequest,
  TrainingPlan,
} from '@flex/shared/types/trainingPlan/trainingPlan.schemas';
import { SliceActions } from '../../../../shared/types/slice.types';
import { generatePlanActions } from './generatePlan.slice';

export type GeneratePlanRequest = Record<string, never>;

export interface GeneratePlanState {
  loading: boolean;
  error: string | null;
  success: TrainingPlan | null;
}

export type GeneratePlanActionTypes = SliceActions<typeof generatePlanActions>;
