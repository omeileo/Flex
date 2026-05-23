import { Roles } from '@/shared/enums/roles.enum'

export interface CurrentUser {
  userId: string | null
  userIp: string
  userAgent: string
  userRole: Roles
}

export interface CurrentUserRequired {
  userId: string
  userIp: string
  userAgent: string
  userRole: Roles
}
