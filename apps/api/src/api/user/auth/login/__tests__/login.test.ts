import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { app } from '../../../../../app'
import passwordFunctions from '../../../../../shared/functions/password.functions'
import { LoginRoutes } from '../login.routes'
import { LoginRequest } from '../login.types'

// Mock Prisma Client
vi.mock('@prisma/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@prisma/client')>()

  return {
    ...actual,
    PrismaClient: vi.fn().mockImplementation(() => ({
      users: {
        findFirst: vi.fn().mockResolvedValue({
          id: 1,
          email: 'poyser@gmail.com',
          status: { id: 1, name: 'active' },
          password_hash: 'hashedPassword',
          user_roles: [
            {
              role: {
                id: 1,
                name: 'traveler'
              }
            }
          ]
        }),
        findUnique: vi.fn().mockResolvedValue({
          id: 1,
          email: 'poyser@gmail.com',
          status: { id: 1, name: 'active' },
          password_hash: 'hashedPassword',
          user_roles: [
            {
              role: {
                id: 1,
                name: 'traveler'
              }
            }
          ]
        }),
        update: vi.fn().mockResolvedValue({ id: 1, password_attempts: 1 })
      },
      roles: {
        findUnique: vi.fn().mockImplementation((args) => {
          if (args.where.id === 1 || args.where.name === 'traveler') {
            return { id: 1, name: 'traveler' }
          }

          return null
        }),
        findMany: vi.fn().mockResolvedValue([{ id: 1, name: 'traveler' }])
      },
      audit_logs: {
        create: vi.fn().mockResolvedValue({
          id: 1,
          user_id: 1,
          action: 'User login Success',
          ip_address: '127.0.0.1',
          user_agent: 'Mozilla/5.0'
        })
      },
      $queryRaw: vi.fn().mockResolvedValue([{ count: 1 }]),
      $transaction: vi.fn().mockImplementation(async (callback) => {
        return callback({
          users: {
            findFirst: vi.fn().mockResolvedValue({
              id: 1,
              email: 'poyser@gmail.com',
              status: { id: 1, name: 'active' },
              password_hash: 'hashedPassword',
              user_roles: [
                {
                  role: {
                    id: 1,
                    name: 'traveler'
                  }
                }
              ]
            }),
            findUnique: vi.fn().mockResolvedValue({
              id: 1,
              email: 'poyser@gmail.com',
              status: { id: 1, name: 'active' },
              password_hash: 'hashedPassword',
              user_roles: [
                {
                  role: {
                    id: 1,
                    name: 'traveler'
                  }
                }
              ]
            }),
            update: vi.fn().mockResolvedValue({ id: 1, password_attempts: 1 })
          },
          roles: {
            findUnique: vi.fn().mockImplementation((args) => {
              if (args.where.id === 1 || args.where.name === 'traveler') {
                return { id: 1, name: 'traveler' }
              }

              return null
            }),
            findMany: vi.fn().mockResolvedValue([{ id: 1, name: 'traveler' }])
          },
          audit_logs: {
            create: vi.fn().mockResolvedValue({
              id: 1,
              user_id: 1,
              action: 'User login Success',
              ip_address: '127.0.0.1',
              user_agent: 'Mozilla/5.0'
            })
          }
        })
      })
    }))
  }
})

// Mock passwordHasher
const mockPasswordFunctions = vi.spyOn(passwordFunctions, 'verify')

describe('Login Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it.skip('should return a JWT token in a cookie on successful login', async () => {
    // Arrange
    const loginData: LoginRequest = {
      email: 'poyser@gmail.com',
      password: 'Password1##'
    }

    mockPasswordFunctions.mockResolvedValue(true)

    // Act
    const response = await request(app).post(LoginRoutes.LOGIN.fullPath).send(loginData)

    // Assert
    expect(response.status).toBe(StatusCodes.OK)
    expect(response.headers['set-cookie']).toBeDefined()
    const cookies = response.headers['set-cookie'][0]
    expect(cookies).toContain('jwt=')
  })

  it.skip('should return unauthorized status for invalid login', async () => {
    // Arrange
    const loginData: LoginRequest = {
      email: 'invaliduser@gmail.com',
      password: 'invalidpassword'
    }

    mockPasswordFunctions.mockResolvedValue(false)

    // Act
    const response = await request(app).post(LoginRoutes.LOGIN.fullPath).send(loginData)

    // Assert
    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
    expect(response.headers['set-cookie']).toBeUndefined()
  })
})
