import {
  PlannedWorkout,
  TrainingPlan,
} from '@flex/shared/types/trainingPlan/trainingPlan.schemas';

export interface PlanHomeComponentProps {
  plan: TrainingPlan | null;
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
  onWorkoutPress: (workout: PlannedWorkout) => void;
}
