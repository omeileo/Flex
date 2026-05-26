import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'

import ProgressComponent from './Progress.component'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) =>
      ({
        'progress.loading': 'Loading your progress metrics…',
        'actions.retry': 'Retry'
      })[key] ?? key
  })
}))

const defaultProps = {
  title: 'Progress',
  subtitle: 'Light metrics for MVP — deeper analytics coming soon.',
  heroEyebrow: 'Performance pulse',
  featuredStat: { id: 'streak', label: 'Streak', value: '3', hint: 'days active' },
  chartTitle: 'Weekly volume',
  chartBadge: 'This week',
  stats: [
    { id: 'workouts', label: 'Workouts', value: '12', hint: 'This month' },
    { id: 'volume', label: 'Volume', value: '48.2k', hint: 'kg logged' },
    { id: 'streak', label: 'Streak', value: '3', hint: 'days' },
    { id: 'prs', label: 'PRs', value: '2', hint: 'all time' }
  ],
  weeklyVolume: [
    { label: 'M', value: 40 },
    { label: 'T', value: 55 },
    { label: 'W', value: 30 },
    { label: 'T', value: 70 },
    { label: 'F', value: 45 },
    { label: 'S', value: 80 },
    { label: 'S', value: 60 }
  ],
  chartFootnote: 'Coming soon: strength score by muscle group'
}

describe('ProgressComponent', () => {
  it('renders editorial header, featured streak, and chart', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <ProgressComponent {...defaultProps} isLoading={false} error={null} />
    )

    expect(getByTestId('progress-screen')).toBeTruthy()
    expect(getByTestId('progress-title')).toHaveTextContent('Progress')
    expect(getByTestId('progress-subtitle')).toHaveTextContent(defaultProps.subtitle)
    expect(getByTestId('progress-stat-streak')).toBeTruthy()
    expect(getByTestId('progress-stat-workouts')).toBeTruthy()
    expect(getByTestId('progress-stat-volume')).toBeTruthy()
    expect(getByTestId('progress-stat-prs')).toBeTruthy()
    expect(getByText('Weekly volume')).toBeTruthy()
    expect(getByTestId('progress-weekly-chart')).toBeTruthy()
    expect(getByText(defaultProps.chartFootnote)).toBeTruthy()
  })

  it('shows loading state while metrics fetch', () => {
    const { getByText } = renderWithTheme(<ProgressComponent {...defaultProps} isLoading error={null} />)

    expect(getByText('Loading your progress metrics…')).toBeTruthy()
  })
})
