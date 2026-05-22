import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/app.ts', 'src/server.ts', 'src/shared/scripts/monitoring/monitoring.scripts.ts'],
  outDir: 'build',
  splitting: true,
  clean: true,
  minify: process.env.NODE_ENV === 'production',
  treeshake: true,
  sourcemap: process.env.NODE_ENV === 'development',
  watch: process.env.NODE_ENV === 'development',
  external: [
    '@prisma/client',
    'express',
    'stripe',
    'cors',
    'helmet',
    'pino',
    'zod',
    'jsonwebtoken',
    'dotenv',
    'cookie-parser',
    'nodemailer',
    'os',
    'v8'
  ]
})
