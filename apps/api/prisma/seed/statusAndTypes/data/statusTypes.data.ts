import { status_types } from '@prisma/client'

import { StatusType } from '../../../../src/shared/enums/statusType.enum'

const statusTypesList: status_types[] = [
  {
    id: 1,
    type: StatusType.user_status,
    description: 'Statuses related to user accounts'
  },
  {
    id: 2,
    type: StatusType.offer_status,
    description: 'Statuses related to offer requests placed by shoppers'
  },
  {
    id: 3,
    type: StatusType.item_tracking_status,
    description: 'Statuses related to the tracking of item requests'
  },
  {
    id: 4,
    type: StatusType.flight_status,
    description: 'Statuses related to flight bookings'
  },
  {
    id: 5,
    type: StatusType.payment_status,
    description: 'Statuses related to payment transactions'
  },
  {
    id: 6,
    type: StatusType.notification_status,
    description: 'Statuses related to notifications delivery'
  },
  {
    id: 7,
    type: StatusType.virtual_card_status,
    description: 'Statuses related to virtual cards'
  },
  {
    id: 8,
    type: StatusType.external_flight_booking_status,
    description: 'Statuses related to external flight bookings'
  }
]

export default statusTypesList
