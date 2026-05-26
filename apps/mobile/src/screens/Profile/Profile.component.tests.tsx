import React from 'react'

import { renderWithAppProviders } from '@shared/test/renderWithAppProviders'

import ProfileComponent from './Profile.component'

const baseProps = {
  displayName: 'Omar M.',
  initials: 'OM',
  memberSince: 'Member since 2026',
  goalsPreview: 'Build muscle · 3 days/week',
  gymPreview: 'Home Gym (default) · 2 locations',
  wellnessPreview: '2 active · Shoulder, Lower back',
  cyclePreview: 'Off',
  excludedPreview: '3 exercises',
  dietPreview: 'High protein · 2,200 kcal',
  agePreview: '35–44 · Intermediate',
  themePreview: 'Light',
  themeMode: 'light' as const,
  isLoading: false,
  error: null,
  profile: null,
  onRefresh: jest.fn(),
  onNavigateGoals: jest.fn(),
  onNavigateGymLocations: jest.fn(),
  onNavigateWellness: jest.fn(),
  onNavigateCycle: jest.fn(),
  onNavigateExcluded: jest.fn(),
  onNavigateAppearance: jest.fn()
}

describe('ProfileComponent', () => {
  it('renders training profile hub sections', () => {
    const { getByTestId } = renderWithAppProviders(<ProfileComponent {...baseProps} />)

    expect(getByTestId('training-profile-screen')).toBeTruthy()
    expect(getByTestId('profile-row-appearance')).toBeTruthy()
    expect(getByTestId('profile-row-goals')).toBeTruthy()
    expect(getByTestId('profile-row-cycle')).toBeTruthy()
  })
})
