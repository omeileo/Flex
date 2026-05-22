import { PrismaClient } from '@prisma/client'

import { logger } from '../../src/app'

/**
 * Generate a prefixed CUID function
 * @param prisma - PrismaClient
 * @note This function is not being used anymore, but it's still here for reference
 * @note There is an issue with the function where it's not working in the shadow database so migrations are failing
 * @todo Resolve the issue or remove it if it's not used in the future
 */
const generatePrefixedCuid = async (prisma: PrismaClient) => {
  try {
    // Create pgcrypto extension if not exists
    await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS pgcrypto`

    // Create generate_prefixed_cuid function
    await prisma.$executeRaw`
      CREATE OR REPLACE FUNCTION generate_prefixed_cuid(prefix text)
      RETURNS text AS $$
      DECLARE
          timestamp_part text;
          random_part text;
      BEGIN
          -- Generate timestamp part (first 8 chars)
          timestamp_part := LOWER(
              TO_HEX(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::BIGINT)
          );
          
          -- Generate random part (16 chars)
          random_part := LOWER(
              ENCODE(GEN_RANDOM_BYTES(8), 'hex')
          );
          
          -- Combine with prefix
          RETURN prefix || timestamp_part || random_part;
      END;
      $$ LANGUAGE plpgsql VOLATILE
    `

    logger.info('Prefixed CUID function created')
  } catch (error) {
    logger.error(`Error generating prefixed CUID function: ${error}`)
    throw error
  }
}

export default generatePrefixedCuid
