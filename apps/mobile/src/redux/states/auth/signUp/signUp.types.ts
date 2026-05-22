import { ApiSuccessResponse } from '@shared/types/api.types';

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  wantsDealsAndDiscounts?: boolean;
}

export interface SignUpResponseData {
  id: number;
  email: string;
  status: {
    id: number;
    name: string;
    display_name: string;
    description: string;
  };
}

export type SignUpSuccessResponse = ApiSuccessResponse<SignUpResponseData>;

export interface SignUpState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}
