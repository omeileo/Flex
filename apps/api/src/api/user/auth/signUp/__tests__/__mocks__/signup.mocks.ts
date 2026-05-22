import { vi } from 'vitest'

const prismaMock = {
  $transaction: vi.fn().mockImplementation((callback) =>
    callback({
      users: {
        create: vi.fn().mockResolvedValue({
          id: 1,
          email: 'johndoe@example.com',
          user_status_id: 1,
          user_profile_id: 1
        }),
        findFirst: vi.fn().mockResolvedValue(null) // No existing user
      },
      user_profiles: {
        create: vi.fn().mockResolvedValue({
          id: 1,
          first_name: 'John',
          last_name: 'Doe'
        })
      },
      user_preferences: {
        create: vi.fn().mockResolvedValue({
          id: 1,
          user_id: 1,
          preference: 'DEALS_AND_DISCOUNTS'
        })
      },
      email_verification_tokens: {
        create: vi.fn().mockResolvedValue({
          id: 1,
          user_id: 1,
          token: '6693a259d85d3a61aa48e8eb5260984974226a5137bdc9021b7f58e0bf781d14',
          short_code: 'XC2DAS',
          created_at: new Date(),
          expires_at: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
        })
      },
      status_types: {
        findFirst: vi.fn().mockResolvedValue({
          id: 1,
          type: 'user_status'
        })
      },
      status: {
        findFirst: vi.fn().mockResolvedValue({
          id: 1,
          type_id: 1,
          name: 'unverified'
        })
      },
      roles: {
        findMany: vi.fn().mockResolvedValue([
          { id: 1, name: 'Shopper' },
          { id: 2, name: 'Traveler' }
        ])
      },
      preferences: {
        findFirst: vi.fn().mockResolvedValue({
          id: 1,
          name: 'DEALS_AND_DISCOUNTS'
        })
      }
    })
  ),
  users: {
    findFirst: vi.fn().mockResolvedValue({
      id: 1,
      email: 'johndoe@example.com',
      status: {
        id: 1,
        name: 'unverified'
      }
    })
  }
}

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: vi.fn(() => {})
  }
})

export { prismaMock }
