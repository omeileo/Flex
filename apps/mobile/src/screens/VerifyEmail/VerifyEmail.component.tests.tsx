import React from 'react'

import { renderWithTheme } from '@shared/functions/TestRender/renderWithTheme'

import VerifyEmailComponent from './VerifyEmail.component'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: { email?: string }) => (params?.email ? `${key}:${params.email}` : key)
  })
}))

const defaultProps = {
  email: 'you@example.com',
  code: '',
  isSubmitting: false,
  isResending: false,
  error: null,
  resendMessage: null,
  emailReadOnly: true,
  onEmailChange: jest.fn(),
  onCodeChange: jest.fn(),
  onSubmit: jest.fn(),
  onResendPress: jest.fn(),
  onLoginPress: jest.fn()
}

describe('VerifyEmailComponent', () => {
  it('renders verify email shell with OTP input', () => {
    const { getByTestId } = renderWithTheme(<VerifyEmailComponent {...defaultProps} />)

    expect(getByTestId('verify-email-screen')).toBeTruthy()
    expect(getByTestId('verify-email-title')).toHaveTextContent('auth.verifyEmail.title')
  })
})
