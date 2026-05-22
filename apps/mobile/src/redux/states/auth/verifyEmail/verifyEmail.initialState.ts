import { VerifyEmailState } from './verifyEmail.types';

const verifyEmailInitialState: VerifyEmailState = {
  loading: false,
  resendLoading: false,
  error: null,
  resendMessage: null,
  verified: false,
};

export default verifyEmailInitialState;
