import { Platform } from 'react-native';

/**
 * Returns a value that depends on the platform. Mirrors `Platform.select` with
 * a more readable signature.
 */
export const platformSelect = <T>(values: {
  ios?: T;
  android?: T;
  default?: T;
}): T | undefined => {
  if (Platform.OS === 'ios' && values.ios !== undefined) return values.ios;
  if (Platform.OS === 'android' && values.android !== undefined)
    return values.android;

  return values.default;
};
