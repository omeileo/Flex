import { PredefinedEquipment } from '@shared/types/workoutEquipment.types';

export const equipmentCategoryTags = [
  'Free weights',
  'Racks',
  'Machines',
  'Cardio',
  'Accessories',
];

export const equipmentPickerCategories = ['All', ...equipmentCategoryTags];

export const predefinedEquipmentCatalog: PredefinedEquipment[] = [
  { id: 'barbell', label: 'Barbell', category: 'Free weights' },
  { id: 'dumbbells', label: 'Dumbbells', category: 'Free weights' },
  { id: 'kettlebells', label: 'Kettlebells', category: 'Free weights' },
  { id: 'ez-bar', label: 'EZ Bar', category: 'Free weights' },
  { id: 'bench', label: 'Bench', category: 'Racks' },
  { id: 'squat-rack', label: 'Squat rack', category: 'Racks' },
  { id: 'pull-up-bar', label: 'Pull-up bar', category: 'Racks' },
  { id: 'cable-machine', label: 'Cable machine', category: 'Machines' },
  { id: 'leg-press', label: 'Leg press', category: 'Machines' },
  { id: 'smith-machine', label: 'Smith machine', category: 'Machines' },
  { id: 'treadmill', label: 'Treadmill', category: 'Cardio' },
  { id: 'rower', label: 'Rower', category: 'Cardio' },
  {
    id: 'resistance-bands',
    label: 'Resistance bands',
    category: 'Accessories',
  },
  { id: 'medicine-ball', label: 'Medicine ball', category: 'Accessories' },
  { id: 'yoga-mat', label: 'Yoga mat', category: 'Accessories' },
];

export const commonEquipmentIds = [
  'dumbbells',
  'barbell',
  'bench',
  'squat-rack',
  'cable-machine',
];

export const locationPresetOptions = [
  { id: 'home' as const, label: 'Home gym' },
  { id: 'commercial' as const, label: 'Commercial gym' },
  { id: 'travel' as const, label: 'Hotel / travel' },
  { id: 'custom' as const, label: 'Custom' },
];
