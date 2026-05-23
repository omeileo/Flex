import { ReactNode } from 'react'

import { Route } from '../router.types'

export interface AuthGateProps {
  route: Route
  children: ReactNode
}
