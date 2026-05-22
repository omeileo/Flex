import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { app } from '../../../../../app'
import { SignUpRoutes } from '../signUp.routes'
import { SignupRequest } from '../signUp.types'

vi.mock('@prisma/client', () => {
  return {
    Prisma: {
      PrismaClientKnownRequestError: vi.fn().mockImplementation(() => {
        return {
          code: 'P2002',
          message: 'Email already in use'
        }
      })
    },
    PrismaClient: vi.fn().mockImplementation(() => {
      return {
        $queryRaw: vi.fn().mockResolvedValue([{ count: 1 }]),
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
    })
  }
})

// Mock the Prisma client
describe('AUTH | Sign up Controller', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it.skip('should register a new user successfully', async () => {
    // Arrange
    const newUser: SignupRequest = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'Password123!',
      wantsDealsAndDiscounts: true
    }

    // Act
    const response = await request(app).post(SignUpRoutes.Register.fullPath).send(newUser)

    // Assert
    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body.message).toBe('User registration successful. Please verify your email address.')
    expect(response.body.data).toHaveProperty('id')
    expect(response.body.data).toHaveProperty('email', newUser.email)
    expect(response.body.data.status.name).toBe('unverified')
  })

  it('should fail to register a user with invalid data', async () => {
    // Arrange
    const invalidUser = {
      firstName: 'J',
      lastName: 'D',
      email: 'invalid-email',
      password: '123',
      wantsDealsAndDiscounts: true
    }

    // Act
    const response = await request(app).post(SignUpRoutes.Register.fullPath).send(invalidUser)

    // Assert
    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body.message).toBe('Invalid Input Data')
  })

  it.skip('should fail to register a user with a duplicate email', async () => {
    // Arrange
    const newUser: SignupRequest = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'Password123!',
      wantsDealsAndDiscounts: true
    }

    // Act
    const response = await request(app).post(SignUpRoutes.Register.fullPath).send(newUser)

    // Assert
    expect(response.status).toBe(StatusCodes.CONFLICT)
    expect(response.body.message).toBe('Email already in use')
  })
})
