import { WorkoutModality } from '@shared/types/workoutModality.types';

export type MockWeekPlan = {
  weekNumber: number;
  dateRange: string;
  workoutCount: number;
  totalVolume: string;
  isCurrent?: boolean;
  workouts: Array<{
    id: string;
    title: string;
    modality: WorkoutModality;
    durationMinutes: number;
  }>;
};

export const pillTabs = [
  { key: 'today' as const, label: 'Today' },
  { key: 'plan' as const, label: 'Plan' },
  { key: 'coach' as const, label: 'Coach' },
  { key: 'profile' as const, label: 'Profile' },
];

export const mockWeekPlans: MockWeekPlan[] = [
  {
    weekNumber: 1,
    dateRange: 'May 19 – May 25',
    workoutCount: 3,
    totalVolume: '12,400 kg',
    isCurrent: true,
    workouts: [
      {
        id: 'w1-1',
        title: 'Upper Strength',
        modality: 'strength',
        durationMinutes: 45,
      },
      {
        id: 'w1-2',
        title: 'Easy Run',
        modality: 'energy',
        durationMinutes: 30,
      },
      {
        id: 'w1-3',
        title: 'Mobility Reset',
        modality: 'mobility',
        durationMinutes: 25,
      },
    ],
  },
  {
    weekNumber: 2,
    dateRange: 'May 26 – Jun 1',
    workoutCount: 3,
    totalVolume: '13,100 kg',
    workouts: [
      {
        id: 'w2-1',
        title: 'Lower Strength',
        modality: 'strength',
        durationMinutes: 50,
      },
      {
        id: 'w2-2',
        title: 'Tempo Run',
        modality: 'energy',
        durationMinutes: 35,
      },
      {
        id: 'w2-3',
        title: 'Conditioning Circuit',
        modality: 'conditioning',
        durationMinutes: 30,
      },
    ],
  },
  {
    weekNumber: 3,
    dateRange: 'Jun 2 – Jun 8',
    workoutCount: 3,
    totalVolume: '13,800 kg',
    workouts: [
      {
        id: 'w3-1',
        title: 'Push Day',
        modality: 'strength',
        durationMinutes: 45,
      },
      {
        id: 'w3-2',
        title: 'Long Run',
        modality: 'energy',
        durationMinutes: 40,
      },
      {
        id: 'w3-3',
        title: 'Recovery Flow',
        modality: 'mobility',
        durationMinutes: 20,
      },
    ],
  },
];

export const onboardingGoals = [
  'Build muscle',
  'Lose fat',
  'Improve endurance',
  'Return from injury',
  'General fitness',
];

export const injuryAreas = [
  'Shoulder',
  'Knee',
  'Lower back',
  'Hip',
  'Ankle',
  'Wrist',
  'None',
];

export const dietPreferences = [
  'High protein',
  'Plant-based',
  'Calorie deficit',
  'No preference',
];

export const ageBands = ['18–24', '25–34', '35–44', '45–54', '55+'];

export const injuryStateOptions = [
  {
    id: 'recovered',
    label: 'Fully recovered',
    description: 'No restrictions',
  },
  {
    id: 'managing',
    label: 'Managing',
    description: 'Some movements to avoid',
  },
  {
    id: 'acute',
    label: 'Acute',
    description: 'Need modified plan',
  },
];

export const restrictionMovements = [
  'Overhead press',
  'Deep squat',
  'Running impact',
  'Heavy deadlift',
  'Jumping',
];

export {
  commonEquipmentIds,
  equipmentCategoryTags,
  equipmentPickerCategories,
  locationPresetOptions,
  predefinedEquipmentCatalog,
} from '@shared/dictionary/equipmentCatalog.dictionary';

export const mockWorkoutLocations = [
  {
    id: 'loc-home',
    name: 'Home Gym',
    presetType: 'home' as const,
    isDefault: true,
    equipmentCount: 8,
  },
  {
    id: 'loc-gym',
    name: 'LA Fitness',
    presetType: 'commercial' as const,
    isDefault: false,
    equipmentCount: 24,
  },
];

export const activeWorkoutPreviewExercises = [
  { id: 'sq', name: 'Barbell Squat', prescription: '3 × 8–10' },
  { id: 'rdl', name: 'Romanian Deadlift', prescription: '3 × 10' },
  { id: 'bp', name: 'Bench Press', prescription: '3 × 8' },
  { id: 'row', name: 'Cable Row', prescription: '3 × 12' },
];

export const activeWorkoutSwapOptions = [
  { id: 'front-squat', name: 'Front Squat', equipment: 'Barbell' },
  { id: 'goblet', name: 'Goblet Squat', equipment: 'Dumbbell' },
  { id: 'leg-press', name: 'Leg Press', equipment: 'Machine' },
  { id: 'box-squat', name: 'Box Squat', equipment: 'Barbell' },
];

export const activeWorkoutSwapChips = [
  'Similar',
  'Quads',
  'Barbell',
  'Injury-safe',
];

export const activeWorkoutExerciseMenu = [
  'Instructions & video',
  'Replace exercise',
  'Delete from workout',
  'Rest timer · ON (90s)',
  'Exclude from future plans',
  'Add warm-up sets',
  'Units · kg',
];
