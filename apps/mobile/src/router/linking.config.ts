import { LinkingOptions } from '@react-navigation/native'

/**
 * Deep links: flex://verify?code=XC2DAS&email=user@example.com
 */
export const linkingConfig: LinkingOptions<Record<string, object | undefined>> = {
  prefixes: ['flex://'],
  config: {
    screens: {
      VerifyEmail: {
        path: 'verify',
        parse: {
          code: (value: string) => value.trim().toUpperCase(),
          email: (value: string) => decodeURIComponent(value).trim().toLowerCase()
        }
      },
      Login: 'login',
      ForgetPassword: 'forget-password'
    }
  }
}
