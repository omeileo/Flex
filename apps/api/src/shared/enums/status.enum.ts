/**
 * Represents the status of an entity.
 */
export enum Status {
  // User Statuses
  active = 'active', // User Email is verified.
  unverified = 'unverified', // User Email is not verified.
  locked = 'locked', // User exeeded the maximum number of password attempts.
  disabled = 'disabled', // User is disabled.
  soft_deleted = 'soft_deleted', // User is soft deleted.

  // Item Request Statuses
  created = 'created',
  pending = 'pending',
  item_processing = 'item_processing',
  item_shipped = 'item_shipped',
  item_delivered = 'item_delivered',
  item_cancelled = 'item_cancelled',
  accepted = 'accepted',
  delivered = 'delivered',
  cancelled = 'cancelled',

  pending_acceptance_by_traveler = 'pending_acceptance_by_traveler', // Item request is pending acceptance by traveler.
  accepted_by_traveler = 'accepted_by_traveler', // Item request is accepted by traveler.
  denied_by_traveler = 'denied_by_traveler', // Item request is denied by traveler.
  cancelled_by_shopper = 'cancelled_by_shopper', // Item request is cancelled by shopper.
  reassigned_by_shopper = 'reassigned_by_shopper', // Item request is reassigned by shopper.

  // Delivery Statuses
  purchased_by_traveler = 'purchased_by_traveler',
  in_transit_to_traveler = 'in_transit_to_traveler',
  delivered_to_traveler_address = 'delivered_to_traveler_address',
  confirmed_received_by_traveler = 'confirmed_received_by_traveler',
  confirmed_in_destination_country = 'confirmed_in_destination_country',
  confirmed_delivered_to_shopper_by_traveler = 'confirmed_delivered_to_shopper_by_traveler',
  confirmed_delivered_to_shopper_by_shopper = 'confirmed_delivered_to_shopper_by_shopper',
  lost = 'lost',
  out_of_stock = 'out_of_stock',

  // Flight Statuses
  interested_in_flight = 'interested_in_flight',
  no_longer_interested_in_flight = 'no_longer_interested_in_flight',
  flight_booked = 'flight_booked',
  flight_booking_cancelled_before_payment = 'flight_booking_cancelled_before_payment',
  flight_paid = 'flight_paid',
  flight_cancelled_after_payment = 'flight_cancelled_after_payment',
  flight_refunded = 'flight_refunded',
  flight_completed = 'flight_completed',

  // Payment Statuses
  payment_hold_created = 'payment_hold_created',
  payment_hold_processing = 'payment_hold_processing',
  payment_hold_confirmed = 'payment_hold_confirmed',
  payment_hold_failed = 'payment_hold_failed',
  payment_hold_cancelled = 'payment_hold_cancelled',

  payment_hold_release_failed = 'payment_hold_release_failed',

  payment_created = 'payment_created',
  payment_processing = 'payment_processing',
  payment_confirmed = 'payment_confirmed',
  payment_failed = 'payment_failed',
  payment_cancelled = 'payment_cancelled',

  // Refund Statuses
  refund_created = 'refund_created',
  refund_processing = 'refund_processing',
  refund_confirmed = 'refund_confirmed',
  refund_failed = 'refund_failed',
  refund_cancelled = 'refund_cancelled',

  // Transfer Statuses
  transfer_request_created = 'transfer_request_created',
  transfer_request_cancelled = 'transfer_request_cancelled',

  transfer_created = 'transfer_created',
  transfer_processing = 'transfer_processing',
  transfer_confirmed = 'transfer_confirmed',
  transfer_failed = 'transfer_failed',
  transfer_cancelled = 'transfer_cancelled',

  // Virtual Card Statuses
  virtual_card_request_created = 'virtual_card_request_created',
  virtual_card_request_processing = 'virtual_card_request_processing',
  virtual_card_request_denied = 'virtual_card_request_denied',
  virtual_card_request_cancelled = 'virtual_card_request_cancelled',

  virtual_card_assigned = 'virtual_card_assigned',
  virtual_card_removed = 'virtual_card_removed',
  virtual_card_expired = 'virtual_card_expired',

  // Notification Statuses
  notification_delivery_successful = 'notification_delivery_successful',
  notification_delivery_failed = 'notification_delivery_failed',
  notification_delivery_pending = 'notification_delivery_pending',
  notification_read = 'notification_read',

  // External Flight Booking Request Statuses
  external_flight_booking_request_created = 'external_flight_booking_request_created',
  external_flight_booking_request_processing = 'external_flight_booking_request_processing',
  external_flight_booking_request_denied = 'external_flight_booking_request_denied',
  external_flight_booking_request_cancelled = 'external_flight_booking_request_cancelled',

  itinerary_created_for_external_flight_booking = 'itinerary_created_for_external_flight_booking'
}
