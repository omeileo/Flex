import { PredefinedEquipment } from '@shared/types/workoutEquipment.types';

export type EquipmentPickerSheetProps = {
  locationName: string;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  equipment: PredefinedEquipment[];
  selectedIds: string[];
  customLabels: string[];
  onToggleEquipment: (id: string) => void;
  onAddCustomPress: () => void;
  onSelectCommon: () => void;
  onBodyweightOnly: () => void;
};
