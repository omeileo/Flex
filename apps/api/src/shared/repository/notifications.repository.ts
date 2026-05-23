import { NotificationAuthorCategory } from '@/api/notificationSystem/notification.types'
import { logger } from '@/app'
import {
  flight_bookings_flight_notifications,
  flight_bookings_notifications,
  notification_contents,
  notifications
} from '@prisma/client'
import prisma from 'prisma/prisma.client'

import { NotificationAuthor } from '../email/email.types'
import date from '../functions/Date/date.functions'
import { createIdForTable } from '../functions/id/createIdForTable.functions'
import { PrismaTransaction } from '../types/repository.types'

/**
 * Repository for managing notifications and their relationships.
 */
export const notificationsRepository = {
  /**
   * Creates a new notification.
   * @param data - The notification data to create.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to the created notification.
   */
  createNotification: async (
    data: Omit<notifications, 'id' | 'created_at' | 'updated_at' | 'read_status_id'> &
      Omit<notification_contents, 'id' | 'created_at' | 'updated_at' | 'notification_id' | 'template_id'>,
    transaction: PrismaTransaction = prisma
  ): Promise<notifications> => {
    try {
      logger.info(
        `Attempting to create ${data.delivery_channel} notification to be sent to ${data.recipient_id} by ${data.author_id} of type ${data.author_type}`
      )

      const isAuthorAllowed = await notificationsRepository.isNotificationAuthorAllowedToSendNotification({
        id: data.author_id,
        type: data.author_type as NotificationAuthorCategory
      })

      if (isAuthorAllowed) {
        const notification = await transaction.notifications.create({
          data: {
            id: createIdForTable('notifications'),
            recipient_id: data.recipient_id,
            author_id: data.author_id,
            author_type: data.author_type,
            delivery_status_id: data.delivery_status_id,
            priority: data.priority,
            type: data.type
          }
        })

        await transaction.notification_contents.create({
          data: {
            id: createIdForTable('notification_contents'),
            title: data.title,
            body: data.body,
            delivery_channel: data.delivery_channel,
            notification_id: notification.id
          }
        })

        logger.info(`Notification created successfully: ${notification.id}`)

        return notification
      } else {
        logger.error(`Author ${data.author_id} is not allowed to send notifications`)
        throw new Error('Author is not allowed to send notifications')
      }
    } catch (error) {
      logger.error(`Error creating notification: ${error}`)
      throw error
    }
  },

  /**
   * Validates that the author can send notifications.
   * @param author - The author to validate.
   * @returns A Promise that resolves to the validated author.
   */
  isNotificationAuthorAllowedToSendNotification: async (author: NotificationAuthor) => {
    let isAuthorAllowed = false

    let user:
      | (Awaited<ReturnType<typeof prisma.users.findUnique>> & {
          user_roles: {
            roles: {
              name: string
            }
          }[]
        })
      | null = null

    switch (author.type) {
      case NotificationAuthorCategory.system:
        isAuthorAllowed = true
        break

      case NotificationAuthorCategory.admin:
        user = await prisma.users.findUnique({
          where: { id: author.id },
          include: {
            user_roles: {
              include: {
                roles: true
              }
            }
          }
        })

        if (!user || !user.user_roles.some((role) => role.roles.name === 'admin')) {
          logger.error(`User (${user?.id}) is not authorized to send notifications as they are not an admin`)
          throw new Error('User is not authorized to send notifications')
        }

        isAuthorAllowed = true
        break

      default:
        logger.error(`Author type ${author.type} is not supported`)
        throw new Error('Author type is not supported')
    }

    return isAuthorAllowed
  },

  /**
   * Links a notification to a flight booking.
   * @param flightBookingId - The ID of the flight booking.
   * @param notificationId - The ID of the notification.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to the created relationship.
   */
  linkNotificationToFlightBooking: async (
    flightBookingId: number,
    notificationId: string,
    transaction: PrismaTransaction = prisma
  ): Promise<flight_bookings_notifications> => {
    try {
      logger.info(`Attempting to link notification ${notificationId} to flight booking ${flightBookingId}`)

      const existingLink = await transaction.flight_bookings_notifications.findFirst({
        where: {
          flight_booking_id: flightBookingId,
          notification_id: notificationId
        }
      })

      if (existingLink) {
        logger.info(
          `Notification ${notificationId} already linked to flight booking ${flightBookingId} - skipping link`
        )

        return existingLink
      } else {
        const link = await transaction.flight_bookings_notifications.create({
          data: {
            flight_booking_id: flightBookingId,
            notification_id: notificationId
          }
        })

        logger.info(`Notification ${notificationId} linked to flight booking ${flightBookingId} successfully`)

        return link
      }
    } catch (error) {
      logger.error(`Error linking notification to flight booking: ${error}`)
      throw error
    }
  },

  /**
   * Links a notification to a specific flight within a booking.
   * @param flightBookingId - The ID of the flight booking.
   * @param flightId - The ID of the flight.
   * @param notificationId - The ID of the notification.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to the created relationship.
   */
  linkNotificationToFlightBookingFlight: async (
    flightBookingId: number,
    flightId: number,
    notificationId: string
  ): Promise<flight_bookings_flight_notifications> => {
    try {
      logger.info(
        `Attempting to link notification ${notificationId} to flight ${flightId} within flight booking ${flightBookingId}`
      )

      const link = await prisma.flight_bookings_flight_notifications.create({
        data: {
          flight_booking_id: flightBookingId,
          flight_id: flightId,
          notification_id: notificationId
        }
      })

      logger.info(
        `Notification ${notificationId} linked to flight ${flightId} within flight booking ${flightBookingId} successfully`
      )

      return link
    } catch (error) {
      logger.error(`Error linking notification to flight booking flight: ${error}`)
      throw error
    }
  },

  /**
   * Retrieves all notifications for a flight booking.
   * @param flightBookingId - The ID of the flight booking.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to an array of notifications.
   */
  getFlightBookingNotifications: async (
    flightBookingId: number,
    transaction: PrismaTransaction = prisma
  ): Promise<notifications[]> => {
    try {
      logger.info(`Attempting to get notifications for flight booking ${flightBookingId}`)

      const bookingNotifications = await transaction.flight_bookings_notifications.findMany({
        where: { flight_booking_id: flightBookingId },
        include: { notifications: true }
      })

      const notifications = bookingNotifications.map((bookingNotification) => bookingNotification.notifications)

      logger.info(`Notifications retrieved successfully for flight booking ${flightBookingId}`)

      return notifications
    } catch (error) {
      logger.error(`Error getting flight booking notifications: ${error}`)
      throw error
    }
  },

  /**
   * Retrieves all notifications for a specific flight within a booking.
   * @param flightBookingId - The ID of the flight booking.
   * @param flightId - The ID of the flight.
   * @param transaction - The Prisma transaction object (optional, defaults to prisma).
   * @returns A Promise that resolves to an array of notifications.
   */
  getFlightBookingFlightNotifications: async (
    flightBookingId: number,
    flightId: number,
    transaction: PrismaTransaction = prisma
  ): Promise<notifications[]> => {
    try {
      logger.info(`Attempting to get notifications for flight ${flightId} within flight booking ${flightBookingId}`)

      const flightNotifications = await transaction.flight_bookings_flight_notifications.findMany({
        where: {
          flight_booking_id: flightBookingId,
          flight_id: flightId
        },
        include: { notifications: true }
      })

      const notifications = flightNotifications.map((flightNotification) => flightNotification.notifications)

      logger.info(
        `Notifications retrieved successfully for flight ${flightId} within flight booking ${flightBookingId}`
      )

      return notifications
    } catch (error) {
      logger.error(`Error getting flight booking flight notifications: ${error}`)
      throw error
    }
  },

  /**
   * Retrieves the latest notification time for a flight booking.
   * @param flightBookingId - The ID of the flight booking.
   * @returns A Promise that resolves to the latest notification time as an ISO string.
   */
  getLatestFlightBookingNotificationTime: async (flightBookingId: number): Promise<string | null> => {
    try {
      logger.info(`Attempting to get latest notification time for flight booking ${flightBookingId}`)

      const notifications = await notificationsRepository.getFlightBookingNotifications(flightBookingId)

      const latestNotification = notifications
        .sort((a, b) => date(a.created_at.toISOString()).timestamp - date(b.created_at.toISOString()).timestamp)
        .pop()

      logger.info(
        `Latest notification time retrieved successfully for flight booking ${flightBookingId} - ${latestNotification?.created_at.toISOString()}`
      )

      return latestNotification?.created_at.toISOString() || null
    } catch (error) {
      logger.error(`Error getting latest flight booking notification time: ${error}`)
      throw error
    }
  },

  /**
   * Retrieves the latest notification time for a specific flight within a booking.
   * @param flightBookingId - The ID of the flight booking.
   * @param flightId - The ID of the flight.
   * @returns A Promise that resolves to the latest notification time as an ISO string.
   */
  getLatestFlightBookingFlightNotificationTime: async (
    flightBookingId: number,
    flightId: number
  ): Promise<string | null> => {
    try {
      logger.info(
        `Attempting to get latest notification time for flight ${flightId} within flight booking ${flightBookingId}`
      )

      const notifications = await notificationsRepository.getFlightBookingFlightNotifications(flightBookingId, flightId)

      const latestNotification = notifications
        .sort((a, b) => date(a.created_at.toISOString()).timestamp - date(b.created_at.toISOString()).timestamp)
        .pop()

      logger.info(
        `Latest notification time retrieved successfully for flight ${flightId} within flight booking ${flightBookingId} - ${latestNotification?.created_at.toISOString()}`
      )

      return latestNotification?.created_at.toISOString() || null
    } catch (error) {
      logger.error(`Error getting latest flight booking flight notification time: ${error}`)
      throw error
    }
  }
}
