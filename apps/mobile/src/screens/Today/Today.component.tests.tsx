import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'

import TodayComponent from './Today.component'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

const defaultProps = {
  weekNumber: 2,
  totalWeeks: 12,
  weekProgressPercent: 17,
  weekStripDays: [{ key: 'mon', label: 'M', isToday: true, hasWorkout: true }],
  workouts: [
    {
      id: 'day-0',
      dayIndex: 0,
      title: 'Upper Push',
      modality: 'strength' as const,
      durationMinutes: 55,
      exerciseCount: 4
    }
  ],
  coachNote: 'Focus on form today.',
  isLoading: false,
  error: null,
  onRefresh: jest.fn(),
  onWorkoutPress: jest.fn(),
  onStartWorkout: jest.fn()
}

describe('TodayComponent', () => {
  it('renders hero, workouts, and start CTA', () => {
    const { getByTestId, getByText } = renderWithTheme(<TodayComponent {...defaultProps} />)

    expect(getByTestId('today-screen')).toBeTruthy()
    expect(getByTestId('today-week-hero')).toBeTruthy()
    expect(getByText('2')).toBeTruthy()
    expect(getByTestId('today-start-workout')).toBeTruthy()
  })
})
