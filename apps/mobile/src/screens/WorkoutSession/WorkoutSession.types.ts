import { ExerciseSwapOption } from '@shared/components/ExerciseSwapSheet/ExerciseSwapSheet.types'
import { SetRowStatus } from '@shared/components/SetRow/SetRow.types'

import { ExerciseMenuAction } from './WorkoutSession.dictionary'

export type WorkoutSessionPhase =
  | 'preStart'
  | 'active'
  | 'rest'
  | 'paused'
  | 'exerciseMenu'
  | 'swap'
  | 'finishSheet'
  | 'save'
  | 'saved'
  | 'discarded'

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
  editableWorkoutName: string
  privateNotes: string
  exercises: SessionExercise[]
  phase: WorkoutSessionPhase
  activeExerciseIndex: number
  elapsedLabel: string
  restSeconds: number
  volumeLabel: string
  completedSets: number
  swapOptions: ExerciseSwapOption[]
  swapFilterChips: string[]
  discardConfirmOpen: boolean
  isSubmitting: boolean
  error: string | null
  onWorkoutNameChange: (value: string) => void
  onPrivateNotesChange: (value: string) => void
  onBegin: () => void
  onNotNow: () => void
  onPause: () => void
  onResume: () => void
  onOpenExerciseMenu: () => void
  onExerciseMenuAction: (action: ExerciseMenuAction) => void
  onSwapSelect: (exerciseId: string) => void
  onSwapCancel: () => void
  onLogSet: (exerciseIndex: number, setIndex: number) => void
  onSkipRest: () => void
  onAdjustRest: (delta: number) => void
  onPreviousExercise: () => void
  onNextExercise: () => void
  onFinish: () => void
  onReviewSave: () => void
  onSave: () => void
  onDiscardRequest: () => void
  onDiscardConfirm: () => void
  onDiscardCancel: () => void
  onDone: () => void
  onBackToToday: () => void
}
