import { createRoute } from '@/shared/functions/http/routes.functions'

export const refundBasePath = '/payments/refunds'

export const refundRoutes = {
  REQUEST_OFFER_REFUND: createRoute(refundBasePath, '/offer-requests/request'),
  REQUEST_FLIGHT_REFUND: createRoute(refundBasePath, '/flight-bookings/request'),
  VIEW: createRoute(refundBasePath, '/view'),
  VIEW_ALL: createRoute(refundBasePath, '/view-all'),
  VIEW_ALL_ADMIN: createRoute(refundBasePath, '/admin/view-all')
}
