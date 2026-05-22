import { logger } from '@/app'
import { getFileContent } from '@/shared/fileContent/fileContent.functions'

import { ExtractedData } from './dataExtraction.types'

/**
 * Extracts data from a CSV file and returns it as an array of objects.
 * @param filePath - The path to the CSV file to extract data from.
 * @param headerRowCount - The number of header rows to skip.
 * @returns An object containing the extracted data and the columns.
 */
export const extractDataFromCSV = <T extends Record<string, unknown>>(
  filePath: string,
  headerRowCount = 1
): ExtractedData<T> => {
  logger.info(`Extracting data from CSV file: ${filePath}`)

  try {
    const csvContent = getFileContent(filePath)
    const lines = csvContent.split('\n').filter((line) => line.trim())

    if (lines.length < headerRowCount) {
      logger.error('CSV file is empty or has insufficient header rows')
      throw new Error('CSV file is empty or has insufficient header rows')
    } else {
      const columns = lines[0].split(',').map((header) => header.toLowerCase().trim())

      const data = lines
        .slice(headerRowCount)
        .map((line) => {
          const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g)
          if (!matches) {
            logger.error(`Error parsing CSV content: ${line}`)

            return null
          }

          const values = matches
            .map((val) => (val.startsWith(',') ? val.slice(1) : val))
            .map((val) =>
              val.startsWith('"') && val.endsWith('"') ? val.slice(1, -1).replace(/""/g, '"') : val.trim()
            )

          return columns.reduce(
            (obj, column, index) => ({
              ...obj,
              [column]: values[index] || ''
            }),
            {} as T
          )
        })
        .filter((entry): entry is T => entry !== null)

      return {
        data,
        columns
      }
    }
  } catch (error) {
    logger.error(`Error parsing CSV content: ${error}`)
    throw error
  }
}
