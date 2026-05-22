import { readFileSync } from 'node:fs'
import path from 'node:path'
import tls from 'node:tls'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'

import { env } from '../src/shared/functions/envConfig'

const url = new URL(env.DATABASE_URL)
const isLocalDb = url.hostname === 'localhost' || url.hostname === '127.0.0.1'

url.searchParams.delete('sslmode')
const connectionString = url.toString()

const ssl = isLocalDb
  ? undefined
  : {
      ca: [
        readFileSync(path.join(process.cwd(), 'certs/supabase-ca-dev.crt'), 'utf8'),
        ...tls.rootCertificates
      ],
      rejectUnauthorized: true
    }

const pool = new Pool({ connectionString, ssl })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export default prisma
