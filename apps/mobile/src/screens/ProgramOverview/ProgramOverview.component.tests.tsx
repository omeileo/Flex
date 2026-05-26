import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'

import ProgramOverviewComponent from './ProgramOverview.component'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

describe('ProgramOverviewComponent', () => {
  it('renders program blurb and phase cards', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <ProgramOverviewComponent
        program={{
          programTitle: '12-Week Strength + 5K',
          blurb: 'Coach paragraph',
          statsLabel: '12 weeks · 5 lift days',
          deloadNote: 'Deload after Week 8',
          currentWeekNumber: 1,
          totalWeeks: 12,
          phases: [
            {
              id: 'foundation',
              name: 'Foundation',
              weeksLabel: 'Weeks 1–4',
              weekStart: 1,
              weekEnd: 4,
              rpe: 'RPE 6–7',
              goal: 'Build volume',
              progression: '+2 reps',
              restCompounds: '2–3 min',
              restAccessories: '60s'
            }
          ]
        }}
        isLoading={false}
        error={null}
        onPhasePress={jest.fn()}
        onJumpToCurrentWeek={jest.fn()}
        onRetry={jest.fn()}
      />
    )

    expect(getByTestId('program-overview-screen')).toBeTruthy()
    expect(getByText('Coach paragraph')).toBeTruthy()
    expect(getByTestId('program-overview-phase-foundation')).toBeTruthy()
  })
})
