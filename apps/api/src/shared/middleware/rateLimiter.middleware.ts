import { env } from '@/shared/functions/envConfig'
import { Request } from 'express'
import { rateLimit } from 'express-rate-limit'

/**
 * Middleware that limits the rate of incoming requests.
 *
 * @remarks
 * This middleware uses the `rateLimit` library to implement rate limiting functionality.
 *
 * @param req - The incoming request object.
 * @returns The rate limiter middleware function.
 */
const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: env.COMMON_RATE_LIMIT_MAX_REQUESTS,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  windowMs: 15 * 60 * env.COMMON_RATE_LIMIT_WINDOW_MS,
  keyGenerator: (req: Request) => req.ip as string
})

export default rateLimiter
