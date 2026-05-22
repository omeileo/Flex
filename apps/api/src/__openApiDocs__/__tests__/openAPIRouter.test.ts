import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'

import { app } from '../../app'
import { generateOpenAPIDocument } from '../openAPIDocumentGenerator'
import { swaggerJsonUrl, swaggerUrl } from '../openAPIRouter'

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: vi.fn().mockImplementation(() => {
      return {
        $queryRaw: vi.fn().mockResolvedValue([{ count: 1 }])
      }
    })
  }
})

describe('OpenAPI Router', () => {
  describe('Swagger JSON route', () => {
    it.skip('should return Swagger JSON content', async () => {
      // Arrange
      const expectedResponse = generateOpenAPIDocument()

      // Act
      const response = await request(app).get(swaggerJsonUrl)

      // Assert
      expect(response.status).toBe(StatusCodes.OK)
      expect(response.type).toBe('application/json')
      expect(response.body).toEqual(expectedResponse)
    })

    it('should serve the Swagger UI', async () => {
      // Act
      const response = await request(app).get(swaggerUrl)

      // Assert
      expect(response.status).toBe(StatusCodes.OK)
      expect(response.text).toContain('swagger-ui')
    })
  })
})
