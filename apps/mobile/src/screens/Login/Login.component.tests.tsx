import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'

import LoginComponent from './Login.component'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))

const defaultProps = {
  isSubmitting: false,
  error: null,
  successMessage: null,
  onSubmit: jest.fn(),
  onSignUpPress: jest.fn(),
  onForgotPasswordPress: jest.fn()
}

describe('LoginComponent', () => {
  it('renders branded auth shell and login form', () => {
    const { getByTestId } = renderWithTheme(<LoginComponent {...defaultProps} />)

    expect(getByTestId('login-screen')).toBeTruthy()
    expect(getByTestId('login-title')).toHaveTextContent('auth.login.title')
    expect(getByTestId('login-forgot-password')).toBeTruthy()
  })
})
