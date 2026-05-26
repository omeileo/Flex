import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'

import PlanDetailComponent from './PlanDetail.component'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      if (key === 'planDetail.dayMeta') {
        return `${params?.count} exercises`
      }

      return key
    }
  })
}))

describe('PlanDetailComponent', () => {
  it('renders warm-up and exercise rows', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <PlanDetailComponent
        workout={{
          dayIndex: 0,
          name: 'Upper Push',
          exercises: [
            {
              exerciseId: 'ohp',
              exerciseName: 'Standing Barbell OHP',
              orderIndex: 0,
              sets: [{ setNumber: 1, targetReps: 8, targetWeightKg: 40, repsScheme: 'STRAIGHT' as never }],
              restSeconds: 90
            }
          ]
        }}
        coachNote="Session focus"
        sessionMeta="Week 1 · Foundation · ~55 min · RPE 6–7"
        warmUpItems={['Band rotations']}
        isLoading={false}
        error={null}
        onExercisePress={jest.fn()}
        onStartWorkout={jest.fn()}
        onRetry={jest.fn()}
      />
    )

    expect(getByTestId('plan-detail-screen')).toBeTruthy()
    expect(getByText('Upper Push')).toBeTruthy()
    expect(getByText('Standing Barbell OHP')).toBeTruthy()
  })
})
