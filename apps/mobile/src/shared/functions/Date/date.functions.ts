/* eslint-disable no-console */
import { DateTime, Duration, DurationLike, DurationLikeObject } from 'luxon'

import logger from '../Logger/logger.functions'
import { dateFormatRegex, durationRegex } from './date.regex'
import { Date, DateDurationUnit } from './date.types'

export const dateTimeFormats = {
  date: {
    day: {
      short: 'E',
      medium: 'EEE',
      full: 'EEEE'
    },
    short: 'MMM d',
    medium: 'MMM d, yyyy',
    long: 'EEE, MMM d, yyyy',
    full: 'EEEE, MMM d, yyyy',
    extended: 'EEEE, MMMM d, yyyy',
    default: 'dd/MM/yyyy',
    api: 'yyyy-MM-dd',
    calendar: 'EEE, dd MMM'
  },

  time: {
    short: 'h:mm a',
    long: 'HH:mm:ss.SSS',
    duration: 'HH:mm'
  },

  currentDateTimeFormat: 'yyyy-MM-dd HH:mm:ss.SSS'
}

/**
 * Function used to handle all date processing within the app.
 * Use this function for ALL date-related activities so that everything can be consistent
 * and if changes to the suppurting dependency need to be made in the future, it will be centralized.
 * @param {Date|string|number} [dateTime] Date and time as a Luxon DateTime, a string, or a Unix timestamp.
 * @param {string} [dateFormat] Format of the dateTime if it is a string.
 */
export default function date(dateTime?: Date | string | number, dateFormat?: string) {
  const currentDateTime = DateTime.local()
  const defaultDate: Date = getValidatedDateTime(dateTime !== undefined ? dateTime : DateTime.local(), dateFormat)

  return {
    /**
     * The luxon DateTime of the value passed.
     */
    dateTime: defaultDate,

    /**
     * Get the current local date.
     */
    currentDate: currentDateTime,

    /**
     * Get the Unix timestamp in milliseconds of the date specified or the current date.
     */
    timestamp: defaultDate?.valueOf(),

    /**
     * Get the millisecond of the second (0-999).
     */
    millisecond: defaultDate?.millisecond,

    /**
     * Get the second of the minute (0-59).
     */
    second: defaultDate?.second,

    /**
     * Get the minute of the hour (0-59).
     */
    minute: defaultDate?.minute,

    /**
     * Get the hour of the day (0-23).
     */
    hour: defaultDate?.hour,

    /**
     * Get the day of the month (1-30ish).
     */
    day: defaultDate?.day,

    /**
     * Get the day of the week. 1 is Monday and 7 is Sunday.
     */
    weekday: defaultDate?.weekday,

    /**
     * Get the month (1-12).
     */
    month: defaultDate?.month,

    /**
     * Get the year.
     */
    year: defaultDate?.year,

    /**
     * Returns whether the DateTime is valid. Invalid DateTimes occur when:
     *   - The DateTime was created from invalid calendar information, such as the 13th month or February 30
     *   - The DateTime was created by an operation on another invalid date.
     */
    isValid: defaultDate?.isValid ?? false,

    /**
     * Modify a date using a specified format.
     * @param {string} dateFormat How the date should be formatted.
     * @example date().format('yyyy-MM-dd')
     * @example date(expiryDate).format('yyyy-MM-dd')
     * @example date(currentDateTime, 'yyyy-MM-dd HH:mm:ss.SSS').format('yyyy-MM-dd')
     * @example date(1516315636958).format(dateTimeFormats.date.default)
     * @example date(chatStartTime).format(dateTimeFormats.time.long)
     */
    format: (dateFormat: string) => {
      let formattedDate = null
      const isValid = isValidFormatToWhichToConvert(defaultDate, dateFormat)

      if (isValid) {
        formattedDate = defaultDate.toFormat(dateFormat)
      }

      return formattedDate
    },

    /**
     * Add a specific amount of time to a date.
     * @param {DurationLike} duration How much time to add.
     * @example date().add(123) // 123 milliseconds from the current date
     * @example date().add({ days: 1 }) // 1 day from the current date
     * @example date(expiryDate).add({ months: 2 }) // 2 months from a specified luxon DateTime date
     * @example date(currentDateTime, 'yyyy-MM-dd HH:mm:ss.SSS').add({ days: 3, hours: 4, minutes: 39 }) // 3 days, 4 hours, and 39 minutes from the specified date
     */
    add: (duration: DurationLike) => {
      return defaultDate.plus(duration)
    },

    /**
     * Subtract a specific amount of time from a date.
     * @param {DurationLike} duration How much time to subtract.
     * @example date().subtract(123) // 123 milliseconds before the current date
     * @example date().subtract({ days: 1 }) // 1 day before the current date
     * @example date(expiryDate).subtract({ months: 2 }) // 2 months before a specified luxon DateTime date
     * @example date(currentDateTime, 'yyyy-MM-dd HH:mm:ss.SSS').subtract({ days: 3, hours: 4, minutes: 39 }) // 3 days, 4 hours, and 39 minutes before the specified date
     */
    subtract: (duration: DurationLike) => {
      return defaultDate.minus(duration)
    },

    /**
     * Return the difference between two DateTimes; defaults to milliseconds but can be a DateDurationUnit.
     * @param {DateTime|string|number} dateTime Date and time as a Luxon DateTime, a string, or a Unix timestamp.
     * @param {string} [dateFormat] Format of the dateTime if it is a string.
     * @param {string} [duration] Duration in which to send back the difference; defaults to milliseconds.
     * @example date().difference(expiryDate)
     * @example date(currentDate).difference(expiryDate)
     * @example date(currentDate).difference(1516315636958)
     * @example date(startDate).difference(endDate, undefined, 'days')
     */
    difference: (dateTime: DateTime | string | number, dateFormat?: string, duration?: DateDurationUnit) => {
      const otherDate: DateTime = getValidatedDateTime(dateTime, dateFormat)
      const difference = defaultDate.diff(otherDate).as(duration ?? 'milliseconds')

      return difference
    },

    /**
     * Return an object representing a period of time, like "2 months" or "1 day, 1 hour"..
     * @param {DurationLikeObject} duration Object representing different units to add to the duration.
     * @example date().duration({ seconds: 100 })
     * @example date().duration({ days: 5, hours: 10, minutes: 3, seconds: 30 })
     */
    duration: (duration?: DurationLikeObject) => {
      const returnValue: DurationLikeObject = duration ?? {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
      }

      return Duration.fromObject(returnValue)
    },

    /**
     * Determines if the date passed to the date function is before the one passed to the isBefore function.
     * @param {DateTime|string|number} dateTime Date and time as a Luxon DateTime, a string, or a Unix timestamp.
     * @param {string} [dateFormat] Format of the dateTime if it is a string.
     * @example date(currentDateTime).isBefore(chatStartTime)
     * @example date(currentDateTime, defaultDateTimeFormat).isBefore(chatStartTime, defaultTimeFormat)
     * @example date().isBefore(1516315636958)
     */
    isBefore: (dateTime: DateTime | string | number, dateFormat?: string) => {
      const otherDate: DateTime = getValidatedDateTime(dateTime, dateFormat)
      const isBefore = defaultDate < otherDate

      return isBefore
    },

    /**
     * Determines if the date passed to the date function is before the one passed to the isSameOrBefore function.
     * @param {DateTime|string|number} dateTime Date and time as a Luxon DateTime, a string, or a Unix timestamp.
     * @param {string} [dateFormat] Format of the dateTime if it is a string.
     * @example date(currentDateTime).isSameOrBefore(chatStartTime)
     * @example date(currentDateTime, defaultDateTimeFormat).isSameOrBefore(chatStartTime, defaultTimeFormat)
     * @example date().isSameOrBefore(1516315636958)
     */
    isSameOrBefore: (dateTime: DateTime | string | number, dateFormat?: string) => {
      const otherDate: DateTime = getValidatedDateTime(dateTime, dateFormat)
      const isSameOrBefore = defaultDate <= otherDate

      return isSameOrBefore
    },

    /**
     * Determines if the date passed to the date function is after the one passed to the isAfter function.
     * @param {DateTime|string|number} dateTime Date and time as a Luxon DateTime, a string, or a Unix timestamp.
     * @param {string} [dateFormat] Format of the dateTime if it is a string.
     * @example date(currentDateTime).isAfter(chatEndTime)
     * @example date(currentDateTime, defaultDateTimeFormat).isAfter(chatEndTime, defaultTimeFormat)
     * @example date().isAfter(1516315636958)
     */
    isAfter: (dateTime: DateTime | string | number, dateFormat?: string) => {
      const otherDate: DateTime = getValidatedDateTime(dateTime, dateFormat)
      const isAfter = defaultDate > otherDate

      return isAfter
    },

    /**
     * Determines if the date passed to the date function is the same or after the one passed to the isSameOrAfter function.
     * @param {DateTime|string|number} dateTime Date and time as a Luxon DateTime, a string, or a Unix timestamp.
     * @param {string} [dateFormat] Format of the dateTime if it is a string.
     * @example date(currentDateTime).isSameOrAfter(chatEndTime)
     * @example date(currentDateTime, defaultDateTimeFormat).isSameOrAfter(chatEndTime, defaultTimeFormat)
     * @example date().isSameOrAfter(1516315636958)
     */
    isSameOrAfter: (dateTime: DateTime | string | number, dateFormat?: string) => {
      const otherDate: DateTime = getValidatedDateTime(dateTime, dateFormat)
      const isSameOrAfter = defaultDate >= otherDate

      return isSameOrAfter
    },

    isWeekend: () => {
      let isWeekend = false

      if (defaultDate.weekday === 6 || defaultDate.weekday === 7) {
        isWeekend = true
      }

      return isWeekend
    },

    /**
     * Converts the date to UTC.
     * @returns {DateTime} The date in UTC.
     * @example date('2024-09-24T00:00:00.000Z').toUTC()
     */
    toUTC: () => {
      return defaultDate.toUTC()
    },

    /**
     * Parses the date, ensuring it's in UTC.
     * @param {string} dateString The date string to parse.
     * @param {string} [format] The format of the date string. If not provided, ISO format is assumed.
     * @returns {DateTime} The parsed date in UTC.
     * @example date().parseUTC('2024-09-24T00:00:00.000Z')
     * @example date().parseUTC('2024-09-24', 'yyyy-MM-dd')
     */
    parseUTC: (dateString: string, format?: string) => {
      if (format) {
        return DateTime.fromFormat(dateString, format, { zone: 'utc' })
      }

      return DateTime.fromISO(dateString, { zone: 'utc' })
    },
    /**
     * Returns a string representation of this time relative to now, such as "in two days". Rounds down by default.
     * @param {string} [roundDown] Whether or not to round the comparison down.
     * @example date().fromNow()
     * @example date(currentDateTime).fromNow()
     * @example date(currentDateTime).fromNow(false)
     */
    fromNow: (roundDown?: boolean) => {
      return defaultDate.toRelative({ round: roundDown ?? true })
    },

    /**
     *
     * @param {DateDurationUnit} timeUnit Time unit by which the date object should be mutated to be the start of
     * @example date().startOf('day') // set the time portion of today's date to 12:00 a.m.
     * @example date().startOf('year') // set the date and time to be 12:00 a.m. of the current year
     */
    startOf: (timeUnit?: DateDurationUnit) => {
      let startOfTimeObject = {}

      switch (timeUnit) {
        case 'second':
          break

        case 'minute':
          break

        case 'hour':
          break

        case 'day':
          startOfTimeObject = { hour: 0, minute: 0, second: 0, millisecond: 0 }
          break

        case 'week':
          break

        case 'month':
          break

        case 'quarter':
          break

        case 'year':
          break
      }

      return defaultDate.set(startOfTimeObject)
    },

    /**
     *
     * @param {DateDurationUnit} timeUnit Time unit by which the date object should be mutated to be the end of
     * @example date().endOf('day') // set the time portion of today's date to 11:59 p.m.
     * @example date().endOf('year') // set the date and time to be 11:59 p.m. of the current year
     */
    endOf: (timeUnit?: DateDurationUnit) => {
      let endOfTimeObject = {}

      switch (timeUnit) {
        case 'second':
          break

        case 'minute':
          break

        case 'hour':
          break

        case 'day':
          endOfTimeObject = { hour: 23, minute: 59, second: 59, millisecond: 999 }
          break

        case 'week':
          break

        case 'month':
          break

        case 'quarter':
          break

        case 'year':
          break
      }

      return defaultDate.set(endOfTimeObject)
    },

    /**
     * Removes the time portion from an ISO datetime string and sets it to the start of the day.
     * @param {string} isoDateTimeString The ISO datetime string to process.
     * @returns {string} An ISO date string with the time set to 00:00:00.000Z.
     * @example date().removeTimeFromISOString('2023-05-15T14:30:00.000Z') // returns '2023-05-15T00:00:00.000Z'
     */
    removeTimeFromISOString: (isoDateTimeString: string) => {
      const parsedDate = DateTime.fromISO(isoDateTimeString)

      if (!parsedDate.isValid) {
        throw new Error('Invalid ISO datetime string provided')
      }

      return parsedDate.startOf('day').toISO()
    },

    /**
     * Calculate exact age in years between a birth date and a reference date, considering month and day
     * @param {DateTime|string|number} birthDate The birth date to calculate age from
     * @param {DateTime|string|number} [referenceDate=DateTime.now()] The date at which to calculate the age (defaults to current date)
     * @param {string} [birthDateFormat] Format of the birthDate if it is a string
     * @param {string} [referenceDateFormat] Format of the referenceDate if it is a string
     * @returns {number} The exact age in years
     * @example date().calculateAge('2007-03-09', '2025-03-07') // returns 17
     * @example date().calculateAge('2007-03-09') // returns age as of current date
     */
    calculateAge: (
      birthDate: DateTime | string | number,
      referenceDate: DateTime | string | number = DateTime.now(),
      birthDateFormat?: string,
      referenceDateFormat?: string
    ) => {
      const birthDateTime: DateTime = getValidatedDateTime(birthDate, birthDateFormat)
      const refDate: DateTime = getValidatedDateTime(referenceDate, referenceDateFormat)

      let age = refDate.year - birthDateTime.year

      // Adjust age if birthday hasn't occurred yet in the reference year
      const hasBirthdayOccurred =
        refDate.month > birthDateTime.month ||
        (refDate.month === birthDateTime.month && refDate.day >= birthDateTime.day)

      // If the birthday hasn't occurred yet in the reference year, subtract one year from the age
      if (!hasBirthdayOccurred) {
        age--
      }

      return age
    },

    /**
     * Parses an ISO 8601 duration string into a Duration object.
     * @param {string} isoDuration - The ISO 8601 duration string to parse.
     * @returns Duration object
     * @example
     * parseISO8601Duration('PT2H30M') // returns Duration { hours: 2, minutes: 30 }
     */
    parseISO8601Duration: (isoDuration: string): Duration | null => {
      try {
        return Duration.fromISO(isoDuration)
      } catch (error) {
        logger.logError(error, 'Error parsing ISO 8601 duration string', 'parseISO8601Duration')

        return null
      }
    },

    /**
     * Converts a duration string to an ISO 8601 duration string.
     * @param {string} duration The duration string to convert.
     * @returns {string} The ISO 8601 duration string.
     * @example date().convertDurationToISO8601('2h 30m') // returns 'PT2H30M'
     * @example date().convertDurationToISO8601('2h 30m 15s') // returns 'PT2H30M15S'
     * @example date().convertDurationToISO8601('1d 2h 30m 15s') // returns 'P1DT2H30M15S'
     * @example date().convertDurationToISO8601('1y 2mo 3d 4h 5m 6s') // returns 'P1Y2M3DT4H5M6S'
     */
    convertDurationToISO8601: (duration: string): string => {
      const match = duration.match(durationRegex)
      let isoDuration = null

      if (!match) {
        logger.logError(
          new Error(`Invalid duration format: ${duration}`),
          'Invalid duration format',
          'convertDurationToISO8601'
        )

        isoDuration = 'PT0H0M'
      } else {
        // Extract all possible duration components
        const years = match[1] && match[2]?.toLowerCase() === 'y' ? match[1] : '0'
        const months = match[3] && match[4]?.toLowerCase() === 'mo' ? match[3] : '0'
        const days =
          (match[1] && match[2]?.toLowerCase() === 'd') || (match[5] && match[6]?.toLowerCase() === 'd')
            ? match[2]?.toLowerCase() === 'd'
              ? match[1]
              : match[5]
            : '0'
        const hours =
          (match[1] && match[2]?.toLowerCase() === 'h') || (match[7] && match[8]?.toLowerCase() === 'h')
            ? match[2]?.toLowerCase() === 'h'
              ? match[1]
              : match[7]
            : '0'
        const minutes =
          (match[1] && match[2]?.toLowerCase() === 'm') || (match[9] && match[10]?.toLowerCase() === 'm')
            ? match[2]?.toLowerCase() === 'm'
              ? match[1]
              : match[9]
            : '0'
        const seconds =
          (match[1] && match[2]?.toLowerCase() === 's') || (match[11] && match[12]?.toLowerCase() === 's')
            ? match[2]?.toLowerCase() === 's'
              ? match[1]
              : match[11]
            : '0'

        // Build ISO 8601 duration string
        isoDuration = 'P'

        if (years !== '0') isoDuration += `${years}Y`
        if (months !== '0') isoDuration += `${months}M`
        if (days !== '0') isoDuration += `${days}D`

        // Add time part if any time components exist
        if (hours !== '0' || minutes !== '0' || seconds !== '0') {
          isoDuration += 'T'
          if (hours !== '0') isoDuration += `${hours}H`
          if (minutes !== '0') isoDuration += `${minutes}M`
          if (seconds !== '0') isoDuration += `${seconds}S`
        }

        // If no duration components were found, return a zero duration
        if (isoDuration === 'P') isoDuration = 'PT0H0M'
      }

      return isoDuration
    },

    /**
     * Converts a number of milliseconds to an ISO 8601 duration string.
     * @param {number} milliseconds The number of milliseconds to convert.
     * @returns {string} The ISO 8601 duration string.
     * @example date().convertMillisecondsToISO8601(1000) // returns 'PT1S'
     * @example date().convertMillisecondsToISO8601(60000) // returns 'PT1M'
     * @example date().convertMillisecondsToISO8601(3600000) // returns 'PT1H'
     */
    convertMillisecondsToISO8601: (milliseconds: number): string => {
      const duration = Duration.fromMillis(milliseconds)

      return duration.toISO()
    }
  }
}

const getValidatedDateTime = (dateTime: DateTime | string | number, dateFormat?: string) => {
  let defaultDate: DateTime = DateTime.fromObject({ year: 0, month: 0, day: 0 })
  const currentDateTime = DateTime.local()
  let isValid = false

  if (dateTime) {
    isValid = isValidFormatFromWhichConversionCanBeDone(dateTime, dateFormat)

    if (isValid) {
      if (dateTime instanceof DateTime) {
        defaultDate = dateTime
      } else if (typeof dateTime === 'string') {
        if (dateFormat === undefined) {
          const deducedDateFormat = determineDateFormat(dateTime)

          if (deducedDateFormat === 'ISO 8601') {
            defaultDate = DateTime.fromISO(dateTime, { zone: 'utc' })
          } else {
            defaultDate = DateTime.fromFormat(dateTime, deducedDateFormat ?? '')
          }
        } else {
          defaultDate = DateTime.fromFormat(dateTime, dateFormat)
        }
      } else if (typeof dateTime === 'number') {
        let timestampInMilliseconds = dateTime

        if (JSON.stringify(dateTime).length === 10) {
          timestampInMilliseconds = dateTime * 1000
        }

        defaultDate = DateTime.fromMillis(timestampInMilliseconds)
      }
    }
  } else {
    defaultDate = currentDateTime
  }

  return defaultDate
}

const isValidFormatToWhichToConvert = (dateTime: DateTime, dateFormat: string) => {
  let isValid = null

  try {
    isValid = dateTime.toFormat(dateFormat).length > 0
  } catch (error) {
    console.log(`ERROR: dateFormat specified (${dateFormat}) is not a valid format.`)
    isValid = false
  }

  return isValid
}

const isValidFormatFromWhichConversionCanBeDone = (dateTime: DateTime | string | number, dateFormat?: string) => {
  let isValid = null
  let convertedDateTime: DateTime

  if (dateTime instanceof DateTime) {
    isValid = true
  } else if (typeof dateTime === 'string') {
    if (!dateFormat) {
      const deducedDateFormat = determineDateFormat(dateTime)

      if (deducedDateFormat !== null) {
        isValid = true
      } else {
        isValid = false
        console.log(
          `ERROR: Could not dynamically deduce date format from the string provided. A valid dateFormat should be passed to format '${dateTime}'.`
        )
      }
    } else {
      convertedDateTime = DateTime.fromFormat(dateTime, dateFormat)

      if (convertedDateTime.isValid) {
        isValid = true
      } else {
        isValid = false
        console.log(`ERROR: dateFormat specified (${dateFormat}) is not a valid format for ${dateTime}.`)
      }
    }
  } else if (typeof dateTime === 'number') {
    convertedDateTime = DateTime.fromMillis(dateTime)

    if (convertedDateTime.isValid) {
      isValid = true
    } else {
      isValid = false
      console.log(`ERROR: dateTime specified (${dateTime}) is not a valid timestamp.`)
    }
  } else {
    isValid = false
    console.log(
      `ERROR: Invalid arguments: dateTime must be a DateTime object or a string with a dateFormat. ${dateTime} is a ${typeof dateTime}.`
    )
  }

  return isValid
}

const determineDateFormat = (dateTime: string) => {
  let dateFormat = null

  for (const pattern of dateFormatRegex) {
    if (pattern.regex.test(dateTime)) {
      dateFormat = pattern.dateFormat
      break
    }
  }

  return dateFormat
}

/**
 * Formats an ISO 8601 duration string into a user-friendly string.
 * @param {string} isoDuration - The ISO 8601 duration string to format.
 * @returns {string} The formatted duration string in the format "Xh Ym".
 * @example
 * formatDuration('PT2H30M') // returns "2h 30m"
 */
export const formatDuration = function (isoDuration?: string): string {
  if (!isoDuration) {
    return 'N/A'
  }

  // Parse the ISO 8601 duration
  const duration = Duration.fromISO(isoDuration)

  // Get hours and minutes from the duration
  const hours = duration.hours
  const minutes = duration.minutes
  const seconds = duration?.seconds

  if (seconds && !hours) {
    // Convert seconds to additional minutes and hours
    const additionalMinutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    // Add the additional minutes to the total
    const totalMinutes = minutes + additionalMinutes
    const additionalHours = Math.floor(totalMinutes / 60)
    const finalMinutes = totalMinutes % 60

    // Add the additional hours to the total
    const finalHours = hours + additionalHours

    // If there are remaining seconds, round up the minutes
    if (remainingSeconds > 0) {
      return `${finalHours}h ${finalMinutes + 1}m`
    }

    return `${finalHours}h ${finalMinutes}m`
  }

  // Format the duration for the user
  return `${hours}h ${minutes}m`
}

export const formatTime = (dateTimeString: string): string => {
  return DateTime.fromISO(dateTimeString).toLocaleString(DateTime.TIME_SIMPLE)
}

export const formatDate = (dateTimeString: string): string => {
  return DateTime.fromISO(dateTimeString).toLocaleString(DateTime.DATE_MED)
}
