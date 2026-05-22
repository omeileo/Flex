import { status } from '@prisma/client'

import { Status } from '../../../../src/shared/enums/status.enum'

const statusList: status[] = [
  // User Statuses
  {
    id: 1,
    type_id: 1,
    name: Status.active,
    description: 'User account is active and in good standing',
    display_name: 'Active'
  },
  {
    id: 2,
    type_id: 1,
    name: Status.unverified,
    description: 'User account has not been verified by email',
    display_name: 'Unverified'
  },
  {
    id: 3,
    type_id: 1,
    name: Status.locked,
    description: 'User account is locked due to security concerns',
    display_name: 'Locked'
  },
  {
    id: 4,
    type_id: 1,
    name: Status.disabled,
    description: 'User account is disabled',
    display_name: 'Disabled'
  },
  {
    id: 5,
    type_id: 1,
    name: Status.soft_deleted,
    description:
      'User account has been soft deleted. It will be deleted in the next scheduled cleanup. This action cannot be reversed.',
    display_name: 'Soft Deleted'
  },

  // Offer Statuses
  {
    id: 8,
    type_id: 2,
    name: Status.pending_acceptance_by_traveler,
    description: 'Offer has been submitted but not yet accepted by a traveler',
    display_name: 'Pending'
  },
  {
    id: 9,
    type_id: 2,
    name: Status.accepted_by_traveler,
    description: 'Offer has been accepted by the traveler',
    display_name: 'Accepted by Traveler'
  },
  {
    id: 11,
    type_id: 2,
    name: Status.cancelled, // TODO: Account for refund request and refunded
    description: 'Offer has been cancelled',
    display_name: 'Cancelled'
  },
  {
    id: 72,
    type_id: 2,
    name: Status.confirmed_delivered_to_shopper_by_shopper,
    description: 'Offer has been confirmed to be delivered to the shopper',
    display_name: 'Confirmed Delivered to Shopper by Shopper'
  },

  // Item Tracking Statuses
  {
    id: 12,
    type_id: 3,
    name: Status.accepted_by_traveler,
    description: 'Item has been accepted by the traveler',
    display_name: 'Accepted by Traveler'
  },
  {
    id: 13,
    type_id: 3,
    name: Status.pending_acceptance_by_traveler,
    description: 'Item is pending acceptance by the traveler',
    display_name: 'Pending Acceptance by Traveler'
  },

  {
    id: 55,
    type_id: 3,
    name: Status.denied_by_traveler,
    description: 'Item request has been denied by the traveler',
    display_name: 'Denied by Traveler'
  },
  {
    id: 56,
    type_id: 3,
    name: Status.cancelled_by_shopper,
    description: 'Item has been cancelled by the shopper',
    display_name: 'Cancelled by Shopper'
  },
  {
    id: 21,
    type_id: 3,
    name: Status.reassigned_by_shopper,
    description: 'Item has been reassigned to another offer by the shopper',
    display_name: 'Reassigned by Shopper'
  },
  {
    id: 22,
    type_id: 3,
    name: Status.purchased_by_traveler,
    description: 'Item has been purchased by the traveler',
    display_name: 'Purchased by Traveler'
  },
  {
    id: 23,
    type_id: 3,
    name: Status.in_transit_to_traveler,
    description: 'Item is in transit to the traveler',
    display_name: 'In Transit to Traveler'
  },
  {
    id: 24,
    type_id: 3,
    name: Status.delivered_to_traveler_address,
    description: "Item has been delivered to the traveler's address",
    display_name: 'Delivered to Traveler Address'
  },
  {
    id: 25,
    type_id: 3,
    name: Status.confirmed_received_by_traveler,
    description: 'Traveler has confirmed receipt of the item',
    display_name: 'Confirmed Received by Traveler'
  },
  {
    id: 26,
    type_id: 3,
    name: Status.confirmed_in_destination_country,
    description: 'Item has been confirmed to be in the destination country',
    display_name: 'Confirmed in Destination Country'
  },
  {
    id: 27,
    type_id: 3,
    name: Status.confirmed_delivered_to_shopper_by_traveler,
    description: 'Traveler has confirmed delivery of the item to the shopper',
    display_name: 'Confirmed Delivered to Shopper by Traveler'
  },
  {
    id: 28,
    type_id: 3,
    name: Status.confirmed_delivered_to_shopper_by_shopper,
    description: 'Shopper has confirmed receipt of the item from the traveler',
    display_name: 'Confirmed Delivered to Shopper by Shopper'
  },
  {
    id: 29,
    type_id: 3,
    name: Status.lost,
    description: 'Item has been lost',
    display_name: 'Lost'
  },
  {
    id: 30,
    type_id: 3,
    name: Status.out_of_stock,
    description: 'Item is out of stock',
    display_name: 'Out of Stock'
  },
  {
    id: 62,
    type_id: 3,
    name: Status.item_processing,
    description: 'Item is being processed',
    display_name: 'Processing'
  },
  {
    id: 31,
    type_id: 3,
    name: Status.item_delivered,
    description: 'Item has been delivered',
    display_name: 'Delivered'
  },
  {
    id: 32,
    type_id: 3,
    name: Status.item_shipped,
    description: 'Item has been shipped',
    display_name: 'Shipped'
  },
  {
    id: 33,
    type_id: 3,
    name: Status.item_cancelled,
    description: 'Item has been cancelled',
    display_name: 'Cancelled'
  },

  // Flight Booking Statuses
  {
    id: 14,
    type_id: 4,
    name: Status.interested_in_flight,
    description: 'User has shown interest in the flight but has not booked yet',
    display_name: 'Interested'
  },
  {
    id: 15,
    type_id: 4,
    name: Status.no_longer_interested_in_flight,
    description: 'User is no longer interested in the flight',
    display_name: 'No Longer Interested'
  },
  {
    id: 16,
    type_id: 4,
    name: Status.flight_booked,
    description: 'Flight has been booked',
    display_name: 'Booked'
  },
  {
    id: 17,
    type_id: 4,
    name: Status.flight_booking_cancelled_before_payment,
    description: 'Flight booking has been cancelled before payment',
    display_name: 'Booking Cancelled'
  },
  {
    id: 18,
    type_id: 4,
    name: Status.flight_paid,
    description: 'Flight has been paid for',
    display_name: 'Paid'
  },
  {
    id: 19,
    type_id: 4,
    name: Status.flight_cancelled_after_payment,
    description: 'Flight has been cancelled after payment',
    display_name: 'Cancelled After Payment'
  },
  {
    id: 20,
    type_id: 4,
    name: Status.flight_refunded,
    description: 'Flight has been refunded',
    display_name: 'Refunded'
  },
  {
    id: 57,
    type_id: 4,
    name: Status.flight_completed,
    description: 'Flight has been completed',
    display_name: 'Completed'
  },

  // External Flight Booking Statuses
  {
    id: 73,
    type_id: 8,
    name: Status.external_flight_booking_request_created,
    description: 'External flight booking request has been created',
    display_name: 'External Flight Booking Request Created'
  },
  {
    id: 74,
    type_id: 8,
    name: Status.external_flight_booking_request_processing,
    description: 'External flight booking request is being processed',
    display_name: 'External Flight Booking Request Processing'
  },
  {
    id: 75,
    type_id: 8,
    name: Status.external_flight_booking_request_denied,
    description: 'External flight booking request has been denied',
    display_name: 'External Flight Booking Request Denied'
  },
  {
    id: 76,
    type_id: 8,
    name: Status.external_flight_booking_request_cancelled,
    description: 'External flight booking request has been cancelled',
    display_name: 'External Flight Booking Request Cancelled'
  },
  {
    id: 77,
    type_id: 8,
    name: Status.itinerary_created_for_external_flight_booking,
    description: 'Itinerary has been created for the external flight booking',
    display_name: 'Itinerary Created for External Flight Booking'
  },

  // Payment Statuses
  {
    id: 34,
    type_id: 5,
    name: Status.payment_hold_created,
    description: 'Payment hold has been created',
    display_name: 'Payment Hold Created'
  },
  {
    id: 35,
    type_id: 5,
    name: Status.payment_hold_processing,
    description: 'Payment hold is being processed',
    display_name: 'Payment Hold Processing'
  },
  {
    id: 36,
    type_id: 5,
    name: Status.payment_hold_confirmed,
    description: 'Payment hold has been confirmed',
    display_name: 'Payment Hold Confirmed'
  },
  {
    id: 37,
    type_id: 5,
    name: Status.payment_hold_failed,
    description: 'Payment hold has failed',
    display_name: 'Payment Hold Failed'
  },
  {
    id: 38,
    type_id: 5,
    name: Status.payment_hold_cancelled,
    description: 'Payment hold has been cancelled',
    display_name: 'Payment Hold Cancelled'
  },

  {
    id: 39,
    type_id: 5,
    name: Status.payment_hold_release_failed,
    description: 'Payment hold release has failed',
    display_name: 'Payment Hold Release Failed'
  },

  {
    id: 40,
    type_id: 5,
    name: Status.payment_created,
    description: 'Payment has been created',
    display_name: 'Payment Created'
  },
  {
    id: 41,
    type_id: 5,
    name: Status.payment_processing,
    description: 'Payment is being processed',
    display_name: 'Payment Processing'
  },
  {
    id: 42,
    type_id: 5,
    name: Status.payment_confirmed,
    description: 'Payment has been confirmed',
    display_name: 'Payment Confirmed'
  },
  {
    id: 43,
    type_id: 5,
    name: Status.payment_failed,
    description: 'Payment has failed',
    display_name: 'Payment Failed'
  },
  {
    id: 44,
    type_id: 5,
    name: Status.payment_cancelled,
    description: 'Payment has been cancelled',
    display_name: 'Payment Cancelled'
  },

  // Refund Statuses
  {
    id: 45,
    type_id: 5,
    name: Status.refund_created,
    description: 'Refund has been created',
    display_name: 'Refund Created'
  },
  {
    id: 46,
    type_id: 5,
    name: Status.refund_processing,
    description: 'Refund is being processed',
    display_name: 'Refund Processing'
  },
  {
    id: 47,
    type_id: 5,
    name: Status.refund_confirmed,
    description: 'Refund has been confirmed',
    display_name: 'Refund Confirmed'
  },
  {
    id: 48,
    type_id: 5,
    name: Status.refund_failed,
    description: 'Refund has failed',
    display_name: 'Refund Failed'
  },
  {
    id: 49,
    type_id: 5,
    name: Status.refund_cancelled,
    description: 'Refund has been cancelled',
    display_name: 'Refund Cancelled'
  },

  // Transfer Statuses
  {
    id: 70,
    type_id: 5,
    name: Status.transfer_request_created,
    description: 'Transfer request has been created',
    display_name: 'Transfer Request Created'
  },
  {
    id: 71,
    type_id: 5,
    name: Status.transfer_request_cancelled,
    description: 'Transfer request has been cancelled',
    display_name: 'Transfer Request Cancelled'
  },
  {
    id: 50,
    type_id: 5,
    name: Status.transfer_created,
    description: 'Transfer has been created',
    display_name: 'Transfer Created'
  },
  {
    id: 51,
    type_id: 5,
    name: Status.transfer_processing,
    description: 'Transfer is being processed',
    display_name: 'Transfer Processing'
  },
  {
    id: 52,
    type_id: 5,
    name: Status.transfer_confirmed,
    description: 'Transfer has been confirmed',
    display_name: 'Transfer Confirmed'
  },
  {
    id: 53,
    type_id: 5,
    name: Status.transfer_failed,
    description: 'Transfer has failed',
    display_name: 'Transfer Failed'
  },
  {
    id: 54,
    type_id: 5,
    name: Status.transfer_cancelled,
    description: 'Transfer has been cancelled',
    display_name: 'Transfer Cancelled'
  },

  // Notification Statuses
  {
    id: 58,
    type_id: 6,
    name: Status.notification_delivery_successful,
    description:
      'Notification has been delivered successfully to the recipient',
    display_name: 'Notification Delivered'
  },
  {
    id: 59,
    type_id: 6,
    name: Status.notification_delivery_failed,
    description: 'Notification has failed to deliver to the recipient',
    display_name: 'Notification Delivery Failed'
  },
  {
    id: 60,
    type_id: 6,
    name: Status.notification_delivery_pending,
    description: 'Notification is pending delivery to the recipient',
    display_name: 'Notification Delivery Pending'
  },
  {
    id: 61,
    type_id: 6,
    name: Status.notification_read,
    description: 'Notification has been read by the recipient',
    display_name: 'Notification Read'
  },

  // Virtual Card Statuses
  {
    id: 63,
    type_id: 7,
    name: Status.virtual_card_request_created,
    description: 'Virtual card request has been created',
    display_name: 'Virtual Card Request Created'
  },
  {
    id: 64,
    type_id: 7,
    name: Status.virtual_card_request_processing,
    description: 'Virtual card request is being processed',
    display_name: 'Virtual Card Request Processing'
  },
  {
    id: 65,
    type_id: 7,
    name: Status.virtual_card_request_denied,
    description: 'Virtual card request has been denied',
    display_name: 'Virtual Card Request Denied'
  },
  {
    id: 66,
    type_id: 7,
    name: Status.virtual_card_request_cancelled,
    description: 'Virtual card request has been cancelled',
    display_name: 'Virtual Card Request Cancelled'
  },
  {
    id: 67,
    type_id: 7,
    name: Status.virtual_card_assigned,
    description: 'Virtual card has been assigned',
    display_name: 'Virtual Card Assigned'
  },
  {
    id: 68,
    type_id: 7,
    name: Status.virtual_card_removed,
    description: 'Virtual card has been removed',
    display_name: 'Virtual Card Removed'
  },
  {
    id: 69,
    type_id: 7,
    name: Status.virtual_card_expired,
    description: 'Virtual card has expired',
    display_name: 'Virtual Card Expired'
  }
]

export default statusList
