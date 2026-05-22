import { createRoute } from '../../../../shared/functions/http/routes.functions'

export const PersonalInfoBasePath = '/profile/personal-info'

export const PersonalInfoRoutes = {
  UPDATE: createRoute(PersonalInfoBasePath, '/update')
}
