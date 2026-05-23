export interface VerifyEmailRouteParams {
  email?: string
  code?: string
  verificationEmailSent?: boolean
}

export interface VerifyEmailFormValues {
  email: string
  code: string
}

export interface VerifyEmailComponentProps {
  email: string
  code: string
  isSubmitting: boolean
  isResending: boolean
  error: string | null
  resendMessage: string | null
  emailReadOnly: boolean
  onEmailChange: (value: string) => void
  onCodeChange: (value: string) => void
  onSubmit: () => void
  onResendPress: () => void
  onLoginPress: () => void
}
