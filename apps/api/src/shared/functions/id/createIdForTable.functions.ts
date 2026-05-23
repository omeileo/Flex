import { TABLE_ID_PREFIXES } from './id.dictionary'
import { generateCustomId } from './id.functions'

export type TableIdKey = keyof typeof TABLE_ID_PREFIXES

export const createIdForTable = (table: TableIdKey): string => {
  return generateCustomId(TABLE_ID_PREFIXES[table])
}
