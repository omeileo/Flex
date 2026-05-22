import { createFlexApiClient } from '@flex/shared/functions/http/flexApiClient/flexApiClient';

import { setAuthenticationStatus } from '@shared/functions/Auth/auth.functions';
import env from '@network/apiClient/env.config';

import { getFlexApiToken } from './flexApiToken.functions';
import { FlexApiInstance } from './flexApi.types';

let flexApiClient: FlexApiInstance | null = null;

export const getFlexApi = (): FlexApiInstance => {
  if (!flexApiClient) {
    flexApiClient = createFlexApiClient({
      baseUrl: env.API_BASE_URL,
      getToken: getFlexApiToken,
      onUnauthorized: () => {
        setAuthenticationStatus(false);
      },
    });
  }

  return flexApiClient;
};

export const resetFlexApiClient = () => {
  flexApiClient = null;
};
