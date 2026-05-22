import { logger } from '@/app'
import { createNamespace, getNamespace } from 'cls-hooked'

import { globalErrors } from './dictionary/errors.dictionary'
import { Roles } from './enums/roles.enum'
import { CurrentUser, CurrentUserRequired } from './middleware/appContext/appContext.types'

const NAMESPACE_NAME = 'app-context'
const appContext = createNamespace(NAMESPACE_NAME)

export const getContext = () => getNamespace(NAMESPACE_NAME)
export const getContextValue = <T>(key: string) => getNamespace(NAMESPACE_NAME)?.get(key) as T
export const setContextValue = <T>(key: string, value: T) => getNamespace(NAMESPACE_NAME)?.set(key, value)

/**
 * Get the current logged in user
 * @returns The current logged in user
 */
export const getCurrentLoggedInUser = () => {
  const currentUser = getContextValue<CurrentUser>('currentUser')

  return currentUser as CurrentUserRequired
}

/**
 * Get the current logged in user or throw an error if the user is not found
 * @returns The current logged in user
 */
export const getCurrentLoggedInUserOrThrow = () => {
  const currentUser = getContextValue<CurrentUser>('currentUser')

  if (!currentUser || !currentUser?.userId) {
    throw globalErrors.entityNotFound.build('Current User')
  }

  return currentUser as CurrentUserRequired
}

/**
 * Get the current logged in user role
 * @returns The current logged in user role
 */
export const getCurrentLoggedInUserRole = () => {
  const currentUser = getContextValue<CurrentUser>('currentUser')

  return currentUser?.userRole
}

/**
 * Validate the current logged in user role
 * @param allowedRoles - The allowed roles
 */
export const validateUserRoleOrThrow = (allowedRoles: Roles[]) => {
  const currentUserRole = getCurrentLoggedInUserRole()

  if (!allowedRoles.includes(currentUserRole)) {
    logger.error(`User ${getCurrentLoggedInUser().userId} is not authorized to access this resource`)
    throw globalErrors.unauthorized.build()
  }
}

/**
 * Validate that the current logged in user is an admin
 */
export const validateThatUserIsAdminOrThrow = () => {
  const currentUserRole = getCurrentLoggedInUserRole()

  if (currentUserRole !== Roles.Admin) {
    logger.error(`User ${getCurrentLoggedInUser().userId} is not an admin`)
    throw globalErrors.unauthorized.build()
  }
}

export default appContext
