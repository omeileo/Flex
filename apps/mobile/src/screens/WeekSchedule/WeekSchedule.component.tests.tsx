import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'

import WeekScheduleComponent from './WeekSchedule.component'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      if (key === 'weekSchedule.weekTitle') {
        return `Week ${params?.week}`
      }

      return key
    }
  })
}))

describe('WeekScheduleComponent', () => {
  it('renders week days with exercise previews', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <WeekScheduleComponent
        schedule={{
          weekNumber: 1,
          phaseTag: 'Foundation · RPE 6–7',
          totalWeeks: 12,
          footerStats: '5 workouts',
          days: [
            {
              dayIndex: 0,
              dayLabel: 'Mon',
              title: 'Upper Push',
              preview: 'OHP 3×8',
              modality: 'strength',
              hasWorkout: true
            },
            {
              dayIndex: 6,
              dayLabel: 'Sun',
              title: 'Rest',
              preview: '—',
              modality: 'mobility',
              hasWorkout: false
            }
          ]
        }}
        isLoading={false}
        error={null}
        onPreviousWeek={jest.fn()}
        onNextWeek={jest.fn()}
        onDayPress={jest.fn()}
        onRetry={jest.fn()}
      />
    )

    expect(getByTestId('week-schedule-screen')).toBeTruthy()
    expect(getByText('Week 1')).toBeTruthy()
    expect(getByTestId('week-schedule-day-mon')).toBeTruthy()
  })
})
