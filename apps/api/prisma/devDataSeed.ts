import prisma from './prisma.client'
import devDataSeed from './seed/__devData/devData.seed'

async function main() {
  await devDataSeed()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
