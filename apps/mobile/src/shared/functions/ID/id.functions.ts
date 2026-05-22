import logger from '../Logger/logger.functions';

/**
 * Strips a prefix from a custom ID that was generated with a `prefix_` segment.
 * @example stripPrefixFromId('cus_lmt_A1B2-C3D4-E5F6-G7H8') // 'A1B2-C3D4-E5F6-G7H8'
 */
export function stripPrefixFromId(id: string): string {
  try {
    const lastUnderscoreIndex = id.lastIndexOf('_');

    if (lastUnderscoreIndex === -1) {
      return id;
    }

    return id.substring(lastUnderscoreIndex + 1);
  } catch (error) {
    logger.logError(
      error,
      'Error stripping prefix from ID',
      'stripPrefixFromId',
    );
    throw error;
  }
}
