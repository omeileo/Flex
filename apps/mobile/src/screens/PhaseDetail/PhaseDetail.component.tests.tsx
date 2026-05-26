import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'

import PhaseDetailComponent from './PhaseDetail.component'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      if (key === 'phaseDetail.splitLine') {
        return `Day ${params?.day} — ${params?.title}`
      }

      if (key === 'phaseDetail.viewWeekSchedule') {
        return `View Week ${params?.week} schedule`
      }

      return key
    }
  })
}))

describe('PhaseDetailComponent', () => {
  it('renders phase rules and split days', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <PhaseDetailComponent
        phase={{
          id: 'foundation',
          name: 'Foundation',
          weeksLabel: 'Weeks 1–4',
          weekStart: 1,
          weekEnd: 4,
          rpe: 'RPE 6–7',
          goal: 'Build technique',
          progression: '+2 reps',
          restCompounds: '2–3 min',
          restAccessories: '60s'
        }}
        splitDays={[
          {
            dayIndex: 0,
            name: 'Upper Push',
            exercises: [
              {
                exerciseId: 'ohp',
                exerciseName: 'OHP',
                orderIndex: 0,
                sets: [{ setNumber: 1, targetReps: 8, repsScheme: 'STRAIGHT' as never }],
                restSeconds: 90
              }
            ]
          }
        ]}
        runningCopy="2× easy runs"
        isLoading={false}
        error={null}
        onViewWeekSchedule={jest.fn()}
        onRetry={jest.fn()}
      />
    )

    expect(getByTestId('phase-detail-screen')).toBeTruthy()
    expect(getByText('Build technique')).toBeTruthy()
    expect(getByText('Day 1 — Upper Push')).toBeTruthy()
  })
})
