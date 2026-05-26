import { SetRowStatus } from '@shared/components/SetRow/SetRow.types'

export type WorkoutSessionPhase = 'preStart' | 'active' | 'rest' | 'save' | 'saved'

export interface WorkoutSessionRouteParams {
  dayIndex: number
  workoutName: string
}

export interface SessionSetRow {
  setNumber: number
  reps: number
  weightKg: number
  status: SetRowStatus
  previousLabel: string
}

export interface SessionExercise {
  exerciseId: string
  exerciseName: string
  prescription: string
  sets: SessionSetRow[]
}

export interface WorkoutSessionComponentProps {
  workoutName: string
  exercises: SessionExercise[]
  phase: WorkoutSessionPhase
  activeExerciseIndex: number
  elapsedLabel: string
  restSeconds: number
  isSubmitting: boolean
  error: string | null
  onBegin: () => void
  onNotNow: () => void
  onLogSet: (exerciseIndex: number, setIndex: number) => void
  onSkipRest: () => void
  onAdjustRest: (delta: number) => void
  onFinish: () => void
  onSave: () => void
  onDone: () => void
}
