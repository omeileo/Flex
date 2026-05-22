// import { PrismaClient } from '@prisma/client'

// import { logger } from '../../src/app'

// export default async function backfillOfferRequestSourceCountry() {
//   const prisma = new PrismaClient()
//   const BATCH_SIZE = 1000

//   try {
//     logger.info('🔄 Starting source country backfill migration...')

//     // Get total count of offer requests
//     const totalCount = await prisma.offer_requests.count()
//     logger.info(`Total offer requests to process: ${totalCount}`)

//     for (let skip = 0; skip < totalCount; skip += BATCH_SIZE) {
//       logger.info(
//         `Processing batch ${skip / BATCH_SIZE + 1} of ${Math.ceil(totalCount / BATCH_SIZE)}`
//       )

//       const offerRequests = await prisma.offer_requests.findMany({
//         skip,
//         take: BATCH_SIZE,
//         include: {
//           item_requests: {
//             orderBy: { id: 'asc' },
//             take: 1,
//             include: {
//               items: {
//                 include: {
//                   provider_url: true
//                 }
//               }
//             }
//           }
//         }
//       })

//       const updates = offerRequests.map((offerRequest) => {
//         const countryCode =
//           offerRequest.item_requests[0]?.items?.provider_url?.country_code ||
//           'US'

//         return prisma.offer_requests.update({
//           where: { id: offerRequest.id },
//           data: { source_country_iata_code: countryCode }
//         })
//       })

//       await prisma.$transaction(updates)
//     }

//     // Handle any remaining null values
//     await prisma.offer_requests.updateMany({
//       where: { source_country_iata_code: null },
//       data: { source_country_iata_code: 'US' }
//     })

//     logger.info('✅ Successfully backfilled source country codes')
//   } catch (error) {
//     logger.error(`❌ Error backfilling source countries: ${error}`)
//     throw error
//   } finally {
//     await prisma.$disconnect()
//   }
// }
