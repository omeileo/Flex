import { createRoute } from '@/shared/functions/http/routes.functions'

export const ContactInfoBasePath = '/profile/contact-info'

export const ContactInfoRoutes = {
  UPDATE: createRoute(ContactInfoBasePath, '/update')
}
