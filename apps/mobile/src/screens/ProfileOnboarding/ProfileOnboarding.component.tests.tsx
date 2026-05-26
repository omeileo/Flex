import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'

import ProfileOnboardingComponent from './ProfileOnboarding.component'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

describe('ProfileOnboardingComponent', () => {
  it('renders step one goal selection from the design flow', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <ProfileOnboardingComponent isSubmitting={false} error={null} onComplete={jest.fn()} />
    )

    expect(getByTestId('profile-onboarding-screen')).toBeTruthy()
    expect(getByText('profileOnboarding.goalHeadline')).toBeTruthy()
    expect(getByText('Build muscle')).toBeTruthy()
  })
})
