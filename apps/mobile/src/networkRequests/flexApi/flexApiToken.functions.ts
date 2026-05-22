import * as Keychain from 'react-native-keychain';

import logger from '@shared/functions/Logger/logger.functions';

const TOKEN_SERVICE = 'com.flex.app.authToken';

export const getFlexApiToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: TOKEN_SERVICE,
    });

    if (!credentials) {
      return null;
    }

    return credentials.password;
  } catch (error) {
    logger.logError(
      error,
      'Failed to read auth token from keychain',
      'getFlexApiToken',
    );

    return null;
  }
};

export const setFlexApiToken = async (token: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword('flexUser', token, {
      service: TOKEN_SERVICE,
    });
  } catch (error) {
    logger.logError(
      error,
      'Failed to store auth token in keychain',
      'setFlexApiToken',
    );
    throw error;
  }
};

export const clearFlexApiToken = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword({ service: TOKEN_SERVICE });
  } catch (error) {
    logger.logError(
      error,
      'Failed to clear auth token from keychain',
      'clearFlexApiToken',
    );
  }
};
