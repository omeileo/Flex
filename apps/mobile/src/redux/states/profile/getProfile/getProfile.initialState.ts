import { GetProfileState } from './getProfile.types';

const initialState: GetProfileState = {
  loading: false,
  error: null,
  notFound: false,
  success: null,
};

export default initialState;
