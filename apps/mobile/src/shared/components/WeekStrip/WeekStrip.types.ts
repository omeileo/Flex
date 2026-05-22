export type WeekStripDay = {
  key: string;
  label: string;
  isToday?: boolean;
  hasWorkout?: boolean;
  workoutModalityColor?: string;
};

export type WeekStripProps = {
  days: WeekStripDay[];
  onDayPress?: (day: WeekStripDay) => void;
};
