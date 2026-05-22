import { logger } from '@/app'
import airportData from 'aircodes'
import { City, Country, State } from 'country-state-city'

/**
 * Get the airport by the IATA code from the 'aircodes' library
 * @link https://www.npmjs.com/package/aircodes
 * @param airportIataCode - The IATA code
 * @returns The airport
 */
export function getAirportByIataCode(airportIataCode: string) {
  try {
    return airportData.getAirportByIata(airportIataCode)
  } catch (error) {
    logger.error(`Error getting airport by IATA code ${airportIataCode}`, error)

    return null
  }
}

/**
 * Get the country name by the ISO code using the Intl.DisplayNames API
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames
 * @param isoCode - The ISO code
 * @returns The country name or 'Unknown' if the country is not found
 */
export function getCountryNameByIsoCode(isoCode: string) {
  try {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
    const countryName = regionNames.of(isoCode)

    return countryName ?? 'Unknown'
  } catch (error) {
    logger.error(`Error getting country name by ISO code ${isoCode}`, error)

    return 'Unknown'
  }
}

/**
 * Checks if the provided country code is valid.
 * @param {string} code - The country code to validate.
 * @returns {boolean} - True if the code is valid, false otherwise.
 */
export function isValidCountryCode(code: string): boolean | undefined {
  try {
    return getCountryNameByIsoCode(code) !== 'Unknown'
  } catch (error) {
    logger.error(`Error checking if country code ${code} is valid`, error)

    return undefined
  }
}

/**
 * Get the country by the ISO code
 * @param {string} isoCode - The ISO code
 * @returns {Country} - The country object containing name and isoCode
 */
export function getCountryByIsoCode(isoCode: string) {
  try {
    const countryName = getCountryNameByIsoCode(isoCode) || ''

    return {
      name: countryName,
      code: isoCode
    }
  } catch (error) {
    logger.error(`Error getting country by ISO code ${isoCode}`, error)

    throw error
  }
}

// Get all countries
const countries = Country.getAllCountries()

// Get cities by country code
const citiesInUS = City.getCitiesOfCountry('US')

// Get cities by state and country
const citiesInCalifornia = City.getCitiesOfState('US', 'CA')

// Get states of a country
const statesInUS = State.getStatesOfCountry('US')

// Get country by code
const countryInfo = Country.getCountryByCode('US')

export function getCitiesByCountryCode(countryCode: string) {
  try {
    return City.getCitiesOfCountry(countryCode)
  } catch (error) {
    logger.error(`Error getting cities for country ${countryCode}`, error)
    return []
  }
}

export function searchCitiesByName(countryCode: string, searchTerm: string) {
  try {
    const cities = City.getCitiesOfCountry(countryCode)
    return cities?.filter((city) => city.name.toLowerCase().includes(searchTerm.toLowerCase())) ?? []
  } catch (error) {
    logger.error(`Error searching cities in ${countryCode}`, error)
    return []
  }
}
