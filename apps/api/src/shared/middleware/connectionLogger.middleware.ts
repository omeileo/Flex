import { logger } from '@/app'
import { NextFunction, Request, Response } from 'express'

import prisma from '../../../prisma/prisma.client'

export const logConnectionUsage = async (req: Request, res: Response, next: NextFunction) => {
  const activeConnections: { count: number }[] =
    await prisma.$queryRaw`SELECT count(*) FROM pg_stat_activity WHERE state = 'active'`

  logger.info(`Active connections: ${activeConnections[0].count}`)

  next()
}
