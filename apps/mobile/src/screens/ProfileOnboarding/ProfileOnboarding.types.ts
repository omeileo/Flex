import { WorkoutLocation } from '@shared/types/workoutEquipment.types'

export type InjuryStateId = 'recovered' | 'managing' | 'acute'

export type SexAtBirth = 'female' | 'male' | 'preferNotToSay'

export interface ProfileOnboardingDraft {
  goals: string[]
  injuries: string[]
  injuryState: InjuryStateId | null
  restrictions: string[]
  diet: string | null
  calorieTarget: string
  ageBand: string | null
  fitnessLevel: number
  sexAtBirth: SexAtBirth | null
  locations: WorkoutLocation[]
  defaultLocationId: string | null
}

export interface ProfileOnboardingComponentProps {
  isSubmitting: boolean
  error: string | null
  onComplete: (draft: ProfileOnboardingDraft) => void
}
