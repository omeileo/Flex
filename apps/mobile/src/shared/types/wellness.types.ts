export type WellnessBodyArea = 'shoulder' | 'knee' | 'lowerBack' | 'hip' | 'ankle' | 'wrist' | 'neck' | 'other'

export type WellnessStatus = 'recovered' | 'managing' | 'flareUp'

export type ExerciseRef = {
  predefinedId?: string
  customLabel?: string
}

export type WellnessCondition = {
  id: string
  bodyArea: WellnessBodyArea
  label?: string
  status: WellnessStatus
  lastFlareUpAt?: string
  movementRestrictions: string[]
  aggravatingExercises: ExerciseRef[]
  notes?: string
  createdAt: string
}

export type WellnessState = {
  conditions: WellnessCondition[]
  excludedExerciseIds: string[]
}
