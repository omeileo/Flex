import { createRoute } from '../../../../shared/functions/http/routes.functions'

export const ProfileBasePath = '/profile'

export const ProfileRoutes = {
  GET: createRoute(ProfileBasePath, ''),
  UPDATE_FIREBASE_USER_ID: createRoute(ProfileBasePath, '/firebase/update-user-id')
}
