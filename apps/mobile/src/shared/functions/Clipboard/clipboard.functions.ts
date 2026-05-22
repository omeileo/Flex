import Clipboard from '@react-native-clipboard/clipboard';

import logger from '../Logger/logger.functions';

/**
 * Copies text to the system clipboard.
 * @returns true if the copy succeeded, false otherwise.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    Clipboard.setString(text);

    return true;
  } catch (error) {
    logger.logError(error, 'Failed to copy text', 'copyToClipboard');

    return false;
  }
};
