import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'
import { fireEvent } from '@testing-library/react-native'

import WorkoutSessionComponent from './WorkoutSession.component'

import { workoutSessionSwapChips, workoutSessionSwapOptions } from './WorkoutSession.dictionary'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      if (params) {
        return `${key}:${JSON.stringify(params)}`
      }

      return key
    }
  })
}))

const exercises = [
  {
    exerciseId: 'sq',
    exerciseName: 'Barbell Squat',
    prescription: '3×8 @ 40 kg',
    sets: [
      {
        setNumber: 1,
        reps: 8,
        weightKg: 40,
        status: 'completed' as const,
        previousLabel: '8×38'
      },
      {
        setNumber: 2,
        reps: 8,
        weightKg: 40,
        status: 'active' as const,
        previousLabel: '8×38'
      }
    ]
  },
  {
    exerciseId: 'rdl',
    exerciseName: 'Romanian Deadlift',
    prescription: '3×10 @ 60 kg',
    sets: [
      {
        setNumber: 1,
        reps: 10,
        weightKg: 60,
        status: 'active' as const,
        previousLabel: '10×58'
      }
    ]
  }
]

const baseProps = {
  workoutName: 'Lower Strength',
  editableWorkoutName: 'Lower Strength',
  privateNotes: '',
  exercises,
  activeExerciseIndex: 0,
  elapsedLabel: '18:42',
  restSeconds: 88,
  volumeLabel: '320 kg',
  completedSets: 1,
  swapOptions: workoutSessionSwapOptions,
  swapFilterChips: workoutSessionSwapChips,
  discardConfirmOpen: false,
  isSubmitting: false,
  error: null,
  onWorkoutNameChange: jest.fn(),
  onPrivateNotesChange: jest.fn(),
  onBegin: jest.fn(),
  onNotNow: jest.fn(),
  onPause: jest.fn(),
  onResume: jest.fn(),
  onOpenExerciseMenu: jest.fn(),
  onExerciseMenuAction: jest.fn(),
  onSwapSelect: jest.fn(),
  onSwapCancel: jest.fn(),
  onLogSet: jest.fn(),
  onSkipRest: jest.fn(),
  onAdjustRest: jest.fn(),
  onPreviousExercise: jest.fn(),
  onNextExercise: jest.fn(),
  onFinish: jest.fn(),
  onReviewSave: jest.fn(),
  onSave: jest.fn(),
  onDiscardRequest: jest.fn(),
  onDiscardConfirm: jest.fn(),
  onDiscardCancel: jest.fn(),
  onDone: jest.fn(),
  onBackToToday: jest.fn()
}

describe('WorkoutSessionComponent', () => {
  it('renders pre-start brief', () => {
    const { getByTestId } = renderWithTheme(<WorkoutSessionComponent {...baseProps} phase="preStart" />)

    expect(getByTestId('workout-session-prestart')).toBeTruthy()
  })

  it('renders active session with pause and finish controls', () => {
    const { getByTestId } = renderWithTheme(<WorkoutSessionComponent {...baseProps} phase="active" />)

    expect(getByTestId('workout-session-active')).toBeTruthy()
    expect(getByTestId('workout-session-pause')).toBeTruthy()
    expect(getByTestId('workout-session-finish')).toBeTruthy()
  })

  it('opens exercise menu screen', () => {
    const { getByTestId } = renderWithTheme(<WorkoutSessionComponent {...baseProps} phase="exerciseMenu" />)

    expect(getByTestId('workout-session-exercise-menu-screen')).toBeTruthy()
    expect(getByTestId('workout-session-menu-replace')).toBeTruthy()
  })

  it('shows paused overlay', () => {
    const { getByTestId } = renderWithTheme(<WorkoutSessionComponent {...baseProps} phase="paused" />)

    expect(getByTestId('workout-session-paused')).toBeTruthy()
  })

  it('shows finish sheet with review action', () => {
    const { getByTestId } = renderWithTheme(<WorkoutSessionComponent {...baseProps} phase="finishSheet" />)

    expect(getByTestId('workout-session-finish-sheet')).toBeTruthy()
  })

  it('renders save summary with discard action', () => {
    const { getByTestId } = renderWithTheme(<WorkoutSessionComponent {...baseProps} phase="save" />)

    expect(getByTestId('workout-session-save')).toBeTruthy()
    expect(getByTestId('workout-session-discard')).toBeTruthy()
  })

  it('shows discard confirmation modal', () => {
    const { getByTestId } = renderWithTheme(
      <WorkoutSessionComponent {...baseProps} phase="active" discardConfirmOpen />
    )

    expect(getByTestId('workout-session-discard-confirm')).toBeTruthy()
  })

  it('renders saved and discarded outcome screens', () => {
    const saved = renderWithTheme(<WorkoutSessionComponent {...baseProps} phase="saved" />)
    const discarded = renderWithTheme(<WorkoutSessionComponent {...baseProps} phase="discarded" />)

    expect(saved.getByTestId('workout-session-saved')).toBeTruthy()
    expect(discarded.getByTestId('workout-session-discarded')).toBeTruthy()
  })

  it('calls pause handler from active session', () => {
    const onPause = jest.fn()
    const { getByTestId } = renderWithTheme(<WorkoutSessionComponent {...baseProps} phase="active" onPause={onPause} />)

    fireEvent.press(getByTestId('workout-session-pause'))
    expect(onPause).toHaveBeenCalled()
  })
})
