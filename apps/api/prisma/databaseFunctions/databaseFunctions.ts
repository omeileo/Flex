import prisma from '../prisma.client'
import generatePrefixedCuid from './generatePrefixedCuid.functions'

async function main() {
  await generatePrefixedCuid(prisma)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('Error creating database functions:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
