import { zodd } from '../../../../shared/functions/zod.functions'

/**
 * Represents the request body for creating Offer Request Payment Intents information.
 *
 * This is used to validate the incoming request to the "Create Offer Request Payment Intents" endpoint.
 */

export const CreateOfferRequestPaymentIntentRequestBody = zodd.object({
  offerDetails: zodd
    .array(
      zodd.object({
        itemId: zodd.number().openapi({
          example: 1,
          description: 'The identifier for the item'
        }),
        itemQuantity: zodd.number().openapi({
          example: 2,
          description: 'The quantity of the item'
        })
      })
    )
    .openapi({
      example: [
        { itemId: 1, itemQuantity: 2 },
        { itemId: 2, itemQuantity: 1 }
      ],
      description: 'Details of the items in the offer'
    }),
  deliveryDetails: zodd
    .object({
      countryIataCode: zodd.string().openapi({
        example: 'JM',
        description: 'The country code for the delivery address'
      }),
      cityIataCode: zodd.string().openapi({
        example: 'KIN',
        description: 'The city code for the delivery address'
      })
    })
    .optional()
    .openapi({
      example: { countryIataCode: 'JM', cityIataCode: 'KIN' },
      description: 'Details of the delivery address'
    })
})

/**
 * Represents the incoming request object for updating Offer Request Payment Intents information.
 *
 * This is used to validate the incoming request to the "Update Offer Request Payment Intents" endpoint.
 */
export const IncomingOfferRequestPaymentIntentRequestBody = zodd.object({
  body: CreateOfferRequestPaymentIntentRequestBody
})

/**
 * Represents the response body for the "Create Offer Request Payment Intents" endpoint.
 *
 * This is returned when the Offer Request Payment Intents creation is successful.
 */
export const CreateOfferRequestPaymentIntentResponse = zodd.object({
  paymentIntentId: zodd.string().openapi({
    example: 'pi_1234567890',
    description: 'The identifier for the Stripe payment intent'
  }),
  subtotal: zodd.number().openapi({
    example: 50.23,
    description: 'The subtotal amount for the payment intent'
  }),
  tax: zodd.number().openapi({
    example: 4.0,
    description: 'The tax amount for the payment intent'
  }),
  total: zodd.string().openapi({
    example: '54.23',
    description: 'The total amount for the payment intent'
  }),
  currency: zodd.string().openapi({
    example: 'USD',
    description: 'The currency for the payment intent'
  })
})

export const CreateFlightBookingPaymentIntentRequestBody = zodd.object({
  flightItineraryId: zodd.number().openapi({
    example: 1,
    description: 'The identifier for the flight itinerary'
  }),
  externalFlightBookingOfferId: zodd.string().openapi({
    example: 'off_0000AmmnRNq9HZ33WjgmV7',
    description: 'The identifier for the external flight booking offer'
  })
})

/**
 * Represents the incoming request object for updating Flight Booking Payment Intent information.
 *
 * This is used to validate the incoming request to the "Update Flight Booking Payment Intent" endpoint.
 */
export const IncomingFlightBookingPaymentIntentRequestBody = zodd.object({
  body: CreateFlightBookingPaymentIntentRequestBody
})

/**
 * Represents the response body for the "Create Flight Booking Payment Intent" endpoint.
 *
 * This is returned when the Flight Booking Payment Intent creation is successful.
 */
export const CreateFlightBookingPaymentIntentResponse = zodd.object({
  paymentIntentId: zodd.string().openapi({
    example: 'pi_1234567890',
    description: 'The identifier for the Stripe payment intent'
  }),
  subtotal: zodd.number().openapi({
    example: 50.23,
    description: 'The subtotal amount for the payment intent'
  }),
  tax: zodd.number().openapi({
    example: 4.0,
    description: 'The tax amount for the payment intent'
  }),
  total: zodd.string().openapi({
    example: '54.23',
    description: 'The total amount for the payment intent'
  }),
  currency: zodd.string().openapi({
    example: 'USD',
    description: 'The currency for the payment intent'
  })
})

/**
 * Represents the request body for creating External Flight Booking Payment Intents information.
 *
 * This is used to validate the incoming request to the "Create External Flight Booking Payment Intents" endpoint.
 */
export const CreateExternalFlightBookingPaymentIntentRequestBody = zodd.object({
  flightItineraryId: zodd.string().openapi({
    example: 'itn_0000AmmnRNq9HZ33WjgmV7',
    description: 'The identifier for the flight itinerary'
  })
})

/**
 * Represents the incoming request object for updating External Flight Booking Payment Intent information.
 *
 * This is used to validate the incoming request to the "Update External Flight Booking Payment Intent" endpoint.
 */
export const IncomingExternalFlightBookingPaymentIntentRequestBody = zodd.object({
  body: CreateExternalFlightBookingPaymentIntentRequestBody
})

/**
 * Represents the response body for the "Create External Flight Booking Payment Intent" endpoint.
 *
 * This is returned when the External Flight Booking Payment Intent creation is successful.
 */
export const CreateExternalFlightBookingPaymentIntentResponse = zodd.object({
  paymentIntentId: zodd.string().openapi({
    example: 'pi_1234567890',
    description: 'The identifier for the Stripe payment intent'
  }),
  subtotal: zodd.number().openapi({
    example: 0.0,
    description: 'The subtotal amount for the payment intent'
  }),
  discount: zodd.number().openapi({
    example: 100.0,
    description: 'The discount amount for the payment intent'
  }),
  tax: zodd.number().openapi({
    example: 0.0,
    description: 'The tax amount for the payment intent'
  }),
  total: zodd.number().openapi({
    example: -100.0,
    description: 'The total amount for the payment intent'
  }),
  currency: zodd.string().openapi({
    example: 'USD',
    description: 'The currency for the payment intent'
  })
})
