export enum NotificationDeliveryChannel {
  email = 'email',
  push = 'push',
  sms = 'sms',
  inApp = 'in-app'
}

export enum NotificationPriority {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export enum NotificationCategory {
  alert = 'alert',
  notification = 'notification'
}

export enum NotificationAuthorCategory {
  system = 'system',
  admin = 'admin'
}

export type NotificationDeliveryChannelType = keyof typeof NotificationDeliveryChannel
export type NotificationPriorityType = keyof typeof NotificationPriority
export type NotificationCategoryType = keyof typeof NotificationCategory
export type NotificationAuthorCategoryType = keyof typeof NotificationAuthorCategory
