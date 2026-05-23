import { colors } from '@shared/styles/StyleConstants'

export type WorkoutModality = 'energy' | 'strength' | 'mobility' | 'conditioning'

export const workoutModalityColors: Record<WorkoutModality, string> = {
  energy: colors.accentEnergy,
  strength: colors.accentStrength,
  mobility: colors.accentMobility,
  conditioning: colors.accentConditioning
}
