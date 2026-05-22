import { status } from '@prisma/client'

import { Status } from '../enums/status.enum'

/**
 * A helper object for working with status values.
 */
export const statusHelper = {
  /**
   * Checks if the given status matches the specified status.
   *
   * @param statusNow The current status.
   * @param statusToCheck The status to check against.
   * @returns True if the status matches, false otherwise.
   */
  is: function (statusNow: Status, statusToCheck: Status): boolean {
    return statusNow === statusToCheck
  },

  /*
   * Status helper functions for user status.
   */
  user: {
    /**
     * Checks if the user's status is unverified.
     *
     * @param status The user's status object, only interested in the status property.
     * @returns True if the user's status is unverified, false otherwise.
     */
    isUnverified: function ({ status }: { status: status }): boolean {
      return status.name === Status.unverified
    },

    /**
     * Checks if password reset is allowed for the user.
     *
     * @param status The user's status object, only interested in the status property.
     * @returns True if password reset is allowed, false otherwise.
     */

    isPasswordResetAllowed: function ({ status }: { status: status }): boolean {
      if (status.name === Status.disabled || status.name === Status.soft_deleted) {
        return false
      }

      return true
    },

    /**
     * Checks if password change is allowed for the user.
     *
     * @param status The user's status object, only interested in the status property.
     * @returns True if password change is allowed, false otherwise.
     */
    isPassworChangeAllowed: function ({ status }: { status: status }): boolean {
      if (status.name === Status.disabled || status.name === Status.soft_deleted) {
        return false
      }

      return true
    }
  },

  item_tracking: {
    isItemCancelled: function ({ status }: { status: status }): boolean {
      return status.name === Status.item_cancelled
    },

    /**
     * Checks if the item is in transit to shopper.
     *
     * @param status The item tracking's status object, only interested in the status property.
     * @returns True if the item is in transit to shopper, false otherwise.
     */
    isItemInTransitToShopper: function ({ status }: { status: status }): boolean {
      let isInTransitToShopper = null

      switch (status.name) {
        case Status.purchased_by_traveler:
        case Status.in_transit_to_traveler:
        case Status.delivered_to_traveler_address:
        case Status.confirmed_received_by_traveler:
        case Status.confirmed_in_destination_country:
        case Status.confirmed_delivered_to_shopper_by_traveler:
        case Status.confirmed_delivered_to_shopper_by_shopper:
          isInTransitToShopper = true
          break

        default:
          isInTransitToShopper = false
          break
      }

      return isInTransitToShopper
    }
  },

  offerRequest: {
    /**
     * Checks if the offer request is pending traveler acceptance.
     *
     * @param status The offer request's status object, only interested in the status property.
     * @returns True if the offer request is pending traveler acceptance, false otherwise.
     */
    isPendingTravelerAcceptance: function ({ status }: { status: status }): boolean {
      return status.name === Status.pending_acceptance_by_traveler
    }
  },

  itemRequest: {
    /**
     * Checks if the item request can be cancelled.
     *
     * @param status The item request's status object, only interested in the status property.
     * @returns True if the item request can be cancelled, false otherwise.
     */
    canCancel: function ({ status }: { status: status }): boolean {
      return (
        status.name === Status.pending_acceptance_by_traveler ||
        status.name === Status.denied_by_traveler ||
        status.name === Status.accepted_by_traveler ||
        status.name === Status.reassigned_by_shopper
      )
    },

    isCanceled: function ({ status }: { status: status }): boolean {
      return status.name === Status.item_cancelled
    },

    /**
     * Checks if the item request can be reassigned.
     *
     * @param status The item request's status object, only interested in the status property.
     * @returns True if the item request can be reassigned, false otherwise.
     */
    canReassign: function ({ status }: { status: status }): boolean {
      return (
        status.name === Status.pending_acceptance_by_traveler ||
        status.name === Status.accepted_by_traveler ||
        status.name === Status.denied_by_traveler ||
        status.name === Status.reassigned_by_shopper
      )
    }
  },

  flight_itinerary: {
    isCancelled: function ({ status }: { status: status }): boolean {
      return status.name === Status.flight_booking_cancelled_before_payment
    },

    isCancelable: function ({ status }: { status: status }): boolean {
      return status.name === Status.interested_in_flight
    },

    isRenewable: function ({ status }: { status: { name: string } }): boolean {
      return status.name === Status.interested_in_flight
    }
  }
}
