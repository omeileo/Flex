import { Roles } from '@/shared/enums/roles.enum'

export interface CurrentUser {
  userId: number | null
  userIp: string
  userAgent: string
  userRole: Roles
}

export interface CurrentUserRequired {
  userId: number
  userIp: string
  userAgent: string
  userRole: Roles
}
