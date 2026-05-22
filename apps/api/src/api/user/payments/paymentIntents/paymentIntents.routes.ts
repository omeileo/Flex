import { createRoute } from '@/shared/functions/http/routes.functions'

export const paymentIntentsBasePath = '/payments/payment-intents'

export const paymentIntentsRoutes = {
  CREATE_OFFER_REQUEST_PAYMENT_INTENTS: createRoute(paymentIntentsBasePath, '/offer-requests/create'),
  CREATE_FLIGHT_BOOKING_PAYMENT_INTENTS: createRoute(paymentIntentsBasePath, '/flight-bookings/create'),
  CREATE_EXTERNAL_FLIGHT_BOOKING_PAYMENT_INTENTS: createRoute(
    paymentIntentsBasePath,
    '/external-flight-bookings/create'
  )
}
