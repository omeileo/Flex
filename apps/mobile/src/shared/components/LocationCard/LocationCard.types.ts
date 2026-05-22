import { EquipmentPresetType } from '@shared/types/workoutEquipment.types';

export type LocationCardProps = {
  name: string;
  presetType: EquipmentPresetType;
  equipmentCount: number;
  isDefault?: boolean;
  onPress: () => void;
};
