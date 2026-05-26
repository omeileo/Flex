import { Request } from 'express'
import { describe, expect, it } from 'vitest'

import { getJwtTokenFromRequest } from '../request.functions'

const createRequest = (overrides: Partial<Request> = {}): Request =>
  ({
    cookies: {},
    headers: {},
    ...overrides
  }) as Request

describe('getJwtTokenFromRequest', () => {
  it('returns the token from the jwt cookie', () => {
    const req = createRequest({
      cookies: {
        jwt: { token: 'cookie-token' }
      }
    })

    expect(getJwtTokenFromRequest(req)).toBe('cookie-token')
  })

  it('returns the token from the Authorization header when the cookie is missing', () => {
    const req = createRequest({
      headers: {
        authorization: 'Bearer header-token'
      }
    })

    expect(getJwtTokenFromRequest(req)).toBe('header-token')
  })

  it('prefers the cookie token over the Authorization header', () => {
    const req = createRequest({
      cookies: {
        jwt: { token: 'cookie-token' }
      },
      headers: {
        authorization: 'Bearer header-token'
      }
    })

    expect(getJwtTokenFromRequest(req)).toBe('cookie-token')
  })

  it('returns null when no token is present', () => {
    const req = createRequest()

    expect(getJwtTokenFromRequest(req)).toBeNull()
  })
})
