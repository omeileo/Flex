import type { WorkoutSessionComplete } from '@flex/shared/types/workoutSession/workoutSession.schemas';
import { z } from 'zod';
import { workoutSessionCompleteSchema } from '@flex/shared/types/workoutSession/workoutSession.schemas';

type WorkoutSessionComplete = z.infer<typeof workoutSessionCompleteSchema>;
import { SliceActions } from '../../../../shared/types/slice.types';
import { completeWorkoutSessionActions } from './completeWorkoutSession.slice';

export type CompleteWorkoutSessionRequest = Record<string, never>;

export interface CompleteWorkoutSessionState {
  loading: boolean;
  error: string | null;
  success: Record<string, unknown> | null;
}

export type CompleteWorkoutSessionActionTypes = SliceActions<
  typeof completeWorkoutSessionActions
>;
