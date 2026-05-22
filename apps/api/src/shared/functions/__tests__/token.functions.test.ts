import { describe, expect, it } from 'vitest'

import { token } from '../token.functions'

describe('token.emailVerificationToken.generateShortCode', () => {
  it('returns a 6-character uppercase alphanumeric code', () => {
    const code = token.emailVerificationToken.generateShortCode()

    expect(code).toMatch(/^[A-Z0-9]{6}$/)
  })
})
