import React from 'react'

import { UserRole } from '../shared/functions/UserRole/userRoleManagement.types'
import routes from './routes.dictionary'

export interface Route {
  name: string
  path: string
  isAuthenticationRequired: boolean
  requiresFlexSetup?: boolean
  userRole?: UserRole[]
  component: React.ComponentType<object> | null
  options?: {
    headerShown?: boolean
    title?: string
    gestureEnabled?: boolean
  }
}

export type Routes = typeof routes
