export type SetRowStatus = 'pending' | 'active' | 'completed' | 'skipped';

export type SetRowProps = {
  setNumber: number;
  previousLabel?: string;
  reps: number;
  weightKg: number;
  status: SetRowStatus;
  onPress?: () => void;
};
