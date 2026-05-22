import { createRoute } from '../../../../shared/functions/http/routes.functions'

export const VerifyEmailBasePath = '/auth/verify-email'

/**
 * Routes for verifying email address.
 */
export const VerifyEmailRoutes = {
  /**
   * Verify email address route.
   */
  VERIFY: createRoute(VerifyEmailBasePath, ''),

  /**
   * Resend Verify email link route.
   */
  VERIFY_RESEND: createRoute(VerifyEmailBasePath, '/resend')
}
