import { ExerciseSwapOption } from '@shared/components/ExerciseSwapSheet/ExerciseSwapSheet.types'

export type ExerciseMenuAction =
  | 'instructions'
  | 'replace'
  | 'delete'
  | 'restTimer'
  | 'exclude'
  | 'warmupSets'
  | 'units'
  | 'done'

export const exerciseMenuActions: ExerciseMenuAction[] = [
  'instructions',
  'replace',
  'delete',
  'restTimer',
  'exclude',
  'warmupSets',
  'units',
  'done'
]

export const workoutSessionSwapOptions: ExerciseSwapOption[] = [
  { id: 'front-squat', name: 'Front Squat', equipment: 'Barbell' },
  { id: 'goblet', name: 'Goblet Squat', equipment: 'Dumbbell' },
  { id: 'leg-press', name: 'Leg Press', equipment: 'Machine' },
  { id: 'box-squat', name: 'Box Squat', equipment: 'Barbell' }
]

export const workoutSessionSwapChips = ['Similar', 'Quads', 'Barbell', 'Injury-safe']
