export interface WorkoutSessionRouteParams {
  dayIndex: number;
  workoutName: string;
}

export interface WorkoutSessionComponentProps {
  workoutName: string;
  isSubmitting: boolean;
  error: string | null;
  onComplete: () => void;
}
