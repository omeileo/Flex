import { configureRequest } from '@network/apiClient/apiClient.functions';
import urls from '@network/apiClient/endpoints';
import { ApiErrorResponse } from '@shared/types/api.types';

import { LoginRequest, LoginSuccessResponse } from './login.types';

export const loginApi = async (
  request: LoginRequest,
): Promise<LoginSuccessResponse> => {
  const response = await configureRequest({
    url: urls.auth.login,
    method: 'POST',
    data: request,
  });

  if (response.status >= 200 && response.status < 300) {
    return response as LoginSuccessResponse;
  }

  throw response as ApiErrorResponse;
};
