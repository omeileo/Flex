import { DateTime } from 'luxon'

// Todo: copy date function file from frontend

/**
 * Represents a date and time value used in the API.
 *
 * This should be used as the datatime type throughout the API, to ensure consistency, currently using Luxon.
 */
export type APIDateTime = luxon.DateTime

/**
 * Returns the current date and time.
 * @returns {DateTime} The current date and time.
 */
export function getNow() {
  return DateTime.now()
}

/**
 * Returns the current date and time in ISO format.
 * @returns {string} The current date and time in ISO format.
 */
export function getISODateNow() {
  return getNow().toISO()
}

/**
 * Converts a date of birth string to an ISO string.
 * @param {string} dob The date of birth string in the format 'yyyy-MM-dd'.
 * @returns {string} The date of birth string in ISO format.
 */
export function dobToISOString(dob: string) {
  return DateTime.fromFormat(dob, 'yyyy-MM-dd').toISO()
}
