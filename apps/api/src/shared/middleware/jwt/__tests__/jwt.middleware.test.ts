import { Request, Response } from 'express'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getJwtTokenFromRequest } from '../../../functions/http/request.functions'
import { blacklistedTokensRepository } from '../../../repository/blacklistedTokens.repository'
import jwtMiddleware from '../jwt.middleware'

vi.mock('@/app', () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn()
  }
}))

vi.mock('../../../functions/http/request.functions', () => ({
  getJwtTokenFromRequest: vi.fn()
}))

vi.mock('../../../repository/blacklistedTokens.repository', () => ({
  blacklistedTokensRepository: {
    getBlacklistedToken: vi.fn()
  }
}))

vi.mock('../jwt.functions', () => ({
  jwtService: {
    verifyToken: vi.fn()
  }
}))

describe('jwt middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('rejects blacklisted tokens on protected routes', async () => {
    vi.mocked(getJwtTokenFromRequest).mockReturnValue('revoked-token')
    vi.mocked(blacklistedTokensRepository.getBlacklistedToken).mockResolvedValue({
      id: 'blk_tok_TEST-0000-0000-0000',
      token: 'revoked-token',
      created_at: new Date()
    })

    const req = { userPayload: undefined } as Request
    const res = {} as Response
    const next = vi.fn()

    await jwtMiddleware(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next.mock.calls[0][0]).toBeTruthy()
    expect(req.userPayload).toBeUndefined()
  })
})
