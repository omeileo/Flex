export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginRouteParams {
  successMessage?: string;
}

export interface LoginComponentProps {
  isSubmitting: boolean;
  error: string | null;
  successMessage: string | null;
  onSubmit: (values: LoginFormValues) => void;
  onSignUpPress: () => void;
}
