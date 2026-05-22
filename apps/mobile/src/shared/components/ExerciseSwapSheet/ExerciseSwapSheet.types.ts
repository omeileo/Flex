export type ExerciseSwapOption = {
  id: string;
  name: string;
  equipment: string;
};

export type ExerciseSwapSheetProps = {
  options: ExerciseSwapOption[];
  filterChips: string[];
  onSelect: (id: string) => void;
  onCancel: () => void;
};
