import { env } from '../envConfig'

/**
 * Represents a route in the application.
 */
interface Route {
  base: string
  routerPath: string
  fullPath: string
  openApiFullPath: string
}

/**
 * Creates a route object with the specified base and router path.
 * Adjusts the base path for production environment.
 * @param base - The base path of the route.
 * @param routerPath - The router path of the route.
 * @returns The created Route object.
 */
export const createRoute = function (base: string, routerPath: string): Route {
  // Adjust base path in production environment
  const adjustedBase = `${env.APP_BASE_PATH}${base}`
  const fullPath = `${adjustedBase}${routerPath}`

  return {
    base: adjustedBase,
    routerPath,
    fullPath,
    openApiFullPath: fullPath.replace(/:(\w+)/g, '{$1}')
  }
}
