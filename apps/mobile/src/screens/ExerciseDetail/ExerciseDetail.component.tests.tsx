import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'

import ExerciseDetailComponent from './ExerciseDetail.component'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      if (key === 'exerciseDetail.setLine') {
        return `Set ${params?.set} · ${params?.reps} reps · ${params?.weight} kg`
      }

      if (key === 'exerciseDetail.setNumber') {
        return `Set ${params?.set}`
      }

      return key
    }
  })
}))

describe('ExerciseDetailComponent', () => {
  it('renders prescription and set rows', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <ExerciseDetailComponent
        exercise={{
          exerciseId: 'ohp',
          exerciseName: 'Standing Barbell OHP',
          orderIndex: 0,
          sets: [{ setNumber: 1, targetReps: 8, targetWeightKg: 40, repsScheme: 'STRAIGHT' as never }],
          restSeconds: 90
        }}
        prescription="3×8 @ 40 kg"
        instructions="Strict press"
        injuryNote={null}
        isLoading={false}
        error={null}
        onRetry={jest.fn()}
      />
    )

    expect(getByTestId('exercise-detail-screen')).toBeTruthy()
    expect(getByTestId('exercise-detail-prescription')).toBeTruthy()
    expect(getByText('3×8 @ 40 kg')).toBeTruthy()
  })
})
