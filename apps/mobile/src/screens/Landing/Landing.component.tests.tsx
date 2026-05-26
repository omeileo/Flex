import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'

import LandingComponent from './Landing.component'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

const defaultProps = {
  onLogin: jest.fn(),
  onSignUp: jest.fn(),
  showDesignPreview: false
}

describe('LandingComponent', () => {
  it('renders hero landing shell with auth actions', () => {
    const { getByTestId, getByText } = renderWithTheme(<LandingComponent {...defaultProps} />)

    expect(getByTestId('landing-screen')).toBeTruthy()
    expect(getByText('landing.login')).toBeTruthy()
    expect(getByText('landing.signUp')).toBeTruthy()
  })
})
