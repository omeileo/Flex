import { logger } from '@/app'
import prisma from 'prisma/prisma.client'

import { CalculateTaxResponse, ItemDetails, ItemWithTax, TaxExemption } from '../payments.types'

/**
 * Calculates the tax for a given item details, taking into account the itinerary.
 * If the itinerary is provided, the tax will be calculated based on the itinerary's source country and state.
 * If the itinerary is not provided, the tax will be calculated based on the item details' source country only.
 * @param itemDetails - The item details to calculate the tax for.
 * @param itinerary - The itinerary to calculate the tax for.
 * @returns The tax for the given item details and itinerary.
 */
export async function calculateTax(itemDetails: ItemDetails[]): Promise<CalculateTaxResponse> {
  logger.info(`Calculating tax for item details: ${JSON.stringify(itemDetails)}`)

  const itemsSourceCountry = itemDetails.find((item) => item.country)?.country
  const itemsWithTax: ItemWithTax[] = []

  logger.info(`itemsSourceCountry: ${itemsSourceCountry}`)

  if (!itemsSourceCountry) {
    logger.error('No valid item details found for tax calculation')
    return {
      tax: 0,
      itemsWithTax: []
    }
  }

  let itemPurchaseTaxAdministrativeDivision: string | null = null
  let totalTax = 0
  let taxCountry: { id: number; name: string } | null = null
  let taxAdministrativeDivision: { id: number; name: string } | null = null

  let taxRate: {
    id: number
    rate: number
    country_id: number | null
    administrative_division_id: number | null
    administrative_division_name?: string | null
    country_name?: string | null
  } | null = null

  if (itemPurchaseTaxAdministrativeDivision && itemsSourceCountry) {
    logger.info(
      `Tax administrative division found for country: ${itemsSourceCountry}. Getting tax rate for administrative division (${itemPurchaseTaxAdministrativeDivision}).`
    )

    const { rate, country, administrativeDivision } = await getTaxRateForAdministrativeDivision(
      itemPurchaseTaxAdministrativeDivision,
      itemsSourceCountry
    )

    logger.info(
      `Tax rate found for administrative division (${administrativeDivision?.name}, ${country?.name}): ${JSON.stringify(rate)}.`
    )

    taxRate = rate
    taxCountry = country
    taxAdministrativeDivision = administrativeDivision
  } else {
    logger.info(
      `Tax administrative division not found for country: ${itemsSourceCountry}. Getting tax rate for country.`
    )

    const { rate, country } = await getTaxRateForCountry(itemsSourceCountry)

    taxRate = rate
    taxCountry = country
  }

  if (taxRate === null) {
    if (taxCountry === null && itemPurchaseTaxAdministrativeDivision === null) {
      logger.error(`Tax country not found for country: ${itemsSourceCountry}`)

      throw new Error('Tax country not found')
    } else if (taxAdministrativeDivision === null) {
      logger.error(`Tax administrative division not found for country: ${taxCountry?.name}`)

      throw new Error('Tax administrative division not found')
    } else {
      logger.error(`Tax rate not found for country: ${taxCountry?.name}`)
      throw new Error('Tax rate not found')
    }
  } else {
    let taxExemptAdministrativeDivision: TaxExemption | null = null

    if (taxAdministrativeDivision) {
      taxExemptAdministrativeDivision = await prisma.tax_exemptions.findFirst({
        where: {
          administrative_division_id: taxAdministrativeDivision?.id
        }
      })
    }

    logger.info(`taxAdministrativeDivision: ${JSON.stringify(taxAdministrativeDivision)}`)
    logger.info(`taxExemptAdministrativeDivision: ${JSON.stringify(taxExemptAdministrativeDivision)}`)

    itemDetails.forEach((item) => {
      let itemTax = 0
      const itemPrice = item.accepted_item_price ?? item.price

      if (taxAdministrativeDivision && taxExemptAdministrativeDivision) {
        const conditionalExemptionCategoryPresent = item.categories.some((category) =>
          category.toLowerCase().includes(taxExemptAdministrativeDivision.category.toLowerCase())
        )

        logger.info(`item.price: $${item.price}`)
        logger.info(`item.accepted_item_price: $${item.accepted_item_price}`)
        logger.info(`item.categories: ${item.categories}`)
        logger.info(`conditionalExemptionCategoryPresent: ${conditionalExemptionCategoryPresent}`)

        const conditionalExemptionThresholdNotExceededForCategory =
          taxExemptAdministrativeDivision.conditional_exemption &&
          conditionalExemptionCategoryPresent &&
          itemPrice <= Number(taxExemptAdministrativeDivision.threshold_amount)

        logger.info(
          `conditionalExemptionThresholdNotExceededForCategory: ${conditionalExemptionThresholdNotExceededForCategory}`
        )

        if (taxExemptAdministrativeDivision.no_tax || conditionalExemptionThresholdNotExceededForCategory) {
          logger.info('no tax')
          totalTax += 0
        } else {
          if (taxExemptAdministrativeDivision.tax_price_difference_above_threshold) {
            const taxableAmount = Math.max(itemPrice - Number(taxExemptAdministrativeDivision.threshold_amount), 0)

            itemTax = taxRate.rate * taxableAmount * item.quantity
          } else {
            itemTax = taxRate.rate * itemPrice * item.quantity
          }

          logger.info(`itemTax: $${itemTax}`)
          totalTax += itemTax
        }
      } else {
        itemTax = taxRate.rate * itemPrice * item.quantity
        logger.info(`itemTax: $${itemTax}`)
        totalTax += itemTax
      }

      itemsWithTax.push({
        id: item.id,
        item_request_id: item.item_request_id,
        tax: itemTax
      })
    })
  }

  logger.info(`totalTax: $${totalTax}`)

  return {
    tax: totalTax,
    itemsWithTax
  }
}

export async function getTaxRateForAdministrativeDivision(administrativeDivision: string, country: string) {
  let taxCountry: { id: number; name: string } | null = null

  let taxRate: {
    id: number
    rate: number
    country_id: number | null
    administrative_division_id: number | null
    administrative_division_name?: string | null
  } | null = null

  const taxAdministrativeDivision = await prisma.tax_country_administrative_divisions.findFirst({
    where: { name: administrativeDivision }
  })

  if (taxAdministrativeDivision) {
    const taxRateRecord = await prisma.tax_rates.findFirst({
      where: {
        administrative_division_id: taxAdministrativeDivision.id
      }
    })

    if (taxRateRecord) {
      taxRate = {
        id: taxRateRecord.id,
        rate: Number(taxRateRecord.rate.toFixed(5)),
        country_id: taxRateRecord.country_id,
        administrative_division_id: taxRateRecord.administrative_division_id
      }
    }
  } else {
    const { rate, country: countryOfTaxRate } = await getTaxRateForCountry(country)

    taxRate = rate
    taxCountry = countryOfTaxRate
  }

  return {
    rate: taxRate,
    country: taxCountry,
    administrativeDivision: taxAdministrativeDivision
  }
}

async function getTaxRateForCountry(country: string) {
  let taxRate: {
    id: number
    rate: number
    country_id: number | null
    administrative_division_id: number | null
  } | null = null
  logger.info(`Getting tax rate for country: ${country}`)

  try {
    const taxCountry = await prisma.tax_countries.findFirst({
      where: { name: country }
    })

    if (taxCountry !== null) {
      const taxRateRecord = await prisma.tax_rates.findFirst({
        where: {
          country_id: taxCountry?.id
        }
      })

      if (taxRateRecord) {
        taxRate = {
          id: taxRateRecord.id,
          rate: Number(taxRateRecord.rate.toFixed(5)),
          country_id: taxRateRecord.country_id,
          administrative_division_id: taxRateRecord.administrative_division_id
        }
      }

      logger.info(`taxRate found for ${country} found: ${JSON.stringify(taxRate)}`)

      return {
        rate: taxRate,
        country: taxCountry
      }
    } else {
      logger.error(`Tax country not found for country: ${country}`)
      throw new Error(`Tax country not found for country: ${country}`)
    }
  } catch (error) {
    logger.error(`Error getting tax rate for country: ${country}`, error)
    throw new Error(`Error getting tax rate for country: ${country}`)
  }
}
